/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// /* eslint-disable no-undef */
// /* eslint-disable no-unused-vars */
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions } from '@mui/material';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import './index.css'
import Paper from '@mui/material/Paper';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import Slide from '@mui/material/Slide';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import { AuthContext } from '../../Context/auth.context';
import { useParams, useNavigate } from 'react-router-dom';





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
  const [services, setServices] = useState([]);
  const { loggedIn, user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [image, setImage] = useState('');
  const [email, setEmail] = useState('');

  const {serviceId} = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !contactNumber || !image || !email) {

      setErrorMessage('Please fill out all fields!');
    }
  }



  // console.log(loggedIn);

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


  // function that gets services via axios
  const getAllServices = () => {
    axios
      .get(`${API_URL}/api/services`)
      .then((response) => setServices(response.data))
      .catch((error) => console.log(error))
  };

  useEffect(() => {
    getAllServices();
  }, []);

  // ADMIN SESSION ------------------------------------------------------------------------------------------------------------

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      aria-autocomplete='off'>
      {user.role == "poster" ? (
        <div id='services-wrap'>
          {services.map((service) => {
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
                        <Button size="small" color="primary">
                          Delete2
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
                label="Contact Number"
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="file"
                accept="image/*"
                id="image"
                onChange={handleImageUpload}
                value={image}
                onSubmit={(e) => setEmail(e.target.value)}
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

        // POSTER SESSION ---------------------------------------------------------------------------------------------------------

      ) : (<div id='services-wrap'>
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
          };

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
              });
          };

          return (


            <div key={service._id} >
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

                        <Button onClick={() => updateService(service._id)} size="small" color="primary">
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
      </div>)
      }
    </Box >
  )
}

// import React, { useState } from 'react';
// import axios from 'axios';
// import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';

// const API_URL = 'http://localhost:5005'; 

// const MarketplacePage = () => {
//   const [open, setOpen] = useState(false);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [contactNumber, setContactNumber] = useState('');
//   const [email, setEmail] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Perform validation on the input fields
//     if (!title || !description || !contactNumber || !email) {
//       setErrorMessage('Please fill out all fields!');
//       return;
//     }

//     // Create a new service object
//     const newService = {
//       title,
//       description,
//       contactNumber,
//       email,
//     };

//     // Send the new service data to the server
//     axios
//       .post(`${API_URL}/api/services`, newService)
//       .then(() => {
//         // Service created successfully, you can perform any necessary actions
//         // such as updating the UI or displaying a success message.
//         // getAllServices(); // Refresh the list of services
//         handleClose(); // Close the service creation form
//       })
//       .catch((error) => {
//         console.log(error);
//         // Handle the error case if the service creation fails.
//       });
//   };

//   return (
//     <div>
//       {/* Button to open the service creation form */}
//       <Button variant="contained" color="primary" onClick={handleClickOpen}>
//         Create a new service
//       </Button>

//       {/* Dialog for the service creation form */}
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">{"CREATE A NEW SERVICE"}</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             Welcome to our service posting platform! With this form, you can showcase your services on our website. Once you submit the form, our admin team will review your submission and approve it for listing on our platform. We are excited to have you share your expertise with our community! 😀
//           </DialogContentText>
//           <form onSubmit={handleSubmit}>
//             <TextField
//               autoFocus
//               margin="dense"
//               id="title"
//               label="Service Title"
//               fullWidth
//               required
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />
//             <TextField
//               margin="dense"
//               id="description"
//               label="Service Description"
//               fullWidth
//               multiline
//               rows={3}
//               inputProps={{ maxLength: 500 }}
//               required
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />

//             <TextField
//               margin="dense"
//               id="phone-number"
//               label="Contact Number"
//               fullWidth
//               type="tel"
//               required
//               value={contactNumber}
//               onChange={(e) => setContactNumber(e.target.value)}
//             />

//             <TextField
//               margin="dense"
//               id="email"
//               label="Email Address"
//               fullWidth
//               type="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />

//             {errorMessage && <p>{errorMessage}</p>}

//             <DialogActions>
//               <Button onClick={handleClose} color="primary">
//                 Cancel
//               </Button>
//               <Button type="submit" color="primary">
//                 Create
//               </Button>
//             </DialogActions>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default MarketplacePage;
