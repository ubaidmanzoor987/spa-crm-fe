import { useDispatch, useSelector } from "react-redux";
import { IRole } from "@/store/auth/types";
import SharedLayout from "@/components/layout/shared-layout";
import RoomsComponent from "./component";
import { getAuthDataSelector } from "@/store/auth";
import { useEffect } from "react";
import { getAllRoomsThunk } from "@/store/app/appSlice";

export default function RoomsPage() {
  const dispatch = useDispatch();
  const {
    user: { role },
  } = useSelector(getAuthDataSelector);

  useEffect(() => {
    dispatch(getAllRoomsThunk());
  }, []);

  if (role === IRole.RECECPTIONIST) {
    return <></>;
  }

  return <SharedLayout children={<RoomsComponent />} title={"Rooms"} />;
}
