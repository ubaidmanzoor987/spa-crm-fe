import Image from "next/image";
import { getAppDataSelector } from "@/store/app";
import ButtonX from "@/components/core/Button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import FieldInput from "@/components/core/FieldInput";
import { Fade, Paper } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTypedHooks";
import { IBranchs, IStaff } from "@/store/app/types";
import {
  getAllStaffThunk,
  handleOpenStaffModal,
  setSelectedStaff,
} from "@/store/app/appSlice";
import { addNewStaff, updateStaff } from "@/services/app/staff";
import { staffModel } from "@/validations/staffModal";
import GenderDropDown from "@/components/core/GenderDropDown";
import { toast } from "react-toastify";
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
  BoxFormStyle,
  BoxModel,
  StyledButton,
  StyledBranchDropDown,
} from "../index.style";
import React from "react";
import { DivLoad } from "@/components/core/DivLoad";
import { ToastMsg } from "@/components/core/ToastMsg";
import DesignationDropDown from "@/components/core/DesignationDropDown";
import { getAuthDataSelector } from "@/store/auth";
import { Phone } from "@mui/icons-material";
import { AppState } from "@/store/rootReducer";
import { IRole } from "@/store/auth/types";
import BranchesDropDown from "@/components/core/BranchesDropDown";

export default function StaffForm() {
  const role = useAppSelector((state: AppState) => state.auth.user.role);
  const dispatch = useAppDispatch();
  const { selectedStaff, openStaffModal, allBranchs } =
    useAppSelector(getAppDataSelector);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const hiddenFileInput = React.useRef<any>();
  const {
    user: { branch_id },
  } = useAppSelector(getAuthDataSelector);
  const onFormSubmit = async (values: IStaff) => {
    try {
      let obj = { ...values };

      if (role !== IRole.SUPER_ADMIN) {
        obj.branch_id = branch_id?.toString();
      } else {
        obj.branch_id = obj.branch_id.toString();
      }
      obj.phone = obj.phone?.toString();
      obj.password = "123456";
      obj.firstName = obj.first_name;
      obj.lastName = obj.last_name ? obj.last_name : "";
      obj.permanentAddress = obj.permanent_address;
      obj.presentAddress = obj.present_address;
      obj.gender.toLowerCase();
      let resp;
      if (selectedStaff.id) {
        setIsSubmitting(true);
        resp = await updateStaff(obj);
      } else {
        setIsSubmitting(true);
        resp = await addNewStaff(obj);
      }
      if (resp && resp.id) {
        setIsSubmitting(false);
        toast(
          <ToastMsg
            description={`Staff ${resp.first_name} is  ${
              selectedStaff.id ? "Updated" : "Created"
            } Successfully`}
          />,
          {
            autoClose: 5000,
            type: "success",
            icon: false,
          }
        );

        dispatch(getAllStaffThunk());
        handleCloseModel();
      }
    } catch (err) {
      setIsSubmitting(false);
      toast(
        <ToastMsg
          description={`Unable to ${selectedStaff.id ? "update" : "add"} ${
            values.first_name
          } due to ${err}`}
        />,
        {
          autoClose: 5000,
          type: "error",
          icon: false,
        }
      );
      // toast.error(
      //   `Unable to ${selectedStaff.id ? "update" : "add"} ${
      //     values.first_name
      //   } due to ${err}`
      // );
    }
  };

  const handleCloseModel = () => {
    dispatch(setSelectedStaff({} as IStaff));
    dispatch(handleOpenStaffModal(false));
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
        setFieldValue("profile_picture", imgBase64);
      }
    }
  };
  const branchToShow = allBranchs.filter((branch: IBranchs) => {
    return branch.id === selectedStaff.branch_id;
  });
  return (
    <Fade in={openStaffModal}>
      <BoxStyle>
        <DivFlex>
          <H1>
            {" "}
            {selectedStaff.id
              ? `Edit Staff | ${selectedStaff.first_name} `
              : "Add New Staff"}
          </H1>
          <div className="Poiner" onClick={handleCloseModel}>
            <Image src={"/svgs/cancel.svg"} height={20} width={20} />
          </div>
        </DivFlex>
        <StyledDivider />
        <Formik
          initialValues={{
            id: selectedStaff.id,
            first_name: selectedStaff.first_name,
            last_name: selectedStaff.last_name,
            role: selectedStaff.role,
            phone: selectedStaff.phone,
            email: selectedStaff.email,
            gender: selectedStaff.gender,
            department: selectedStaff.department,
            dob: selectedStaff.dob,
            permanent_address: selectedStaff.permanent_address,
            present_address: selectedStaff.present_address,
            salary: selectedStaff.salary,
            commission_per_service: selectedStaff.commission_per_service,
            branch_id: selectedStaff.branch_id,
            passport: selectedStaff.passport,
            idCard: selectedStaff.idCard,
            password: selectedStaff.password,
            profile_picture: selectedStaff.profile_picture,
          }}
          validationSchema={() => staffModel}
          onSubmit={onFormSubmit}
        >
          {({ errors, touched, isValid, dirty, setFieldValue, values }) => {
            console.log({ errors, values });
            return (
              <div style={{ marginTop: "1.5rem" }}>
                <Form>
                  <DivFlexRow>
                    <FlexCol>
                      {/* <LebalHeading className="theme_color">
                        Personal Info:
                      </LebalHeading> */}
                      <Paper elevation={3} style={{ boxShadow: "none" }}>
                        <BoxFormStyle>
                          <BoxModel>
                            <div className="btn-choose">
                              <img
                                src={
                                  values.profile_picture
                                    ? values.profile_picture
                                    : "/svgs/addItem.svg"
                                }
                                width={values.profile_picture ? 200 : 50}
                                height={values.profile_picture ? 180 : 50}
                                alt="image"
                              />
                            </div>

                            <StyledButton onClick={handleClick}>
                              Choose File
                              <input
                                hidden
                                ref={hiddenFileInput}
                                accept="image/*"
                                multiple
                                type="file"
                                name="profile_picture"
                                id="profile_picture"
                                onChange={(event) => {
                                  // @ts-ignore
                                  handleChangeImage(event, setFieldValue);
                                }}
                              />
                            </StyledButton>
                            <div className="field_Column">
                              <div className="input_width">
                                <LebalHeading>Staff ID:</LebalHeading>

                                <Field
                                  as={FieldInput}
                                  id="id"
                                  name="id"
                                  placeholder="001111"
                                  disabled
                                  error={errors.id && touched.id ? true : false}
                                  helperText={<ErrorMessage name="id" />}
                                />
                              </div>
                              <div className="input_width margin">
                                <LebalHeading>Staff Name:</LebalHeading>

                                <Field
                                  as={FieldInput}
                                  id="first_name"
                                  name="first_name"
                                  placeholder="Enter Staff Name"
                                  error={
                                    errors.first_name && touched.first_name
                                      ? true
                                      : false
                                  }
                                  helperText={
                                    <ErrorMessage name="first_name" />
                                  }
                                />
                              </div>
                              <div className="input_width margin">
                                <LebalHeading>Phone No:</LebalHeading>

                                <Field
                                  as={FieldInput}
                                  id="phone"
                                  name="phone"
                                  placeholder="Enter Phone Number"
                                  type="number"
                                  error={
                                    errors.phone && touched.phone ? true : false
                                  }
                                  helperText={<ErrorMessage name="phone" />}
                                />
                              </div>
                            </div>
                          </BoxModel>
                          <div>
                            <div className="Field_Row">
                              <div className="input_width_2 margin">
                                <LebalHeading>Email Address:</LebalHeading>
                                <Field
                                  as={FieldInput}
                                  id="email"
                                  name="email"
                                  placeholder="Enter Email"
                                  error={
                                    errors.email && touched.email ? true : false
                                  }
                                  helperText={<ErrorMessage name="email" />}
                                />
                              </div>
                              <div className="input_width_3">
                                <LebalHeading>Date of Birth:</LebalHeading>
                                <Field
                                  as={FieldInput}
                                  id="dob"
                                  name="dob"
                                  type="date"
                                  placeholder="YYYY-MM-DD"
                                  error={
                                    errors.dob && touched.dob ? true : false
                                  }
                                  helperText={<ErrorMessage name="dob" />}
                                />
                              </div>
                            </div>
                            <div className="Field_Row">
                              <div className="input_width_2 margin">
                                <LebalHeading>Gender</LebalHeading>
                                <Field
                                  name="gender"
                                  id="gender"
                                  as={GenderDropDown}
                                  value={values?.gender}
                                  setFieldValue={setFieldValue}
                                  error={
                                    errors.gender && touched.gender
                                      ? true
                                      : false
                                  }
                                  helperText={<ErrorMessage name="gender" />}
                                />
                              </div>
                              <div className="input_width_3">
                                <LebalHeading>Present Address:</LebalHeading>

                                <Field
                                  as={FieldInput}
                                  id="present_address"
                                  name="present_address"
                                  placeholder="Enter Your present Address"
                                  // error={
                                  //   errors.dob && touched.dob ? true : false
                                  // }
                                  // helperText={<ErrorMessage name="presntaddress" />}
                                />
                              </div>
                            </div>
                            <div className="Field_Row">
                              <div className="input_width_2 margin RP">
                                <LebalHeading>Permanent Address:</LebalHeading>
                                <Field
                                  as={FieldInput}
                                  id="permanent_address"
                                  name="permanent_address"
                                  placeholder="Enter Your permanent Address"
                                  // error={
                                  //   errors.name && touched.name ? true : false
                                  // }
                                  // helperText={<ErrorMessage name="paddress" />}
                                />
                              </div>
                              <div className="input_width_3">
                                <LebalHeading>Designation:</LebalHeading>
                                <Field
                                  as={DesignationDropDown}
                                  id="department"
                                  name="department"
                                  setFieldValue={setFieldValue}
                                  value={values?.department}
                                  placeholder="Enter Your Designation"
                                  error={
                                    errors.department && touched.department
                                      ? true
                                      : false
                                  }
                                  helperText={
                                    <ErrorMessage name="department" />
                                  }
                                />
                              </div>

                              {/* <div className="input_width_3">

                              </div> */}

                              {/* <div className="input_width_2 margin">
                                <LebalHeading>Designation:</LebalHeading>
                                <Field
                                  as={FieldInput}
                                  id="department"
                                  name="department"
                                  placeholder="Enter Your Designation"
                                  error={
                                    errors.department && touched.department
                                      ? true
                                      : false
                                  }
                                  helperText={
                                    <ErrorMessage name="department" />
                                  }
                                />
                              </div> */}
                            </div>
                            <div>
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
                            </div>
                          </div>
                        </BoxFormStyle>
                      </Paper>
                    </FlexCol>
                  </DivFlexRow>

                  <ModelBotton>
                    <div className="row">
                      <ButtonX
                        className="btn-close"
                        onClick={handleCloseModel}
                        borderColor={""}
                      >
                        Close
                      </ButtonX>
                      <ButtonX
                        className="btn-save"
                        disabled={!(dirty && isValid) || isSubmitting}
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
