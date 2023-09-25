import { useDispatch, useSelector } from "react-redux";
import { IRole } from "@/store/auth/types";
import SharedLayout from "@/components/layout/shared-layout";
import BookingComponent from "./component";
import { getAuthDataSelector } from "@/store/auth";
import { useEffect } from "react";
import { getAllBookingsThunk } from "@/store/app/appSlice";

export default function Booking() {
  const dispatch = useDispatch();
  const {
    user: { role },
  } = useSelector(getAuthDataSelector);

  useEffect(() => {
    dispatch(getAllBookingsThunk());
  }, []);

  if (role === IRole.RECECPTIONIST) {
    return <></>;
  }

  return <SharedLayout children={<BookingComponent />} title={"Booking"} />;
}
