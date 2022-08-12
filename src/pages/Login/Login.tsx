import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Typography } from 'antd';
import { useState } from 'react';
import { MyRoutes, USERS_URL } from '../../shared/constants';

import { Alert } from 'antd';

import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { logIn } from '../../slices/auth/authSlice';

const { Title } = Typography;

type LoginValues = {
  userName: string;
};

type UserItem = {
  name: string;
  username: string;
  email: string;
  avatar: string;
  id: string;
};

export const Login = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFinish = async ({ userName }: LoginValues) => {
    setIsLoading(true);

    const response = await fetch(USERS_URL);
    const usersList: UserItem[] = await response.json();

    const foundUser = usersList.find((user) => user.username === userName);

    if (!foundUser) {
      setError('Такого пользователя не существует!');
    } else {
      setError('');
      dispatch(logIn());
      navigate(MyRoutes.Contacts);
    }

    setIsLoading(false);

    console.log('foundUser', foundUser);
  };

  return (
    <Form
      name='normal_login'
      className='login-form'
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
          loading={isLoading}
          type='primary'
          htmlType='submit'
          className='login-form-button'
        >
          Вход
        </Button>
      </Form.Item>

      {error && (
        <Alert message='Такого пользователя не существует' type='error' />
      )}
    </Form>
  );
};
