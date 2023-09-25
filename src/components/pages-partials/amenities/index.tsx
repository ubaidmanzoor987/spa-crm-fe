import { useSelector } from "react-redux";
import { IRole } from "@/store/auth/types";
import SharedLayout from "@/components/layout/shared-layout";
import AmenitiesComponent from "./component";
import { getAuthDataSelector } from "@/store/auth";

export default function AmenitiesPage() {
  const {
    user: { role },
  } = useSelector(getAuthDataSelector);

  if (role === IRole.RECECPTIONIST) {
    return <></>;
  }

  return <SharedLayout children={<AmenitiesComponent />} title={"Amenities"} />;
}
