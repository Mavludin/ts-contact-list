import { Avatar, Button, List } from 'antd';
import { useEffect } from 'react';
import { Typography, Input } from 'antd';
import './ContactList.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchContacts,
  selectContactList,
} from '../../slices/contact/contactSlice';

const { Search } = Input;
const { Title } = Typography;

export const ContactList = () => {
  const contactList = useAppSelector(selectContactList);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
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
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button key='list-loadmore-edit'>edit</Button>,
              <Button key='list-loadmore-more'>delete</Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
              title={item.name}
              description={item.phone}
            />
          </List.Item>
        )}
      />
      <Button type='primary' className='add-btn'>
        Добавить новый контакт
      </Button>
    </div>
  );
};
