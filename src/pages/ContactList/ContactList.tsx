import { Avatar, Button, List } from 'antd';
import { useEffect, useState } from 'react';
import { Typography, Input } from 'antd';
import './ContactList.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  ContactItem,
  deleteContact,
  fetchContacts,
  selectContactList,
  selectContactStatus,
} from '../../slices/contact/contactSlice';
import { AddForm } from './AddForm/AddForm';
import { EditForm } from './EditForm/EditForm';

const { Search } = Input;
const { Title } = Typography;

export const ContactList = () => {
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(
    null
  );

  const contactList = useAppSelector(selectContactList);
  const status = useAppSelector(selectContactStatus);

  const dispatch = useAppDispatch();

  const showAddForm = () => setIsAddFormVisible(true);
  const hideAddForm = () => setIsAddFormVisible(false);

  const showEditForm = (contactItem: ContactItem) => {
    setIsEditFormVisible(true);
    setSelectedContact(contactItem);
  };
  const hideEditForm = () => setIsEditFormVisible(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  const handleDeletion = (id: string) => {
    dispatch(deleteContact(id));
  };

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className='contactList'>
      <Title>Список контактов</Title>
      <Search
        className='contactSearch'
        placeholder='Найти контакты'
        onChange={handleChange}
        enterButton
      />
      <List
        bordered
        itemLayout='horizontal'
        dataSource={contactList}
        loading={status === 'loading'}
        renderItem={(contact) => (
          <List.Item
            actions={[
              <Button
                onClick={() => showEditForm(contact)}
                key='list-loadmore-edit'
              >
                edit
              </Button>,
              <Button
                onClick={() => handleDeletion(contact.id)}
                key='list-loadmore-more'
                danger
              >
                delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
              title={contact.name}
              description={contact.phone}
            />
          </List.Item>
        )}
      />
      <Button onClick={showAddForm} type='primary' className='add-btn'>
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
