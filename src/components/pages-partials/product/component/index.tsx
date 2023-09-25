import Image from "next/image";
import ButtonX from "@/components/core/Button";
import FieldInput from "@/components/core/FieldInput";
import { Modal, Backdrop, CircularProgress, Box } from "@mui/material";

import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTypedHooks";
import { getAppDataSelector } from "@/store/app";
import { handleOpenProductModal } from "@/store/app/appSlice";
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
import {
  Loader,
  StyledPreloader,
} from "@/components/core/Loading/index.styles";

export default function ProductsComponent() {
  const { openProductModal, allProductsPending } =
    useAppSelector(getAppDataSelector);
  const dispatch = useAppDispatch();

  const handleOpenModel = () => {
    dispatch(handleOpenProductModal(true));
  };

  const handleCloseModel = () => {
    dispatch(handleOpenProductModal(false));
  };

  return (
    <>
      <Container container>
        <FlexRowGrid item xs={12}>
          <FlexCol>
            <TypographyStyle>Product Information</TypographyStyle>
          </FlexCol>
          <ButtonX onClick={handleOpenModel}>
          <StyledAddMainButton>
              <Image src={"/svgs/add-product-icon.svg"} height={35} width={35} />
              <DivAddText text="Product"></DivAddText>
            </StyledAddMainButton>
          </ButtonX>
        </FlexRowGrid>
        <StyledColorGrid item xs={12}>
          <DIV item xs={11.7}>
            <P>Search Products</P>
            <DivStyle>
              <DivSearch>
                <Image src={"/svgs/greensearch.svg"} height={20} width={20} />
              </DivSearch>
              <FieldInput
                isShadow={true}
                placeholder={"Search for Products, Product name, price etc "}
                name={"serach"}
                id={"serach"}
                Left={2}
              />
            </DivStyle>
          </DIV>
        </StyledColorGrid>
        <ProductTable />
      </Container>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openProductModal}
        onClose={handleCloseModel}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <ProductForm />
      </Modal>
      <DeleteModal />
    </>
  );
}
