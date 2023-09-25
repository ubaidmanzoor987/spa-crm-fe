import Image from "next/image";
import ButtonX from "@/components/core/Button";
import FieldInput from "@/components/core/FieldInput";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTypedHooks";
import { getAppDataSelector } from "@/store/app";
import { handleOpenStaffModal } from "@/store/app/appSlice";
import DeleteModal from "@/components/core/ModalDelete";
import { Modal, Backdrop, CircularProgress } from "@mui/material";
import StaffTable from "./StaffTable";
import StaffForm from "./StaffForm";
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
import { DivAddText } from "@/components/core/DivAddText";
import { Loading } from "@/components/core/Loading";
import {
  Loader,
  StyledPreloader,
} from "@/components/core/Loading/index.styles";

export default function StaffComponent() {
  const { openStaffModal, allStaffPending } =
    useAppSelector(getAppDataSelector);
  const dispatch = useAppDispatch();

  const handleOpenModel = () => {
    dispatch(handleOpenStaffModal(true));
  };

  const handleCloseModel = () => {
    dispatch(handleOpenStaffModal(false));
  };

  return (
    <>
      <Container container>
        <FlexRowGrid item xs={12}>
          <FlexCol>
            <TypographyStyle>Staff Information</TypographyStyle>
          </FlexCol>
          {/* <DivButton> */}
          <ButtonX onClick={handleOpenModel}>
          <StyledAddMainButton>
              <Image src={"/svgs/staff-icon.svg"} height={35} width={35} />
              <DivAddText text="Staff"></DivAddText>
            </StyledAddMainButton>
          </ButtonX>
          {/* </DivButton> */}
        </FlexRowGrid>
        <StyledColorGrid item xs={12}>
          <DIV item xs={11.7}>
            <P>Search Staff</P>
            <DivStyle>
              <DivSearch>
                <Image src={"/svgs/greensearch.svg"} height={20} width={20} />
              </DivSearch>
              <FieldInput
                isShadow={true}
                placeholder={"Search for Staff, Staff Name, Email etc"}
                name={"serach"}
                id={"serach"}
                Left={2}
              />
            </DivStyle>
          </DIV>
        </StyledColorGrid>
        <StaffTable />
      </Container>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openStaffModal}
        onClose={handleCloseModel}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <StaffForm />
      </Modal>
      <DeleteModal />
    </>
  );
}
