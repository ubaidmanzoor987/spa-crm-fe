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
import ServicesTable from "./ServiceTable";
import ServicesForm from "./ServiceForm";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTypedHooks";
import { getAppDataSelector } from "@/store/app";
import { handleOpenServiceModal } from "@/store/app/appSlice";
import DeleteModal from "@/components/core/ModalDelete";
import { DivAddText } from "@/components/core/DivAddText";
import {
  Loader,
  StyledPreloader,
} from "@/components/core/Loading/index.styles";

export default function () {
  const { openServiceModal, allServicesPending } =
    useAppSelector(getAppDataSelector);
  const dispatch = useAppDispatch();

  const handleOpenModel = () => {
    dispatch(handleOpenServiceModal(true));
  };

  const handleCloseModel = () => {
    dispatch(handleOpenServiceModal(false));
  };

  return (
    <>
      <Container container>
        <FlexRowGrid item xs={12}>
          <FlexCol>
            <TypographyStyle>Services Information</TypographyStyle>
          </FlexCol>
          {/* <DivButton> */}
          <ButtonX onClick={handleOpenModel}>
          <StyledAddMainButton>
              <Image src={"/svgs/service-icon.svg"} height={30} width={30} />
              <DivAddText text="Service"></DivAddText>
            </StyledAddMainButton>
          </ButtonX>
          {/* </DivButton> */}
        </FlexRowGrid>
        <StyledColorGrid item xs={12}>
          <DIV item xs={11.7}>
            <P>Search Services</P>
            <DivStyle>
              <DivSearch>
                <Image src={"/svgs/greensearch.svg"} height={20} width={20} />
              </DivSearch>
              <FieldInput
                isShadow={true}
                placeholder={"Search for Services, Services name, price etc "}
                name={"serach"}
                id={"serach"}
                Left={2}
              />
            </DivStyle>
          </DIV>
        </StyledColorGrid>
        <ServicesTable />
      </Container>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openServiceModal}
        onClose={handleCloseModel}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <ServicesForm />
      </Modal>
      <DeleteModal />
    </>
  );
}
