import React from "react";
import Image from "next/image";
import { getAppDataSelector } from "@/store/app";
import ButtonX from "@/components/core/Button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import FieldInput from "@/components/core/FieldInput";
import { Fade, Grid } from "@mui/material";

import {
  FlexCol,
  LebalHeading,
  DivFlexRow,
  ModelBotton,
  BoxStyle,
  DivFlex,
  H1,
  StyledDivider,
  StyledBranchDropDown,
} from "../index.styles";
import { getAuthDataSelector } from "@/store/auth";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTypedHooks";
import { IAmenities, IBranchs } from "@/store/app/types";
import { toast } from "react-toastify";
import {
  getAllAmenitiesThunk,
  handleOpenAmenitesModal,
  setSelectedAmenites,
} from "@/store/app/appSlice";
import { amenitiesModel } from "@/validations/amenitiesModel";
import { addNewAmenities, updateAmenities } from "@/services/app/amenities";
import { DivLoad } from "@/components/core/DivLoad";
import { ToastMsg } from "@/components/core/ToastMsg";
import BranchesDropDown from "@/components/core/BranchesDropDown";
import { IRole } from "@/store/auth/types";
import { AppState } from "@/store/rootReducer";

export default function AmenitiesForm() {
  const role = useAppSelector((state: AppState) => state.auth.user.role);
  const dispatch = useAppDispatch();
  const { selectedAmenities, openAmenitesModal, allBranchs } =
    useAppSelector(getAppDataSelector);
  const { selectedBranchs, openBranchModel } =
    useAppSelector(getAppDataSelector);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const {
    user: { branch_id },
  } = useAppSelector(getAuthDataSelector);

  const onFormSubmit = async (values: IAmenities) => {
    try {
      let obj = { ...values };
      if (role === IRole.SUPER_ADMIN) {
        obj.branch_id = obj.branch_id
          ? Number(obj.branch_id)
          : Number(branch_id);
      } else {
        obj.branch_id = Number(branch_id);
      }
      let resp;
      if (selectedAmenities.id) {
        setIsSubmitting(true);
        resp = await updateAmenities(obj);
      } else {
        setIsSubmitting(true);
        resp = await addNewAmenities(obj);
      }
      if (resp && resp.id) {
        setIsSubmitting(false);
        toast(
          <ToastMsg
            description={`Amenities ${obj.name} ${
              selectedAmenities.id ? "Updated" : "Created"
            } Successfully`}
          />,
          {
            autoClose: 5000,
            type: "success",
            icon: false,
          }
        );
        dispatch(getAllAmenitiesThunk());
        handleCloseModel();
      }
    } catch (err) {
      setIsSubmitting(false);
      toast(
        <ToastMsg
          description={`Unable to ${selectedAmenities.id ? "update" : "add"} ${
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
    dispatch(setSelectedAmenites({} as IAmenities));
    dispatch(handleOpenAmenitesModal(false));
  };
  const branchToShow = allBranchs.filter((branch: IBranchs) => {
    return branch.id === selectedAmenities.branch_id;
  });
  return (
    <Fade in={openAmenitesModal}>
      <BoxStyle>
        <DivFlex>
          <H1>
            {" "}
            {selectedAmenities.id
              ? `Edit Amenities | ${selectedAmenities.name}`
              : "Add New Amenities"}
          </H1>
          <div className="Poiner" onClick={handleCloseModel}>
            <Image src={"/svgs/cancel.svg"} height={20} width={20} />
          </div>
        </DivFlex>
        <StyledDivider />
        <Formik
          initialValues={{
            name: selectedAmenities.name,
            id: selectedAmenities.id,
            branch_id: selectedAmenities.branch_id,
          }}
          validationSchema={() => amenitiesModel}
          onSubmit={onFormSubmit}
        >
          {({ errors, touched, isValid, dirty, values, setFieldValue }) => {
            return (
              <div style={{ marginTop: "1.5rem" }}>
                <Form>
                  <DivFlexRow>
                    <FlexCol>
                      <div className="input_width">
                        <LebalHeading>Amenities:</LebalHeading>
                        <Field
                          as={FieldInput}
                          id="name"
                          name="name"
                          placeholder="Enter Amenities"
                          error={errors.name && touched.name ? true : false}
                          helperText={<ErrorMessage name="name" />}
                        />
                      </div>
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

                  <ModelBotton>
                    <div className="row">
                      <ButtonX className="btn-close" onClick={handleCloseModel}>
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
