import { useDispatch, useSelector } from "react-redux";
import SharedLayout from "@/components/layout/shared-layout";
import { getAuthDataSelector } from "@/store/auth";
import { useEffect } from "react";
import { getAllBranchThunk } from "@/store/app/appSlice";
import BranchsComponent from "./component";

export default function BranchsPage() {
  const dispatch = useDispatch();
  const {
    user: { role },
  } = useSelector(getAuthDataSelector);

  useEffect(() => {
    dispatch(getAllBranchThunk());
  }, []);

  return <SharedLayout children={<BranchsComponent />} title={"Branch Setting"} />;
}
