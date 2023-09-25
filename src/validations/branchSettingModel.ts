import { style } from "@mui/system";
import * as yup from "yup";

export const branchSettingModel = yup.object().shape({
  // phone: yup.string().required("Required Phone NUmber."),
  // address: yup.string().required(" Address Required"),
  // is_third_party: yup.boolean().oneOf([true], "your message"),
});
