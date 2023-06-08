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
import { Container } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
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

export default function HideAppBar(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const navigate = useNavigate();
    const location = useLocation()

    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };


    const { storeToken, authenticateUser } = useContext(AuthContext);

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
                setTimeout(() => navigate('/marketplace'), 2000);
            })
            .catch((error) => {
                setErrorMessage('An error occurred or invalid credentials. Please try again.');
                console.error(error);
            });
    };


    return (
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll {...props}>

                <AppBar sx={{ backgroundColor: '#8ec9c7', boxShadow: 'none' }}>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link to="/">
                                <img src='Pe+ºas individuais principe+real/Logo + Simbolos/logo 1.png' style={{ width: '150px', height: 'auto', filter: 'brightness(0) invert(1)' }} />
                            </Link>
                        </Typography>
                        {/* <Link to="/">
                            {location.pathname !== '/' && <Button id="navbar-btn">Home</Button>}
                        </Link> */}
                        {location.pathname === '/' &&
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

                                <Link to="/signup">
                                    <Button id="navbar-btn">Sign Up</Button>
                                </Link>
                            </>
                        }

                        {location.pathname === '/marketplace' &&
                            <>
                                <Link to="/">
                                    <Button id="navbar-btn">Back to home</Button>
                                </Link>
                                <Link to="/profile">
                                    <Button id="navbar-btn">Profile</Button>
                                </Link>
                            </>
                        }

                        {location.pathname === '/login' && <Link to="/">
                            <Button id="navbar-btn">Back to home</Button>
                        </Link>}

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
                            sx={{margin: 'auto'}}
                        >
                            <DialogTitle>Welcome!</DialogTitle>
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
                                            
                                        </div>

                                    </Box>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button  onClick={handleSubmit}>Login</Button>
                                <Button onClick={handleClose}>Agree</Button>
                            </DialogActions>
                        </Dialog>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />

        </React.Fragment>

    );
}


