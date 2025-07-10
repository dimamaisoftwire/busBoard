import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from "react";

const Navigation = (): React.ReactElement => {
    return <Navbar expand="lg" className="bg-body-tertiary" style={{height:"10%"}}>
        <Container>
            <Navbar.Brand href="home">
                <img
                    alt=""
                    src="/icon.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                BusBoard
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="home">Home</Nav.Link>
                    <Nav.Link href="arrivals">Arrivals</Nav.Link>
                    <Nav.Link href="info">Info</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}

export {Navigation};