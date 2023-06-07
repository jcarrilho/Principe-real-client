/* eslint-disable no-unused-vars */
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
    return (
        
        <Box
            component="footer"
            sx={{
                py: 1,   
                textAlign: 'center',
                position: 'relative',
                color: 'rgba(0, 0, 0, 0.8)',
            
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
                    bottom: '0',
                    width: '100vw',
                    margin: 'auto',
                    left: 'calc(-50vw + 49.3%)',
                    zIndex: '-1',
                }}>
                    <div className="wave-container">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                            <defs>
                                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="rgba(0, 0, 0, 0.5)" floodOpacity="0.5" />
                                </filter>
                            </defs>
                            <path fill="#91d1cf"
                                fillOpacity="1"
                                d="M0,160L48,181.3C96,203,192,245,288,224C384,203,480,117,576,101.3C672,85,768,139,864,144C960,149,1056,107,1152,85.3C1248,64,1344,64,1392,64L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                                filter="url(#shadow)"
                            ></path>
                        </svg>
                    </div>
                </div>
           
        </Box>
    );
}

export default Footer;
