import {
   
    API_GET_ALL_CURRENCY,
  } from "@/constants/api";
  import {  ICurrency } from "@/store/app/types";
  
  import {
    getRequest,
    getErrorMessage,
  } from "../utils";
  
export const getAllCurrency = async (): Promise<Array<ICurrency>> => {
    try {
      const resp = await getRequest(API_GET_ALL_CURRENCY);
      return resp.data;
    } catch (err: any) {
      throw new Error(getErrorMessage(err));
    }
  };