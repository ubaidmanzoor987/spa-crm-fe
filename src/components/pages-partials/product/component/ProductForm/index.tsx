import Image from "next/image";
import { getAppDataSelector } from "@/store/app";
import ButtonX from "@/components/core/Button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import FieldInput from "@/components/core/FieldInput";
import { Fade, Grid } from "@mui/material";

import { getAuthDataSelector } from "@/store/auth";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTypedHooks";
import { IBranchs, IProduct } from "@/store/app/types";
import { toast } from "react-toastify";
import {
  getAllProductsThunk,
  handleOpenProductModal,
  setSelectedProduct,
} from "@/store/app/appSlice";
import { productModel } from "@/validations/productModel";
import React from "react";
import { DivLoad } from "@/components/core/DivLoad";
import { addNewProduct, updateProduct } from "@/services/app/products";
import { convertToBase64 } from "@/utils/index";
import {
  FlexCol,
  LebalHeading,
  DivFlexRow,
  ModelBotton,
  BoxStyle,
  DivFlex,
  H1,
  StyledDivider,
  StyledButton,
  ImageModel,
  StyledBranchDropDown,
} from "../index.styles";
import { ToastMsg } from "@/components/core/ToastMsg";
import BranchesDropDown from "@/components/core/BranchesDropDown";
import { AppState } from "@/store/rootReducer";
import { IRole } from "@/store/auth/types";
export default function ProductForm() {
  const role = useAppSelector((state: AppState) => state.auth.user.role);
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const hiddenFileInput = React.useRef<any>();
  const { selectedProduct, allProducts, openProductModal, branch, allBranchs } =
    useAppSelector(getAppDataSelector);
  const {
    user: { branch_id },
  } = useAppSelector(getAuthDataSelector);

  const onFormSubmit = async (values: IProduct) => {
    try {
      let obj = { ...values };
      obj.image = obj.image ? obj.image : "";
      obj.description = obj.description ? obj.description : "";
      if (role === IRole.SUPER_ADMIN) {
        obj.branch_id = obj.branch_id
          ? Number(obj.branch_id)
          : Number(branch_id);
      } else {
        obj.branch_id = Number(branch_id);
      }
      let resp;

      if (selectedProduct.id) {
        setIsSubmitting(true);
        resp = await updateProduct(obj);
        dispatch(getAllProductsThunk());
        handleCloseModel();
      } else {
        setIsSubmitting(true);
        resp = await addNewProduct(obj);
        dispatch(getAllProductsThunk());
        handleCloseModel();
      }
      if (resp && resp.id) {
        setIsSubmitting(false);
        toast(
          <ToastMsg
            description={`Product ${obj.name} ${
              selectedProduct.id ? "Updated" : "Created"
            } Successfully`}
          />,
          {
            autoClose: 5000,
            type: "success",
            icon: false,
          }
        );

        dispatch(getAllProductsThunk());
        handleCloseModel();
      }
    } catch (err) {
      setIsSubmitting(false);
      toast(
        <ToastMsg
          description={
            `Error` +
            `Unable to ${selectedProduct.id ? "update" : "add"} ${
              values.name
            } due to ${err}`
          }
        />,
        {
          autoClose: 5000,
          type: "error",
          icon: false,
        }
      );
    }
  };

  const handleCloseModel = () => {
    dispatch(setSelectedProduct({} as IProduct));
    dispatch(handleOpenProductModal(false));
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChangeImage = async (
    event: Event,
    setFieldValue: (a: string, b: string | ArrayBuffer) => void
  ) => {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    const f = input.files[0];
    if (f) {
      const imgBase64 = await convertToBase64(f);
      if (imgBase64.length) {
        setFieldValue("image", imgBase64);
      }
    }
  };
  const branchToShow = allBranchs.filter((branch: IBranchs) => {
    return branch.id === selectedProduct.branch_id;
  });

  return (
    <Fade in={openProductModal}>
      <BoxStyle>
        <DivFlex>
          <H1>
            {" "}
            {selectedProduct.id
              ? `Edit Room | ${selectedProduct.name}`
              : "Add New Product"}
          </H1>
          <div className="Poiner" onClick={handleCloseModel}>
            <Image src={"/svgs/cancel.svg"} height={20} width={20} />
          </div>
        </DivFlex>
        <StyledDivider />
        <Formik
          initialValues={{
            id: selectedProduct.id,
            name: selectedProduct.name,
            price: selectedProduct.price,
            description: selectedProduct.description,
            image: selectedProduct.image,
            branch_id: selectedProduct.branch_id,
          }}
          validationSchema={() => productModel}
          onSubmit={onFormSubmit}
        >
          {({ errors, touched, isValid, dirty, values, setFieldValue }) => {
            return (
              <div style={{ marginTop: "1.5rem" }}>
                <Form>
                  <Grid
                    container
                    spacing={{ xs: 1, md: 4 }}
                    padding={{ xs: 2, md: 2 }}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Grid item md={5} sm={12}>
                      <ImageModel>
                        <div className="portion row">
                          <LebalHeading>Image</LebalHeading>

                          <div className="btn-choose">
                            <img
                              src={
                                values.image
                                  ? values.image
                                  : "/svgs/addItem.svg"
                              }
                              width={values.image ? "100%" : 50}
                              height={values.image ? 200 : 50}
                              alt="image"
                              className="image-style"
                            />
                          </div>
                          <div>
                            <StyledButton onClick={handleClick}>
                              Choose File
                              <input
                                ref={hiddenFileInput}
                                hidden
                                accept="image/*"
                                multiple
                                type="file"
                                name="image"
                                id="image"
                                onChange={(event) => {
                                  // @ts-ignore
                                  handleChangeImage(event, setFieldValue);
                                }}
                              />
                            </StyledButton>
                          </div>
                        </div>
                      </ImageModel>
                    </Grid>
                    <Grid item md={7} sm={12}>
                      <DivFlexRow>
                        <FlexCol>
                          <div className="input_width">
                            <LebalHeading>Name:</LebalHeading>
                            <Field
                              as={FieldInput}
                              id="name"
                              name="name"
                              placeholder="Enter new Name"
                              error={errors.name && touched.name ? true : false}
                              helperText={<ErrorMessage name="name" />}
                            />
                          </div>
                          <FlexCol>
                            <div className="input_width">
                              <LebalHeading>Price</LebalHeading>
                              <Field
                                id="price"
                                name="price"
                                placeholder="Enter new Price"
                                type="number"
                                isEndContent={branch.default_currency}
                                defaultValue={0}
                                as={FieldInput}
                                error={
                                  errors.price && touched.price ? true : false
                                }
                                helperText={<ErrorMessage name="price" />}
                              />
                            </div>
                          </FlexCol>
                          <FlexCol>
                            <div className="input_width">
                              <LebalHeading>Description</LebalHeading>
                              <Field
                                as={FieldInput}
                                id="description"
                                name="description"
                                placeholder="Enter new Description"
                                helperText={<ErrorMessage name="description" />}
                              />
                            </div>
                          </FlexCol>
                        </FlexCol>
                      </DivFlexRow>
                    </Grid>
                  </Grid>
                  <Grid>
                    {role === IRole.SUPER_ADMIN && (
                      <StyledBranchDropDown>
                        <LebalHeading>Branch:</LebalHeading>
                        <Field
                          as={BranchesDropDown}
                          id="branch_id"
                          name="branch_id"
                          placeholder="Select Branch"
                          initalBranch={branchToShow[0]?.name}
                          isCenter={true}
                          setFieldValue={setFieldValue}
                          helperText={<ErrorMessage name="Branch" />}
                        />
                      </StyledBranchDropDown>
                    )}
                  </Grid>
                  <ModelBotton>
                    <div className="row">
                      <ButtonX className="btn-close" onClick={handleCloseModel}>
                        Close
                      </ButtonX>
                      <ButtonX
                        className="btn-save"
                        disabled={!(dirty && isValid)}
                        type="submit"
                      >
                        <DivLoad
                          isSubmitting={isSubmitting}
                          content="Saving"
                          text={"Save Changes"}
                        />
                      </ButtonX>
                    </div>
                  </ModelBotton>
                </Form>
              </div>
            );
          }}
        </Formik>
      </BoxStyle>
    </Fade>
  );
}
