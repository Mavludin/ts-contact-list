import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from './store/hooks';
import { Header } from './components/Header/Header';
import { Contacts } from './pages/Contacts/Contacts';
import { Login } from './pages/Login/Login';
import { Endpoints } from './shared/constants';
import { selectIsLoggedIn } from './store/slices/auth/authSlice';

export const AppRoutes = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <>
      {isLoggedIn && <Header />}
      <Routes>
        <Route
          path={Endpoints.Home}
          element={
            isLoggedIn ? (
              <Navigate to={Endpoints.Contacts} />
            ) : (
              <Navigate to={Endpoints.Login} />
            )
          }
        />
        <Route
          path={Endpoints.Login}
          element={isLoggedIn ? <Navigate to={Endpoints.Contacts} /> : <Login />}
        />
        <Route
          path={Endpoints.Contacts}
          element={isLoggedIn ? <Contacts /> : <Navigate to={Endpoints.Login} />}
        />
      </Routes>
    </>
  );
};
