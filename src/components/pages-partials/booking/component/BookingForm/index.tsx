import Image from "next/image";
import { getAppDataSelector } from "@/store/app";
import ButtonX from "@/components/core/Button";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import FieldInput from "@/components/core/FieldInput";
import React, { useEffect } from "react";
import { DivLoad } from "@/components/core/DivLoad";
import {
  addNewBooking,
  updateBooking,
  updateBookingStatus,
} from "@/services/app/booking";
import CustomerSearchField from "@/components/core/CustomerSearchField";

import ServiseDropDown from "@/components/core/ServiseDropDown";
import RoomDropDown from "@/components/core/RoomDropDown";
import TherapsitDropDown from "@/components/core/TherapsitDropDown";
import { COLORS } from "@/constants/colors";
import {
  Checkbox,
  Fade,
  Grid,
  Paper,
  TextareaAutosize,
  Avatar,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTypedHooks";
import {
  IBooking,
  IBookingService,
  IBranchs,
  IProduct_detail,
  IService,
  IServiceDurationPrice,
  IStaff,
} from "@/store/app/types";
import {
  getAllBookingsThunk,
  handleOpenBookingModel,
  setSelectedBooking,
} from "@/store/app/appSlice";
import { bookingModal } from "@/validations/bookingModal";
import { toast } from "react-toastify";
import {
  FlexCol,
  LebalHeading,
  DivFlexRow,
  ModelBotton,
  BoxStyle,
  DivFlex,
  H1,
  StyledDivider,
  DivFlexCol,
  TableStyle,
  TrStyle,
  TrDataStyle,
  TdStyle,
  DivHeading,
  Anchor,
  StyledTextArea,
  LebalHeadingSide,
  LebalHeadingCheck,
  LebalHeadingMain,
  StyledBranchDropDown,
} from "../index.style";
import moment from "moment";
import ProductsDropDown from "@/components/core/ProductsDropDown";
import { DivPrintText } from "@/components/core/DivPrintText";
import DurationDropDown from "@/components/core/DurationDropDown";
import { ToastMsg } from "@/components/core/ToastMsg";
import { getAuthDataSelector } from "@/store/auth";
import BranchesDropDown from "@/components/core/BranchesDropDown";
import { IRole } from "@/store/auth/types";
import { AppState } from "@/store/rootReducer";

export default function BookingForm() {
  const role = useAppSelector((state: AppState) => state.auth.user.role);
  const dispatch = useAppDispatch();
  const {
    selectedBooking,
    openBookingModel,
    allRooms,
    allTherapist,
    allServices,
    allBranchs,
    branch,
  } = useAppSelector(getAppDataSelector);

  const {
    user: { branch_id },
  } = useAppSelector(getAuthDataSelector);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [isCompleteBooking, setIsCompleteBooking] =
    React.useState<boolean>(false);

  const onFormSubmit = async (values: IBooking) => {
    let obj = { ...values };

    try {
      if (
        (obj.cash_payment != null &&
          obj.card_payment != null &&
          Number(obj.cash_payment) <= Number(obj.total_fee) &&
          Number(obj.card_payment) <= Number(obj.total_fee) &&
          (Number(obj.cash_payment) || 0) + (Number(obj.card_payment) || 0) ===
            Number(obj.total_fee)) ||
        obj.cash_payment === undefined ||
        obj.card_payment === undefined
      ) {
        if (role === IRole.SUPER_ADMIN) {
          obj.branch_id = obj.branch_id
            ? Number(obj.branch_id)
            : Number(branch_id);
        } else {
          obj.branch_id = Number(branch_id);
        }

        obj.is_driver_commission = obj.is_driver_commission?.toString();
        if (obj.is_driver_commission && obj.is_driver_commission.length >= 3) {
          obj.is_driver_commission = "true";
        } else {
          obj.is_driver_commission = "false";
        }

        obj.is_other_commission = obj.is_other_commission?.toString();
        if (obj.is_other_commission && obj.is_other_commission.length >= 3) {
          obj.is_other_commission = "true";
        } else {
          obj.is_other_commission = "false";
        }

        const updatedServiceDetail = obj.service_detail.map((Servtime) => {
          return {
            ...Servtime,
            end_time: handleTimeOut(
              Servtime.start_time,
              Servtime.selected_duration
            ),
          };
        });
        obj.service_detail = updatedServiceDetail;

        obj.payment_method = obj.payment_method?.toString();
        obj.status =
          obj.status === undefined
            ? "new"
            : isCompleteBooking
            ? "close"
            : selectedBooking.status;
        let resp;
        if (selectedBooking.id) {
          setIsSubmitting(true);

          resp = await updateBooking(obj);
        } else {
          setIsSubmitting(true);
          resp = await addNewBooking(obj);
          dispatch(getAllBookingsThunk());
          handleCloseModel();
        }
        if (resp && resp.id) {
          setIsSubmitting(false);
          toast(
            <ToastMsg
              description={`Booking ${resp.id} ${
                selectedBooking.id ? "Updated" : "Created"
              } Successfully`}
            />,
            {
              autoClose: 5000,
              type: "success",
              icon: false,
            }
          );

          dispatch(getAllBookingsThunk());
          handleCloseModel();
        }
      } else {
        toast(<ToastMsg description={`Please Enter Valid Paid Amount`} />, {
          autoClose: 5000,
          type: "error",
          icon: false,
        });
        return;
      }
    } catch (err) {
      setIsSubmitting(false);
      toast(
        <ToastMsg
          description={`Unable to ${selectedBooking.id ? "update" : "add"} ${
            values.id
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
  const getTherapistName = (id: any) => {
    const therapist = allTherapist.find((data: IStaff) => data.id === id);
    return `${therapist?.first_name} ${therapist?.last_name}`;
  };

  const getRequiredTherapist = (id: any) => {
    const service = allServices.find((data: IService) => data.id === id);
    return service?.required_therapist;
  };

  const handleCloseModel = () => {
    dispatch(setSelectedBooking({} as IBooking));
    if (isCompleteBooking) {
    }
    dispatch(handleOpenBookingModel(false));
  };

  const handleCompleteBooking = async (values: any, e: any) => {
    // e.preventDefault();
    if (values.cash_payment?.length > 0 || values.card_payment?.length > 0) {
      setIsCompleteBooking(true);
      // try {
      //   let resp;
      //   if (selectedBooking && selectedBooking.id) {
      //     resp = await updateBookingStatus({
      //       id: selectedBooking.id,
      //       cash_payment: values.cash_payment,
      //       card_payment: values.card_payment,
      //       status: "close",
      //     });
      //     dispatch(getAllBookingsThunk());
      //     handleCloseModel();
      //   }

      //   if (resp && resp.id) {
      //     toast(
      //       <ToastMsg
      //         description={`Booking ${resp.id} completed
      //          Successfully`}
      //       />,
      //       {
      //         autoClose: 5000,
      //         type: "success",
      //         icon: false,
      //       }
      //     );

      //     dispatch(getAllBookingsThunk());
      //     handleCloseModel();
      //   }
      // } catch (err) {
      //   setIsSubmitting(false);
      //   toast(
      //     <ToastMsg
      //       description={`Unable to Complete Booking ${selectedBooking.id} due to ${err}`}
      //     />,
      //     {
      //       autoClose: 5000,
      //       type: "error",
      //       icon: false,
      //     }
      //   );
      // }
    } else {
      e.preventDefault();
      toast(<ToastMsg description={`Please Enter Payment Details`} />, {
        autoClose: 5000,
        type: "error",
        icon: false,
      });
      return;
    }
  };
  const getTherapistCommissions = (therapistsCommissions: any[]) => {
    let commission: number = 0;

    therapistsCommissions?.map((data) => {
      commission =
        commission +
        Number(data?.commission === undefined ? 0 : data?.commission);
    });
    return commission;
  };

  const TherapistFields = (props: any) => {
    const {
      values,
      index,
      errors,
      touched,
      setFieldValue,
      setFieldTouched,
      uniquesTherapists,
    } = props;

    return (
      <>
        <Grid item md={6} xs={12}>
          <LebalHeadingMain>
            <LebalHeading>Therapist</LebalHeading>
            <LebalHeading>
              ( Required &nbsp;
              {getRequiredTherapist(values.service_detail[index]?.service_id)})
            </LebalHeading>
          </LebalHeadingMain>
          <Field
            name={`service_detail.${index}.therapists`}
            as={TherapsitDropDown}
            selectedTherapists={values.service_detail[index].therapists}
            selectedOptionalTherapists={
              values.service_detail[index]
                .optional_therapists
            }
            therapists_commission={values.therapists_commission}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            uniquesTherapists={uniquesTherapists}
            required_therapists={getRequiredTherapist(
              values.service_detail[index]?.service_id
            )}
            error={
              errors.service_detail &&
              errors.service_detail[index] &&
              errors.service_detail[index] &&
              errors.service_detail[index]["therapists"] &&
              touched.service_detail &&
              touched.service_detail[index] &&
              touched.service_detail[index]["therapists"]
                ? true
                : false
            }
            variant="outlined"
            helperText={<ErrorMessage name="therapists" />}
            index={index}
            // {...props}
          />
        </Grid>
      </>
    );
  };

  useEffect(() => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    const minDate = yyyy + "-" + mm + "-" + dd;
    document.getElementById("date_time")?.setAttribute("min", minDate);
  }, []);

  const handleTimeOut = (
    time: any,
    duration: number,
    nextServ?: number,
    setter?: any
  ) => {
    const initialTime = moment(time, "HH:mm");
    const resultTime = initialTime.add(duration, "minutes");
    const data = resultTime.format("HH:mm");
    return data;
  };

  const isThirdPartDisabled = (roomId: number) => {
    const ind = allRooms.findIndex((room:any) => room.id === roomId);
    if (ind > -1) {
      const room = allRooms[ind];
      return room.is_third_party === "true" ? true : false;
    }
    return false;
  };

  const isCommissionDisabled = (value: string[]) => {
    if (
      (value && value.length > 0 && value.length > 1) ||
      (value[0] === "yes" &&
        value.length > 0 &&
        selectedBooking.is_other_commission &&
        selectedBooking.is_other_commission.length > 0 &&
        selectedBooking.is_other_commission.length > 1) ||
      (value[0] === "yes" &&
        value.length > 0 &&
        selectedBooking.is_driver_commission &&
        selectedBooking.is_driver_commission.length > 0 &&
        selectedBooking.is_driver_commission.length > 1)
    ) {
      return false;
    }
    return true;
  };
  const initialValues = {
    id: selectedBooking.id,
    services_fee: selectedBooking.services_fee,
    products_fee: selectedBooking.products_fee,
    total_fee: selectedBooking.total_fee,
    cash_payment: selectedBooking.cash_payment
      ? selectedBooking.cash_payment
      : "0",
    card_payment: selectedBooking.card_payment
      ? selectedBooking.card_payment
      : "0",
    branch_id: selectedBooking.branch_id,
    cutomer_id: selectedBooking.cutomer_id,
    date_time: moment(selectedBooking.date_time).format("YYYY-MM-DD"),
    discount: selectedBooking.discount,
    is_driver_commission: selectedBooking.is_driver_commission
      ? selectedBooking.is_driver_commission === "true"
        ? ["yes"]
        : ["no"]
      : ["no"],
    is_other_commission: selectedBooking.is_other_commission
      ? selectedBooking.is_other_commission === "true"
        ? ["yes"]
        : ["no"]
      : ["no"],
    paid_price: selectedBooking.paid_price,
    payment_method: selectedBooking.payment_method,
    remarks: selectedBooking.remarks,
    status: selectedBooking.status,
    service_detail: selectedBooking.service_detail
      ? selectedBooking.service_detail
      : ([{}] as IBookingService[]),
    customer_detail: selectedBooking.customer_detail,
    driver_commission: selectedBooking.driver_commission,
    other_commission: selectedBooking.other_commission,
    product_detail: selectedBooking.product_detail,
    // ? selectedBooking.product_detail
    // : ([{}] as IProduct_detail[]),
    tips: selectedBooking.tips,
    therapists_commission: selectedBooking.therapists_commission,
  };
  const branchToShow = allBranchs.filter((branch: IBranchs) => {
    return branch.id === selectedBooking.branch_id;
  });
  return (
    <Fade in={openBookingModel}>
      <BoxStyle>
        <DivFlex>
          <Anchor href={`/print/${selectedBooking.id}`} target="_blank">
            <DivPrintText text="Print" />
          </Anchor>
          <H1>
            {" "}
            {selectedBooking.id
              ? selectedBooking.status === "close"
                ? `Closed Booking | ${selectedBooking.id}`
                : `Edit Booking | ${selectedBooking.id}`
              : "Add New Booking"}
          </H1>
          <div className="Poiner" onClick={handleCloseModel}>
            <Image src={"/svgs/cancel.svg"} height={20} width={20} />
          </div>
        </DivFlex>
        {/* <StyledDivider /> */}
        <Formik
          initialValues={initialValues}
          validationSchema={() => bookingModal}
          onSubmit={onFormSubmit}
        >
          {({
            errors,
            touched,
            isValid,
            dirty,
            setFieldValue,
            setFieldTouched,
            values,
          }: any) => {
            console.log({ errors, values });
            let uniquesTherapists: Array<string> = [];
            values.service_detail.forEach((element: IBookingService) => {
              if (element.therapists && element.therapists.length > 0) {
                element.therapists.forEach((tp: string) => {
                  const elem = uniquesTherapists.find((v) => v === tp);
                  if (!elem) {
                    uniquesTherapists.push(tp);
                  }
                });
              }
            });

            return (
              <div style={{ marginTop: "1.5rem" }}>
                <Form
                  style={{
                    pointerEvents:
                      selectedBooking.status === "close" ? "none" : "initial",
                    opacity: selectedBooking.status === "close" ? "0.6" : "1",
                  }}
                >
                  <DivFlexRow>
                    <FlexCol>
                      <DivHeading>
                        <LebalHeading className="theme_color">
                          Booking Info:
                        </LebalHeading>
                      </DivHeading>
                      <Paper
                        elevation={3}
                        style={{ marginTop: 15, padding: "14px" }}
                      >
                        <Grid
                          container
                          spacing={{ xs: 1, md: 4 }}
                          padding={{ xs: 2, md: 2 }}
                        >
                          <Grid item md={6} xs={12}>
                            <LebalHeading>Booking ID:</LebalHeading>
                            <Field
                              as={FieldInput}
                              id="id"
                              name="id"
                              placeholder="000255"
                              disabled
                              helperText={<ErrorMessage name="id" />}
                            />
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <LebalHeading>Day:</LebalHeading>
                            <Field
                              as={FieldInput}
                              id="date_time"
                              name="date_time"
                              disabled={
                                selectedBooking?.status === "close"
                                  ? true
                                  : false
                              }
                              error={
                                errors.date_time && touched.date_time
                                  ? true
                                  : false
                              }
                              variant="outlined"
                              type="date"
                              helperText={<ErrorMessage name="date_time" />}
                            />
                          </Grid>
                        </Grid>
                      </Paper>
                    </FlexCol>
                  </DivFlexRow>
                  <div
                  // style={{
                  //   pointerEvents:
                  //     selectedBooking.status === "close" ? "none" : "initial",
                  //   opacity: selectedBooking.status === "close" ? "0.6" : "1",
                  // }}
                  >
                    <DivFlexRow>
                      <FlexCol>
                        <LebalHeading className="theme_color">
                          Client Info:
                        </LebalHeading>
                        <Paper
                          elevation={3}
                          style={{ marginTop: 15, padding: "14px" }}
                        >
                          <Grid
                            container
                            spacing={{ xs: 1, md: 3 }}
                            padding={{ xs: 2, md: 2 }}
                          >
                            <Grid item md={6} xs={12}>
                              <LebalHeading>Client Phone Number:</LebalHeading>
                              <Field
                                as={CustomerSearchField}
                                setFieldValue={setFieldValue}
                                value={selectedBooking.customer_detail}
                                isEdit={selectedBooking.id ? true : false}
                                type="number"
                              />

                              <div className="error">
                                {/* {errors?.customer_detail?.phone
                                ? errors?.customer_detail?.phone
                                : ""} */}
                                <ErrorMessage name="customer_detail.phone" />
                              </div>
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <LebalHeading>Client Name:</LebalHeading>
                              <Field
                                as={FieldInput}
                                id="customer_detail.name"
                                name="customer_detail.name"
                                placeholder="Enter Name"
                                error={
                                  errors.customer_detail &&
                                  errors.customer_detail.name &&
                                  touched.customer_detail &&
                                  touched.customer_detail.name
                                    ? true
                                    : false
                                }
                                helperText={
                                  <ErrorMessage name="customer_detail.name" />
                                }
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <LebalHeading>Client Email:</LebalHeading>
                              <Field
                                as={FieldInput}
                                id="customer_detail.email"
                                name="customer_detail.email"
                                placeholder="Enter Email"
                                error={
                                  errors.customer_detail &&
                                  errors.customer_detail.email &&
                                  touched.customer_detail &&
                                  touched.customer_detail.email
                                    ? true
                                    : false
                                }
                                helperText={
                                  <ErrorMessage name="customer_detail.email" />
                                }
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <LebalHeading>Client Address:</LebalHeading>
                              <Field
                                as={FieldInput}
                                id="customer_detail.street_address"
                                name="customer_detail.street_address"
                                placeholder="Enter Address"
                              />
                            </Grid>
                          </Grid>
                        </Paper>
                      </FlexCol>
                    </DivFlexRow>
                    <FieldArray
                      name="service_detail"
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
                                Services:
                              </LebalHeading>
                              <ModelBotton>
                                <ButtonX
                                  className="btn-add-service"
                                  borderColor={""}
                                  onClick={() => arrayHelpers.push({})}
                                >
                                  + New Service
                                </ButtonX>
                              </ModelBotton>
                            </Grid>
                            {values.service_detail &&
                            values.service_detail.length > 0 ? (
                              values.service_detail.map(
                                (_: IBookingService, index: number) => (
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
                                        <LebalHeading>Service:</LebalHeading>
                                        <Field
                                          validateOnChange
                                          name={`service_detail.${index}.service_id`}
                                          as={ServiseDropDown}
                                          error={
                                            errors.service_detail &&
                                            errors.service_detail[index] &&
                                            errors.service_detail[index]
                                              .service_id &&
                                            touched.service_detail &&
                                            touched.service_detail[index] &&
                                            touched.service_detail[index]
                                              .service_id
                                              ? true
                                              : false
                                          }
                                          isEdit={
                                            selectedBooking.id ? true : false
                                          }
                                          helperText={
                                            <ErrorMessage
                                              name={`service_detail.${index}.service_id`}
                                            />
                                          }
                                        />
                                      </Grid>
                                      <Grid item md={6} xs={12}>
                                        <Grid container columnSpacing={2}>
                                          <Grid item xs={6}>
                                            <LebalHeading>
                                              Duration:
                                            </LebalHeading>
                                            <Field
                                              name={`service_detail.${index}.selected_duration`}
                                              id={`service_detail.${index}.selected_duration`}
                                              as={DurationDropDown}
                                              serviceID={
                                                values?.service_detail[index]
                                                  .service_id
                                              }
                                              duration={
                                                values?.service_detail[index]
                                                  .selected_duration
                                              }
                                              selectedBooking={selectedBooking}
                                              discount={
                                                values.discount &&
                                                values.discount
                                              }
                                              nextIndex={
                                                values.service_detail.length >
                                                index
                                                  ? index + 1
                                                  : null
                                              }
                                              endTime={handleTimeOut(
                                                values.service_detail[index]
                                                  .start_time,
                                                values?.service_detail[index]
                                                  .selected_duration,
                                                values.service_detail &&
                                                  values.service_detail[
                                                    index
                                                  ] &&
                                                  values.service_detail[
                                                    index + 1
                                                  ]
                                                  ? values.service_detail[
                                                      index + 1
                                                    ]
                                                  : null,
                                                setFieldValue
                                              )}
                                              setFieldValue={setFieldValue}
                                              index={index}
                                              error={
                                                errors.service_detail &&
                                                errors.service_detail[index] &&
                                                errors.service_detail[index]
                                                  .selected_duration &&
                                                touched.service_detail &&
                                                touched.service_detail[index] &&
                                                touched.service_detail[index]
                                                  .selected_duration
                                                  ? true
                                                  : false
                                              }
                                              isEdit={
                                                selectedBooking.id
                                                  ? true
                                                  : false
                                              }
                                              helperText={
                                                <ErrorMessage name="selected_duration" />
                                              }
                                              {...values}
                                            />
                                          </Grid>
                                          <Grid item xs={6}>
                                            <LebalHeading>Price:</LebalHeading>

                                            <Field
                                              name={`service_detail.${index}.selected_price`}
                                              id={`service_detail.${index}.selected_price`}
                                              as={FieldInput}
                                              isEndContent={
                                                branch.default_currency
                                              }
                                              // disabled
                                              error={
                                                errors.service_detail &&
                                                errors.service_detail[index] &&
                                                errors.service_detail[index]
                                                  .selected_price &&
                                                touched.service_detail &&
                                                touched.service_detail[index] &&
                                                touched.service_detail[index]
                                                  .selected_price
                                                  ? true
                                                  : false
                                              }
                                              isEdit={
                                                selectedBooking.id
                                                  ? true
                                                  : false
                                              }
                                              helperText={
                                                <ErrorMessage name="selected_price" />
                                              }
                                            />
                                          </Grid>
                                        </Grid>
                                      </Grid>

                                      <TherapistFields
                                        values={values}
                                        index={index}
                                        errors={errors}
                                        touched={touched}
                                        setFieldValue={setFieldValue}
                                        setFieldTouched={setFieldTouched}
                                        uniquesTherapists={uniquesTherapists}
                                      />

                                      <Grid item md={6} xs={12}>
                                        <Grid container columnSpacing={2}>
                                          <Grid item xs={6}>
                                            <LebalHeading>
                                              Start Time:
                                            </LebalHeading>
                                            <Field
                                              as={FieldInput}
                                              id={`service_detail.${index}.start_time`}
                                              name={`service_detail.${index}.start_time`}
                                              error={
                                                errors.service_detail &&
                                                errors.service_detail[index] &&
                                                errors.service_detail[index]
                                                  .start_time
                                                  ? true
                                                  : false
                                              }
                                              type="time"
                                              helperText={
                                                <ErrorMessage
                                                  name={`service_detail.${index}.start_time`}
                                                />
                                              }
                                            />
                                          </Grid>
                                          <Grid item xs={6}>
                                            <LebalHeading>
                                              End Time:
                                            </LebalHeading>
                                            <Field
                                              as={FieldInput}
                                              id={`service_detail.${index}.end_time`}
                                              name={`service_detail.${index}.end_time`}
                                              // duration={
                                              //   values?.service_detail[index]
                                              //     .selected_duration
                                              // }
                                              value={handleTimeOut(
                                                values.service_detail[index]
                                                  .start_time,
                                                values?.service_detail[index]
                                                  .selected_duration,
                                                values.service_detail &&
                                                  values.service_detail[
                                                    index
                                                  ] &&
                                                  values.service_detail[
                                                    index + 1
                                                  ]
                                                  ? values.service_detail[
                                                      index + 1
                                                    ]
                                                  : null,
                                                setFieldValue
                                              )}
                                              disabled
                                              error={
                                                errors.service_detail &&
                                                errors.service_detail[index] &&
                                                errors.service_detail[index]
                                                  .end_time
                                                  ? true
                                                  : false
                                              }
                                              type="time"
                                              helperText={
                                                <ErrorMessage
                                                  name={`service_detail.${index}.end_time`}
                                                />
                                              }
                                            />
                                          </Grid>
                                        </Grid>
                                      </Grid>

                                      <Grid item md={6} xs={12}>
                                        <LebalHeading>
                                          Available Room:
                                        </LebalHeading>
                                        <Field
                                          name={`service_detail.${index}.room_id`}
                                          as={RoomDropDown}
                                          error={
                                            errors.service_detail &&
                                            errors.service_detail[index] &&
                                            errors.service_detail[index]
                                              .room_id &&
                                            touched.service_detail &&
                                            touched.service_detail[index] &&
                                            touched.service_detail[index]
                                              .room_id
                                              ? true
                                              : false
                                          }
                                          isEdit={
                                            selectedBooking.id ? true : false
                                          }
                                          helperText={
                                            <ErrorMessage name="room_id" />
                                          }
                                        />
                                      </Grid>
                                      <Grid item md={6} xs={12}>
                                        <LebalHeading>
                                          Optional Therapist
                                        </LebalHeading>
                                        <Field
                                          name={`service_detail.${index}.optional_therapists`}
                                          as={TherapsitDropDown}
                                          value={values?.optional_therapists}
                                          isOptional={true}
                                          selectedTherapists={
                                            values.service_detail[index]
                                              .therapists
                                          }
                                          selectedOptionalTherapists={
                                            values.service_detail[index]
                                              .optional_therapists
                                          }
                                          indexSingle={index}
                                          therapists_commission={
                                            values.therapists_commission
                                          }
                                          uniquesTherapists={uniquesTherapists}
                                          setFieldValue={setFieldValue}
                                          error={
                                            errors.service_detail &&
                                            errors.service_detail[index] &&
                                            errors.service_detail[index] &&
                                            errors.service_detail[index][
                                              "optional_therapists"
                                            ] &&
                                            touched.service_detail &&
                                            touched.service_detail[index] &&
                                            touched.service_detail[index][
                                              "optional_therapists"
                                            ]
                                              ? true
                                              : false
                                          }
                                          variant="outlined"
                                          helperText={
                                            <ErrorMessage name="optional_therapists" />
                                          }
                                        />
                                      </Grid>
                                      {isThirdPartDisabled(
                                        values.service_detail &&
                                          values.service_detail[index] &&
                                          values.service_detail[index].room_id
                                          ? values.service_detail[index].room_id
                                          : -1
                                      ) && (
                                        <Grid item md={6} xs={12}>
                                          <LebalHeading>
                                            3rd Party Room Commission:
                                          </LebalHeading>
                                          <Field
                                            as={FieldInput}
                                            id="third_party_commission"
                                            name={`service_detail.${index}.third_party_commission`}
                                            error={
                                              errors.service_detail &&
                                              errors.service_detail[index] &&
                                              errors.service_detail[index]
                                                .third_party_commission
                                                ? true
                                                : false
                                            }
                                            helperText={
                                              <ErrorMessage
                                                name={`service_detail.${index}.third_party_commission`}
                                              />
                                            }
                                          />
                                        </Grid>
                                      )}
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
                              )
                            ) : (
                              <span
                                style={{ color: COLORS.RED_100, fontSize: 10 }}
                              >
                                At least one service is Required
                              </span>
                            )}
                          </FlexCol>
                        </DivFlexRow>
                      )}
                    />

                    <FieldArray
                      name="product_detail"
                      render={(aHelpers) => (
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
                                Products:
                              </LebalHeading>
                              <ModelBotton>
                                <ButtonX
                                  className="btn-add-service"
                                  borderColor={""}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    aHelpers.push({});
                                  }}
                                >
                                  + Product
                                </ButtonX>
                              </ModelBotton>
                            </Grid>
                            {values.product_detail &&
                            values.product_detail.length > 0 ? (
                              values.product_detail.map(
                                (_: IBookingService, index: number) => (
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
                                        <LebalHeading>Product</LebalHeading>
                                        <Field
                                          validateOnChange
                                          // name={`product_detail.${index}`}
                                          name={`product_detail.${index}.product_id`}
                                          id={`product_detail.${index}.product_id`}
                                          as={ProductsDropDown}
                                          setFieldValue={setFieldValue}
                                          index={index}
                                          productId={
                                            values.product_detail &&
                                            values.product_detail[index] &&
                                            values.product_detail[index]
                                              .product_id
                                          }
                                          error={
                                            errors.service_detail &&
                                            errors.service_detail[index] &&
                                            errors.service_detail[index]
                                              .service_id &&
                                            touched.service_detail &&
                                            touched.service_detail[index] &&
                                            touched.service_detail[index]
                                              .service_id
                                              ? true
                                              : false
                                          }
                                          isEdit={
                                            selectedBooking.id ? true : false
                                          }
                                          helperText={
                                            <ErrorMessage
                                              name={`service_detail.${index}.service_id`}
                                            />
                                          }
                                        />
                                      </Grid>
                                      <Grid item md={6} xs={12}>
                                        <LebalHeading>Price</LebalHeading>
                                        <Field
                                          validateOnChange
                                          // name={`product_detail.${index}`}
                                          name={`product_detail.${index}.product_price`}
                                          as={FieldInput}
                                          isEndContent={branch.default_currency}
                                          setFieldValue={setFieldValue}
                                          // disabled
                                          index={index}
                                          error={
                                            errors.service_detail &&
                                            errors.service_detail[index] &&
                                            errors.service_detail[index]
                                              .service_id &&
                                            touched.service_detail &&
                                            touched.service_detail[index] &&
                                            touched.service_detail[index]
                                              .service_id
                                              ? true
                                              : false
                                          }
                                          isEdit={
                                            selectedBooking.id ? true : false
                                          }
                                          helperText={
                                            <ErrorMessage
                                              name={`service_detail.${index}.service_id`}
                                            />
                                          }
                                        />
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
                                          onClick={() => {
                                            values.service_detail &&
                                              values.service_detail.length ===
                                                0;
                                            aHelpers.remove(index);
                                          }}
                                        >
                                          Remove
                                        </ButtonX>
                                      </ModelBotton>
                                    </Grid>
                                  </Paper>
                                )
                              )
                            ) : (
                              <span
                                style={{ color: COLORS.RED_100, fontSize: 10 }}
                              ></span>
                            )}
                          </FlexCol>
                        </DivFlexRow>
                      )}
                    />

                    {uniquesTherapists?.length > 0 && (
                      <DivFlexRow>
                        <FlexCol>
                          <LebalHeading className="theme_color">
                            Therapist(s) Commission:
                          </LebalHeading>
                          <Paper
                            elevation={3}
                            style={{ marginTop: 15, padding: "14px" }}
                          >
                            <Grid
                              container
                              spacing={{ xs: 1, md: 3 }}
                              padding={{ xs: 2, md: 2 }}
                            >
                              <Grid item xs={12}>
                                <TableStyle>
                                  <TrStyle>
                                    <Grid
                                      container
                                      spacing={{ xs: 1, md: 3 }}
                                      padding={{ xs: 2, md: 2 }}
                                    >
                                      <Grid
                                        item
                                        md={3}
                                        xs={12}
                                        container
                                        alignItems={"center"}
                                      >
                                        {" "}
                                        <th>Image</th>
                                      </Grid>

                                      <Grid
                                        item
                                        md={3}
                                        xs={12}
                                        container
                                        style={{ paddingLeft: "18px" }}
                                        alignItems={"center"}
                                      >
                                        {" "}
                                        <th>Name</th>
                                      </Grid>
                                      <Grid
                                        item
                                        md={6}
                                        xs={12}
                                        container
                                        style={{ paddingLeft: "18px" }}
                                        alignItems={"center"}
                                      >
                                        <th>Commission Amount</th>
                                      </Grid>
                                    </Grid>
                                  </TrStyle>

                                  {uniquesTherapists?.map(
                                    (therapistId: any, index: any) => {
                                      return (
                                        <TrStyle>
                                          <Grid
                                            container
                                            spacing={{ xs: 1, md: 3 }}
                                            padding={{ xs: 2, md: 2 }}
                                          >
                                            <Grid
                                              item
                                              md={3}
                                              xs={12}
                                              container
                                              alignItems={"center"}
                                            >
                                              {" "}
                                              <Avatar
                                              // src={tip.user.profile_picture}
                                              />
                                            </Grid>

                                            <Grid
                                              item
                                              md={3}
                                              xs={12}
                                              container
                                              style={{
                                                paddingLeft: "18px",
                                              }}
                                              alignItems={"center"}
                                            >
                                              {getTherapistName(therapistId)}
                                            </Grid>
                                            <Grid
                                              item
                                              md={6}
                                              xs={12}
                                              container
                                              style={{
                                                paddingLeft: "18px",
                                              }}
                                              alignItems={"center"}
                                            >
                                              {" "}
                                              <Field
                                                as={FieldInput}
                                                value={
                                                  values.therapists_commission[
                                                    index
                                                  ]?.commission
                                                    ? values
                                                        .therapists_commission[
                                                        index
                                                      ]?.commission
                                                    : 0
                                                }
                                                // value={0}
                                                onChange={(e: any) => {
                                                  setFieldValue(
                                                    `therapists_commission.${index}.commission`,
                                                    e.target.value
                                                  );
                                                  setFieldValue(
                                                    `therapists_commission.${index}.id`,
                                                    therapistId
                                                  );
                                                }}
                                                id="`therapists.${index}.commission`"
                                                isEndContent={
                                                  branch.default_currency
                                                }
                                                placeholder="0"
                                                name={`therapists_commission.${index}.commission`}
                                              />
                                            </Grid>
                                          </Grid>
                                        </TrStyle>
                                      );
                                    }
                                  )}
                                </TableStyle>
                              </Grid>
                            </Grid>
                          </Paper>
                        </FlexCol>
                      </DivFlexRow>
                    )}
                    <DivFlexRow>
                      <FlexCol>
                        <LebalHeadingSide className="theme_color">
                          Payment Info:
                        </LebalHeadingSide>
                        <Paper
                          elevation={3}
                          style={{ marginTop: 15, padding: "14px" }}
                        >
                          <Grid
                            container
                            spacing={{ xs: 1, md: 3 }}
                            padding={{ xs: 2, md: 2 }}
                          >
                            <Grid item md={6} xs={12}>
                              <LebalHeadingSide>
                                Total Service(s) Fee:
                              </LebalHeadingSide>
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <Field
                                as={FieldInput}
                                isEndContent={branch.default_currency}
                                id="services_fee"
                                name="services_fee"
                                placeholder=""
                                disabled
                                helperText={
                                  <ErrorMessage name="services_fee" />
                                }
                                error={
                                  errors.services_fee && touched.services_fee
                                    ? true
                                    : false
                                }
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <LebalHeadingSide>
                                Total Product(s) Fee:
                              </LebalHeadingSide>
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <Field
                                as={FieldInput}
                                isEndContent={branch.default_currency}
                                id="products_fee"
                                name="products_fee"
                                placeholder=""
                                disabled
                                helperText={
                                  <ErrorMessage name="products_fee" />
                                }
                                error={
                                  errors.products_fee && touched.products_fee
                                    ? true
                                    : false
                                }
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <LebalHeadingSide>Discount(%):</LebalHeadingSide>
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <Field
                                as={FieldInput}
                                id="discount"
                                isEndContent={branch.default_currency}
                                name="discount"
                                placeholder="Enter Discount "
                                defaultValue="0"
                                type="number"
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <LebalHeadingSide>Total Fee:</LebalHeadingSide>
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <Field
                                as={FieldInput}
                                isEndContent={branch.default_currency}
                                id="total_fee"
                                name="total_fee"
                                disabled
                                placeholder=""
                                error={
                                  errors.total_fee && touched.total_fee
                                    ? true
                                    : false
                                }
                                helperText={<ErrorMessage name="total_fee" />}
                                variant="outlined"
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <LebalHeadingSide>
                                Paid with Cash:
                              </LebalHeadingSide>
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <Field
                                as={FieldInput}
                                id="cash_payment "
                                isEndContent={branch.default_currency}
                                name="cash_payment"
                                placeholder="Enter Cash Payment"
                                defaultValue={0}
                                type="number"
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <LebalHeadingSide>
                                Paid with Card:
                              </LebalHeadingSide>
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <Field
                                as={FieldInput}
                                id="card_payment"
                                isEndContent={branch.default_currency}
                                name="card_payment"
                                placeholder="Enter Card Payment"
                                defaultValue={0}
                                type="number"
                              />
                            </Grid>

                            <Grid
                              item
                              md={6}
                              xs={12}
                              container
                              style={{ paddingLeft: "5px" }}
                              alignItems={"center"}
                            >
                              <Field
                                as={Checkbox}
                                disabled={false}
                                type="checkbox"
                                name="is_driver_commission"
                                id="is_driver_commission"
                                value="yes"
                                color="success"
                              />
                              <LebalHeadingCheck>
                                Taxi Driver Commission:
                              </LebalHeadingCheck>
                            </Grid>
                            <Grid
                              item
                              md={6}
                              xs={12}
                              container
                              alignItems={"center"}
                            >
                              <Field
                                disabled={isCommissionDisabled(
                                  values.is_driver_commission
                                )}
                                as={FieldInput}
                                isEndContent={branch.default_currency}
                                id="driver_commission"
                                name="driver_commission"
                                defaultValue="0"
                                type="number"
                                placeholder="0"
                                error={
                                  errors.driver_commission &&
                                  touched.driver_commission
                                    ? true
                                    : false
                                }
                                helperText={
                                  <ErrorMessage name="driver_commission" />
                                }
                              />
                            </Grid>
                            <Grid
                              item
                              md={6}
                              xs={12}
                              container
                              style={{ paddingLeft: "5px" }}
                              alignItems={"center"}
                            >
                              <Field
                                as={Checkbox}
                                defaultChecked
                                type="checkbox"
                                name="is_other_commission"
                                value="yes"
                                color="success"
                              />
                              <LebalHeadingCheck>
                                Other Commission:
                              </LebalHeadingCheck>
                            </Grid>
                            <Grid
                              item
                              md={6}
                              xs={12}
                              container
                              alignItems={"center"}
                            >
                              {" "}
                              <Field
                                disabled={isCommissionDisabled(
                                  values.is_other_commission
                                )}
                                as={FieldInput}
                                isEndContent={branch.default_currency}
                                id="other_commission"
                                name="other_commission"
                                defaultValue="0"
                                placeholder="0"
                                type="number"
                                error={
                                  errors.other_commission &&
                                  touched.other_commission
                                    ? true
                                    : false
                                }
                                helperText={
                                  <ErrorMessage name="other_commission" />
                                }
                              />
                            </Grid>
                            <Grid
                              item
                              md={6}
                              xs={12}
                              container
                              style={{ paddingLeft: "18px" }}
                              alignItems={"center"}
                            >
                              <LebalHeadingCheck>
                                Total Therapist(s) Commission:
                              </LebalHeadingCheck>
                            </Grid>
                            <Grid
                              item
                              md={6}
                              xs={12}
                              container
                              alignItems={"center"}
                            >
                              <Field
                                disabled
                                as={FieldInput}
                                isEndContent={branch.default_currency}
                                id="total_therapist_commission"
                                name="total_therapist_commission"
                                defaultValue={0}
                                value={
                                  getTherapistCommissions(
                                    values?.therapists_commission
                                  )
                                  // "0"
                                  // values.therapists_commission.reduce((acc, therapist) => {
                                  //   return acc + parseInt(therapist.commission);
                                  // }, 0);

                                  // parseInt(
                                  //   values.other_commission
                                  //     ? values.other_commission
                                  //     : "0",
                                  //   10
                                  // ) +
                                  // parseInt(
                                  //   values.driver_commission
                                  //     ? values.driver_commission
                                  //     : "0",
                                  //   10
                                  // )
                                }
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <LebalHeadingSide>
                                Total Commission:
                              </LebalHeadingSide>
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <Field
                                as={FieldInput}
                                isEndContent={branch.default_currency}
                                id="total_commission"
                                name="total_commission"
                                placeholder="0"
                                disabled
                                value={
                                  parseInt(
                                    values.other_commission
                                      ? values.other_commission
                                      : "0",
                                    10
                                  ) +
                                  parseInt(
                                    values.driver_commission
                                      ? values.driver_commission
                                      : "0",
                                    10
                                  ) +
                                  getTherapistCommissions(
                                    values?.therapists_commission
                                  )
                                }
                                error={
                                  errors.total_commission &&
                                  touched.total_commission
                                    ? true
                                    : false
                                }
                                helperText={
                                  <ErrorMessage name="total_commission" />
                                }
                                variant="outlined"
                              />
                            </Grid>
                            {/* {selectedBooking.id && (
                            <> */}

                            {/* </>
                          )} */}
                          </Grid>
                        </Paper>
                      </FlexCol>
                    </DivFlexRow>

                    <Grid
                      container
                      spacing={{ xs: 1, md: 3 }}
                      paddingX={{ xs: 4 }}
                      paddingBottom={{ xs: 5 }}
                    >
                      <Grid item xs={12}>
                        <LebalHeading>Details:</LebalHeading>
                        <StyledTextArea
                          fullWidth
                          as={TextareaAutosize}
                          id="remarks"
                          name="remarks"
                          minRows={8}
                          helperText={<ErrorMessage name={`remarks`} />}
                        />
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
                    {selectedBooking.id &&
                      selectedBooking.tips &&
                      selectedBooking.tips?.length > 0 && (
                        <DivFlexRow>
                          <FlexCol>
                            <LebalHeading className="theme_color">
                              Tip:
                            </LebalHeading>
                            <Paper
                              elevation={3}
                              style={{ marginTop: 15, padding: "14px" }}
                            >
                              <Grid
                                container
                                spacing={{ xs: 1, md: 3 }}
                                padding={{ xs: 2, md: 2 }}
                              >
                                <Grid item xs={12}>
                                  <TableStyle>
                                    <TrStyle>
                                      <th>Therapists</th>
                                      <th>Name</th>
                                      <th>Payment</th>
                                      <th>Tip Amount</th>
                                    </TrStyle>
                                    {selectedBooking?.tips?.map(
                                      (tip: any, index: any) => {
                                        return (
                                          <TrDataStyle>
                                            <TdStyle className="center">
                                              <Avatar
                                                src={tip.user?.profile_picture}
                                              />
                                            </TdStyle>
                                            <TdStyle className="textcenter">
                                              {tip.user?.first_name}
                                            </TdStyle>
                                            <TdStyle className="center">
                                              {" "}
                                              <DivFlexCol>
                                                <DivFlexCol>
                                                  <Field
                                                    as={Checkbox}
                                                    type="checkbox"
                                                    name={`tips.${index}.payment_method`}
                                                    value="cash"
                                                    color="success"
                                                    checked={
                                                      values.tips[index]
                                                        .payment_method ===
                                                      "cash"
                                                    }
                                                    onChange={() => {
                                                      setFieldValue(
                                                        `tips.${index}.payment_method`,
                                                        "cash"
                                                      );
                                                      setFieldValue(
                                                        `tips.${index}.payment_method_card`,
                                                        undefined
                                                      );
                                                    }}
                                                  />
                                                  <h4>Cash</h4>
                                                </DivFlexCol>
                                                <DivFlexCol
                                                  style={{
                                                    display: "flex",
                                                    marginLeft: "3rem",
                                                  }}
                                                >
                                                  <Field
                                                    as={Checkbox}
                                                    type="checkbox"
                                                    name={`tips.${index}.payment_method_card`}
                                                    value="card"
                                                    color="success"
                                                    checked={
                                                      values.tips[index]
                                                        .payment_method_card ===
                                                      "card"
                                                    }
                                                    error={
                                                      errors.payment_method &&
                                                      touched.payment_method
                                                        ? true
                                                        : false
                                                    }
                                                    onChange={() => {
                                                      setFieldValue(
                                                        `tips.${index}.payment_method`,
                                                        undefined
                                                      );
                                                      setFieldValue(
                                                        `tips.${index}.payment_method_card`,
                                                        "card"
                                                      );
                                                    }}
                                                  />
                                                  <h4>Card</h4>
                                                </DivFlexCol>
                                              </DivFlexCol>
                                            </TdStyle>
                                            <TdStyle>
                                              <Grid item xs={12}>
                                                <Field
                                                  as={FieldInput}
                                                  id="tip"
                                                  isEndContent={
                                                    branch.default_currency
                                                  }
                                                  placeholder="5.00"
                                                  name={`tips.${index}.tip_amount`}
                                                />
                                              </Grid>
                                            </TdStyle>
                                          </TrDataStyle>
                                        );
                                      }
                                    )}
                                  </TableStyle>
                                </Grid>
                              </Grid>
                            </Paper>
                          </FlexCol>
                        </DivFlexRow>
                      )}
                    <ModelBotton>
                      <div className="row">
                        <ButtonX
                          className="btn-close"
                          onClick={handleCloseModel}
                          borderColor={""}
                        >
                          Close
                        </ButtonX>
                        {selectedBooking.id && (
                          <ButtonX
                            className="btn-save-bookin"
                            onClick={(e) => {
                              handleCompleteBooking(values, e);
                            }}
                            borderColor={""}
                          >
                            Complete Booking
                          </ButtonX>
                        )}
                        <ButtonX
                          className="btn-save"
                          disabled={!(dirty && isValid) || isSubmitting}
                          type="submit"
                        >
                          <DivLoad
                            isSubmitting={isSubmitting}
                            content="Saving"
                            text={
                              selectedBooking.id
                                ? "Save Changes"
                                : "Save and start"
                            }
                          />
                        </ButtonX>
                      </div>
                    </ModelBotton>
                  </div>
                </Form>
              </div>
            );
          }}
        </Formik>
      </BoxStyle>
    </Fade>
  );
}
