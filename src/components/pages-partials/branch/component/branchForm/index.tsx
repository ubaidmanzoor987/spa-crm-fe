import Image from "next/image";
import { getAppDataSelector } from "@/store/app";
import ButtonX from "@/components/core/Button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import FieldInput from "@/components/core/FieldInput";
import { Fade, Grid } from "@mui/material";
import { getAuthDataSelector } from "@/store/auth";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTypedHooks";
import { IBranchs } from "@/store/app/types";
import { toast } from "react-toastify";
import {
  getAllBranchThunk,
  handleOpenBranchModal,
  setSelectedBranch,
} from "@/store/app/appSlice";
import React from "react";
import { DivLoad } from "@/components/core/DivLoad";
import { addNewBranch, updateBranch } from "@/services/app/branchSetting";
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
} from "../index.styles";
import { ToastMsg } from "@/components/core/ToastMsg";
import { branchModel } from "@/validations/branchModel";
import CurrencyDropDown from "@/components/core/CurrencyDropDown";

export default function BranchForm() {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const hiddenFileInput = React.useRef<any>();
  const { selectedBranchs, openBranchModel } =
    useAppSelector(getAppDataSelector);
  const {
    user: { branch_id },
  } = useAppSelector(getAuthDataSelector);
  const onFormSubmit = async (values: IBranchs) => {
    try {
      let obj = { ...values };
      obj.image = obj.image ? obj.image : "";
      obj.address = obj.address ? obj.address : "";
      selectedBranchs.id ? (obj.id = obj.id.toString()) : "";
      obj.phone = obj.phone.toString();
      let resp;
      if (selectedBranchs.id) {
        setIsSubmitting(true);
        resp = await updateBranch(obj);
        dispatch(getAllBranchThunk());
        handleCloseModel();
      } else {
        setIsSubmitting(true);
        resp = await addNewBranch(obj);
        dispatch(getAllBranchThunk());
        handleCloseModel();
      }
      if (resp && resp) {
        setIsSubmitting(false);
        toast(
          <ToastMsg
            description={`Branch ${obj.name} ${
              selectedBranchs.id ? "Updated" : "Created"
            } Successfully`}
          />,
          {
            autoClose: 5000,
            type: "success",
            icon: false,
          }
        );

        handleCloseModel();
      }
    } catch (err) {
      setIsSubmitting(false);
      toast(
        <ToastMsg
          description={
            `Error` +
            `Unable to ${selectedBranchs.id ? "update" : "add"} ${
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
    dispatch(setSelectedBranch({} as IBranchs));

    dispatch(handleOpenBranchModal(false));
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
  return (
    <Fade in={openBranchModel}>
      <BoxStyle>
        <DivFlex>
          <H1>
            {" "}
            {selectedBranchs.id
              ? `Edit Branch | ${selectedBranchs.name}`
              : "Add New Branch"}
          </H1>
          <div className="Poiner" onClick={handleCloseModel}>
            <Image src={"/svgs/cancel.svg"} height={20} width={20} />
          </div>
        </DivFlex>
        <StyledDivider />
        <Formik
          initialValues={{
            id: selectedBranchs.id,
            name: selectedBranchs.name,
            phone: selectedBranchs.phone,
            address: selectedBranchs.address,
            default_currency: selectedBranchs.default_currency,
            image: selectedBranchs.image,
          }}
          validationSchema={() => branchModel}
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
                              <LebalHeading>Phone</LebalHeading>
                              <Field
                                id="phone"
                                name="phone"
                                placeholder="Enter new Phone Number"
                                type="number"
                                as={FieldInput}
                                error={
                                  errors.phone && touched.phone ? true : false
                                }
                                helperText={<ErrorMessage name="price" />}
                              />
                            </div>
                          </FlexCol>
                          <FlexCol>
                            <div className="input_width">
                              <LebalHeading>Adress</LebalHeading>
                              <Field
                                as={FieldInput}
                                id="address"
                                name="address"
                                placeholder="Enter new Address"
                                helperText={<ErrorMessage name="address" />}
                              />
                            </div>
                          </FlexCol>
                          <FlexCol>
                            <div className="input_width">
                              <LebalHeading>Currency</LebalHeading>
                              <Field
                                as={CurrencyDropDown}
                                value={values.default_currency}
                                fromBranches={selectedBranchs.default_currency}
                                setFieldValue={setFieldValue}
                                id="default_currency"
                                name="default_currency"
                                placeholder="Enter new Currency"
                                helperText={
                                  <ErrorMessage name="default_currency" />
                                }
                              />
                            </div>
                          </FlexCol>
                        </FlexCol>
                      </DivFlexRow>
                      <ModelBotton>
                        <div className="row">
                          <ButtonX
                            className="btn-close"
                            onClick={handleCloseModel}
                          >
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
                    </Grid>
                  </Grid>
                </Form>
              </div>
            );
          }}
        </Formik>
      </BoxStyle>
    </Fade>
  );
}
