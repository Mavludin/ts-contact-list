import { createAsyncThunk } from '@reduxjs/toolkit';
import { USERS_URL } from '../../../shared/constants';

export type UserItem = {
  name: string;
  username: string;
  email: string;
  avatar: string;
  id: string;
};

export const fetchUsers = createAsyncThunk<
  UserItem,
  string,
  { rejectValue: string }
>('user/fetchUsers', async (userNameFromInput, { rejectWithValue }) => {
  try {
    const response = await fetch(USERS_URL);

    if (!response.ok) {
      return rejectWithValue(`${response.status}: ${response.statusText}`);
    }

    const usersList = (await response.json()) as UserItem[];
    const foundUser = usersList.find(
      ({ username }) => username === userNameFromInput
    );

    if (!foundUser) {
      return rejectWithValue('Данный пользователь не существует');
    }

    return foundUser;
  } catch (err) {
    return rejectWithValue(err);
  }
});
