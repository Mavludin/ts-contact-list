import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { fetchUsers, UserItem } from './userApi';

export type UserState = {
  data: UserItem | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null | undefined;
};

const initialState: UserState = {
  data: JSON.parse(localStorage.getItem('userData') || '{}'),
  status: 'idle',
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        if (action.payload) {
          state.data = action.payload;
          localStorage.setItem('userData', JSON.stringify(action.payload));
          state.error = '';
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export const selectUserData = (state: RootState) => state.user.data;
export const selectUserStatus = (state: RootState) => state.user.status;
export const selectUserError = (state: RootState) => state.user.error;

export default userSlice.reducer;
