import { useSelector } from "react-redux";
import { getAppDataSelector } from "@/store/app";
import {
  Checkbox,
  CircularProgress,
  ListItemText,
  MenuItem,
} from "@mui/material";

import {
  StyledFormControl,
  StyledMenuItem,
  StyledSelect,
} from "./index.styles";
import { COLORS } from "@/constants/colors";
import { useEffect, useState } from "react";

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

export default function TherapsitDropDown(props: any) {
  const [personName, setPersonName] = useState<any>([]);
  const [personNameOprional, setPersonNameOprional] = useState<any>([]);
  const { allTherapist, allTherapistPending } = useSelector(getAppDataSelector);
  let {
    selectedTherapists,
    selectedOptionalTherapists,
    isSingle,
    isOptional,
    setFieldValue,
    required_therapists,
    setFieldTouched,
    therapists_commission,
    index,
    indexSingle,
    uniquesTherapists,
  } = props;
  if (!selectedTherapists || selectedTherapists === undefined) {
    selectedTherapists = [];
  }
  if (!selectedOptionalTherapists || selectedOptionalTherapists === undefined) {
    selectedOptionalTherapists = [];
  }
  const availableTherapists = allTherapist.filter(
    (therapist) => !selectedTherapists.includes(therapist.id)
  );
  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    const selecteditem = typeof value === "string" ? value.split(",") : value;

    if (selecteditem.length <= required_therapists) {
      setPersonName(selecteditem);
    }
    if (isOptional) {
      setPersonNameOprional(selecteditem);
    }
    const dataId: number[] = [];
    allTherapist.map((am) => {
      if (value.includes(am.id)) {
        dataId.push(am.id);
      }
    });
    if (isOptional) {
      setFieldValue(
        `service_detail.${indexSingle}.optional_therapists`,
        dataId
      );
      return;
    }
    setFieldValue(`service_detail.${index}.therapists`, dataId);
    setFieldValue(`therapists_commission`, []);
  };
  useEffect(() => {
    if (isOptional) {
      setPersonNameOprional(selectedOptionalTherapists);
    } else {
      setPersonName(selectedTherapists);
    }
  }, []);

  const getRenderedValue = (selected: any) => {
    const names: string[] = [];
    const namesOPtional: string[] = [];
    console.log({ names, namesOPtional });
    if (isOptional) {
      selected.forEach((select: number) => {
        const ind = allTherapist.findIndex((tp) => tp.id === select);
        if (ind > -1) {
          namesOPtional.push(allTherapist[ind]?.first_name);
        }
      });
      return namesOPtional.join(" , ");
    } else {
      selected.forEach((select: number) => {
        const ind = allTherapist.findIndex((tp) => tp.id === select);
        if (ind > -1) {
          names.push(allTherapist[ind]?.first_name);
        }
      });
      return names.join(" , ");
    }
  };
  return (
    <StyledFormControl fullWidth>
      <StyledSelect
        multiple
        MenuProps={MenuProps}
        placeholder={"Select Therapsit"}
        onChange={handleChange}
        value={!isOptional ? personName : personNameOprional}
        renderValue={getRenderedValue}
        // {...props}
      >
        {allTherapistPending ? (
          <CircularProgress style={{ color: COLORS.THEME_COLOR }} />
        ) : isOptional === true ? (
          availableTherapists
            .filter((name) => !selectedTherapists.includes(name.id))
            .map((name) => (
              <StyledMenuItem
                key={name.id}
                value={name.id}
                disabled={
                  personNameOprional.length >= required_therapists &&
                  personNameOprional.indexOf(name.id) === -1
                }
              >
                <Checkbox
                  checked={personNameOprional.includes(name.id)}
                  color="success"
                />
                <ListItemText primary={name.first_name} />
              </StyledMenuItem>
            ))
        ) : (
          allTherapist.map((name) => (
            <StyledMenuItem
              key={name.id}
              value={name.id}
              disabled={
                personName.length >= required_therapists &&
                personName.indexOf(name.id) === -1
              }
            >
              <Checkbox
                checked={personName.includes(name.id)}
                color="success"
              />
              <ListItemText primary={name.first_name} />
            </StyledMenuItem>
          ))
        )}
      </StyledSelect>
    </StyledFormControl>
  );
}
