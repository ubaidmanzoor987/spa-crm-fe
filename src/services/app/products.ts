import { API_CREATE_PRODUCTS, API_CREATE_SERVICE, API_DELETE_PRODUCTS, API_DELETE_SERVICE, API_GET_ALL_PRODUCTS, API_GET_ALL_SERVICES, API_UPDATE_PRODUCTS, API_UPDATE_SERVICE } from "@/constants/api";
import { IProduct } from "@/store/app/types";

import { getRequest, getErrorMessage, postRequest, patchRequest, deleteRequest } from "../utils";

export const getAllProducts = async (): Promise<Array<IProduct>> => {
  try {
    const resp = await getRequest(API_GET_ALL_PRODUCTS);
    return resp.data;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};
export const addNewProduct = async (data: IProduct): Promise<IProduct> => {
  try {
    const resp = await postRequest(API_CREATE_PRODUCTS, data);
    return resp.data;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};

export const updateProduct = async (data: IProduct): Promise<IProduct> => {
  try {
    const resp = await patchRequest(API_UPDATE_PRODUCTS, data);
    return resp.data;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};

export const deleteProduct = async (id: number | string): Promise<IProduct> => {
  try {
    const resp = await deleteRequest(API_DELETE_PRODUCTS, id);
    return resp.data;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};