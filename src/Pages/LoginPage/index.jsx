import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/auth.context';
import './style.css'
import Typography from '@mui/material/Typography';
import InstagramIcon from '@mui/icons-material/Instagram';



const API_URL = 'http://localhost:5005';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const {storeToken, authenticateUser} = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please fill out all fields!');
      return;
    }

    axios
      .post(`${API_URL}/auth/login`, { email, password })
      .then((response) => {
        // Saves JWT to localStorage
        storeToken(response.data.authToken);
        setSuccessMessage('Login successful! Redirecting...');
        authenticateUser();
        setTimeout(() => navigate('/'), 2000); 
      })
      .catch((error) => {
        setErrorMessage('An error occurred or invalid credentials. Please try again.');
        console.error(error);
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        '& .MuiTextField-root': { m: 1, width: '50ch' },
        display: 'flex',
        flexDirection: 'column'
      }}
      autoComplete="off"
    >
      <div>
        {errorMessage && <p>{errorMessage}</p>}
        {successMessage && <p>{successMessage}</p>}
        <TextField
          required
          id="standard-email-input"
          label="Email"
          type="text"
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </div>
      
    </Box>
    
  );
}