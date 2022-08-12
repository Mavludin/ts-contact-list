import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CONTACTS_URL } from '../../shared/constants';

export type ContactItem = {
  id: string;
  name: string;
  phone: string;
};

export type ContactState = {
  list: ContactItem[];
  status: 'idle' | 'loading' | 'failed';
};

const initialState: ContactState = {
  list: [],
  status: 'idle',
};

export const fetchContacts = createAsyncThunk(
  'contact/fetchContacts',
  async () => {
    const response = await fetch(CONTACTS_URL);
    return await response.json();
  }
);

export const deleteContact = createAsyncThunk(
  'contact/deleteContact',
  async (id: string) => {
    await fetch(`${CONTACTS_URL}/${id}`, {
      method: 'DELETE',
    });
    return id;
  }
);

export const addContact = createAsyncThunk(
  'contact/addContact',
  async (newContact: { name: string; phone: string }) => {
    const response = await fetch(CONTACTS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContact),
    });
    return await response.json();
  }
);

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
        state.status = 'idle';
        if (action.payload) {
          state.list = action.payload;
        }
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(deleteContact.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload) {
          state.list = state.list.filter(
            (contact) => contact.id !== action.payload
          );
        }
      })
      .addCase(deleteContact.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(addContact.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload) {
          state.list = [...state.list, action.payload];
        }
      })
      .addCase(addContact.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectContactList = (state: RootState) => state.contact.list;
export const selectContactStatus = (state: RootState) => state.contact.status;

export default contactSlice.reducer;
