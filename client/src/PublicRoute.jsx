import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  return user ? <Navigate to="/" /> : children;
}
