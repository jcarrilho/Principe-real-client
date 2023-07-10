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
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';




function Homepage() {
    const [showButton, setShowButton] = useState(false);

    const handleScroll = () => {
        setShowButton(window.pageYOffset > 100);

    };

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };



    const [page, setPage] = useState(1);

    const handlePageChange = (event, value) => {
        setPage(value);
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
                left: 'calc(-50vw + 49.4%)',
                zIndex: '-1',
                top: '0',
                my: '0',

            }}>
                <div className="wave-container">
                    <img src='/Images/wave (9).svg' />
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
                    position: 'relative',
                }}
            >


                <Paper elevation={12} sx={{
                    borderRadius: 3,
                    width: '90%',
                }}>

                    <Carousel style={{
                        "&[data-aos='fade-up']": {
                            animation: "fade-up-animation 1s ease-in-out",
                        },
                        "@keyframes fade-up-animation": {
                            "0%": {
                                opacity: 0,
                                transform: "translateY(20px)",
                            },
                            "100%": {
                                opacity: 1,
                                transform: "translateY(0)",
                            },
                        },
                    }}
                        data-aos="fade-in" data-aos-duration="2000"
                        interval={3000}>
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
                </Paper>
            </Box>

            {/* -------------------------------------ABOUT SECTION--------------------------------------------------------------------------- */}

            <Box
                id="about"
                sx={{
                    height: '100vh',
                    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: 'rgba(0, 0, 0, 0.6)',
                    position: 'relative',
                }}


            >

                <Box sx={{
                    textAlign: 'left',
                    width: '650px',
                    "&[data-aos='fade-up']": {
                        animation: "fade-up-animation 1s ease-in-out",
                    },
                    "@keyframes fade-up-animation": {
                        "0%": {
                            opacity: 0,
                            transform: "translateY(20px)",
                        },
                        "100%": {
                            opacity: 1,
                            transform: "translateY(0)",
                        },
                    },
                }}
                    data-aos="fade-right">
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
                <Paper elevation={12} sx={{
                    borderRadius: 3,
                    "&[data-aos='fade-up']": {
                        animation: "fade-up-animation 1s ease-in-out",
                    },
                    "@keyframes fade-up-animation": {
                        "0%": {
                            opacity: 0,
                            transform: "translateY(20px)",
                        },
                        "100%": {
                            opacity: 1,
                            transform: "translateY(0)",
                        },
                    },
                }}
                    data-aos="fade-left" >
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
                                    image="/Images/about-img.jpg"
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
                    left: 'calc(-50vw + 49.3%)',
                    zIndex: '-1',
                }}>
                    <div className="wave-container">
                        <img src='/Images/wave (14).svg' />

                    </div>
                </div>
            </Box>

            {/* -----------------------------------------NEIGHBORHOOD SECTION--------------------------------------------------------------------- */}


            <Box
                id="neighborhood"
                sx={{
                    height: '100vh',
                    my: -1,
                    color: 'rgba(0, 0, 0, 0.6)',
                    position: 'relative',
                }}
            >
                <div style={{
                    position: 'absolute',
                    width: '100vw',
                    margin: 'auto',
                    left: 'calc(-50vw + 49.3%)',
                    zIndex: '-1',
                    
                }}

                >
                    <div className="wave-container">
                        <img src='/Images/wave (19).svg' />
                    </div>
                </div>
                <Typography variant='h3' sx={{
                    "&[data-aos='fade-up']": {
                        animation: "fade-up-animation 1s ease-in-out",
                    },
                    "@keyframes fade-up-animation": {
                        "0%": {
                            opacity: 0,
                            transform: "translateY(20px)",
                        },
                        "100%": {
                            opacity: 1,
                            transform: "translateY(0)",
                        },
                    },
                }}
                    data-aos="fade-up"
                >SOBRE O BAIRRO</Typography>
                <Box sx={{
                    // display: 'flex',
                    // flexDirection: 'row',
                    // justifyContent: 'space-between',
                    my: 2,

                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        my: 2,
                      



                        "&[data-aos='fade-up']": {
                            animation: "fade-up-animation 1s ease-in-out",
                        },
                        "@keyframes fade-up-animation": {
                            "0%": {
                                opacity: 0,
                                transform: "translateY(20px)",
                            },
                            "100%": {
                                opacity: 1,
                                transform: "translateY(0)",
                            },
                        },
                    }}
                        data-aos="fade-up" >
                        {page === 1 && (
                            < >
                                <Paper elevation={12} sx={{ borderRadius: 3, }}>
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
                                                    image="/Images/sobre-img1.jpg"
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
                                                    image="/Images/sobre-img2.jpg"
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
                                                    image="/Images/sobre-img3.jpg"
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
                            </>
                        )}


                        {page === 2 && (
                            <>
                                <Paper elevation={12} sx={{ borderRadius: 3 }}>
                                    <Link to="https://www.publico.pt/2021/10/08/local/noticia/nasceu-associacao-principe-real-dar-voz-bairro-1980222" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                        <Card sx={{
                                            maxWidth: 345,
                                            height: 450,
                                            borderRadius: 3
                                        }}>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    height="240"
                                                    image="/Images/sobre-img4.jpg"
                                                    alt="green iguana"
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        ASSOCIÇÃO NO PRÍNCIPE REAL PARA DAR UMA VOZ AO BAIRRO
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Investidores, comerciantes e moradores juntos numa plataforma que visa proteger o Príncipe Real e, quem sabe, assumir algumas responsabilidades no futuro.
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Link>
                                </Paper>
                                <Paper elevation={12} sx={{ borderRadius: 3 }}>
                                    <Link to="https://jornaleconomico.pt/noticias/eastbanc-hotel-memmo-e-oliver-entre-os-fundadores-da-nova-associacao-principe-real-792200/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                        <Card sx={{
                                            maxWidth: 345,
                                            height: 450,
                                            borderRadius: 3
                                        }}>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    height="240"
                                                    image="/Images/sobre-img5.jpg"
                                                    alt="green iguana"
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        HOTEL MEMMO E OLIVER ENTRE OS FUNDADORES DA NOVA ASSOCIAÇÃO
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        EastBanc, Uzina, Príncipe Real Advogados, Hotel Memmo, Lacrima, Plateform, Casa Oliver, Isto, Imogávea são os membros fundadores da nova associação do Príncipe Real.
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Link>
                                </Paper>
                                <Paper elevation={12} sx={{ borderRadius: 3 }}>
                                    <Link to="https://www.timeout.pt/lisboa/pt/miudos/o-melhor-do-principe-real-para-as-criancas" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                        <Card sx={{
                                            maxWidth: 345,
                                            height: 450,
                                            borderRadius: 3
                                        }}>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    height="240"
                                                    image="/Images/sobre-img6.jpg"
                                                    alt="green iguana"
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        ONZE ATRACÇÕES PARA CRIANÇAS NO PRÍNCIPE REAL

                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        O melhor do Príncipe Real para as crianças inclui jardins, museus, lojas e restaurantes. Leve os miúdos a descobrir o bairro mais cool da cidade
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Link>
                                </Paper>
                            </>
                        )}

                    </Box>
                </Box>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',

                }}>
                    <Stack spacing={2}
                    >
                        <Pagination
                            count={2} // Replace with the total number of pages/cards
                            page={page}
                            onChange={(event, value) => setPage(value)}
                            size="small"
                        /></Stack>
                </div>
            </Box>

            {/* -----------------------------------------MARKETPLACE SECTION--------------------------------------------------------------------- */}


            <Box
                id="marketplace"
                sx={{
                    height: '80vh',
                    my: 0,
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    color: 'rgba(0, 0, 0, 0.6)',
                    position: 'relative',
                    // "&[data-aos='fade-up']": {
                    //     animation: "fade-up-animation 1s ease-in-out",
                    // },
                    // "@keyframes fade-up-animation": {
                    //     "0%": {
                    //         opacity: 0,
                    //         transform: "translateY(20px)",
                    //     },
                    //     "100%": {
                    //         opacity: 1,
                    //         transform: "translateY(0)",
                    //     },
                    // },
                }}
                data-aos="fade-left"

            >
                <Box sx={{
                    textAlign: 'right',
                    width: '600px',
                }}
                >
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
                        <Button id='marketplace-home-btn' variant="outlined" sx={{
                            backgroundColor: '#91d1cf',
                            color: 'white',
                            border: 'none',
                            '&:hover': {
                                backgroundColor: '#66a29e',
                                border: 'none'
                            }
                        }}>Marketplace</Button>
                    </Link>
                </Box>
                <div data-aos="fade-right">
                    <Paper elevation={12} sx={{ borderRadius: 3 }}>
                        <img src='/Images/img1.jpg' style={{ width: '550px' }} />
                    </Paper>
                </div>
            </Box>

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



        </div>
    )
}

export default Homepage;