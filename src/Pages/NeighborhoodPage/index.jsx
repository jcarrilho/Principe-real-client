/* eslint-disable no-unused-vars */
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function NeighborhoodPage() {
    // Write state. By default it'll be null because we don't have it yet

  return (
    <Box
                id="neighborhood"
                sx={{
                    height: '80vh',
                    // my: 2,
                    color: 'rgba(0, 0, 0, 0.6)',
                    position: 'relative',
                }}>
                <div style={{
                    position: 'absolute',
                    width: '100vw',
                    margin: 'auto',
                    left: 'calc(-50vw + 49%)',
                    zIndex: '-1',

                }}>
                    <div className="wave-container">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='svg-scroll'><path fill="#91d1cf" fillOpacity="1" d="M0,224L48,197.3C96,171,192,117,288,128C384,139,480,213,576,224C672,235,768,181,864,144C960,107,1056,85,1152,85.3C1248,85,1344,107,1392,117.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
                    </div>
                </div>
                <Typography variant='h3'>SOBRE O BAIRRO</Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    my: 2
                }}>
                    <Paper elevation={12} sx={{ borderRadius: 3 }}>
                        <Link to="https://lisboasecreta.co/10-sitios-principe-real/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <Card id='card1' sx={{
                                maxWidth: 345,
                                height: 450,
                                borderRadius: 3
                            }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="240"
                                        image="public/Images/sobre-img1.jpg"
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            10 SÍTIOS IMPERDÍVEIS NO PRÍNCIPE REAL
                                        </Typography>
                                        <Typography color="text.secondary">
                                            O Príncipe Real está cheio de coisas para ver, fazer... comer e beber. Acompanha-nos nesta viagem fantástica por este típico bairro lisboeta.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    </Paper>

                    <Paper elevation={12} sx={{ borderRadius: 3 }}>
                        <Link to="https://www.timeout.pt/lisboa/pt/compras/as-melhores-lojas-no-principe-real" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <Card sx={{
                                maxWidth: 345,
                                height: 450,
                                borderRadius: 3
                            }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="240"
                                        image="public/Images/sobre-img2.jpg"
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            COMPRAS EM LISBOA: AS MELHORES LOJAS NO PRÍNCIPE REAL
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Há que ter a carteira bem recheada para andar às compras por estes lados. É que as melhores lojas do Príncipe Real são dignas de realeza.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    </Paper>

                    <Paper elevation={12} sx={{ borderRadius: 3 }}>
                        <Link to="https://descubralisboa.com/principe-real-em-lisboa/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <Card sx={{
                                maxWidth: 345,
                                height: 450,
                                borderRadius: 3
                            }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="240"
                                        image="public/Images/sobre-img3.jpg"
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            PRÍNCIPE REAL: O QUE VISITAR NO BAIRRO LISBOETA
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Repleto de prédios tradicionais portugueses, este simpático bairro lisboeta nos últimos anos atraiu diversas lojas, restaurantes e bares com apostas mais modernas e diferentes.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    </Paper>
                </Box>
            </Box>
  )
}

export default NeighborhoodPage