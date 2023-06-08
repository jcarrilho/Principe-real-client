import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_APP_SERVER_URL;

export default function FormPropsTextFields() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Client-side validation
    if (!firstName || !lastName || !password || !email || !phoneNumber) {
      setErrorMessage('Please fill out all fields!');
      return;
    }

    const user = {
      firstName,
      lastName,
      password,
      email,
      phoneNumber,
    };

    axios
      .post(`${API_URL}/auth/signup`, user)
      .then((response) => {
        console.log(response.data)
        setSuccessMessage('Registration successful! Redirecting to login page...');
        setTimeout(() => navigate('/login'), 2000); // redirects to '/login' page after 2 seconds
      })
      .catch((error) => {
        setErrorMessage('An error occurred. Please try again.');
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
        {/* Rest of your form here... */}

        <TextField
          required
          id="standard-required"
          label="First Name"
          variant="standard"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          required
          id="standard-disabled"
          label="Last Name"
          variant="standard"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
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
        <TextField
          required
          id="standard-read-only-input"
          label="Email"
          type="text"
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          id="standard-number"
          label="phone Number"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          value={phoneNumber}
          onChange={(e) => setphoneNumber(e.target.value)}
        />
        <Button type="submit">Submit</Button>
      </div>
    </Box>
  );
}