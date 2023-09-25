import FieldInput from "@/components/core/FieldInput";
import ButtonX from "@/components/core/Button";
import { Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTypedHooks";
import { getAppDataSelector } from "@/store/app";
import { branchSettingModel } from "@/validations/branchSettingModel";
import {
  Container,
  LebalHeading,
  BoxStyle,
  ImageDiv,
  StyledButton,
  BoxForm,
  ModelBotton,
} from "./index.styles";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { IBranchs } from "@/store/app/types";
import { ToastMsg } from "@/components/core/ToastMsg";
import { getBranch, updateBranch } from "@/services/app/branchSetting";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { convertToBase64 } from "@/utils/index";
import { DivLoad } from "@/components/core/DivLoad";
import { getAuthDataSelector } from "@/store/auth";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import CurrencyDropDown from "@/components/core/CurrencyDropDown";
import {
  getDefaultCurrency,
  setBranchData,
  setSelectedBranch,
} from "@/store/app/appSlice";

export default function BranchsComponent() {
  const { selectedBranchs, branch } = useAppSelector(getAppDataSelector);
  const dispatch = useAppDispatch();
  const hiddenFileInput = React.useRef<any>();
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [iBranchData, setIBranchData] = React.useState<any>();
  const [address, setAddress] = React.useState<any>();
  const router = useRouter();
  const {
    user: { branch_id },
  } = useSelector(getAuthDataSelector);
  useEffect(() => {
    const fetchData = async () => {
      const resp = await getBranch(branch_id);
      setIBranchData(resp);
      setAddress(resp.address);
      if (resp.id) {
        setSelectedBranch(resp);
      }
      return resp;
    };
    fetchData();
  }, []);

  const onFormSubmit = async (values: IBranchs) => {
    try {
      let obj = { ...values };
      (obj.id = branch_id.toString()),
        (obj.phone = obj.phone?.toString()),
        (obj.image = obj.image ? obj.image : "");
      obj.address = obj.address ? obj.address : "";
      let resp;
      resp = await updateBranch(obj);
      if (selectedBranchs.id) {
        setIsSubmitting(true);
        handleCloseModel();
      }
      if (resp) {
        setIsSubmitting(false);
        dispatch(setBranchData(resp));
        toast(
          <ToastMsg
            description={`Branch ${resp.name} ${
              branch_id ? "Updated" : "Created"
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
  const onChange = (event: any) => {
    setIBranchData(event.target.value);
  };

  const handleCloseModel = () => {};
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
  console.log({ branch });
  return (
    <>
      <Container container>
        <Formik
          initialValues={{
            id: branch_id?.toString(),
            name: branch.name,
            phone: branch.phone,
            address: branch.address,
            image: branch.image,
            default_currency: branch.default_currency,
          }}
          validationSchema={() => branchSettingModel}
          onSubmit={onFormSubmit}
        >
          {({ errors, touched, values, setFieldValue }) => {
            console.log({ errors, values });

            return (
              <Form onChange={onChange}>
                <Grid item md={12} xs={12}>
                  <BoxStyle>
                    <Grid item md={12} xs={12}>
                      <div className="btn-style">
                        <LebalHeading>Branch Images</LebalHeading>
                        <StyledButton onClick={handleClick}>
                          Choose File
                        </StyledButton>
                      </div>
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <ImageDiv>
                        <div className="btn-choose">
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
                          <img
                            src={
                              iBranchData?.image
                                ? iBranchData.image
                                : values.image
                                ? values.image
                                : "/svgs/addItem.svg"
                            }
                            width={
                              iBranchData?.image || values.image ? "100%" : 60
                            }
                            height={
                              iBranchData?.image || values.image ? 350 : 60
                            }
                            alt="image"
                            className="image-style"
                          />
                        </div>
                      </ImageDiv>
                    </Grid>
                  </BoxStyle>
                </Grid>
                <BoxForm container>
                  <Grid
                    container
                    spacing={{ xs: 1, md: 4 }}
                    padding={{ xs: 2, md: 2 }}
                  >
                    <Grid item md={6} xs={12}>
                      <div className="input_width">
                        <LebalHeading>Branch Id</LebalHeading>
                        <Field
                          as={FieldInput}
                          id="branch-id"
                          name="id"
                          value={branch_id}
                          disabled
                          placeholder="Enter Branch Id"
                          error={errors.name && touched.name ? true : false}
                          helperText={<ErrorMessage name="name" />}
                        />
                      </div>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <div className="input_width">
                        <LebalHeading>Branch Name</LebalHeading>
                        <Field
                          as={FieldInput}
                          id="branch-name"
                          name="branch"
                          value={iBranchData?.name}
                          disabled
                          placeholder="Enter Branch Name"
                          error={errors.name && touched.name ? true : false}
                          helperText={<ErrorMessage name="name" />}
                        />
                      </div>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <div className="input_width">
                        <LebalHeading>Branch Phone</LebalHeading>
                        <Field
                          id="phone"
                          name="phone"
                          placeholder="Enter branch Phones"
                          type="number"
                          as={FieldInput}
                          value={iBranchData?.phone}
                          error={errors.phone && touched.phone ? true : false}
                          helperText={<ErrorMessage name="phone" />}
                        />
                      </div>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <div className="input_width">
                        <LebalHeading>Branch Address</LebalHeading>
                        <Field
                          id="adress"
                          name="address"
                          placeholder="Enter Branch Address"
                          type="string"
                          value={iBranchData?.address}
                          as={FieldInput}
                          error={
                            errors.address && touched.address ? true : false
                          }
                          helperText={<ErrorMessage name="address" />}
                        />
                      </div>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <div className="input_width">
                        <LebalHeading>Branch Currancy</LebalHeading>
                        <Field
                          id="default_currency"
                          name="default_currency"
                          placeholder="Enter Branch Currency"
                          as={CurrencyDropDown}
                          value={branch?.default_currency}
                          setFieldValue={setFieldValue}
                          error={
                            errors.default_currency && touched.default_currency
                              ? true
                              : false
                          }
                          helperText={<ErrorMessage name="gender" />}
                        />
                      </div>
                    </Grid>
                    <ModelBotton>
                      <div className="row">
                        <ButtonX
                          className="btn-close"
                          onClick={(e) => {
                            e.preventDefault();
                            router.push("/dashboard");
                          }}
                        >
                          Close
                        </ButtonX>
                        <ButtonX isHover className="btn-save" type="submit">
                          <DivLoad
                            isSubmitting={isSubmitting}
                            content="Saving"
                            text={"Save Changes"}
                          />
                        </ButtonX>
                      </div>
                    </ModelBotton>
                  </Grid>
                </BoxForm>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </>
  );
}
