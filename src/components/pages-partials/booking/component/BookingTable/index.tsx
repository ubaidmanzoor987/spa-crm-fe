import Image from "next/image";
import { getAppDataSelector } from "@/store/app";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";

import {
  GridColDef,
  GridCellParams,
  GridToolbarContainer,
  GridToolbarExport,
  GridComparatorFn,
} from "@mui/x-data-grid";

import {
  DataGridStyle,
  HeaderTag,
  PointerDiv,
  StyleGrid,
  OptionButton,
  GridLayoutStyle,
} from "../index.style";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTypedHooks";
import { handleOpenBookingModel } from "@/store/app";
import { IBooking, IBookings } from "@/store/app/types";
import {
  getAllBookingsThunk,
  setDeleteModal,
  setSelectedBooking,
} from "@/store/app/appSlice";
import { COLORS } from "@/constants/colors";
import { useEffect, useState } from "react";
import { deleteBooking, getBookingbyId } from "@/services/app/booking";
import CustomNoRowsOverlay from "@/components/core/NoRowsOverLay";
import moment from "moment";
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

const dayInMonthComparator: GridComparatorFn<Date> = (v1, v2) =>
  v1.getDate() - v2.getDate();

export default function BookingTable() {
  const {
    allBooking,
    allBookingPending,
    selectedBranchSuperAdmin,
    selectedBooking,
    branch,
  } = useAppSelector(getAppDataSelector);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isGetting, setIsGetting] = useState<boolean>(false);
  const role = useAppSelector((state: AppState) => state.auth.user.role);
  const dispatch = useAppDispatch();

  const handleOpenModal = async (id: number | string) => {
    setIsGetting(true);
    try {
      setIsGetting(false);
      const resp = await getBookingbyId(id.toString());
      resp.payment_method = [resp.payment_method] as any;
      dispatch(setSelectedBooking(resp));
      dispatch(handleOpenBookingModel(true));
    } catch (err: any) {
      setIsGetting(false);
      console.log("error", err);
      toast(
        <ToastMsg
          description={`Unable to get booking with ${id} due to ${err.message} `}
        />,
        {
          autoClose: 5000,
          type: "error",
          icon: false,
        }
      );
    }
  };

  const handleDelete = async (id: string | number | any) => {
    try {
      setIsDeleting(true);
      const resp = await deleteBooking(id.toString());
      if (resp) {
        toast(<ToastMsg description={`Successfully Deleted, ${resp.id}`} />, {
          autoClose: 5000,
          type: "success",
          icon: false,
        });

        dispatch(
          setDeleteModal({
            title: "",
            description: "",
            visibile: false,
            onClickYes: () => {},
            isDeleting: false,
          })
        );
        dispatch(getAllBookingsThunk());
      }
    } catch (err) {
      setIsDeleting(false);
      toast(<ToastMsg description={`Unable to Delete ${id}`} />, {
        autoClose: 5000,
        type: "error",
        icon: false,
      });
    }
  };

  const handleDeleteButton = (selectedBooking: IBooking) => {
    dispatch(
      setDeleteModal({
        title: "Delete Booking",
        description: `Are you sure you want to delete, ${selectedBooking.id}`,
        visibile: true,
        onClickYes: () => handleDelete(selectedBooking.id),
        isDeleting,
      })
    );
  };

  const columns: GridColDef[] = [
    {
      renderHeader: (props) => {
        return <CustomHeader title="Booking #" {...props} />;
      },
      field: "id",
      width: 170,
      align: "left",
      sort: "desc",
    } as GridColDef,

    {
      renderHeader: (props) => {
        return <CustomHeader title="Check In" {...props} />;
      },
      field: "check_in",
      width: 165,
      align: "left",
    } as GridColDef,
    {
      renderHeader: (props) => {
        return <CustomHeader title="Check Out" {...props} />;
      },
      field: "check_out",
      width: 165,
      align: "left",
    } as GridColDef,
    {
      renderHeader: (props) => {
        return <CustomHeader title="Total Fee" {...props} />;
      },
      renderCell: (params: GridCellParams) => {
        return (
          <div>{`${params.value} ${
            branch.default_currency ? branch.default_currency : ""
          }`}</div>
        );
      },
      field: "total_fee",
      width: 180,
      align: "left",
    } as GridColDef,
    {
      renderHeader: (props) => {
        return <CustomHeader title="Rooms" {...props} />;
      },
      field: "service_rooms",
      width: 160,
      align: "left",
    } as GridColDef,
    {
      renderHeader: (props) => {
        return <CustomHeader title="Created By" {...props} />;
      },
      field: "created_by",
      width: 170,
      align: "left",
    } as GridColDef,
    {
      renderHeader: (props) => {
        return <CustomHeader title="Status" {...props} />;
      },
      renderCell: (params: GridCellParams) => {
        return <div>{`${params.value === "new" ? "Open" : "Close"}`}</div>;
      },
      field: "status",
      width: 134,
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
        return <HeaderTag>Option</HeaderTag>;
      },
      field: "option",
      width: 150,
      align: "left",
      renderCell: (params: GridCellParams) => {
        return (
          <PointerDiv>
            {params.row.status === "closed" ? (
              <OptionButton
                backgroundColor={COLORS.WHITE_100}
                colorX={COLORS.GREEN_THEME}
                borderColor={COLORS.GREEN_THEME}
                onClick={() => handleOpenModal(params.id)}
              >
                Closed
              </OptionButton>
            ) : (
              <OptionButton
                backgroundColor={COLORS.WHITE_100}
                colorX={COLORS.THEME_COLOR}
                borderColor={COLORS.THEME_COLOR}
                onClick={() => handleOpenModal(params.id)}
              >
                Edit
              </OptionButton>
            )}

            {/* <OptionButton
              backgroundColor={COLORS.WHITE_100}
              colorX={COLORS.RED_100}
              borderColor={COLORS.RED_100}
              onClick={() => handleDeleteButton(params.row)}
              style={{ display: "none" }}
            >
              Delete
            </OptionButton> */}
          </PointerDiv>
        );
      },
    } as GridColDef,
  ];
  let bookingData = [];

  if (role === IRole.SUPER_ADMIN) {
    bookingData = allBooking?.filter((data: IBookings) => {
      return data.branch_name === selectedBranchSuperAdmin;
    });
  } else {
    bookingData = allBooking;
  }

  return (
    <StyleGrid item md={11.5} sm={11} xs={11}>
      <Paper elevation={5}>
        <DataGridStyle
          initialState={{
            sorting: {
              sortModel: [{ field: 'id', sort: 'desc' }],
            },
          }}
          autoHeight={true}
          columns={columns}
          checkboxSelection={false}
          rows={bookingData}
          disableColumnMenu={true}
          disableRowSelectionOnClick={true}
          loading={allBookingPending}
          slots={{
            toolbar: CustomToolbar,
            noRowsOverlay: CustomNoRowsOverlay,
          }}
        />
      </Paper>
    </StyleGrid>
  );
}
