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
      <Box
            component="footer"
            sx={{
                py: 3,
                textAlign: 'center',
                position: 'absolute',
                color: 'rgba(0, 0, 0, 0.8)',
                width: '100%', 
                bottom: 0,
                right: '1px'
            
            }}
        >
            <Typography variant="h6" component="h2">
                Contactos
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '1rem',
                    mt: 2,
                }}
            >
                <Typography variant="body1" sx={{ textDecoration: 'none' }}>

                    <a href="mailto:principemaisreal@gmail.com"  style={{textDecoration: 'none', color: 'rgba(255, 255, 255, 1.0)'}}> principemaisreal@gmail.com </a> |  +351 968 335 641 |  Praça do Príncipe Real 22 1º, 1250-184 Lisboa
                </Typography>

            </Box>

            <Box sx={{
                mt: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
            }}>
                <Typography variant="body1">Follow us</Typography>
                <a
                    href="https://www.instagram.com/principemaisreal/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <InstagramIcon fontSize="medium" color="primary" />
                </a>
            </Box>
            <div style={{
                    position: 'absolute',
                    // bottom: 0,
                    width: '100vw',
                    margin: 'auto',
                    left: 'calc(-51vw + 49%)',
                    zIndex: '-1',
                    bottom: '-50px',
                    overflow: 'hidden'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#91d1cf" fillOpacity="1" d="M0,160L48,181.3C96,203,192,245,288,224C384,203,480,117,576,101.3C672,85,768,139,864,144C960,149,1056,107,1152,85.3C1248,64,1344,64,1392,64L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
                </div>
        </Box>
    </Box>
    
  );
}