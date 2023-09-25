import {
  API_GET_ALL_BOOKING,
  API_CREATE_BOOKING,
  API_UPDATE_BOOKING,
  API_DELETE_BOOKING,
  API_GET_BOOKING,
  API_GET_PRINT_BOOKING,
  API_UPDATE_BOOKING_STATUS,
} from "@/constants/api";
import { IBooking, IBookings, IBookingStatus } from "@/store/app/types";

import {
  getRequest,
  getErrorMessage,
  postRequest,
  deleteRequest,
  putRequest,
  patchRequest,
} from "../utils";

export const getAllBookings = async (): Promise<Array<IBookings>> => {
  try {
    const resp = await getRequest(API_GET_ALL_BOOKING);
    return resp.data;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};

export const getBookingbyId = async (id: number | string): Promise<IBooking> => {
  try {
    const resp = await getRequest(API_GET_BOOKING, id);
    return resp.data.booking;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};

export const getPrintBookingbyId = async (id: number | string): Promise<IBooking> => {
  try {
    const resp = await getRequest(API_GET_PRINT_BOOKING, id);
    return resp.data.booking;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};

export const addNewBooking = async (data: IBooking): Promise<IBooking> => {
  try {
    const resp = await postRequest(API_CREATE_BOOKING, data);
    return resp.data.booking;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};

export const updateBooking = async (data: IBooking): Promise<IBooking> => {
  try {
    const resp = await patchRequest(API_UPDATE_BOOKING, data);
    return resp.data.booking;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};

export const updateBookingStatus = async (data: IBookingStatus): Promise<IBookingStatus> => {
  try {
    const resp = await patchRequest(API_UPDATE_BOOKING_STATUS, data);
    return resp.data.booking;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};

export const deleteBooking = async (id: number | string): Promise<IBooking> => {
  try {
    const resp = await deleteRequest(API_DELETE_BOOKING, id);
    return resp.data.booking;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};
