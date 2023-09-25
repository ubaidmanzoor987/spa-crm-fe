import Image from "next/image";
import { getAppDataSelector } from "@/store/app";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";
import { ToastMsg } from "@/components/core/ToastMsg";
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
} from "../index.styles";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTypedHooks";
import { deleteBranch } from "@/services/app/branchSetting";
import {
  getAllBranchThunk,
  handleOpenBranchModal,
  setDeleteModal,
  setSelectedBranch,
} from "@/store/app/appSlice";
import { useEffect, useState } from "react";
import CustomNoRowsOverlay from "@/components/core/NoRowsOverLay";
import { Avatar } from "@mui/material";
import { IBranchs } from "@/store/app/types";

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
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function BranchTable() {
  const { allBranchs, allBranchsPending } = useAppSelector(getAppDataSelector);
  const { selectedBranchs, openBranchModel } =
    useAppSelector(getAppDataSelector);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleOpenModal = (id: string | number) => {
    const ind = allBranchs.findIndex((branch: IBranchs) => branch.id === id);
    if (ind > -1) {
      const branch = allBranchs[ind];
      dispatch(handleOpenBranchModal(true));
      dispatch(setSelectedBranch(branch));
    }
  };
  useEffect(() => {
    getAllBranchThunk();
  }, []);

  const handleDelete = async (id: string | number) => {
    try {
      const resp = await deleteBranch(id.toString());
      if (resp) {
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

        toast(
          <ToastMsg
            description={`Branch ${resp.name} Deleted Successfully  `}
          />,
          {
            autoClose: 5000,
            type: "success",
            icon: false,
          }
        );

        dispatch(getAllBranchThunk());
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

  const handleDeleteButton = (selectedBranchs: IBranchs) => {
    dispatch(
      setDeleteModal({
        title: "Delete Branch",
        description: `Are you sure you want to delete, ${selectedBranchs.name} ?`,
        visibile: true,
        onClickYes: () => handleDelete(selectedBranchs.id),
        isDeleting,
      })
    );
  };

  const columns: GridColDef[] = [
    {
      renderHeader: (props) => {
        return <CustomHeader title="Id" {...props} />;
      },
      field: "branch_id",
      width: 150,
      align: "left",
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
      field: "image",
      width: 150,
      align: "left",
    } as GridColDef,
    {
      renderHeader: (props) => {
        return <CustomHeader title="Name" {...props} />;
      },
      field: "name",
      width: 250,
      align: "left",
    } as GridColDef,
    {
      renderHeader: (props) => {
        return <CustomHeader title="Phone" {...props} />;
      },
      field: "phone",
      width: 250,
      align: "left",
    } as GridColDef,
    {
      renderHeader: (props) => {
        return <CustomHeader title="Address" {...props} />;
      },
      field: "address",
      width: 150,
      align: "left",
    } as GridColDef,
    {
      renderHeader: (props) => {
        return <CustomHeader title="Currency" {...props} />;
      },
      field: "default_currency",
      width: 150,
      align: "left",
    } as GridColDef,
    {
      renderHeader: (props) => {
        return <HeaderTag>Options</HeaderTag>;
      },
      field: "option",
      width: 250,
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
  return (
    <StyleGrid item md={11.5} sm={11} xs={11}>
      <Paper elevation={5}>
        <DataGridStyle
          autoHeight={true}
          columns={columns}
          checkboxSelection={false}
          rows={allBranchs}
          disableColumnMenu={true}
          disableRowSelectionOnClick={true}
          loading={allBranchsPending}
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
