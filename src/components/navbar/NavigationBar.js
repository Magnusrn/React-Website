import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Container} from "react-bootstrap";
import styles from "./NavigationBar.module.css"

const NavigationBar = () => {
    return (
        <div>
        <Navbar>
            <Container fluid className={styles.navbarContainer}>
            <Navbar.Brand href="/"><h1>Magnus.one</h1></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/blogs">Blogs</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            <Nav.Link href="/timer">Timer</Nav.Link>
            </Container>
        </Navbar>
        </div>
    )
};

export default NavigationBar;
//class="navbar transparent navbar-inverse navbar-fixed-top"