/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link as ScrollLink } from 'react-scroll';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css'








function Homepage() {
    const [showButton, setShowButton] = useState(false);

    const handleScroll = () => {
        setShowButton(window.pageYOffset > 100);

    };

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <div style={{
                position: 'absolute',
                width: '100vw',
                margin: 'auto',
                left: 'calc(-50vw + 49%)',
                zIndex: '-1',
                top: '0',
                my: '0',

            }}>
                <div className="wave-container">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">

                        <path fill="#91d1cf"
                            fillOpacity="1"
                            d="M0,192L48,208C96,224,192,256,288,234.7C384,213,480,139,576,122.7C672,107,768,149,864,176C960,203,1056,213,1152,213.3C1248,213,1344,203,1392,197.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                           
                        ></path>
                    </svg>
                </div>
            </div>
            <Box
                id="banner"
                sx={{
                    height: '80vh',
                    my: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                }}>

                <Carousel style={{ width: '90%' }} interval={3000}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/Images/banner1.jpg"
                            alt="First slide"
                        />

                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/Images/banner2.jpg"
                            alt="Second slide"
                        />

                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/Images/banner3.jpg"
                            alt="Second slide"
                        />

                    </Carousel.Item>
                </Carousel>
            </Box>

            <Box
                id="about"
                sx={{
                    height: '80vh',
                    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: 'rgba(0, 0, 0, 0.6)',
                    position: 'relative',
                }}>

                <Box sx={{
                    textAlign: 'left',
                    width: '650px',
                }}>
                    <Typography variant='body1'>
                        <Typography variant='h2' >Sobre Nós</Typography>
                        Nascida em 2021, a nossa Associação foi criada para promover uma cultura comunitária que potencia todo o potencial do bairro do Príncipe Real, em Lisboa.
                        Criamos e promovemos sinergias entre os vários intervenientes do bairro, como residentes, partes interessadas, proprietários de lojas, entidades públicas e todos aqueles que têm uma ligação direta ou indireta à nossa área - Príncipe Real.
                        <br />
                        <br />
                        Somos uma associação sem fins lucrativos regida por direito privado, com personalidade jurídica. Queremos contribuir para a qualidade de vida no Príncipe Real, preservando a sua essência e características tão singulares.
                        Potenciar as dinâmicas comunitárias do bairro, cruzando atividades, interesses e necessidades são alguns dos nossos objetivos. Assim como criar novas relações entre aqueles que aqui vivem, trabalham, as instituições e o comércio local, numa sinergia criativa e familiar.
                        <br />
                        <br />
                        Queremos conhecer a todos.
                        Recuperar histórias de vida.
                        Resgatar as histórias do bairro.
                        Proteger os mais vulneráveis.
                        Ser uma voz de ligação com as várias entidades oficiais.
                        A Príncipe + Real será também uma plataforma de comunicação. Daremos a conhecer toda a riqueza, diversidade e atividade do bairro.
                        Faremos essa comunicação na página do Instagram e através de publicidade nas ruas.
                    </Typography>
                </Box>
                <Paper elevation={12} sx={{ borderRadius: 3 }}>
                    <Link to="https://amensagem.pt/2021/10/08/unir-a-vizinhanca-bairro-turismo-de-lisboa-principe-real/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <Card id='card1' sx={{
                            maxWidth: 345,
                            height: 500,
                            borderRadius: 3
                        }}>
                            <CardActionArea id='animation'>
                                <CardMedia
                                    component="img"
                                    height="240"
                                    image="public/Images/about-img.jpg"
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        UNIR A VIZINHANÇA NUM DOS BAIRROS MAIS TURÍSTICOS DE LISBOA
                                    </Typography>
                                    <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                                        “Não é uma associação de comerciantes, mas também não é de moradores. A ideia não é servir nenhum interesse específico, é sentir que todos pertencemos ao bairro e que, em conjunto, vale a pena entrarmos em diálogo” - Patícia Luz, da Associação Príncipe + Real.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                </Paper>
                <div style={{
                    position: 'absolute',
                    bottom: '0',
                    width: '100vw',
                    margin: 'auto',
                    left: 'calc(-50vw + 49%)',
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

            <Box
                id="marketplace"
                sx={{
                    height: '60vh',
                    my: 2,
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    alignItems: 'flex-start',
                    color: 'rgba(0, 0, 0, 0.6)',
                    position: 'relative'
                }}
            >
                <Box sx={{
                    textAlign: 'right',
                    width: '600px',
                }}>
                    <Typography variant='body1'>
                        <Typography variant='h2'>Marketplace</Typography>
                        Welcome to our Marketplace! Here, you have the opportunity to showcase your services on our website and reach a wider audience. Our platform allows you to create a listing for your services, providing a detailed description and other relevant information.
                        <br />
                        <br />
                        By joining our Marketplace, you can connect with potential clients and grow your business. Whether you offer professional services, creative solutions, or specialized expertise, our community is eager to discover what you have to offer.
                        <br />
                        <br />
                    </Typography>

                    <Link to='/marketplace'>
                        <Button>Marketplace</Button>
                    </Link>
                </Box>


            </Box>

            {/* <Box
                id="marketplace"
                sx={{
                    height: '90vh',
                    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    my: 2,
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    // justifyContent: 'space-around',
                    alignItems: 'flex-start',
                    color: 'rgba(0, 0, 0, 0.5)',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                <Box sx={{
                    textAlign: 'right',
                    width: '600px',
                    zIndex: 1,
                    position: 'relative'
                }}>
                    <Typography variant='body1'>
                        <Typography variant='h2'>Marketplace</Typography>
                        Welcome to our Marketplace! Here, you have the opportunity to showcase your services on our website and reach a wider audience. Our platform allows you to create a listing for your services, providing a detailed description and other relevant information.
                        <br />
                        <br />
                        By joining our Marketplace, you can connect with potential clients and grow your business. Whether you offer professional services, creative solutions, or specialized expertise, our community is eager to discover what you have to offer.
                        <br />
                        <br />
                    </Typography>

                    <Link to='/marketplace'>
                        <Button >MarketPlace</Button>
                    </Link>
                </Box>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 0,
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path
                            fill="#ffbcff"
                            fillOpacity="1"
                            d="M0,320L48,293.3C96,267,192,213,288,170.7C384,128,480,96,576,85.3C672,75,768,85,864,106.7C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        ></path>
                    </svg>
                </Box>
            </Box> */}



            <Zoom in={showButton}>
                <Fab
                    color="rgba(255, 188, 255)"
                    size="small"
                    aria-label="scroll back to top"
                    onClick={handleScrollToTop}
                    sx={{
                        position: 'fixed',
                        bottom: 16,
                        right: 16,
                    }}
                >
                    <KeyboardArrowUpIcon />
                </Fab>
            </Zoom>

        </div >
    )
}

export default Homepage;