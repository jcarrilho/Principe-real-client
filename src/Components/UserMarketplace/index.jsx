/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions } from '@mui/material';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Context/auth.context';
import '../../Pages/MarketplacePage/index.css';
import Paper from '@mui/material/Paper';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import Slide from '@mui/material/Slide';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';

import './index.css'

const API_URL = import.meta.env.VITE_APP_SERVER_URL;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



function UserMarketPlace() {
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [image, setImage] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const { loggedIn, user } = useContext(AuthContext);

  //  this method handles the file upload 
  const handleFileUpload = async (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
    try {
      const uploadData = new FormData();
      uploadData.append("image", e.target.files[0]);
      const response = await axios.post(`${import.meta.envAPI_URL}/upload`, uploadData);
      console.log(response.data.fileUrl);
      setImage(response.data.fileUrl);
    } catch (error) {
      console.log(error);
    }
  };



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

  const handleSubmit = () => {
    setSuccess(false);
    let role = user.role;
    let requestBody = { title, description, contactNumber, image, email, role }
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

  // function that gets services via axios
  const getAllServices = () => {
    axios
      .get(`${API_URL}/api/services`)
      .then((response) => setServices(response.data))
      .catch((error) => console.log(error))
  };


  useEffect(() => {
    getAllServices()
  }, [success])


  return (
    <div className='scroll' id='services-wrap' style={{
      backgroundColor: 'rgba(142, 201, 199, 0.2)',
      borderRadius: '15px',
      marginTop: '10px',
      height: '85vh',
      overflowY: 'scroll',
    }}>
    
      {services && services.map((service) => {
        if (service.status == "approved") {
          const deleteService = (serviceId) => {
            axios.delete(`${API_URL}/api/services/${serviceId}`)
              .then(() => {
                // Service deleted successfully, you can perform any necessary actions
                // such as updating the UI or displaying a success message.
                getAllServices(); // Refresh the list of services
              })
              .catch((error) => {
                console.log(error);
                // Handle the error case if the service deletion fails.
              });

            const updateService = (serviceId) => {
              axios.update(`${API_URL}/api/services/${serviceId}`)
                .then(() => {
                  // Service deleted successfully, you can perform any necessary actions
                  // such as updating the UI or displaying a success message.
                  getAllServices(); // Refresh the list of services
                })
                .catch((error) => {
                  console.log(error);
                  // Handle the error case if the service deletion fails.
                })
            };
          };

          return (
            <div key={service._id}>
              <Paper elevation={10} sx={{ borderRadius: 3 }}>
                <Box>
                  <Card sx={{
                    maxWidth: 345,
                    mt: 4,
                    my: 2,
                    borderRadius: 3,

                  }}>

                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="200"
                        image='/Images/img1.jpg'
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {service.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {service.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      {/* <Button onClick={() => deleteService(service._id)} size="small" color="primary">
                        Delete
                      </Button> */}

                    </CardActions>
                  </Card>
                </Box>
              </Paper>

            </div>
          )
        }
      })}

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"CREATE A NEW SERVICE"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Welcome to our service posting platform! With this form, you can showcase your services on our website. Once you submit the form, our admin team will review your submission and approve it for listing on our platform. We are excited to have you share your expertise with our community! 😀
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Service Title"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            id="description"
            label="Service Description"
            fullWidth
            multiline
            rows={3}
            inputProps={{ maxLength: 500 }}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <TextField
            margin="dense"
            id="phone-number"
            label="Phone Number"
            fullWidth
            type='tel'
            inputProps={{
              pattern: "[0-9]{10,15}",
              title: "Enter a valid phone number"
            }}
            required
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            fullWidth
            type='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input type="file"
            onChange={(e) => handleFileUpload(e)} />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleSubmit}>Create</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>


      <Box sx={{ '& > :not(style)': { m: 1 }, position: 'fixed', right: 20, bottom: 10 }} onClick={handleClickOpen}>
        <Tooltip
          title="Create a new service"
          placement="left"
        >
          <Box >
            <Fab sx={{
              backgroundColor: '#91d1cf',
              '&:hover': {
                backgroundColor: '#66a29e'
              }
            }} aria-label="add"
            >
              <AddIcon sx={{ color: 'white', fontSize: '32px' }} />
            </Fab>
          </Box>
        </Tooltip>
      </Box>
    </div>

  )
}

export default UserMarketPlace