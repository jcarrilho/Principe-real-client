/* eslint-disable no-unused-vars */

import './App.css'
import HideAppBar from './Components/Navbar';
import { Routes, Route, useLocation } from 'react-router-dom';
import MarketplacePage from './Pages/MarketplacePage';
import Homepage from './Pages/Homepage';
import { Container } from '@mui/material';
import SignupPage from './Pages/SignupPage';
import Footer from './Components/Footer';
import LoginPage from './Pages/LoginPage';
import ProfilePage from './Pages/ProfilePage';
import Wave from './Components/Wave';


function App() {
  
  const location = useLocation();


  return (
    <Container>
      <HideAppBar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/marketplace' element={<MarketplacePage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
      
      {location.pathname === '/' && <Footer />}
      {location.pathname === '/profile' && <Footer />}
      {location.pathname === '/marketplace' && <Wave />}
    
    </Container>

  )
}

export default App;
