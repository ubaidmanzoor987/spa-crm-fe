import { API_GET_ALL_THERAPSIT } from "@/constants/api";
import { IAmenities, IStaff } from "@/store/app/types";

import {
  getRequest,
  getErrorMessage,
  postRequest,
  patchRequest,
  deleteRequest,
} from "../utils";

export const getAllTherapsit = async (): Promise<Array<IStaff>> => {
  try {
    const resp = await getRequest(API_GET_ALL_THERAPSIT, "therapist");
    return resp.data;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};

// export const addNewAmenities = async (
//   data: IAmenities
// ): Promise<IAmenities> => {
//   try {
//     const resp = await postRequest(API_CREATE_AMENITIES, data);
//     return resp.data.amenitie;
//   } catch (err: any) {
//     throw new Error(getErrorMessage(err));
//   }
// };

// export const updateAmenities = async (
//   data: IAmenities
// ): Promise<IAmenities> => {
//   try {
//     const resp = await patchRequest(API_UPDATE_AMENITIES, data);
//     return resp.data.amenitie;
//   } catch (err: any) {
//     throw new Error(getErrorMessage(err));
//   }
// };

// export const deleteAmenities = async (id: number | string): Promise<IAmenities> => {
//   try {
//     const resp = await deleteRequest(API_DELETE_AMENITIES, id);
//     return resp.data.amenitie;
//   } catch (err: any) {
//     throw new Error(getErrorMessage(err));
//   }
// };
