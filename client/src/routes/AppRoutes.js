import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Signup from '../pages/Signup';
import Book from '../pages/Book';
import Profile from '../pages/Profile';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route
            path='dashboard'
            element={
              <PrivateRoute redirectTo='/login'>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path='book'
            element={
              <PrivateRoute redirectTo='/login'>
                <Book />
              </PrivateRoute>
            }
          />
          <Route
            path='profile'
            element={
              <PrivateRoute redirectTo='/login'>
                <Profile />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
