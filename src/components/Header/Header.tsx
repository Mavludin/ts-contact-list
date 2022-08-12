import { LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { MyRoutes } from '../../shared/constants';
import { logOut } from '../../slices/auth/authSlice';
import s from './Header.module.css';

export const Header = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigate(MyRoutes.Login);
  }

  return (
    <header className={s.header}>
      <div>
        <span>Пользователь, </span>
        <Button
          type="primary"
          icon={<LogoutOutlined />}
          size="small"
          onClick={handleLogout}
        >
          Выход
        </Button>
      </div>
    </header>
  )
}