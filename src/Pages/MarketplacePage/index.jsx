/* eslint-disable react/no-unknown-property */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Context/auth.context';
import './index.css'
// import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import Slide from '@mui/material/Slide';
import UserMarketPlace from '../../Components/UserMarketplace';
import AdminMarketPlace from '../../Components/AdminMarketplace';




const API_URL = import.meta.env.VITE_APP_SERVER_URL;

/*const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});*/

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  // Perform image upload logic here
};


export default function MarketplacePage() {


  const [open, setOpen] = useState(false);
  const [services, setServices] = useState([]);
  const { loggedIn, user } = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [image, setImage] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);



  const handleClickOpen = () => {
    if (loggedIn) {
      setOpen(true);
    } else {
      alert('You must be logged in to create a service.')
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () =>{
    setSuccess(false);
    let role = user.role;
    let requestBody = {title, description, contactNumber, image, email, role}
    axios.post(`${API_URL}/api/services`, requestBody)
    .then(() => {
      handleClose()
      setTitle('');
      setDescription('');
      setContactNumber('');
      setEmail('');
      setImage('');
      setSuccess(true);
    }
    )
    .catch((error) => console.log(error)) 
  }



  return (
    
    user? user.role == 'admin'? (<AdminMarketPlace jobServices={services}  handleSubmit={handleSubmit}  handleClickOpen={handleClickOpen}/>) : (<UserMarketPlace jobServices={services}  handleSubmit={handleSubmit}  handleClickOpen={handleClickOpen}/>):(<h1>Loading...</h1>)
    
  )
}
