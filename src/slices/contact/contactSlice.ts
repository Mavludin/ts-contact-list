import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CONTACTS_URL } from '../../shared/constants';

type ContactItem = {
  id: string;
  name: string;
  phone: string;
};

export type ContactState = {
  list: ContactItem[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ContactState = {
  list: [],
  status: 'idle',
};

export const fetchContacts = createAsyncThunk(
  "contact/fetchContacts",
  async () => {
    const response = await fetch(CONTACTS_URL);
    return await response.json();
  }
)

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchContacts.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchContacts.fulfilled, (state, action) => {
      if (action.payload) {
        state.list = action.payload;
      }
    })
    .addCase(fetchContacts.rejected, (state) => {
      state.status = 'failed';
    });
  }
});

export const selectContactList = (state: RootState) => state.contact.list;

export default contactSlice.reducer;
