// import { useRouter } from "next/router";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTypedHooks";
// import { getAuthDataSelector } from "@/store/auth";
// import FullPageLoader from "../fullPageLoader";
// import { getAllAmenities } from "@/services/app/amenities";
import {
  getAllAmenitiesThunk,
  getAllBookingsThunk,
  getAllRoomsThunk,
  getAllServicesThunk,
  getAllTherapistThunk,
  getAllProductsThunk,
  getAllBranchThunk
} from "@/store/app/appSlice";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(getAllBookingsThunk());
    dispatch(getAllRoomsThunk());
    dispatch(getAllAmenitiesThunk());
    dispatch(getAllServicesThunk());
    dispatch(getAllTherapistThunk());
    dispatch(getAllProductsThunk());
    dispatch(getAllBranchThunk());
  }, []);

  useEffect(() => {
    if (typeof window === undefined) {
      return
    }
  })
  // const { isAuthenticated } = useAppSelector(getAuthDataSelector);

  // const router = useRouter();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push("/login");
  //   }
  // }, [router, isAuthenticated]);

  // if (!isAuthenticated) {
  //   return <FullPageLoader />;
  // }

  return <>{children}</>;
};

export default ProtectedRoute;
