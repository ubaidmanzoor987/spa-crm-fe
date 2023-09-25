import FullPageLoader from "@/components/fullPageLoader";
import { useAppSelector } from "@/hooks/useReduxTypedHooks";
import { IRole } from "@/store/auth/types";
import { AppState } from "@/store/rootReducer";
import dynamic from "next/dynamic";
import router from "next/router";
import React, { useEffect } from "react";

const DynamicBranch = dynamic(
  () => import("@/components/pages-partials/branch"),
  {
    ssr: false,
    loading: () => <FullPageLoader />,
  }
);

export default function Branch() {
  const role = useAppSelector((state: AppState) => state.auth.user.role);

  useEffect(() => {
    if (role!==IRole.SUPER_ADMIN) {
      router.push("/dashboard");
    } 
  }, []);
  return <DynamicBranch />;
}
