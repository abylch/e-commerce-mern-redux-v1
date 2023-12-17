import React from 'react'
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';


const App = () => {
  return (
    <>
      <Header />
      {/* p - sets padding across a container
      y - sets padding vertically across a container, that is both padding-top and padding-bottom
      x - sets padding horizontally across a container, that is both padding-left and padding-right */}
      <main className="py-3">
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </>
    
  )
}

export default App;
