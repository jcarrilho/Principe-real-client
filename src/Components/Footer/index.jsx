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
                    </div>
                    <img src='/Images/wave (3).svg'/>
                </div>
           
        </Box>
    );
}

export default Footer;


