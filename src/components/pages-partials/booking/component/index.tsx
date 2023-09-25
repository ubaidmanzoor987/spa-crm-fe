import Image from "next/image";
import ButtonX from "@/components/core/Button";
import FieldInput from "@/components/core/FieldInput";
import { Modal, Backdrop } from "@mui/material";
import BookingTable from "./BookingTable/index";

import {
  Container,
  FlexRowGrid,
  FlexCol,
  TypographyStyle,
  DivButton,
  StyledColorGrid,
  P,
  DIV,
  DivStyle,
  DivSearch,
  StyledAddMainButton,
} from "./index.style";

import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTypedHooks";
import { getAppDataSelector } from "@/store/app";
import { handleOpenBookingModel } from "@/store/app/appSlice";
import DeleteModal from "@/components/core/ModalDelete";
import BookingForm from "./BookingForm";
import { DivAddText } from "@/components/core/DivAddText";

export default function BookingComponent() {
  const { openBookingModel } = useAppSelector(getAppDataSelector);
  const dispatch = useAppDispatch();

  const handleOpenModel = () => {
    dispatch(handleOpenBookingModel(true));
  };

  const handleCloseModel = () => {
    dispatch(handleOpenBookingModel(false));
  };

  return (
    <>
      <Container container>
        <FlexRowGrid item xs={12}>
          <FlexCol>
            <TypographyStyle>Booking Information</TypographyStyle>
          </FlexCol>
          {/* <DivButton> */}
            <ButtonX  onClick={handleOpenModel}>
            <StyledAddMainButton>
              <Image src={"/svgs/Add-booking.svg"} height={40} width={40} />
              <DivAddText text="Booking"></DivAddText>
            </StyledAddMainButton>
            </ButtonX>
          {/* </DivButton> */}
        </FlexRowGrid>
        <StyledColorGrid item xs={12}>
          <DIV item xs={11.7}>
            <P>Search Booking</P>
            <DivStyle>
              <DivSearch>
                <Image src={"/svgs/greensearch.svg"} height={20} width={20} />
              </DivSearch>
              <FieldInput
                isShadow={true} 
                placeholder={"Search for Booking, Check In, Check Out etc "}
                name={"serach"}
                id={"serach"}
                Left={2}
              />
            </DivStyle>
          </DIV>
        </StyledColorGrid>
        <BookingTable />
      </Container>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openBookingModel}
        onClose={handleCloseModel}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <BookingForm />
      </Modal>
      <DeleteModal />
    </>
  );
}
