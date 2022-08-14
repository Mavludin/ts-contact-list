import { Alert, Button } from 'antd';
import { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectContactError, selectContactList } from '../../store/slices/contact/contactSlice';
import { AddForm } from './AddForm/AddForm';
import { EditForm } from './EditForm/EditForm';
import { SearchForm } from './SearchForm/SearchForm';
import { PlusCircleOutlined } from '@ant-design/icons';
import {
  ContactItem,
  fetchContacts,
} from '../../store/slices/contact/contactApi';
import { ContactList } from './ContactList/ContactList';

import s from './Contacts.module.css';

const { Title } = Typography;

export const Contacts = () => {
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(
    null
  );

  const contactList = useAppSelector(selectContactList);
  const error = useAppSelector(selectContactError);
  const [filteredList, setFiltered] = useState<ContactItem[]>(contactList);
  const [isFiltering, setIsFiltering] = useState(false);

  const dispatch = useAppDispatch();

  const showAddForm = () => setIsAddFormVisible(true);
  const hideAddForm = () => setIsAddFormVisible(false);

  const hideEditForm = () => setIsEditFormVisible(false);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={s.contactList}>
      <Title>Список контактов</Title>
      <SearchForm setFiltered={setFiltered} setIsFiltering={setIsFiltering} />
      {error && <Alert style={{ marginBottom: '20px' }} message={error} type='error' />}
      <ContactList
        filteredList={filteredList}
        isFiltering={isFiltering}
        setIsEditFormVisible={setIsEditFormVisible}
        setSelectedContact={setSelectedContact}
      />

      <Button
        icon={<PlusCircleOutlined />}
        onClick={showAddForm}
        type='primary'
        className={s.addBtn}
      >
        Добавить новый контакт
      </Button>
      {isAddFormVisible && (
        <AddForm
          isAddFormVisible={isAddFormVisible}
          hideAddForm={hideAddForm}
        />
      )}
      {isEditFormVisible && (
        <EditForm
          isEditFormVisible={isEditFormVisible}
          hideEditForm={hideEditForm}
          selectedContact={selectedContact}
        />
      )}
    </div>
  );
};
