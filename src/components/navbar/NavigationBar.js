import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Container} from "react-bootstrap";

const NavigationBar = () => {
    return (
        <Navbar bg="light" expand="lg">
                <Container>
            <Navbar.Brand href="/home"><h1>Magnus.one</h1></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/blogs">Blogs</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            <Nav.Link href="/timer">Timer</Nav.Link>
                </Container>
        </Navbar>
    )
};

export default NavigationBar;