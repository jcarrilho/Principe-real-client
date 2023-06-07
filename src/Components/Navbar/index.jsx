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
import { useContext } from 'react';
import { AuthContext } from '../../Context/auth.context';

function HideOnScroll(props) {
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

    const location = useLocation()

    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
  
    const handleLogout = () => {
      logout();
      navigate('/login');
    };
  

    return (
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll {...props}>

                <AppBar sx={{ backgroundColor: '#91d1cf', boxShadow: 'none' }}>
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
                                <Link to="/login">
                                    <Button id="navbar-btn">Login</Button>
                                </Link>
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

                        {location.pathname === '/signup' &&  <Link to="/">
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
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />

        </React.Fragment>

    );
}


