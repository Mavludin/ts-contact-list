import { Alert, Button, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
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
  const [error, setError] = useState('');

  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(
    null
  );

  const [filteredList, setFilteredList] = useState<ContactItem[] | null>(null);

  const dispatch = useAppDispatch();

  const showAddForm = () => setIsAddFormVisible(true);
  const hideAddForm = () => setIsAddFormVisible(false);

  const hideEditForm = () => setIsEditFormVisible(false);

  useEffect(() => {
    dispatch(fetchContacts())
      .unwrap()
      .then(() => setError(''))
      .catch((err) => setError(err));
  }, [dispatch]);

  return (
    <div className={s.contactList}>
      <Title>Список контактов</Title>
      <SearchForm setFilteredList={setFilteredList} />
      {error && (
        <Alert style={{ marginBottom: '20px' }} message={error} type='error' />
      )}
      <ContactList
        filteredList={filteredList}
        setIsEditFormVisible={setIsEditFormVisible}
        setSelectedContact={setSelectedContact}
        setError={setError}
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
