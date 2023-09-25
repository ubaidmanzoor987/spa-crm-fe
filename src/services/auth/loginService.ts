import { API_SIGNIN } from "@/constants/api";
import { ILoginRequest, ILoginResponse } from "@/store/auth/types";

import { postRequest, getErrorMessage } from "../utils";

export const loginService = async ({
  email,
  password,
}: ILoginRequest): Promise<ILoginResponse> => {
  const data = {
    email,
    password,
  };

  try {
    const resp = await postRequest(API_SIGNIN, data);
    return { ...resp.data };
  } catch (err: any) {
    console.log(JSON.stringify(err.response));
    throw new Error(getErrorMessage(err));
  }
};
