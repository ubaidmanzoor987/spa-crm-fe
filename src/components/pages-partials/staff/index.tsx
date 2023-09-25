import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTypedHooks";
import { getAuthDataSelector } from "@/store/auth";
import { IRole } from "@/store/auth/types";
import SharedLayout from "@/components/layout/shared-layout";
import StaffComponent from "./component";
import { getAllStaffThunk } from "@/store/app/appSlice";
import { useEffect } from "react";

export default function Staff() {
  const dispatch = useAppDispatch();
  const {
    user: { role },
  } = useAppSelector(getAuthDataSelector);

  useEffect(() => {
    dispatch(getAllStaffThunk());
  }, []);

  if (role === IRole.RECECPTIONIST) {
    return <></>;
  }
  return <SharedLayout children={<StaffComponent />} title={"Staff"} />;
}
