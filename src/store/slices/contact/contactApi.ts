import { createAsyncThunk } from '@reduxjs/toolkit';
import { CONTACTS_URL } from '../../../shared/constants';

export type ContactItem = {
  id: string;
  name: string;
  phone: string;
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

export const editContact = createAsyncThunk<
  ContactItem,
  ContactItem,
  { rejectValue: string }
>('contact/editContact', async (editedContact, { rejectWithValue }) => {
  const response = await fetch(`${CONTACTS_URL}/${editedContact.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(editedContact),
  });

  if (!response.ok) {
    return rejectWithValue(`${response.status}: ${response.statusText}`);
  }

  return await response.json();
});
