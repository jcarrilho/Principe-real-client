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
// import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import Slide from '@mui/material/Slide';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import Tooltip from '@mui/material/Tooltip';

const API_URL = 'http://localhost:5005';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const handleImageUpload = (event) => {
    const file = event.target.files[0];
    // Perform image upload logic here
};


function AdminMarketPlace() {
    const [services, setServices] = useState([]);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [image, setImage] = useState('');
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);

    const { loggedIn, user } = useContext(AuthContext);



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

    const handleUpdate = (serviceId) => {
        setSuccess(false);
        let role = user.role;
        let requestBody = { title, description, contactNumber, image, email, role };

        axios.put(`${API_URL}/api/services/${serviceId}`, requestBody)
            .then((response) => {
                const { title, description, contactNumber, email, image } = response.data;
                setTitle(title);
                setDescription(description);
                setContactNumber(contactNumber);
                setEmail(email);
                setImage(image);
                setSuccess(true);
                setOpenEditDialog(true);
            })
            .catch((error) => console.log(error));
    };


    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };


    // function that gets services via axios
    const getAllServices = () => {
        axios
            .get(`${API_URL}/api/services`)
            .then((response) => setServices(response.data))
            .catch((error) => console.log(error))
    };

    const approveService = (serviceId) => {
        axios.put(`${API_URL}/api/services/${serviceId}/accept`)
            .then(() => {
                // Service updated successfully, you can perform any necessary actions
                // such as updating the UI or displaying a success message.
                getAllServices(); // Refresh the list of services
            })
            .catch((error) => {
                console.log(error);
                // Handle the error case if the service update fails.
            });
    }


    useEffect(() => {
        getAllServices()
    }, [success])


    return (
        <div id='services-wrap'>
            <h1>Approved</h1>
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

                        {/* const updateService = (serviceId) => {
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
          }; */}

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
                                                image={service.image}
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
                                            <Button onClick={() => handleUpdate(service._id)} size="small" color="primary">
                                                Edit
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Box>
                            </Paper>

                        </div>
                    )
                }
            })}

            <Dialog
                open={openEditDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseEditDialog}
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
                    <input
                        type="file"
                        accept="image/*"
                        id="image"
                        onChange={handleImageUpload}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdate}>Update</Button>
                    <Button onClick={handleCloseEditDialog}>Cancel</Button>
                </DialogActions>
            </Dialog>

            <h1>Pending...</h1>

            {services && services.map((service) => {
                if (service.status == "pending") {
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
                                            <Button onClick={() => approveService(service._id)} size="small" color="primary">
                                                Approve
                                            </Button>
                                            <Button onClick={() => deleteService(service._id)} size="small" color="primary">
                                                Reject
                                            </Button>
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
                    <input
                        type="file"
                        accept="image/*"
                        id="image"
                        onChange={handleImageUpload}
                        required
                    />
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
            <div style={{
                    position: 'absolute',
                    bottom: '0',
                    width: '100vw',
                    margin: 'auto',
                    left: 'calc(-50vw + 50%)',
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
            
        </div>
        
    )
}

export default AdminMarketPlace