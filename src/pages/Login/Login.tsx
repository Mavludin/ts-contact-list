import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input, Typography } from 'antd';
import { Endpoints } from '../../shared/constants';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logIn } from '../../store/slices/auth/authSlice';
import {
  selectUserError,
  selectUserStatus,
} from '../../store/slices/user/userSlice';
import { fetchUsers } from '../../store/slices/user/userApi';

import s from './Login.module.css';
import { useCallback } from 'react';

const { Title } = Typography;

type LoginValues = {
  userName: string;
};

export const Login = () => {
  const status = useAppSelector(selectUserStatus);
  const error = useAppSelector(selectUserError);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFinish = useCallback(async ({ userName }: LoginValues) => {
    const isUserFound = await dispatch(fetchUsers(userName)).unwrap();

    if (isUserFound) {
      dispatch(logIn());
      navigate(Endpoints.Contacts);
    }
  }, [dispatch, navigate]);
  
  return (
    <Form
      className={s.loginForm}
      initialValues={{ userName: '', password: '' }}
      onFinish={onFinish}
    >
      <Title>Авторизация</Title>
      <Form.Item
        name='userName'
        rules={[{ required: true, message: 'Пожалуйста введите ваш логин' }]}
      >
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Логин'
        />
      </Form.Item>

      <Form.Item
        name='password'
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Password'
        />
      </Form.Item>

      <Form.Item>
        <Button
          loading={status === 'loading'}
          type='primary'
          htmlType='submit'
          style={{ width: '100%' }}
        >
          Вход
        </Button>
      </Form.Item>

      {error && <Alert message={error} type='error' />}
    </Form>
  );
};
