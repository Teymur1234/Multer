import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserType {
  email: string;
  userName: string;
  profilePic: string;
  balance: number;
  _id: string;
}

const initialState: UserType = {
  email: "",
  userName: "",
  profilePic: "",
  balance: 0,
  _id: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>): void => {
      const user = action.payload;
      state.email = user.email;
      state.userName = user.userName;
      state.profilePic = user.profilePic;
      state.balance = user.balance;
      state._id = user._id;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
