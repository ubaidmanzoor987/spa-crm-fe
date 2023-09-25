import {
  API_GET_ALL_BRANCH,
  API_CREATE_BRANCH,
  API_UPDATE_BRANCH,
  API_DELETE_BRANCH,
  API_GET_BRANCH,
  API_GET_ALL_CURRENCY,
} from "@/constants/api";
import { IBranchs, ICurrency } from "@/store/app/types";

import {
  getRequest,
  getErrorMessage,
  postRequest,
  deleteRequest,
  putRequest,
} from "../utils";

export const getAllBranchs = async (): Promise<Array<IBranchs>> => {
  try {
    const resp = await getRequest(API_GET_ALL_BRANCH);
    return resp.data;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};
export const getAllCurrency = async (): Promise<Array<ICurrency>> => {
  try {
    const resp = await getRequest(API_GET_ALL_CURRENCY);
    return resp.data;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};
export const getBranch = async (id: number | string): Promise<IBranchs> => {
  try {
    const resp = await getRequest(API_GET_BRANCH, id);

    return resp.data;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};
export const addNewBranch = async (data: IBranchs): Promise<IBranchs> => {
  try {
    const resp = await postRequest(API_CREATE_BRANCH, data);
    return resp.data;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};

export const updateBranch = async (data: IBranchs): Promise<IBranchs> => {
  try {
    const resp = await putRequest(API_UPDATE_BRANCH, data);
    return resp.data;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};

export const deleteBranch = async (id: number | string): Promise<IBranchs> => {
  try {
    const resp = await deleteRequest(API_DELETE_BRANCH, id);
    return resp.data;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};
