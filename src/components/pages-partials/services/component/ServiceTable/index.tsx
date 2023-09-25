import Image from "next/image";
import { getAppDataSelector } from "@/store/app";
import Paper from "@mui/material/Paper";

import {
  GridColDef,
  GridCellParams,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";

import {
  DataGridStyle,
  HeaderTag,
  PointerDiv,
  IconDiv,
  StyleGrid,
  GridLayoutStyle,
} from "../index.styles";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTypedHooks";
import { handleOpenServiceModal, setSelectedService } from "@/store/app";
import { toast } from "react-toastify";
import { getAllServicesThunk, setDeleteModal } from "@/store/app/appSlice";
import { IService } from "@/store/app/types";
import { deleteService } from "@/services/app/services";
import { useState } from "react";
import CustomNoRowsOverlay from "@/components/core/NoRowsOverLay";
import { ToastMsg } from "@/components/core/ToastMsg";
import { IRole } from "@/store/auth/types";
import { AppState } from "@/store/rootReducer";
import BranchesDropDown from "@/components/core/BranchesDropDown";

interface ICustomHeader {
  title: string;
  onPressSort?: () => void;
  onPressUnSort?: () => void;
}

const CustomHeader = ({ title, onPressSort, onPressUnSort }: ICustomHeader) => {
  return (
    <>
      <HeaderTag>{title}</HeaderTag>
      <Image
        src={"/svgs/arrowUp.svg"}
        height={20}
        width={20}
        onClick={onPressSort}
      />
      <Image
        src={"/svgs/arrowDown.svg"}
        height={20}
        width={20}
        onClick={onPressUnSort}
      />
    </>
  );
};

function CustomToolbar() {
  const role = useAppSelector((state: AppState) => state.auth.user.role);
  return (
    <GridToolbarContainer>
      <GridLayoutStyle isSuperAdmin={role === IRole.SUPER_ADMIN ? true : false}>
        {role === IRole.SUPER_ADMIN && <BranchesDropDown />}
        <GridToolbarExport />
      </GridLayoutStyle>
    </GridToolbarContainer>
  );
}

export default function ServicesTable() {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const role = useAppSelector((state: AppState) => state.auth.user.role);
  const { allServices, allServicesPending,selectedBranchSuperAdmin } =
    useAppSelector(getAppDataSelector);

  const dispatch = useAppDispatch();

  const handleOpenModal = (id: string | number) => {
    const ind = allServices.findIndex((serv) => serv.id === id);
    if (ind > -1) {
      const ser = allServices[ind];
      dispatch(handleOpenServiceModal(true));
      dispatch(setSelectedService(ser));
      
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      setIsDeleting(true);
      const resp = await deleteService(id.toString());
      if (resp) {
        setIsDeleting(false);
        toast(
          <ToastMsg
            description={`Service ${resp.name} Deleted Successfully  `}s
          />,
          {
            autoClose: 5000,
            type: "success",
            icon: false,
          }
        );
        dispatch(
          setDeleteModal({
            title: "",
            description: "",
            visibile: false,
            onClickYes: () => {},
            isDeleting: false,
          })
        );
        dispatch(getAllServicesThunk());
      }
    } catch (err) {
      setIsDeleting(false);
      toast(<ToastMsg description={`Unable to Delete, ${id}`} />, {
        autoClose: 5000,
        type: "error",
        icon: false,
      });
    }
  };

  const handleDeleteButton = (selectedservice: IService) => {
    dispatch(
      setDeleteModal({
        title: "Delete service",
        description: `Are you sure you want to delete, ${selectedservice.name} ?`,
        visibile: true,
        onClickYes: () => handleDelete(selectedservice.id),
        isDeleting,
      })
    );
  };

  const columns: GridColDef[] = [
    {
      renderHeader: (props) => {
        return <CustomHeader title="Service Name" {...props} />;
      },
      field: "name",
      width: 280,
      align: "left",
    } as GridColDef,
    {
      renderHeader: (props) => {
        return <CustomHeader title="Amenities" {...props} />;
      },
      field: "amenities",
      width: 300,
      align: "left",
    } as GridColDef,
    {
      renderHeader: (props) => {
        return <CustomHeader title="Service Price" {...props} />;
      },
      field: "actual_price",
      width: 240,
      align: "left",
    } as GridColDef,
    {
      renderHeader: (props) => {
        return <CustomHeader title="Required Therapists" {...props} />;
      },
      field: "required_therapist",
      width: 240,
      align: "left",
    } as GridColDef,
    ...(role ===IRole.SUPER_ADMIN
      ? [
          {
            renderHeader: (props) => {
              return <CustomHeader title="Branch Name" {...props} />;
            },
            field: "branch_name",
            width: 200,
            align: "left",
          } as GridColDef,
        ]
      : []),
    {
      renderHeader: (props) => {
        return <HeaderTag>Options</HeaderTag>;
      },
      field: "option",
      width: 200,
      align: "left",
      renderCell: (params: GridCellParams) => {
        return (
          <PointerDiv>
            <IconDiv>
              <Image
                src={"/svgs/edit.svg"}
                height={23}
                width={23}
                onClick={() => handleOpenModal(params.id)}
              />
              <Image
                src={"/svgs/delete.svg"}
                height={23}
                width={23}
                onClick={() => handleDeleteButton(params.row)}
              />
            </IconDiv>
          </PointerDiv>
        );
      },
    } as GridColDef,
  ];
  let serviceData = [];

  if (role === IRole.SUPER_ADMIN) {
    serviceData = allServices?.filter((data: IService) => {
      return data.branch_name === selectedBranchSuperAdmin;
    });
  } else {
    serviceData = allServices;
  }
  return (
    <StyleGrid item md={11.5} sm={11} xs={11}>
      <Paper elevation={5}>
        <DataGridStyle
          autoHeight={true}
          columns={columns}
          checkboxSelection={false}
          rows={serviceData}
          disableColumnMenu={true}
          disableRowSelectionOnClick={true}
          loading={allServicesPending}
          columnVisibilityModel={{
            id: false,
          }}
          slots={{
            toolbar: CustomToolbar,
            noRowsOverlay: CustomNoRowsOverlay,
          }}
        />
      </Paper>
    </StyleGrid>
  );
}
