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
};

const initialState: ContactState = {
  list: [],
  status: 'idle',
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
        }
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.status = 'failed';
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
        }
      })
      .addCase(deleteContact.rejected, (state) => {
        state.status = 'failed';
      })

      // cases for adding a single contact
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
        }
      })
      .addCase(editContact.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectContactList = (state: RootState) => state.contact.list;
export const selectContactStatus = (state: RootState) => state.contact.status;

export default contactSlice.reducer;
