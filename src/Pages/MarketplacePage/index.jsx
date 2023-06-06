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
import './index.css'
import Paper from '@mui/material/Paper';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import Slide from '@mui/material/Slide';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import Tooltip from '@mui/material/Tooltip';




const API_URL = 'http://localhost:5005'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  // Perform image upload logic here
};


export default function MarketplacePage() {

  const [open, setOpen] = useState(false);
  const {loggedIn, user} = useContext(AuthContext);

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

  const [services, setServices] = useState([]);

  // function that gets services via axios
  const getAllServices = () => {
    axios
      .get(`${API_URL}/api/services`)
      .then((response) => setServices(response.data))
      .catch((error) => console.log(error))
  };

  useEffect(() => {
    getAllServices()
  }, [])

  return (
    <div id='services-wrap'>
      {services.map((service) => {
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
                  borderRadius: 3,

                }}>

                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="200"
                      image="/Images/img1.jpg"
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
                    <Button onClick={() => deleteService(service._id)} size="small" color="primary">
                      Delete
                    </Button>
                    <Button onClick={handleClickOpen} size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            </Paper>

          </div>
        )
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
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            fullWidth
            type='email'
            required
          />
          <input
            type="file"
            accept="image/*"
            id="image"
            onChange={handleImageUpload}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Create</Button>
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
