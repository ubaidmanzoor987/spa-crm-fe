import { getBranch } from "@/services/app/branchSetting";
import { getAppDataSelector } from "@/store/app";
import { getAuthDataSelector } from "@/store/auth";
import { ListItemText, MenuItem, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StyledFormControl, StyledSelect } from "./index.styles";

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

export default function CurrencyDropDown({
  setFieldValue,
  fromBranches,
  props,
}: any) {
  const { allCurrency, branch } = useSelector(getAppDataSelector);
  const [selectedCurrency, setSelectedCurrency] = useState<string>(
    fromBranches ? fromBranches : branch.default_currency || ""
  );
  const {
    user: { branch_id },
  } = useSelector(getAuthDataSelector);
  const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedCurrency(event.target.value as string);
    setFieldValue(`default_currency`, event.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      const resp = await getBranch(branch_id);
      setSelectedCurrency(resp.default_currency);
    };
    if (!fromBranches) {
      fetchData();
    }
  }, []);
  return (
    <StyledFormControl>
      <StyledSelect
        MenuProps={MenuProps}
        placeholder={"Select Currency"}
        onChange={handleSelectChange}
        value={selectedCurrency}
        // {...props}
      >
        {allCurrency &&
          allCurrency.map((value) => (
            <MenuItem key={value.currencyType} value={value.currencyType}>
              <ListItemText primary={value.currencyType} />
            </MenuItem>
          ))}
      </StyledSelect>
    </StyledFormControl>
  );
}
