import { PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Modal, Input, Button, Alert } from 'antd';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  ContactItem,
  editContact,
} from '../../../store/slices/contact/contactApi';
import {
  selectContactError,
  selectContactStatus,
} from '../../../store/slices/contact/contactSlice';

type EditFormValues = {
  name: string;
  phone: string;
};

type Props = {
  isEditFormVisible: boolean;
  hideEditForm: () => void;
  selectedContact: ContactItem | null;
};

export const EditForm = ({
  isEditFormVisible,
  hideEditForm,
  selectedContact,
}: Props) => {
  const status = useAppSelector(selectContactStatus);
  const error = useAppSelector(selectContactError);
  const dispatch = useAppDispatch();

  const onFinish = async ({ name, phone }: EditFormValues) => {
    if (!selectedContact) return;

    await dispatch(editContact({ ...selectedContact, name, phone }))
      .unwrap()
      .then(hideEditForm);
  };

  return (
    <Modal
      title='Редактирование контакта'
      visible={isEditFormVisible}
      onCancel={hideEditForm}
      width={400}
      centered
      footer={null}
    >
      <Form
        initialValues={{
          name: selectedContact?.name,
          phone: selectedContact?.phone,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name='name'
          rules={[
            { required: true, message: 'Пожалуйста введите имя контакта' },
          ]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Название контакта'
          />
        </Form.Item>

        <Form.Item
          name='phone'
          rules={[
            { required: true, message: 'Пожалуйста введите номер телефона' },
          ]}
        >
          <Input
            prefix={<PhoneOutlined className='site-form-item-icon' />}
            placeholder='Номер телефона'
          />
        </Form.Item>

        <Form.Item>
          <Button
            loading={status === 'loading'}
            type='primary'
            htmlType='submit'
            style={{ width: '100%' }}
          >
            Сохранить
          </Button>
        </Form.Item>
      </Form>
      {error && <Alert message={error} type='error' />}
    </Modal>
  );
};
