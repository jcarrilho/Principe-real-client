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
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';
import Slide from '@mui/material/Slide';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import './index.css'

const API_URL = import.meta.env.VITE_APP_SERVER_URL;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const handleImageUpload = (event) => {
    const file = event.target.files[0];
    // Perform image upload logic here
};


function AdminMarketPlace() {
    const [services, setServices] = useState([]);
    const [service, setService] = useState('');
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

    const handleUpload = async (e) => {
        console.log(e);
        try {
            console.log('test');
            //formData === enctype=multipart/formdata
            const uploadData = new FormData();

            //add the file to the formData
            uploadData.append("image", e.target.files[0]);
            const response = await axios.post(`${API_URL}/api/upload`, uploadData);
            setImage(response.data.fileUrl);
            e.target.value = null;
            console.log(response.data.fileUrl, e);
        } catch (error) {
            console.log(error);
        }
    };

    const handleOpenUpdate = (id) => {
        setOpenEditDialog(true);
        setTitle('Loading');
        setDescription('Loading');
        setContactNumber('Loading');
        setEmail('Loading');
        setImage('Loading');
        axios
            .get(`${API_URL}/api/services/${id}`)
            .then((response) => {
                setService(response.data);
                setTitle(response.data.title ? response.data.title : '');
                setDescription(response.data.description ? response.data.description : '');
                setContactNumber(response.data.contactNumber ? response.data.contactNumber : '');
                setEmail(response.data.email ? response.data.email : '');
                setImage(response.data.image ? response.data.image : '');

            })
            .catch((error) => console.log(error))
    }

    const handleUpdate = (serviceId) => {
        setSuccess(false);
        let role = user.role;
        let requestBody = { title, description, contactNumber, email, image, role };


        axios.put(`${API_URL}/api/services/${serviceId}`, requestBody)
            .then((response) => {
                setTitle('');
                setDescription('');
                setContactNumber('');
                setEmail('');
                setImage('');
                setSuccess(true);
                getAllServices()
                setOpenEditDialog(false);
            })
            .catch((error) => console.log(error));
    };


    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    }

    // function that gets services via axios
    const getAllServices = () => {
        axios
            .get(`${API_URL}/api/services`)
            .then((response) => {
                setServices(response.data);
            })
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

        // ------------------------APPROVED SECTION -----------------------------------------------------------------
        <Paper elevation={6} sx={{ borderRadius: 3 }}>

            <div className='scroll' style={{
                backgroundColor: 'rgba(142, 201, 199, 0.2)',
                borderRadius: '15px',
                marginTop: '25px',
                height: '80vh',
                overflowY: 'scroll',
            }}
                data-aos="fade-in">

                <h1 style={{
                    margin: '10px',
                    color: '#29584b',
                    marginLeft: '25px'
                }}
                    data-aos="fade-in">Approved</h1>
                <Box id='services-wrap'>
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
                            };

                            return (

                                <div key={service._id} >
                                    <Paper elevation={10} sx={{ borderRadius: 3 }}
                                    >
                                        <Box>
                                            <Card sx={{
                                                maxWidth: 300,
                                                minWidth: 300,
                                                minHeight: 380,
                                                maxHeight: 300,
                                                mt: 3,
                                                mb: 2,
                                                borderRadius: 3,
                                                objectFit: 'cover',

                                            }}
                                            >
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        height="150"
                                                        image={service.image ? service.image : '/Images/img1.jpg'}
                                                        alt="green iguana"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div">
                                                            {service.title}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {service.description}
                                                        </Typography>
                                                        <br />
                                                        <Typography variant="body2" color="text.secondary">
                                                            <b>Contact info:</b> {service.contactNumber}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            <b>Email:</b> {service.email}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                                <div style={{
                                                    // display: 'flex',
                                                    // justifyContent: 'center',
                                                }}>
                                                    <CardActions sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center'
                                                    }}>
                                                        <Button onClick={() => deleteService(service._id)} variant="outlined" color="error" style={{
                                                            padding: '3px'
                                                        }}>
                                                            Delete
                                                        </Button>
                                                        {/* <IconButton onClick={() => deleteService(service._id)} aria-label="delete" size="large" sx={{

                                                        '&:hover': {
                                                            color: 'red'
                                                        }
                                                    }}>
                                                        <DeleteIcon sx={{
                                                            width: '30px',
                                                            height: '30px'
                                                        }} />
                                                    </IconButton> */}

                                                        <Button onClick={() => handleOpenUpdate(service._id)} size="small" sx={{
                                                            color: '#66a29e',
                                                            border: 1,
                                                            borderColor: '#66a29e',
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(102, 162, 158, 0.1)',

                                                            }
                                                        }}>
                                                            Edit
                                                        </Button>
                                                    </CardActions>
                                                </div>
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
                        <DialogTitle>{"UPDATE A SERVICE"}</DialogTitle>
                        <DialogContent>
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
                                name="image"
                                accept="image/*"
                                id="image"
                                onChange={(e) => handleUpload(e)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleUpdate(service._id)}>Update</Button>
                            <Button onClick={handleCloseEditDialog}>Cancel</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
                {/* --------------------------------PENDING SECTION------------------------------------------------------------------ */}

                <h1 style={{ margin: '5px', color: '#29584b', marginLeft: '25px' }}
                    data-aos="fade-in"> Pending...</h1>
                <Box id='services-wrap' sx={{
                    mb: 4,
                }}>

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
                                                maxWidth: 300,
                                                minWidth: 300,
                                                minHeight: 300,
                                                mt: 3,
                                                borderRadius: 3,
                                                objectFit: 'cover'

                                            }}>

                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        height="150"
                                                        image={service.image ? service.image : '/Images/img1.jpg'}
                                                        alt="green iguana"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div">
                                                            {service.title}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {service.description}
                                                        </Typography>
                                                        <br />
                                                        <Typography variant="body2" color="text.secondary">
                                                            <b>Contact info:</b> {service.contactNumber}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            <b>Email:</b> {service.email}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                }}>
                                                    <CardActions>
                                                        <IconButton onClick={() => approveService(service._id)} aria-label="check" size="large" sx={{
                                                            '&:hover': {
                                                                color: 'green'
                                                            }
                                                        }}>
                                                            <CheckIcon sx={{
                                                                width: '35px',
                                                                height: '35px'
                                                            }} />
                                                        </IconButton>
                                                        <IconButton onClick={() => deleteService(service._id)} aria-label="clear" size="large" sx={{
                                                            '&:hover': {
                                                                color: 'red'
                                                            }
                                                        }}>
                                                            <ClearIcon sx={{
                                                                width: '35px',
                                                                height: '35px'
                                                            }} />
                                                        </IconButton>
                                                    </CardActions>
                                                </div>
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
                        <DialogTitle>{"POSTAR UM NOVO SERVIÇO"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                            Bem-vindo à nossa plataforma de publicação de serviços! Com este formulário, pode divulgar os seus serviços no nosso site. Depois de submeter o formulário, a nossa equipa de administração analisará o seu envio e aprová-lo-á para listagem na nossa plataforma. Estamos entusiasmados por tê-lo a partilhar a sua experiência com a nossa comunidade! 😀
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
                                name="image"
                                onChange={(e) => handleUpload(e)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleSubmit}>Create</Button>
                            <Button onClick={handleClose}>Cancel</Button>
                        </DialogActions>
                    </Dialog>


                    <Box sx={{ '& > :not(style)': { m: 1 }, position: 'fixed', right: 30, bottom: 50 }} onClick={handleClickOpen}>
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
                </Box>

            </div >
        </Paper>

    )
}

export default AdminMarketPlace