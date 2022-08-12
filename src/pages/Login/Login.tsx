import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Typography } from 'antd';
import { MyRoutes} from '../../shared/constants';

import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logIn } from '../../slices/auth/authSlice';
import { fetchUsers, selectUserStatus } from '../../slices/user/userSlice';

const { Title } = Typography;

type LoginValues = {
  userName: string;
};

export const Login = () => {

  const status = useAppSelector(selectUserStatus);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFinish = async ({ userName }: LoginValues) => {
    try {
      const isUserFound = await dispatch(fetchUsers(userName)).unwrap();

      if (isUserFound) {
        dispatch(logIn());
        navigate(MyRoutes.Contacts);
      }
    } catch (err) {
      console.log(err)
    }
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
          loading={status === 'loading'}
          type='primary'
          htmlType='submit'
          className='login-form-button'
        >
          Вход
        </Button>
      </Form.Item>

    </Form>
  );
};
