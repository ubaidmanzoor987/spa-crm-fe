import Image from "next/image";
import { getAppDataSelector } from "@/store/app";
import ButtonX from "@/components/core/Button";
import FieldInput from "@/components/core/FieldInput";
import { handleOpenAmenitesModal } from "@/store/app/appSlice";
import { Modal, Backdrop,} from "@mui/material";

import {
  Container,
  FlexRowGrid,
  FlexCol,
  TypographyStyle,
  StyledColorGrid,
  P,
  DIV,
  DivStyle,
  DivSearch,
  StyledAddMainButton,
} from "./index.styles";
import AmenitiesTable from "./amenitiesTable";
import AmenitiesForm from "./amenitiesForm";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTypedHooks";
import DeleteModal from "@/components/core/ModalDelete";
import { DivAddText } from "@/components/core/DivAddText";
export default function () {
  const { openAmenitesModal } =
    useAppSelector(getAppDataSelector);

  const dispatch = useAppDispatch();

  const handleOpenModel = () => {
    dispatch(handleOpenAmenitesModal(true));
  };

  const handleCloseModel = () => {
    dispatch(handleOpenAmenitesModal(false));
  };

  return (
    <>
      <Container container>
        <FlexRowGrid item xs={12}>
          <FlexCol>
            <TypographyStyle>Amenities Information</TypographyStyle>
          </FlexCol>
          <ButtonX onClick={handleOpenModel}>
            <StyledAddMainButton>
              <Image src={"/svgs/aminties-icon.svg"} height={30} width={30} />
              <DivAddText text="Amenities"></DivAddText>
            </StyledAddMainButton>
          </ButtonX>
        </FlexRowGrid>
        <StyledColorGrid item xs={12}>
          <DIV item xs={11.7}>
            <P>Search Amenities</P>
            <DivStyle>
              <DivSearch>
                <Image src={"/svgs/greensearch.svg"} height={20} width={20} />
              </DivSearch>
              <FieldInput
                isShadow={true}
                placeholder={"Search for Aminities, Aminity name etc "}
                name={"serach"}
                id={"serach"}
                Left={2}
              />
            </DivStyle>
          </DIV>
        </StyledColorGrid>
        <AmenitiesTable />
      </Container>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openAmenitesModal}
        onClose={handleCloseModel}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <AmenitiesForm />
      </Modal>
      <DeleteModal />
    </>
  );
}
