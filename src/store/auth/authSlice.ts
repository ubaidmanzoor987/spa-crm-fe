import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { UserState, User, IRole, ILoginRequest } from "./types";
import { loginService } from "@/services/auth/loginService";

export const signIn = createAsyncThunk(
  "users/login",
  async (requestData: ILoginRequest) => {
    return await loginService(requestData);
  }
);

const getInitialValues = () => {
  let user = {} as User;
  let token = "" as string;
  let isAuthenticated = false;
  if (typeof window !== "undefined") {
    let localStorageUser = localStorage.getItem("user") as any;
    if (localStorageUser) {
      localStorageUser = JSON.parse(localStorageUser);
      user = localStorageUser;
      isAuthenticated = true;
    }
    let localStorageToken = localStorage.getItem("token") as string;
    if (localStorageToken) {
      localStorageToken = JSON.parse(localStorageToken);
      token = localStorageToken;
    }
  }

  return {
    user,
    token,
    isAuthenticated,
  };
};

export const initialState: UserState = {
  user: getInitialValues().user,
  token: getInitialValues().token,
  isAuthenticated: getInitialValues().isAuthenticated,
  status: "",
  error: "",
  isNavigated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state: UserState, { payload }: PayloadAction<User>) {
      state.user = payload;
    },
    setToken(state: UserState, { payload }: PayloadAction<string>) {
      state.token = payload;
    },
    clearError(state: UserState) {
      state.error = "";
    },
    resetUser: () => {
      return initialState;
    },
    resetStatus: (state: UserState) => {
      state.status = "";
    },
    setIsNavigated(state: UserState, { payload }: PayloadAction<boolean>) {
      state.isNavigated = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(signIn.rejected, (state, { error }) => {
      state.status = "rejected";
      state.isAuthenticated = false;
      state.error = error.message;
    });

    builder.addCase(signIn.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem(
        "user",
        JSON.stringify(action.payload.user)
      );
      localStorage.setItem(
        "token",
        JSON.stringify(action.payload.token)
      );
    });
  },
});

export const { resetUser, setUser, setToken, clearError, resetStatus, setIsNavigated } =
  authSlice.actions;

export default authSlice.reducer;
