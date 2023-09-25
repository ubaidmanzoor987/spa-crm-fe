import { useDispatch, useSelector } from "react-redux";
import SharedLayout from "@/components/layout/shared-layout";
import ProductsComponent from "./component";
import { getAuthDataSelector } from "@/store/auth";
import { useEffect } from "react";
import { getAllProductsThunk } from "@/store/app/appSlice";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const {
    user: { role },
  } = useSelector(getAuthDataSelector);

  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, []);

  return <SharedLayout children={<ProductsComponent />} title={"Products"} />;
}
