import { useSelector } from "react-redux";
import { getAppDataSelector } from "@/store/app";
import { CircularProgress, ListItemText } from "@mui/material";
import {
  StyledFormControl,
  StyledMenuItem,
  StyledSelect,
} from "./index.styles";
import { COLORS } from "@/constants/colors";
import { useEffect, useState } from "react";
import React from "react";
import { setSelectedBranchSuperAdmin } from "@/store/app/appSlice";
import { useAppDispatch } from "@/hooks/useReduxTypedHooks";
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
export default function BranchesDropDown({
  setFieldValue,
  isCenter,
  initalBranch,
  ...props
}: any) {
  const dispatch = useAppDispatch();
  const { allBranchs, allBranchsPending, branch, selectedBranchSuperAdmin } =
    useSelector(getAppDataSelector);
  const [selectedBranch, setSelectedBranch] = useState<string>("");

  useEffect(() => {
    if (!selectedBranchSuperAdmin) {
      setSelectedBranch(branch.name);
      dispatch(setSelectedBranchSuperAdmin(branch.name));
    } else {
      setSelectedBranch(selectedBranchSuperAdmin);
    }
  }, [selectedBranchSuperAdmin, branch.name]);
  useEffect(() => {
    if (selectedBranch && setFieldValue) {
      allBranchs.filter((branch) => {
        if (branch.name === selectedBranch) {
          setFieldValue(`branch_id`, branch.branch_id);
        }
      });
    }
  }, [selectedBranch]);

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setSelectedBranch(value);
    if (isCenter) {
      allBranchs.filter((branch) => {
        if (branch.name === value) {
          setFieldValue(`branch_id`, branch.branch_id);
        }
      });
    }

    dispatch(setSelectedBranchSuperAdmin(value));
  };
  return (
    <StyledFormControl fullWidth {...props}>
      <StyledSelect
        isCenter={isCenter}
        id="branch-drop-down"
        labelId="branch-drop-down"
        value={selectedBranch}
        onChange={handleChange}
        MenuProps={MenuProps}
      >
        {allBranchsPending ? (
          <CircularProgress style={{ color: COLORS.THEME_COLOR }} />
        ) : (
          allBranchs.map((name: any) => (
            <StyledMenuItem key={name.name} value={name.name}>
              <ListItemText primary={name.name} />
            </StyledMenuItem>
          ))
        )}
      </StyledSelect>
    </StyledFormControl>
  );
}
