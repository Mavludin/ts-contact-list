import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type AuthState = {
  isLoggedIn: boolean
}

const initialState: AuthState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');
    },
    logOut: (state, action) => {
      state.isLoggedIn = false
      localStorage.setItem('isLoggedIn', 'false');
    },
  },
});

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const { logIn } = authSlice.actions;

export default authSlice.reducer;
