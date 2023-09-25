import { useDispatch, useSelector } from "react-redux";
import { IRole } from "@/store/auth/types";
import SharedLayout from "@/components/layout/shared-layout";
import ServiceComponent from "./component";
import { getAuthDataSelector } from "@/store/auth";
import { useEffect } from "react";
import { getAllServicesThunk } from "@/store/app/appSlice";

export default function Service() {
  const dispatch = useDispatch();
  const {
    user: { role },
  } = useSelector(getAuthDataSelector);

  useEffect(() => {
    dispatch(getAllServicesThunk());
  }, []);

  if (role === IRole.RECECPTIONIST) {
    return <></>;
  }

  return <SharedLayout children={<ServiceComponent />} title={"Services"} />;
}
