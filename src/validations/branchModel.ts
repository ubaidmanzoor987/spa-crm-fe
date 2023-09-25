import { style } from "@mui/system";
import * as yup from "yup";

export const branchModel = yup.object().shape({
  // name: yup.string().required("Required Product name."),
  // price: yup.number().required("Required Price"),
  // is_third_party: yup.boolean().oneOf([true], "your message"),
});
