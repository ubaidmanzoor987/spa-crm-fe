import Image from "next/image";
import { getAppDataSelector, handleOpenServiceModal } from "@/store/app";
import ButtonX from "@/components/core/Button";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import FieldInput from "@/components/core/FieldInput";
import { serviceModel } from "@/validations/serviceModel";
import { Fade, Grid, Paper } from "@mui/material";

import {
  FlexCol,
  LebalHeading,
  DivFlexRow,
  ModelBotton,
  BoxStyle,
  DivFlex,
  H1,
  StyledDivider,
  LebalSmall,
  DivMain,
  StyledBranchDropDown,
} from "../index.styles";
import AmenitiesDropDown from "@/components/core/AmenitiesDropDown";
import { addNewService, updateService } from "@/services/app/services";
import { getAuthDataSelector } from "@/store/auth";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTypedHooks";
import { IBranchs, IService, IServiceDurationPrice } from "@/store/app/types";
import { toast } from "react-toastify";
import { getAllServicesThunk, setSelectedService } from "@/store/app/appSlice";
import React from "react";
import { DivLoad } from "@/components/core/DivLoad";
import { ToastMsg } from "@/components/core/ToastMsg";
import BranchesDropDown from "@/components/core/BranchesDropDown";
import { IRole } from "@/store/auth/types";
import { AppState } from "@/store/rootReducer";

export default function ServicesForm() {
  const role = useAppSelector((state: AppState) => state.auth.user.role);
  const dispatch = useAppDispatch();
  const { selectedService, openServiceModal, branch,allBranchs } =
    useAppSelector(getAppDataSelector);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const {
    user: { branch_id },
  } = useAppSelector(getAuthDataSelector);

  const onFormSubmit = async (values: IService) => {
    try {
      let obj = { ...values };
      obj.actual_price = obj.service_duration_price[0].price.toString();
      if (role === IRole.SUPER_ADMIN) {
        obj.branch_id = obj.branch_id
          ? Number(obj.branch_id)
          : Number(branch_id);
      } else {
        obj.branch_id = Number(branch_id);
      }
      obj.required_therapist = obj.required_therapist.toString();
      obj.duration = JSON.stringify(values.service_duration_price) as string;
      let resp;
      if (selectedService.id) {
        setIsSubmitting(true);
        resp = await updateService(obj);
      } else {
        setIsSubmitting(true);
        resp = await addNewService(obj);
      }
      if (resp && resp.id) {
        setIsSubmitting(false);
        toast(
          <ToastMsg
            description={`Service ${obj.name} ${
              selectedService.id ? "Updated" : "Created"
            } Successfully`}
          />,
          {
            autoClose: 5000,
            type: "success",
            icon: false,
          }
        );
        dispatch(getAllServicesThunk());
        handleCloseModel();
      }
    } catch (err) {
      setIsSubmitting(false);
      toast(
        <ToastMsg
          description={`Unable to ${selectedService.id ? "update" : "add"} ${
            values.name
          } due to ${err}`}
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
    dispatch(setSelectedService({} as IService));
    dispatch(handleOpenServiceModal(false));
  };
  const initialValues = {
    name: selectedService.name,
    amenitiesId: selectedService.amenitiesId ?? [],
    actual_price: selectedService.actual_price,
    required_therapist: selectedService.required_therapist,
    id: selectedService.id,
    branch_id:selectedService.branch_id,
    service_duration_price:
      selectedService.service_duration_price ??
      ([{}] as IServiceDurationPrice[]),
  };
  const branchToShow = allBranchs.filter((branch: IBranchs) => {
    return branch.id === selectedService.branch_id;
  });
  return (
    <Fade in={openServiceModal}>
      <BoxStyle>
        <DivFlex>
          <H1>
            {" "}
            {selectedService.id
              ? `Edit Service | ${selectedService.name}`
              : "Add New Services"}
          </H1>
          <div className="Poiner" onClick={handleCloseModel}>
            <Image src={"/svgs/cancel.svg"} height={20} width={20} />
          </div>
        </DivFlex>
        <StyledDivider />
        <Formik
          initialValues={initialValues}
          validationSchema={() => serviceModel}
          onSubmit={onFormSubmit}
        >
          {({
            errors,
            touched,
            isValid,
            dirty,
            values,
            setFieldValue,
          }: any) => {
            console.log({ errors, values });
            return (
              <DivMain>
                <Form>
                  <DivFlexRow>
                    <FlexCol>
                      <div className="input_width">
                        <LebalHeading>Service Name:</LebalHeading>
                        <Field
                          as={FieldInput}
                          id="name"
                          name="name"
                          placeholder="Service Name"
                          error={errors.name && touched.name ? true : false}
                          helperText={<ErrorMessage name="name" />}
                        />
                      </div>
                    </FlexCol>

                    <FlexCol>
                      <LebalHeading>Required Therapists:</LebalHeading>
                      <div className="input_width">
                        <Field
                          as={FieldInput}
                          id="required_therapist"
                          name="required_therapist"
                          placeholder="Enter number of Therapists Required"
                          defaultValue={0}
                          error={
                            errors.required_therapist &&
                            touched.required_therapist
                              ? true
                              : false
                          }
                          helperText={
                            <ErrorMessage name="required_therapist" />
                          }
                          type="number"
                        />
                      </div>
                    </FlexCol>
                  </DivFlexRow>
                  <DivFlexRow>
                    <FlexCol>
                      <div className="input_width">
                        <LebalHeading>Amenities:</LebalHeading>
                        <Field
                          name="amenitiesId"
                          id="amenitiesId"
                          setFieldValue={setFieldValue}
                          as={AmenitiesDropDown}
                          initialAmenitiesFromServices={
                            initialValues.amenitiesId
                          }
                          selectedService={selectedService}
                          error={
                            errors.amenitiesId && touched.amenitiesId
                              ? true
                              : false
                          }
                        />
                        <div className="error">
                          <ErrorMessage name="amenitiesId" />
                        </div>
                      </div>
                    </FlexCol>
                  </DivFlexRow>
                  <FieldArray
                    name="service_duration_price"
                    render={(arrayHelpers) => (
                      <DivFlexRow>
                        <FlexCol>
                          <Grid
                            item
                            xs={12}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <LebalHeading className="theme_color">
                              Service Duration(s):
                            </LebalHeading>
                            <ModelBotton>
                              <ButtonX
                                className="btn-add-service"
                                borderColor={""}
                                onClick={() => arrayHelpers.push({})}
                              >
                                + Add Service Duration
                              </ButtonX>
                            </ModelBotton>
                          </Grid>
                          {values.service_duration_price &&
                            values.service_duration_price.map(
                              (_: IServiceDurationPrice, index: number) => (
                                <Paper
                                  elevation={3}
                                  key={index}
                                  style={{ marginTop: 15, padding: "14px" }}
                                >
                                  <Grid
                                    container
                                    spacing={{ xs: 1, md: 3 }}
                                    padding={{ xs: 2, md: 2 }}
                                  >
                                    <Grid item md={6} xs={12}>
                                      <LebalHeading>
                                        Service Duration{" "}
                                        <LebalSmall>
                                          &nbsp;(in minutes)
                                        </LebalSmall>
                                        :
                                      </LebalHeading>

                                      <Field
                                        as={FieldInput}
                                        isEndContent="minutes"
                                        id={`service_duration_price.${index}.duration`}
                                        name={`service_duration_price.${index}.duration`}
                                        type="number"
                                        defaultValue={0}
                                        error={
                                          touched.service_duration_price &&
                                          errors.service_duration_price &&
                                          errors.service_duration_price[
                                            index
                                          ] &&
                                          errors.service_duration_price[index]
                                            .duration
                                            ? true
                                            : false
                                        }
                                        helperText={
                                          <ErrorMessage
                                            name={`service_duration_price.${index}.duration`}
                                          />
                                        }
                                      />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                      <LebalHeading>Price:</LebalHeading>
                                      <div className="input_width">
                                        <Field
                                          as={FieldInput}
                                          isEndContent={branch.default_currency}
                                          id={`service_duration_price.${index}.price`}
                                          name={`service_duration_price.${index}.price`}
                                          defaultValue={0}
                                          error={
                                            touched.service_duration_price &&
                                            errors.service_duration_price &&
                                            errors.service_duration_price[
                                              index
                                            ] &&
                                            errors.service_duration_price[index]
                                              .price
                                              ? true
                                              : false
                                          }
                                          helperText={
                                            <ErrorMessage
                                              name={`service_duration_price.${index}.price`}
                                            />
                                          }
                                          type="number"
                                        />
                                      </div>
                                    </Grid>
                                  </Grid>
                                  <Grid
                                    item
                                    xs={12}
                                    container
                                    justifyContent="flex-end"
                                  >
                                    <ModelBotton>
                                      <ButtonX
                                        className="btn-remove"
                                        borderColor={""}
                                        onClick={() =>
                                          arrayHelpers.remove(index)
                                        }
                                      >
                                        Remove
                                      </ButtonX>
                                    </ModelBotton>
                                  </Grid>
                                </Paper>
                              )
                            )}
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
                        </FlexCol>
                      </DivFlexRow>
                    )}
                  />
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
              </DivMain>
            );
          }}
        </Formik>
      </BoxStyle>
    </Fade>
  );
}
