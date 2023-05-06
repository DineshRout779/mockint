import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const PrivateRoute = ({ children, redirectTo }) => {
  const { state } = useApp();
  return state.user ? children : <Navigate to={redirectTo} />;
};
export default PrivateRoute;
