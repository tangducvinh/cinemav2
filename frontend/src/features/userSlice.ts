import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { STATUS_CODES } from "http";

interface IUserState {
  name: string;
  token: string;
}

const initialState: IUserState = {
  name: "",
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDataUser: (state, action) => {
      const { name, token } = action.payload;

      state.name = name;
      state.token = token;
    },
  },
});

export const { setDataUser } = userSlice.actions;
export default userSlice.reducer;
