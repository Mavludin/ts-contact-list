import { PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Modal, Input, Button, Alert } from 'antd';
import { useState, useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addContact } from '../../../store/slices/contact/contactApi';
import { selectContactStatus } from '../../../store/slices/contact/contactSlice';

type AddFormValues = {
  name: string;
  phone: string;
};

type Props = {
  isAddFormVisible: boolean;
  hideAddForm: () => void;
};

export const AddForm = ({ isAddFormVisible, hideAddForm }: Props) => {
  const dispatch = useAppDispatch();

  const [error, setError] = useState('');
  const status = useAppSelector(selectContactStatus);

  const onFinish = useCallback(async ({ name, phone }: AddFormValues) => {
    await dispatch(addContact({ name, phone }))
      .unwrap()
      .then(hideAddForm)
      .catch((err: string) => setError(err));
  }, [dispatch, hideAddForm]);

  return (
    <Modal
      title='Добавление контакта'
      visible={isAddFormVisible}
      onCancel={hideAddForm}
      width={400}
      centered
      footer={null}
    >
      <Form initialValues={{ name: '', phone: '' }} onFinish={onFinish}>
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
            Добавить
          </Button>
        </Form.Item>
      </Form>
      {error && <Alert message={error} type='error' />}
    </Modal>
  );
};
