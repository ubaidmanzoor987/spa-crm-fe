import Image from "next/image";

import { handleOpenServiceModal } from "@/store/app";
import { toast } from "react-toastify";
import Paper from "@mui/material/Paper";

import {
  GridColDef,
  GridCellParams,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";

import {
  getAllServicesThunk,
  getAllStaffThunk,
  handleOpenStaffModal,
  setDeleteModal,
  setSelectedStaff,
} from "@/store/app/appSlice";
import { IStaff } from "@/store/app/types";
import { deleteStaff } from "@/services/app/staff";
import CustomNoRowsOverlay from "@/components/core/NoRowsOverLay";
import { getAppDataSelector } from "@/store/app";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTypedHooks";

import {
  DataGridStyle,
  HeaderTag,
  PointerDiv,
  IconDiv,
  StyleGrid,
  GridLayoutStyle,
} from "../index.style";
import { useState } from "react";
import { ToastMsg } from "@/components/core/ToastMsg";
import { IRole } from "@/store/auth/types";
import { AppState } from "@/store/rootReducer";
import BranchesDropDown from "@/components/core/BranchesDropDown";

interface ICustomHeader {
  title: string;
  onPressSort?: () => void;
  onPressUnSort?: () => void;
}

const CustomHeader = ({
  title,
  onPressSort,
  onPressUnSort,
  ...props
}: ICustomHeader) => {
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
  const { allStaff, allStaffPending,selectedBranchSuperAdmin } = useAppSelector(getAppDataSelector);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const role = useAppSelector((state: AppState) => state.auth.user.role);
  const dispatch = useAppDispatch();

  const handleOpenModal = (id: string | number) => {
    const ind = allStaff.findIndex(
      (serv: { id: string | number }) => serv.id === id
    );
    if (ind > -1) {
      const ser = allStaff[ind];
      dispatch(handleOpenStaffModal(true));
      dispatch(setSelectedStaff(ser));
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      setIsDeleting(true);
      const resp = await deleteStaff(id.toString());
      if (resp) {
        setIsDeleting(false);
        toast(
          <ToastMsg
            description={`Staff ${resp.first_name} is deleted Successfully`}
          />,
          {
            autoClose: 5000,
            type: "success",
            icon: false,
          }
        );
        // toast.success(`Successfully Deleted, ${resp.first_name}`);
        dispatch(
          setDeleteModal({
            title: "",
            description: "",
            visibile: false,
            onClickYes: () => {},
            isDeleting: false,
          })
        );
        dispatch(getAllStaffThunk());
      }
    } catch (err) {
      setIsDeleting(false);
      setDeleteModal({
        title: "",
        description: "",
        visibile: false,
        onClickYes: () => {},
        isDeleting: false,
      })
      toast(<ToastMsg 
        description={`Staff ${id} is unable to delete due to ${err}`} />, {
        autoClose: 5000,
        type: "error",
        icon: false,
      });
      // toast.error(`Unable to Delete ${id}`);
    }
  };

  const handleDeleteButton = (selectedstaff: IStaff) => {
    dispatch(
      setDeleteModal({
        title: "Delete Staff",
        description: `Are you sure you want to delete, ${selectedstaff.email} ?`,
        visibile: true,
        onClickYes: () => handleDelete(selectedstaff.id),
        isDeleting,
      })
    );
  };

  const columns: GridColDef[] = [
    {
      renderHeader: (props) => {
        return <CustomHeader title="Id" {...props} />;
      },
      field: "id",
      align: "left",
      width: 200,
    } as GridColDef,
    
    {
      renderHeader: () => {
        return <HeaderTag>Image</HeaderTag>;
      },
      renderCell: (params) => (
        <>
          <Avatar src={params.value} />
        </>
      ),
      field: "profile_picture",
      width: 150,
      align: "left",
    } as GridColDef,
    {
      renderHeader: (props) => {
        return <CustomHeader title="Name" {...props} />;
      },
      field: "first_name",
      width: 220,
      align: "left",
    } as GridColDef,
    {
      renderHeader: (props) => {
        return <CustomHeader title="Email" {...props} />;
      },
      field: "email",
      width: 220,
      align: "left",
    } as GridColDef,
    {
      renderHeader: (props) => {
        return <CustomHeader title="Phone Number" {...props} />;
      },
      field: "phone",
      width: 220,
      align: "left",
    } as GridColDef,
    {
      renderHeader: (props) => {
        return <CustomHeader title="Designation" {...props} />;
      },
      field: "role",
      width: 220,
      align: "left",
    } as GridColDef,
    ...(role ===IRole.SUPER_ADMIN
      ? [
          {
            renderHeader: (props) => {
              return <CustomHeader title="Branch Name" {...props} />;
            },
            field: "branch_name",
            width: 250,
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
  let staffData = [];

  if (role === IRole.SUPER_ADMIN) {
    staffData = allStaff?.filter((data: IStaff) => {
      return data.branch_name === selectedBranchSuperAdmin;
    });
  } else {
    staffData = allStaff;
  }
  return (
    <StyleGrid item md={11.5} sm={11} xs={11}>
      <Paper elevation={5}>
        <DataGridStyle
          autoHeight={true}
          columns={columns}
          columnVisibilityModel={{
            id: false,
          }}
          checkboxSelection={false}
          rows={staffData}
          disableColumnMenu={true}
          disableRowSelectionOnClick={true}
          loading={allStaffPending}
          slots={{
            toolbar: CustomToolbar,
            noRowsOverlay: CustomNoRowsOverlay,
          }}
        />
      </Paper>
    </StyleGrid>
  );
}
