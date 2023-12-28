import React from 'react'
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/e-shop-logo.PNG';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';

const Header = () => {
    // slect the cart items state
    const { cartItems } = useSelector((state) => state.cart);
    console.log("header cartItems : ", cartItems )

    const { userInfo } = useSelector((state) => state.auth);

    const logoutHandler = () => {
    console.log('logout');
    };

  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                <Navbar.Brand>
                    <h2> e-Shop <img src={logo} alt="e-shop-shop"/> Shop</h2>
                </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <LinkContainer to="/cart">
                            <Nav.Link><FaShoppingCart/> Cart
                            {/* display the number of items in cart, using the state of cart items and lenght of it*/}
                            {cartItems.length > 0 && (
                            <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                            {cartItems.reduce((a, c) => a + c.qty, 0)}
                            </Badge>
                            )}
                            </Nav.Link>
                        </LinkContainer>
                        {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
                    </Nav>
                </Navbar.Collapse>
                </Container>
                </Navbar>
    </header>
  )
}

export default Header
