import * as yup from "yup";

export const staffModel = yup.object().shape({
  // id: yup.string().required("Enter a ID"),
  first_name: yup.string().required("Required Staff name."),
  // phone: yup.string().required("Required Phone Number"),
  // email: yup.string().required("Required Email"),
  gender: yup.string().required("Select any Gender"),
  // department:yup.string().required("Required Designation"),
});
