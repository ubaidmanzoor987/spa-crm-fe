import {
  API_CREATE_ROOM,
  API_DELETE_ROOM,
  API_GET_ALL_ROOMS,
  API_UPDATE_ROOM,
} from "@/constants/api";
import { IRoom } from "@/store/app/types";

import {
  getRequest,
  getErrorMessage,
  postRequest,
  patchRequest,
  deleteRequest,
} from "../utils";

export const getAllRooms = async (): Promise<Array<IRoom>> => {
  try {
    const resp = await getRequest(API_GET_ALL_ROOMS);
    return resp.data;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};

export const addNewRoom = async (data: IRoom): Promise<IRoom> => {
  try {
    const resp = await postRequest(API_CREATE_ROOM, data);
    return resp.data.room;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};

export const updateRoom = async (data: IRoom): Promise<IRoom> => {
  try {
    const resp = await patchRequest(API_UPDATE_ROOM, data);
    return resp.data.room;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};

export const deleteRoom = async (id: number | string): Promise<IRoom> => {
  try {
    const resp = await deleteRequest(API_DELETE_ROOM, id);
    return resp.data.room;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};
