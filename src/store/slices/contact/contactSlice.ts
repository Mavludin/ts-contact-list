import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../..';
import {
  addContact,
  ContactItem,
  deleteContact,
  editContact,
  fetchContacts,
} from './contactApi';

export type ContactState = {
  list: ContactItem[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null | undefined;
};

const initialState: ContactState = {
  list: [],
  status: 'idle',
  error: '',
};

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // cases for fethings contacts
      .addCase(fetchContacts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload) {
          state.list = action.payload;
          state.error = '';
        }
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = action.error.message;
        }
      })

      // cases for deleting a single contact
      .addCase(deleteContact.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload) {
          state.list = state.list.filter(
            (contact) => contact.id !== action.payload
          );
          state.error = '';
        }
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = action.error.message;
        }
      })

      // cases for addings a single contact
      .addCase(addContact.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload) {
          state.list = [...state.list, action.payload];
          state.error = '';
        }
      })
      .addCase(addContact.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = action.error.message;
        }
      })

      // cases for editing a single contact
      .addCase(editContact.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editContact.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload) {
          state.list = state.list.map((contact) => {
            if (contact.id === action.payload.id) {
              return action.payload;
            }

            return contact;
          });
          state.error = '';
        }
      })
      .addCase(editContact.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export const selectContactList = (state: RootState) => state.contact.list;
export const selectContactStatus = (state: RootState) => state.contact.status;
export const selectContactError = (state: RootState) => state.contact.error;

export default contactSlice.reducer;
