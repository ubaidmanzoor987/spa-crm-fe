import Image from "next/image";
import ButtonX from "@/components/core/Button";
import FieldInput from "@/components/core/FieldInput";
import { Modal, Backdrop } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTypedHooks";
import { getAppDataSelector } from "@/store/app";
import { handleOpenBranchModal } from "@/store/app/appSlice";
import DeleteModal from "@/components/core/ModalDelete";
import { DivAddText } from "@/components/core/DivAddText";
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
import BranchTable from "./branchTable";
import BranchForm from "./branchForm";
export default function BranchesComponent() {
  const { openBranchModel, allBranchsPending } =
    useAppSelector(getAppDataSelector);
  const dispatch = useAppDispatch();

  const handleOpenModel = () => {
    dispatch(handleOpenBranchModal(true));
  };

  const handleCloseModel = () => {
    dispatch(handleOpenBranchModal(false));
  };

  return (
    <>
      <Container container>
        <FlexRowGrid item xs={12}>
          <FlexCol>
            <TypographyStyle>Branch Information</TypographyStyle>
          </FlexCol>
          <ButtonX onClick={handleOpenModel}>
            <StyledAddMainButton>
              <Image src={"/svgs/branch.svg"} height={35} width={35} />
              <DivAddText text="Branches"></DivAddText>
            </StyledAddMainButton>
          </ButtonX>
        </FlexRowGrid>
        <StyledColorGrid item xs={12}>
          <DIV item xs={11.7}>
            <P>Search Branch</P>
            <DivStyle>
              <DivSearch>
                <Image src={"/svgs/greensearch.svg"} height={20} width={20} />
              </DivSearch>
              <FieldInput
                isShadow={true}
                placeholder={"Search for Branches, Branches name, Id etc "}
                name={"serach"}
                id={"serach"}
                Left={2}
              />
            </DivStyle>
          </DIV>
        </StyledColorGrid>
        <BranchTable />
      </Container>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openBranchModel}
        onClose={handleCloseModel}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <BranchForm />
      </Modal>

      <DeleteModal />
    </>
  );
}
