import { Avatar, Button, List, Modal } from 'antd';

import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  ContactItem,
  deleteContact,
} from '../../../store/slices/contact/contactApi';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  selectContactList,
  selectContactStatus,
} from '../../../store/slices/contact/contactSlice';

const { confirm } = Modal;

type Props = {
  filteredList: ContactItem[] | null;
  setIsEditFormVisible: (value: boolean) => void;
  setSelectedContact: (value: ContactItem | null) => void;
  setError: (value: string) => void;
};

export const ContactList = ({
  filteredList,
  setIsEditFormVisible,
  setSelectedContact,
  setError,
}: Props) => {
  const contactList = useAppSelector(selectContactList);
  const status = useAppSelector(selectContactStatus);

  const dispatch = useAppDispatch();

  const showEditForm = (contactItem: ContactItem) => {
    setIsEditFormVisible(true);
    setSelectedContact(contactItem);
  };

  const handleDeletion = (id: string) => {
    confirm({
      title: 'Вы уверены?',
      icon: <ExclamationCircleOutlined />,
      content: 'Изменения не обратить вспять!',
      onOk() {
        dispatch(deleteContact(id))
          .unwrap()
          .then(() => setError(''))
          .catch((err) => setError(err));
      },
      onCancel() {},
      cancelText: 'Отмена',
      okText: 'Да',
    });
  };

  return (
    <List
      bordered
      itemLayout='horizontal'
      dataSource={filteredList ? filteredList : contactList}
      loading={status === 'loading'}
      renderItem={(contact) => (
        <List.Item
          actions={[
            <Button
              onClick={() => showEditForm(contact)}
              key='list-loadmore-edit'
            >
              <EditOutlined />
            </Button>,
            <Button
              onClick={() => handleDeletion(contact.id)}
              key='list-loadmore-more'
              danger
            >
              <DeleteOutlined />
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
  );
};
