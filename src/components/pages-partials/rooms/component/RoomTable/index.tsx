import Image from "next/image";
import { getAppDataSelector } from "@/store/app";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";

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
import { handleOpenRoomModal, setSelectedRoom } from "@/store/app";
import { IRoom } from "@/store/app/types";
import { deleteRoom } from "@/services/app/rooms";
import { getAllRoomsThunk, setDeleteModal } from "@/store/app/appSlice";
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

export default function RoomsTable() {
  const { allRooms, allRoomsPending,selectedBranchSuperAdmin } = useAppSelector(getAppDataSelector);
  const role = useAppSelector((state: AppState) => state.auth.user.role);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleOpenModal = (id: string | number) => {
    const ind = allRooms.findIndex((room: IRoom) => room.id === id);
    if (ind > -1) {
      const room = allRooms[ind];

      dispatch(handleOpenRoomModal(true));
      dispatch(setSelectedRoom(room));
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      const resp = await deleteRoom(id.toString());
      if (resp) {
        setIsDeleting(false);
        toast(
          <ToastMsg
            description={`Room ${resp.name} Deleted Successfully  `}
            s
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
        dispatch(getAllRoomsThunk());
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

  const handleDeleteButton = (selectedRoom: IRoom) => {
    dispatch(
      setDeleteModal({
        title: "Delete Room",
        description: `Are you sure you want to delete, ${selectedRoom.name} ?`,
        visibile: true,
        onClickYes: () => handleDelete(selectedRoom.id),
        isDeleting,
      })
    );
  };

  const columns: GridColDef[] = [
    
    {
      renderHeader: (props) => {
        return <CustomHeader title="Rooms" {...props} />;
      },
      field: "name",
      width: 280,
      align: "left",
    } as GridColDef,
    {
      renderHeader: (props) => {
        return <CustomHeader title="Amenities" {...props} />;
      },
      field: "amenities_name",
      width: 280,
      align: "left",
    } as GridColDef,
    {
      renderHeader: (props) => {
        return <CustomHeader title="3rd Party Room" {...props} />;
      },
      field: "is_third_party",
      width: 280,
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
      renderHeader: () => {
        return <HeaderTag>Options</HeaderTag>;
      },
      field: "option",
      width: 230,
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
  let roomData = [];

  if (role === IRole.SUPER_ADMIN) {
    roomData = allRooms?.filter((data: IRoom) => {
      return data.branch_name === selectedBranchSuperAdmin;
    });
  } else {
    roomData = allRooms;
  }
  return (
    <StyleGrid item md={11.5} sm={11} xs={11}>
      <Paper elevation={5}>
        <DataGridStyle
          autoHeight={true}
          columns={columns}
          checkboxSelection={false}
          rows={roomData}
          disableColumnMenu={true}
          disableRowSelectionOnClick={true}
          loading={allRoomsPending}
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
