import Image from "next/image";
import ButtonX from "@/components/core/Button";
import FieldInput from "@/components/core/FieldInput";
import { Modal, Backdrop, CircularProgress } from "@mui/material";

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
} from "./index.styles";
import RoomTable from "./RoomTable";
import RoomForm from "./RoomForm";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTypedHooks";
import { getAppDataSelector } from "@/store/app";
import { handleOpenRoomModal } from "@/store/app/appSlice";
import DeleteModal from "@/components/core/ModalDelete";
import { DivAddText } from "@/components/core/DivAddText";
import { Loading } from "@/components/core/Loading";
import {
  Loader,
  StyledPreloader,
} from "@/components/core/Loading/index.styles";

export default function RoomsComponent() {
  const { openRoomModal, allRoomsPending } = useAppSelector(getAppDataSelector);
  const dispatch = useAppDispatch();

  const handleOpenModel = () => {
    dispatch(handleOpenRoomModal(true));
  };

  const handleCloseModel = () => {
    dispatch(handleOpenRoomModal(false));
  };

  return (
    <>
      <Container container>
        <FlexRowGrid item xs={12}>
          <FlexCol>
            <TypographyStyle>Rooms Information</TypographyStyle>
          </FlexCol>
          {/* <DivButton> */}
          <ButtonX onClick={handleOpenModel}>
          <StyledAddMainButton>
              <Image src={"/svgs/room-icon.svg"} height={30} width={30} />
              <DivAddText text="Room"></DivAddText>
            </StyledAddMainButton>
          </ButtonX>
          {/* </DivButton> */}
        </FlexRowGrid>
        <StyledColorGrid item xs={12}>
          <DIV item xs={11.7}>
            <P>Search Rooms</P>
            <DivStyle>
              <DivSearch>
                <Image src={"/svgs/greensearch.svg"} height={20} width={20} />
              </DivSearch>
              <FieldInput
                isShadow={true}
                placeholder={"Search for Rooms, Room name etc "}
                name={"serach"}
                id={"serach"}
                Left={2}
              />
            </DivStyle>
          </DIV>
        </StyledColorGrid>
        <RoomTable />
      </Container>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openRoomModal}
        onClose={handleCloseModel}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <RoomForm />
      </Modal>
      <DeleteModal />
    </>
  );
}
