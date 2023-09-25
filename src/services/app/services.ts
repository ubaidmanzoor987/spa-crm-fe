import { API_CREATE_SERVICE, API_DELETE_SERVICE, API_GET_ALL_SERVICES, API_UPDATE_SERVICE } from "@/constants/api";
import { IService } from "@/store/app/types";

import { getRequest, getErrorMessage, postRequest, patchRequest, deleteRequest } from "../utils";

export const getAllServices = async (): Promise<Array<IService>> => {
  try {
    const resp = await getRequest(API_GET_ALL_SERVICES);
    return resp.data;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};

export const addNewService = async (data: IService): Promise<IService> => {
  try {
    const resp = await postRequest(API_CREATE_SERVICE, data);
    return resp.data.service;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};

export const updateService = async (data: IService): Promise<IService> => {
  try {
    const resp = await patchRequest(API_UPDATE_SERVICE, data);
    return resp.data.service;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};

export const deleteService = async (id: number | string): Promise<IService> => {
  try {
    const resp = await deleteRequest(API_DELETE_SERVICE, id);
    return resp.data.service;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};