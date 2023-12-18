import React from 'react'
// outlet on top
// An <Outlet> should be used in parent route elements to render their child route elements.
// This allows nested UI to show up when child routes are rendered.
// If the parent route matched exactly, it will render a child index route or nothing,
// if there is no index route.
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';


const App = () => {
  return (
    <>
      <Header />
      {/* p - sets padding across a container
      y - sets padding vertically across a container, that is both padding-top and padding-bottom
      x - sets padding horizontally across a container, that is both padding-left and padding-right */}
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
    
  )
}

export default App;
