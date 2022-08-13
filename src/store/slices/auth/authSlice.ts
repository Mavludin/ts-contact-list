import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../..';

export type AuthState = {
  isLoggedIn: boolean;
};

const initialState: AuthState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state) => {
      state.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      localStorage.setItem('isLoggedIn', 'false');
    },
  },
});

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
