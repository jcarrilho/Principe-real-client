/* eslint-disable no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll';
import './index.css'
import { useContext, useState } from 'react';
import { AuthContext } from '../../Context/auth.context';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import TextField from '@mui/material/TextField';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const API_URL = import.meta.env.VITE_APP_SERVER_URL;

function HideOnScroll(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { children, window } = props;

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

export default function Navbar(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [open, setOpen] = useState(false);
    const [phoneNumber, setphoneNumber] = useState('');
    const [openSignupDialog, setOpenSignupDialog] = useState(false);



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSignupOpen = () => {
        setOpenSignupDialog(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const signUpClose = () => {
        setOpenSignupDialog(false);
    };


    const navigate = useNavigate();
    const location = useLocation()

    const { loggedIn, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate('/');
    };


    const { storeToken, authenticateUser } = useContext(AuthContext);



    const handleSignup = (e) => {
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
                setSuccessMessage('Registration successful!');
                signUpClose();
            })
            .catch((error) => {
                setErrorMessage('An error occurred. Please try again.');
                console.error(error);
            });
    };

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
                // setSuccessMessage('Login successful! Redirecting...');
                authenticateUser();
                setTimeout(() => navigate('/marketplace'), 2000);
                handleClose();
            })
            .catch((error) => {
                setErrorMessage('An error occurred or invalid credentials. Please try again.');
                console.error(error);
            });

    }

    return (
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll {...props}>

                <AppBar sx={{ backgroundColor: '#8ec9c7', boxShadow: 'none' }}>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link to="/">
                                <img src='/Images/logo 1.png' style={{ width: '150px', height: 'auto', filter: 'brightness(0) invert(1)' }} />
                            </Link>
                        </Typography>
                        {/* <Link to="/">
                            {location.pathname !== '/' && <Button id="navbar-btn">Home</Button>}
                        </Link> */}
                        {location.pathname === '/' ?
                            loggedIn ?
                                <>
                                    <ScrollLink to="about" smooth={true} duration={50}>
                                        <Button id="navbar-btn">About Us</Button>
                                    </ScrollLink>
                                    <ScrollLink to="neighborhood" smooth={true} duration={50}>
                                        <Button id="navbar-btn">Neighborhood</Button>
                                    </ScrollLink>
                                    <ScrollLink to="marketplace" smooth={true} duration={50}>
                                        <Button id="navbar-btn">MarketPlace</Button>
                                    </ScrollLink>
                                    <Link to="/profile">
                                        <Button id="navbar-btn">Profile</Button>
                                    </Link>
                                </>
                                :
                                <>
                                    <ScrollLink to="about" smooth={true} duration={50}>
                                        <Button id="navbar-btn">About Us</Button>
                                    </ScrollLink>
                                    <ScrollLink to="neighborhood" smooth={true} duration={50}>
                                        <Button id="navbar-btn">Neighborhood</Button>
                                    </ScrollLink>
                                    <ScrollLink to="marketplace" smooth={true} duration={50}>
                                        <Button id="navbar-btn">MarketPlace</Button>
                                    </ScrollLink>

                                    <Button id="navbar-btn" onClick={handleClickOpen}>Login</Button>
                                    <Button id="navbar-btn" onClick={handleSignupOpen}>Sign Up</Button>



                                </>
                            : null
                        }

                        {location.pathname === '/marketplace' ?
                            loggedIn ?
                                <>
                                    <Link to="/">
                                        <Button id="navbar-btn">Back to home</Button>
                                    </Link>
                                    <Link to="/profile">
                                        <Button id="navbar-btn">Profile</Button>
                                    </Link>
                                </>
                                :
                                <>
                                    <Link to="/">
                                        <Button id="navbar-btn">Back to home</Button>
                                    </Link>
                                </>
                            : null
                        }

                       

                        {location.pathname === '/signup' && <Link to="/">
                            <Button id="navbar-btn">Back to home</Button>
                        </Link>}


                        {location.pathname === '/profile' &&
                            <>
                                <Link to="/">
                                    {location.pathname !== '/' && <Button id="navbar-btn">Back to home</Button>}
                                </Link>
                                <Link to="/marketplace">
                                    <Button id="navbar-btn">Marketplace</Button>
                                </Link>
                                <Button id="navbar-btn" onClick={handleLogout}>Logout</Button>

                            </>
                        }

                        <Dialog
                            open={open}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose}
                            aria-describedby="alert-dialog-slide-description"
                            sx={{
                                margin: 'auto',
                            }}
                        >
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                margin: 'auto',
                                backgroundColor: 'whitesmoke',

                            }}>
                                <DialogTitle sx={{ margin: 'auto', fontSize: '2rem', color: '#29584b' }}>Welcome!</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-slide-description">
                                        <Box
                                            component="form"
                                            onSubmit={handleSubmit}
                                            sx={{
                                                '& .MuiTextField-root': { m: 1, width: '50ch' },
                                                display: 'flex',
                                                flexDirection: 'column',

                                            }}
                                            autoComplete="off"
                                        >
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center'
                                            }}>
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
                                            </div>

                                        </Box>
                                    </DialogContentText>
                                </DialogContent>
                            </Box>
                            <DialogActions sx={{ backgroundColor: 'whitesmoke' }}>
                                <Box sx={{ color: '#fff' }}>
                                    <Button onClick={handleSubmit} sx={{
                                        color: '#29584b',
                                        '&:hover': {
                                            transform: 'translateY(-0.500rem)',
                                            transition: 'transform 500ms',
                                        }
                                    }}>Login</Button>
                                    <Button onClick={handleClose} sx={{
                                        color: '#29584b',
                                        '&:hover': {
                                            transform: 'translateY(-0.500rem)',
                                            transition: 'transform 500ms',
                                        }
                                    }}>Cancel</Button>
                                </Box>
                            </DialogActions>
                        </Dialog>

                        {/* --------------------------------------------------------------------- */}
                        <Dialog
                            open={openSignupDialog}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose}
                            aria-describedby="alert-dialog-slide-description"
                            sx={{
                                margin: 'auto',
                            }}
                        >
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                margin: 'auto',
                                backgroundColor: 'whitesmoke',

                            }}>
                                <DialogTitle sx={{ margin: 'auto', fontSize: '2rem', color: '#29584b' }}>Sign Up</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-slide-description">
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

                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center'
                                            }}>

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
                                                    id="standard-read-only-input"
                                                    label="Phone Number"
                                                    type="text"
                                                    variant="standard"
                                                    value={phoneNumber}
                                                    onChange={(e) => setphoneNumber(e.target.value)}
                                                />
                                                {/* <Button type="submit">Submit</Button> */}
                                               
                                            </div>
                                        </Box>
                                    </DialogContentText>
                                </DialogContent>
                            </Box>
                            <DialogActions sx={{ backgroundColor: 'whitesmoke' }}>
                                <Box sx={{ color: '#fff' }}>
                                <Button type='submit' onClick={handleSignup} sx={{
                                        color: '#29584b',
                                        '&:hover': {
                                            transform: 'translateY(-0.500rem)',
                                            transition: 'transform 500ms',
                                        }
                                    }}>Sign Up</Button>
                                    <Button type='submit' onClick={signUpClose} sx={{
                                        color: '#29584b',
                                        '&:hover': {
                                            transform: 'translateY(-0.500rem)',
                                            transition: 'transform 500ms',
                                        }
                                    }}>Cancel</Button>
                                </Box>
                            </DialogActions>
                        </Dialog>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />

        </React.Fragment>

    );
}


