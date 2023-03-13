import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiStatus, IUpdateUserActionProps, IUser, IUserForm, IUserState } from "./User.type";
import { deleteUserApi, getUserListApi, registerUserApi, updateUserApi } from "./UserService";

const initialState: IUserState = {
  list: [],
  listStatus: ApiStatus.ideal,
  createUserFormStatus: ApiStatus.ideal,
  updateUserFormStatus: ApiStatus.ideal,
};

export const getUserListAction = createAsyncThunk(
  "user/getUserListAction",
  async () => {
    const response = await getUserListApi();
    return response.data;
  }
);

export const registerUserAction = createAsyncThunk(
  "user/registerUserAction",
  async (data: IUserForm) => {
    const response = await registerUserApi(data);
    return response.data;
  }
);

export const deleteUserAction = createAsyncThunk(
  "user/deleteUserAction",
  async (id: number) => {
    const response = await deleteUserApi(id);
    return id;
  }
);

export const updateUserAction = createAsyncThunk(
  "user/updateUserAction",
  async ({id, data}: IUpdateUserActionProps) => {
    const response = await updateUserApi(id, data);
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


    builder.addCase(deleteUserAction.fulfilled, (state, action) => {
      const newList = state.list.filter(x => x.id !== action.payload)
      state.list = newList;
    });


    builder.addCase(updateUserAction.pending, (state, action) => {
      state.updateUserFormStatus = ApiStatus.loading
    });
    builder.addCase(updateUserAction.fulfilled, (state, action) => {
      state.updateUserFormStatus = ApiStatus.ideal
    });
    builder.addCase(updateUserAction.rejected, (state, action) => {
      state.updateUserFormStatus = ApiStatus.error
    });

  },
});

export default userSlice.reducer;

export const { resetCreateListStatus } = userSlice.actions;
