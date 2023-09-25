import * as yup from "yup";

export const serviceModel = yup.object().shape({
  name: yup.string().required("Required service name."),
  // actual_price: yup.string().required("Required price."),
  // duration: yup.string().required("Required duration."),
  service_duration_price: yup.array().of(
    yup.object().shape({
      duration: yup.number().required("Required duration."),
      price: yup.number().required("Required price"),
    })
  ),
  // amenitiesId: yup.array().required("Enter the Amenities").min(1, "At Least Select One Ameneity"),
  required_therapist: yup.string().required("Required Therpaists"),
});
