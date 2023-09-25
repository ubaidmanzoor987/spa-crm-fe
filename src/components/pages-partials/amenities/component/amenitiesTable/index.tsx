import { useState } from "react";
import Image from "next/image";
import {
  getAppDataSelector,
  handleOpenAmenitesModal,
  setSelectedAmenites,
} from "@/store/app";
import Paper from "@mui/material/Paper";
import { IAmenities } from "@/store/app/types";
import { deleteAmenities } from "@/services/app/amenities";
import {
  GridColDef,
  GridCellParams,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";

import {
  IconDiv,
  PointerDiv,
  HeaderTag,
  StyleGrid,
  DataGridStyle,
  GridLayoutStyle,
} from "../index.styles";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTypedHooks";
import { getAllAmenitiesThunk, setDeleteModal } from "@/store/app/appSlice";
import { toast } from "react-toastify";
import CustomNoRowsOverlay from "@/components/core/NoRowsOverLay";
import { ToastMsg } from "@/components/core/ToastMsg";
import { AppState } from "@/store/rootReducer";
import { IRole } from "@/store/auth/types";
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
export default function AmenitiesTable() {
  const role = useAppSelector((state: AppState) => state.auth.user.role);
  const { allAmenities, allAmenitiesPending, selectedBranchSuperAdmin } =
    useAppSelector(getAppDataSelector);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleOpenModal = (id: string | number) => {
    const ind = allAmenities.findIndex((serv) => serv.id === id);
    if (ind > -1) {
      const amenities = allAmenities[ind];
      dispatch(handleOpenAmenitesModal(true));
      dispatch(setSelectedAmenites(amenities));
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      setIsDeleting(true);
      const resp = await deleteAmenities(id.toString());
      if (resp && resp.id) {
        setIsDeleting(false);
        toast(
          <ToastMsg
            description={`Aminity ${resp.name} Deleted Successfully  `}
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
        dispatch(getAllAmenitiesThunk());
      }
    } catch (err) {
      setIsDeleting(false);
      dispatch(
        setDeleteModal({
          title: "",
          description: "",
          visibile: false,
          onClickYes: () => {},
          isDeleting: false,
        })
      );
      toast(<ToastMsg description={`Unable to Delete, ${id}`} />, {
        autoClose: 5000,
        type: "error",
        icon: false,
      });
    }
  };

  const handleDeleteButton = (selectedAmenities: IAmenities) => {
    dispatch(
      setDeleteModal({
        title: "Delete Amenitie",
        description: `Are you sure you want to delete, ${selectedAmenities.name} ?`,
        visibile: true,
        onClickYes: () => handleDelete(selectedAmenities.id),
        isDeleting,
      })
    );
  };

  const columns: GridColDef[] = [
    {
      renderHeader: (props) => {
        return <CustomHeader title="Amenities" {...props} />;
      },
      field: "name",
      width: 380,
      align: "left",
    } as GridColDef,
    ...(role === IRole.SUPER_ADMIN
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
    ...(role === IRole.SUPER_ADMIN
      ? [
          {
            headerName: "",
            field: "spacer",
            width: 300,
          },
        ]
      : [
          {
            headerName: "",
            field: "spacer",
            width: 600,
          },
        ]),

    {
      renderHeader: (props) => {
        return <HeaderTag>Option</HeaderTag>;
      },
      field: "option",
      width: 230,
      align: "center",
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
  let amenitiesData = [];

  if (role === IRole.SUPER_ADMIN) {
    amenitiesData = allAmenities?.filter((data: IAmenities) => {
      return data.branch_name === selectedBranchSuperAdmin;
    });
  } else {
    amenitiesData = allAmenities;
  }

  return (
    <StyleGrid item md={11.5} sm={11} xs={11}>
      <Paper elevation={5}>
        <DataGridStyle
          autoHeight={true}
          columns={columns}
          checkboxSelection={false}
          rows={amenitiesData}
          disableColumnMenu={true}
          disableRowSelectionOnClick={true}
          loading={allAmenitiesPending}
          slots={{
            toolbar: CustomToolbar,
            noRowsOverlay: CustomNoRowsOverlay,
          }}
        />
      </Paper>
    </StyleGrid>
  );
}
