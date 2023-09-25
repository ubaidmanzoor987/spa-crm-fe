import { COLORS } from "@/constants/colors";
import styled from "@emotion/styled";

export const StyledCheckbox = styled.label`
  margin-top: 10px;
  input[type="checkbox"] {
    -ms-transform: scale(1.5); /* IE */
    -moz-transform: scale(1.5); /* FF */
    -webkit-transform: scale(1.5); /* Safari and Chrome */
    -o-transform: scale(1.5); /* Opera */
    transform: scale(1.5);
    padding: 5px;
    accent-color: ${COLORS.GREEN_THEME};
  }

  .label {
    font-weight: 600;
    margin-left: 5px;
  }
`;
