import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import { Link, Outlet } from 'react-router-dom';
import Logo from '../images/logo.png';


function Home() {
    return (
        <>
            <Navbar bg='dark' variant='dark'>
                <Container >
                    <Navbar.Brand href="/">
                        <img id="logo"
                            alt='Lofi-Logo'
                            style={{ width: 50, height: 50, borderRadius: '25px' }}
                            src={Logo}
                            className="d-inline-block align-top"
                        />{' '}
                        <span style={{ color: 'rgb(98, 255, 98)' }}>MyFace</span>
                    </Navbar.Brand>
                </Container>
                <Container>
                    <Nav className='me-auto'>
                        <Link to='/signup' className='nav-link'>
                            Sign Up
                        </Link>
                        <Link to='/signin' className='nav-link'>
                            Sign In
                        </Link>
                        <Link to='/posts' className='nav-link'>
                            Feed
                        </Link>
                    </Nav>
                </Container>
            </Navbar>
            <Stack gap={3} className='col-md-10 mx-auto mt-3'>
                <Outlet />
            </Stack>
        </>
    );
}


export default Home