import {
  API_GET_ALL_STAFF,
  API_CREATE_STAFF,
  API_UPDATE_STAFF,
  API_DELETE_STAFF,
} from "@/constants/api";
import { IStaff } from "@/store/app/types";

import {
  getRequest,
  getErrorMessage,
  postRequest,
  deleteRequest,
  putRequest,
} from "../utils";

export const getAllStaff = async (): Promise<Array<IStaff>> => {
  try {
    const resp = await getRequest(API_GET_ALL_STAFF);
    return resp.data;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};

export const addNewStaff = async (data: IStaff): Promise<IStaff> => {
  try {
    const resp = await postRequest(API_CREATE_STAFF, data);
    return resp.data.user;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};

export const updateStaff = async (data: IStaff): Promise<IStaff> => {
  try {
    const resp = await putRequest(API_UPDATE_STAFF, data);
    return resp.data.user;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};

export const deleteStaff = async (id: number | string): Promise<IStaff> => {
  try {
    const resp = await deleteRequest(API_DELETE_STAFF, id);
    return resp.data.user;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};
