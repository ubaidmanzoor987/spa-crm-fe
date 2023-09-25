import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAppDataSelector } from "@/store/app";
import {
  CircularProgress,
  MenuItem,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";

import { StyledFormControl, StyledSelect } from "./index.styles";
import { COLORS } from "@/constants/colors";
import { IProduct } from "@/store/app/types";
import { useAppDispatch } from "@/hooks/useReduxTypedHooks";
import { getAllProductsThunk } from "@/store/app/appSlice";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function ProductsDropDown({
  setFieldValue,
  index,
  productId,
  ...props
}: any) {
  const { allProducts, allProductsPending } = useSelector(getAppDataSelector);
  const [selectedOption, setSelectedOption] = useState<
    IProduct | null | undefined
  >();
  const [firstTime, setfirstTime] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
    const selectedId = event.target.value as number;
    const selectedOption = allProducts.find(
      (service) => service.id === selectedId
    );
    setSelectedOption(selectedOption);
    setFieldValue(
      `service_detail.${index}.price`,
      selectedOption && selectedOption.price
    );
  };

  useEffect(() => {
    dispatch(getAllProductsThunk());
    setfirstTime(true);
  }, []);

  useEffect(() => {
    const selectedOption = allProducts.find(
      (service) => service.id === productId
    );
    setSelectedOption(selectedOption);
    if (firstTime) {
      setFieldValue(
        `product_detail.${index}.product_price`,
        selectedOption && selectedOption.price
      );
    }
  }, [productId]);

  useEffect(() => {
    if (props.value && props.isEdit === true) {
      const ind = allProducts.findIndex(
        (service) => service.id === props.value
      );

      if (ind > -1) {
        const opt = allProducts[ind];

        setSelectedOption(opt);
      }
    }
  }, [props]);

  return (
    <StyledFormControl fullWidth {...props}>
      <StyledSelect
        MenuProps={MenuProps}
        placeholder={"Select Product"}
        onChange={handleSelectChange}
        value={selectedOption?.name}
        // value={`${selectedOption?.name} ${selectedOption?.price} `}
        {...props}
      >
        {allProductsPending ? (
          <CircularProgress style={{ color: COLORS.THEME_COLOR }} size={20} />
        ) : (
          allProducts.map((name) => (
            <MenuItem
              style={{ display: "flex", justifyContent: "space-between" }}
              key={name.id}
              value={name.id}
            >
              <span>{name.name}</span>
            </MenuItem>
          ))
        )}
      </StyledSelect>
    </StyledFormControl>
  );
}
