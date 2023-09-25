import * as yup from "yup";

export const bookingModal = yup.object().shape({
  id: yup.string(),
  date_time: yup.date().required("Please select Date"),
  service_detail: yup.array().of(
    yup.object().shape({
      room_id: yup.string().required("Please Select Room"),
      service_id: yup.string().required("Please Select Service"),
      // start_time: yup.string().required("Please Select Start Time"),
      selected_duration: yup.string().required("Please Select Start Time"),
      // end_time: yup.string().required("Please Select End Time"),
      therapists: yup
        .array()
        .min(1, "Therapists are required")
        .of(yup.string().required("Therapists are required")),
    })
  ),
  // actual_price: yup.string().required("Actual Price is Required"),
  // paid_price: yup.string().required("Paid Price is Required"),
  // payment_method: yup
  //   .array()
  //   .required()
  //   .min(1, "Payment Method is Required")
  //   .max(1, "Select one at a time"),
  // driver_commission: yup.string().when("is_driver_commission", {
  //   is: (val: any) => val.includes("yes"),
  //   then: yup.string().required("required"),
  // }),
  customer_detail: yup.object().shape({
    phone: yup.string().required("Please Add Phone Number"),
    // email: yup.string().email("Enter Valid Email").required("Please Add Email"),
    // name: yup.string().required("Please Enter Name"),
  }),
});
