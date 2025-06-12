import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Loading from './Loading';

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;
  return user ? children : <Navigate to="/login" />;
}