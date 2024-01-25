import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container,  } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { logout } from './slices/authSlice';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WhatsAppIcon from './components/WhatsappButton';
import { useNavigate } from 'react-router-dom';


const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const expirationTime = localStorage.getItem('expirationTime');
    if (expirationTime) {
      const currentTime = new Date().getTime();
      const parsedExpirationTime = parseInt(expirationTime, 10);
      if (currentTime > parsedExpirationTime) {
        dispatch(logout());
        navigate('/login');
      }
    }
  }, [dispatch, navigate]);

  return (
    <>
      <ToastContainer />
      <Header />
      <main className='py-3'>
        <Container>
          <Outlet />
        </Container>
      </main>
      <WhatsAppIcon />
      <Footer />
    </>
  );
};

export default App;