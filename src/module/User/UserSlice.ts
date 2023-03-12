import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiStatus, IUser, IUserForm, IUserState } from "./User.type";
import { getUserListApi, registerUserApi } from "./UserService";

const initialState: IUserState = {
  list: [],
  listStatus: ApiStatus.ideal,
  createUserFormStatus: ApiStatus.ideal,
};

export const getUserListAction = createAsyncThunk(
  "user/getUserListAction",
  async () => {
    const response = await getUserListApi();
    return response.data;
  }
);

export const registerUserAction = createAsyncThunk(
  "user/registerUserListAction",
  async (data: IUserForm) => {
    const response = await registerUserApi(data);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetCreateListStatus: (state) => {
      state.createUserFormStatus = ApiStatus.ideal;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserListAction.pending, (state) => {
      state.listStatus = ApiStatus.loading;
    });
    builder.addCase(getUserListAction.fulfilled, (state, action) => {
      state.listStatus = ApiStatus.ideal;
      state.list = action.payload;
    });
    builder.addCase(getUserListAction.rejected, (state) => {
      state.listStatus = ApiStatus.error;
    });

    builder.addCase(registerUserAction.pending, (state) => {
      state.createUserFormStatus = ApiStatus.loading;
    });
    builder.addCase(registerUserAction.fulfilled, (state) => {
      state.createUserFormStatus = ApiStatus.success;
    });
    builder.addCase(registerUserAction.rejected, (state) => {
      state.createUserFormStatus = ApiStatus.error;
    });
  },
});

export default userSlice.reducer;

export const { resetCreateListStatus } = userSlice.actions;
