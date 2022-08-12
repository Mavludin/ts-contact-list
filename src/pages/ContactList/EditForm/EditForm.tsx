import { UserOutlined } from '@ant-design/icons';
import { Form, Modal, Input, Button } from 'antd';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  ContactItem,
  editContact,
  selectContactStatus,
} from '../../../slices/contact/contactSlice';

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
  const dispatch = useAppDispatch();

  const onFinish = async ({ name, phone }: EditFormValues) => {
    if (!selectedContact) return

    await dispatch(editContact({...selectedContact, name, phone}))
    hideEditForm()
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
        name='normal_login'
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
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Номер телефона'
          />
        </Form.Item>

        <Form.Item>
          <Button
            loading={status === 'loading'}
            type='primary'
            htmlType='submit'
          >
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
