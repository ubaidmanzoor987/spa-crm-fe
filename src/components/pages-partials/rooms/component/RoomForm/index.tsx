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
import AmenitiesDropDown from "@/components/core/AmenitiesDropDown";
import { getAuthDataSelector } from "@/store/auth";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTypedHooks";
import { IBranchs, IRoom } from "@/store/app/types";
import { toast } from "react-toastify";
import {
  getAllRoomsThunk,
  handleOpenRoomModal,
  setSelectedRoom,
} from "@/store/app/appSlice";
import { addNewRoom, updateRoom } from "@/services/app/rooms";
import { roomModel } from "@/validations/roomModal";
import FieldCheckbox from "@/components/core/FieldCheckbox";
import React from "react";
import { DivLoad } from "@/components/core/DivLoad";
import { ToastMsg } from "@/components/core/ToastMsg";
import BranchesDropDown from "@/components/core/BranchesDropDown";
import { AppState } from "@/store/rootReducer";
import { IRole } from "@/store/auth/types";

export default function RoomForm() {
  const role = useAppSelector((state: AppState) => state.auth.user.role);
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const { selectedRoom, openRoomModal, allAmenities, allBranchs } =
    useAppSelector(getAppDataSelector);
  const {
    user: { branch_id },
  } = useAppSelector(getAuthDataSelector);

  const onFormSubmit = async (values: IRoom) => {
    try {
      let obj = { ...values };
      if (role === IRole.SUPER_ADMIN) {
        obj.branch_id = obj.branch_id
          ? Number(obj.branch_id)
          : Number(branch_id);
      } else {
        obj.branch_id = Number(branch_id);
      }
      const amenitiesId: number[] = [allAmenities[0].id];

      obj.amenities.forEach((amenity) => {
        const ind = allAmenities.findIndex((am) => am.name === amenity);
        amenitiesId.push(ind);
      });

      obj.amenitiesId = amenitiesId;
      obj.is_third_party = obj.is_third_party.toString();
      let resp;

      if (selectedRoom.id) {
        setIsSubmitting(true);
        resp = await updateRoom(obj);
      } else {
        setIsSubmitting(true);
        resp = await addNewRoom(obj);
      }
      if (resp && resp.id) {
        setIsSubmitting(false);
        toast(
          <ToastMsg
            description={`Room ${obj.name} ${
              selectedRoom.id ? "Updated" : "Created"
            } Successfully`}
          />,
          {
            autoClose: 5000,
            type: "success",
            icon: false,
          }
        );
        dispatch(getAllRoomsThunk());
        handleCloseModel();
      }
    } catch (err) {
      setIsSubmitting(false);
      toast(
        <ToastMsg
          description={`Unable to ${selectedRoom.id ? "update" : "add"} ${
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
    dispatch(setSelectedRoom({} as IRoom));
    dispatch(handleOpenRoomModal(false));
  };
  const initialValues = {
    name: selectedRoom.name,
    amenities: selectedRoom.amenities ?? [],
    is_third_party: selectedRoom.is_third_party,
    id: selectedRoom.id,
    branch_id: selectedRoom.branch_id,
  };
  const branchToShow = allBranchs.filter((branch: IBranchs) => {
    return branch.id === selectedRoom.branch_id;
  });
  return (
    <Fade in={openRoomModal}>
      <BoxStyle>
        <DivFlex>
          <H1>
            {" "}
            {selectedRoom.id
              ? `Edit Room | ${selectedRoom.name}`
              : "Add New Room"}
          </H1>
          <div className="Poiner" onClick={handleCloseModel}>
            <Image src={"/svgs/cancel.svg"} height={20} width={20} />
          </div>
        </DivFlex>
        <StyledDivider />
        <Formik
          initialValues={initialValues}
          validationSchema={() => roomModel}
          onSubmit={onFormSubmit}
        >
          {({ errors, touched, isValid, dirty, setFieldValue, values }) => {
            console.log({ errors, values });
            return (
              <div style={{ marginTop: "1.5rem" }}>
                <Form>
                  <DivFlexRow>
                    <FlexCol>
                      <div className="input_width">
                        <LebalHeading>Room Name:</LebalHeading>
                        <Field
                          as={FieldInput}
                          id="name"
                          name="name"
                          placeholder="Enter new Room"
                          error={errors.name && touched.name ? true : false}
                          helperText={<ErrorMessage name="name" />}
                        />
                      </div>
                    </FlexCol>
                    <FlexCol>
                      <div className="input_width">
                        <LebalHeading>Amenities:</LebalHeading>
                        <Field
                          id="amenities"
                          name="amenities"
                          setFieldValue={setFieldValue}
                          as={AmenitiesDropDown}
                          isInRoom={true}
                          initialAmenitiesFromRooms={initialValues.amenities}
                          error={errors.amenities}
                          helperText={<ErrorMessage name="amenities" />}
                        />
                      </div>
                    </FlexCol>
                  </DivFlexRow>
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
                  <DivFlexRow>
                    <FlexCol>
                      <Field
                        id="is_third_party"
                        name="is_third_party"
                        error={errors.is_third_party}
                        helperText={<ErrorMessage name="is_third_party" />}
                        label={"3rd Party Room"}
                        component={FieldCheckbox}
                        initialFeildData={values.is_third_party}
                      />
                    </FlexCol>
                  </DivFlexRow>
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
