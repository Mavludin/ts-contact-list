import { LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { MyRoutes } from '../../shared/constants';
import { logOut } from '../../store/slices/auth/authSlice';
import { selectUserData } from '../../store/slices/user/userSlice';
import s from './Header.module.css';

export const Header = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userData = useAppSelector(selectUserData);

  const handleLogout = () => {
    dispatch(logOut());
    navigate(MyRoutes.Login);
  }

  return (
    <header className={s.header}>
      <div>
        <span>{userData?.username}, </span>
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
