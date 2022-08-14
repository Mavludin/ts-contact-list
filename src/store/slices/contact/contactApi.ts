import { createAsyncThunk } from '@reduxjs/toolkit';
import { CONTACTS_URL } from '../../../shared/constants';

export type ContactItem = {
  id: string;
  name: string;
  phone: string;
};

export const fetchContacts = createAsyncThunk<
  ContactItem[],
  void,
  { rejectValue: string }
>('contact/fetchContacts', async (_, { rejectWithValue }) => {
  const response = await fetch(CONTACTS_URL);

  if (!response.ok) {
    return rejectWithValue(
      `Ошибка при получении контактов: ${response.status} (${response.statusText})`
    );
  }

  return await response.json();
});

export const deleteContact = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('contact/deleteContact', async (id, { rejectWithValue }) => {
  const response = await fetch(`${CONTACTS_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    return rejectWithValue(
      `Ошибка при удалении: ${response.status} (${response.statusText})`
    );
  }

  return id;
});

export const addContact = createAsyncThunk<
  ContactItem,
  { name: string; phone: string },
  { rejectValue: string }
>('contact/addContact', async (newContact, { rejectWithValue }) => {
  const response = await fetch(CONTACTS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newContact),
  });

  if (!response.ok) {
    return rejectWithValue(
      `Ошибка при добавлении: ${response.status} (${response.statusText})`
    );
  }

  return await response.json();
});

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
    return rejectWithValue(
      `Ошибка при редактировании: ${response.status} (${response.statusText})`
    );
  }

  return await response.json();
});
