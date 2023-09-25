import { useSelector } from "react-redux";
import { getAppDataSelector } from "@/store/app";
import { Checkbox, CircularProgress, ListItemText } from "@mui/material";

import {
  StyledFormControl,
  StyledMenuItem,
  StyledSelect,
} from "./index.styles";
import { COLORS } from "@/constants/colors";
import { useEffect, useState } from "react";
import React from "react";

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

export default function AmenitiesDropDown({
  setFieldValue,
  selectedService,
  isInRoom,
  initialAmenitiesFromRooms,
  initialAmenitiesFromServices,
  ...props
}: any) {
  const { allAmenities, allAmenitiesPending } = useSelector(getAppDataSelector);

  const initialAmenitiesNames: string[] = [];
  const [personName, setPersonName] = useState<any>(
    initialAmenitiesNames || []
  );

  useEffect(() => {
    if (isInRoom) {
      allAmenities.map((am) => {
        if (initialAmenitiesFromRooms.includes(am.id)) {
          initialAmenitiesNames.push(am.name);
        }
      });
    } else {
      allAmenities.map((am) => {
        if (initialAmenitiesFromServices.includes(am.id)) {
          initialAmenitiesNames.push(am.name);
        }
      });
    }
  }, []);

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
    const selectedName = event.target.value as string;

    const dataId: number[] = [];
    allAmenities.map((am) => {
      if (selectedName.includes(am.name)) {
        dataId.push(am.id);
      }
      am.name === selectedName;
    });

    if (isInRoom) {
      setFieldValue(`amenities`, dataId);
    } else {
      setFieldValue(`amenitiesId`, dataId);
    }
  };

  return (
    <StyledFormControl fullWidth {...props}>
      <StyledSelect
        id="multiple-checkbox"
        labelId="demo-multiple-checkbox-label"
        multiple
        value={personName}
        onChange={handleChange}
        renderValue={(selected: any) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {allAmenitiesPending ? (
          <CircularProgress style={{ color: COLORS.THEME_COLOR }} />
        ) : (
          allAmenities.map((name: any) => (
            <StyledMenuItem key={name.name} value={name.name}>
              <Checkbox
                checked={personName.indexOf(name.name) > -1}
                color="success"
              />
              <ListItemText primary={name.name} />
            </StyledMenuItem>
          ))
        )}
      </StyledSelect>
    </StyledFormControl>
  );
}
