import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/auth.context';
import Button from '@mui/material/Button';

export default function LogoutButton() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Button onClick={handleLogout}>Logout</Button>
  );
}