import { getAppDataSelector } from "@/store/app";
import { CircularProgress, MenuItem } from "@mui/material";
import { useAppSelector } from "@/hooks/useReduxTypedHooks";
import { StyledFormControl, StyledSelect } from "./index.styles";
import { COLORS } from "@/constants/colors";
import { IRoom } from "@/store/app/types";
import { useState, useEffect } from "react";

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

export default function RoomDropDown({ onSelect, ...props }: any) {
  const { allRooms, allRoomsPending } = useAppSelector(getAppDataSelector);
  const [selectedOption, setSelectedOption] = useState<
    IRoom | null | undefined
  >();

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedId = event.target.value as number;
    const selectedOption = allRooms.find((room) => room.id === selectedId);
    setSelectedOption(selectedOption);
  };

  useEffect(() => {
    if (props.value && props.isEdit === true) {
      const ind = allRooms.findIndex((room) => room.id === props.value);
      if (ind > -1) {
        const opt = allRooms[ind];

        setSelectedOption(opt);
      }
    }
  }, [props]);

  return (
    <StyledFormControl fullWidth {...props}>
      <StyledSelect
        MenuProps={MenuProps}
        placeholder={"Select Room"}
        defaultValue={[]}
        onSelect={onSelect}
        onChange={handleSelectChange}
        value={selectedOption?.name}
        {...props}
      >
        {allRoomsPending ? (
          <CircularProgress style={{ color: COLORS.THEME_COLOR }} />
        ) : (
          allRooms.map((name) => (
            <MenuItem key={name.id} value={name.id}>
              {name.name}
            </MenuItem>
          ))
        )}
      </StyledSelect>
    </StyledFormControl>
  );
}
