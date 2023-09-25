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
  GridLayoutStyle,
} from "../index.styles";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTypedHooks";
import { handleOpenProductModal } from "@/store/app";
import { IProduct } from "@/store/app/types";
import { deleteProduct } from "@/services/app/products";
import {
  getAllProductsThunk,
  setDeleteModal,
  setSelectedProduct,
} from "@/store/app/appSlice";
import { useEffect, useState } from "react";
import CustomNoRowsOverlay from "@/components/core/NoRowsOverLay";
import { Avatar, Grid } from "@mui/material";
import { COLORS } from "@/constants/colors";
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

export default function ProductTable() {
  const { allProducts, allProductsPending,selectedBranchSuperAdmin} =
    useAppSelector(getAppDataSelector);
  const role = useAppSelector((state: AppState) => state.auth.user.role);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleOpenModal = (id: string | number) => {
    const ind = allProducts.findIndex((product: IProduct) => product.id === id);
    if (ind > -1) {
      const product = allProducts[ind];
      dispatch(handleOpenProductModal(true));
      dispatch(setSelectedProduct(product));
    }
  };
  useEffect(() => {
    getAllProductsThunk();
  }, []);

  const handleDelete = async (id: string | number) => {
    try {
      const resp = await deleteProduct(id.toString());
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
            description={`Product ${resp.name} Deleted Successfully  `}
          />,
          {
            autoClose: 5000,
            type: "success",
            icon: false,
          }
        );

        dispatch(getAllProductsThunk());
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

  const handleDeleteButton = (selectedProduct: IProduct) => {
    dispatch(
      setDeleteModal({
        title: "Delete Product",
        description: `Are you sure you want to delete, ${selectedProduct.name} ?`,
        visibile: true,
        onClickYes: () => handleDelete(selectedProduct.id),
        isDeleting,
      })
    );
  };

  const columns: GridColDef[] = [
    {
      renderHeader: (props) => {
        return <CustomHeader title="Product ID" {...props} />;
      },
      field: "id",
      width: 200,
      align: "left",
    },
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
        return <CustomHeader title="Description" {...props} />;
      },
      field: "description",
      width: 400,
      align: "left",
    } as GridColDef,
    {
      renderHeader: (props) => {
        return <CustomHeader title="Price" {...props} />;
      },
      field: "price",
      width: 150,
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
  let productData = [];

  if (role === IRole.SUPER_ADMIN) {
    productData = allProducts?.filter((data: IProduct) => {
      return data.branch_name === selectedBranchSuperAdmin;
    });
  } else {
    productData = allProducts;
  }
  return (
    <StyleGrid item md={11.5} sm={11} xs={11}>
      <Paper elevation={5}>
        <DataGridStyle
          autoHeight={true}
          columns={columns}
          checkboxSelection={false}
          rows={productData}
          disableColumnMenu={true}
          disableRowSelectionOnClick={true}
          loading={allProductsPending}
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
