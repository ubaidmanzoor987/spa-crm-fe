import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAppDataSelector } from "@/store/app";
import { CircularProgress, MenuItem, SelectProps } from "@mui/material";

import { StyledFormControl, StyledSelect } from "./index.styles";
import { COLORS } from "@/constants/colors";
import { IService } from "@/store/app/types";
import { useAppDispatch } from "@/hooks/useReduxTypedHooks";
import { getAllServicesThunk } from "@/store/app/appSlice";

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

export default function ServiseDropDown(props: any) {
  const { allServices, allServicesPending } = useSelector(getAppDataSelector);
  const [selectedOption, setSelectedOption] = useState<
    IService | null | undefined
  >();
  const dispatch = useAppDispatch();

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedId = event.target.value as number;
    const selectedOption = allServices.find(
      (service) => service.id === selectedId
    );
    setSelectedOption(selectedOption);
  };

  useEffect(() => {
    dispatch(getAllServicesThunk());
  }, []);

  useEffect(() => {
    if (props.value && props.isEdit === true) {
      const ind = allServices.findIndex(
        (service) => service.id === props.value
      );

      if (ind > -1) {
        const opt = allServices[ind];

        setSelectedOption(opt);
      }
    }
  }, [props]);

  return (
    <StyledFormControl fullWidth {...props}>
      <StyledSelect
        MenuProps={MenuProps}
        placeholder={"Select Service"}
        onChange={handleSelectChange}
        value={selectedOption?.name}
        {...props}
      >
        {allServicesPending ? (
          <CircularProgress style={{ color: COLORS.THEME_COLOR }} size={20} />
        ) : (
          allServices.map((name) => (
            <MenuItem key={name.id} value={name.id}>
              {name.name}
            </MenuItem>
          ))
        )}
      </StyledSelect>
    </StyledFormControl>
  );
}
