import SharedLayout from "@/components/layout/shared-layout";
import { IRole } from "@/store/auth/types";

import BranchAdminDashboard from "./branchAdmin";
import { useAppSelector } from "@/hooks/useReduxTypedHooks";
import { getAuthDataSelector } from "@/store/auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setIsNavigated } from "@/store/auth/authSlice";

export default function Dashboard() {
  const dispatch = useDispatch();

  const {
    user: { role },
  } = useAppSelector(getAuthDataSelector);

  useEffect(() => {
    dispatch(setIsNavigated(true));
  }, []);

  const Layout = () => {
    if (role === IRole.SUPER_ADMIN) {
      return <>Super Admin</>;
    }
    return <BranchAdminDashboard />;
  };

  return <SharedLayout children={<Layout />} title={"Dashborad"} />;
}
