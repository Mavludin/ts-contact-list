import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from './store/hooks';
import { Header } from './components/Header/Header';
import { Contacts } from './pages/Contacts/Contacts';
import { Login } from './pages/Login/Login';
import { MyRoutes } from './shared/constants';
import { selectIsLoggedIn } from './store/slices/auth/authSlice';

export const AppRoutes = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <>
      {isLoggedIn && <Header />}
      <Routes>
        <Route
          path={MyRoutes.Home}
          element={
            isLoggedIn ? (
              <Navigate to={MyRoutes.Contacts} />
            ) : (
              <Navigate to={MyRoutes.Login} />
            )
          }
        />
        <Route
          path={MyRoutes.Login}
          element={isLoggedIn ? <Navigate to={MyRoutes.Contacts} /> : <Login />}
        />
        <Route
          path={MyRoutes.Contacts}
          element={
            isLoggedIn ? <Contacts /> : <Navigate to={MyRoutes.Login} />
          }
        />
      </Routes>
    </>
  );
};
