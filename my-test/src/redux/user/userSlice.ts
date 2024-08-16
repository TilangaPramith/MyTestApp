import { createSlice } from "@reduxjs/toolkit";
import { UserStateProps } from "../../types/index.types";

const initialState: UserStateProps = {
  name: '',
  isLogged: false,
  isRegistered: false,
  isLoading: false,
}

export const userSlice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setIsRegistered: (state, action) => {
      state.isRegistered = action.payload
    },
    setIsLogged: (state, action) => {
      state.isLogged = action.payload
    },
    setName: (state, action) => {
      state.name = action.payload
    },
  }
});

export const {
  setIsLoading,
  setIsRegistered,
  setIsLogged,
  setName,
} = userSlice.actions;

export default userSlice.reducer