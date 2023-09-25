import * as React from "react";
import { StyledCheckbox } from "./index.styles";

export default function FieldCheckbox({ field, label, initialFeildData }: any) {
  return (
    <StyledCheckbox>
      <input {...field} type="checkbox" checked={initialFeildData}/>
      <span className="label">{label}</span>
    </StyledCheckbox>
  );
}
