import * as yup from "yup";

export const roomModel = yup.object().shape({
  name: yup.string().required("Required service name."),
  amenities: yup.array().required("Amenities id are required"),
  // is_third_party: yup.boolean().oneOf([true], "your message"),
});
