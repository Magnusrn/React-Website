import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Container } from "react-bootstrap";
import styles from "./NavigationBar.module.css";

const NavigationBar = () => {
  //dynamically adjust opacity of navbar on scroll
  let changeOpacity = () => {
    var element = document.getElementsByClassName(styles.navbarHolder)[1];
    element.style.backgroundColor = `rgba(80, 80, 80, ${
      window.scrollY / 100
    })`;
  };
  window.addEventListener("scroll", changeOpacity);

  return (
    <div>
        <Navbar className={styles.navbarHolder} expand="sm">
          <Container fluid className={styles.navbarHolder}>
            <Navbar.Brand href="/">
              <h1>MN</h1>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
                <Nav.Link href="/blog">Blog</Nav.Link>
                <Nav.Link href="/contact">Contact</Nav.Link>
                <Nav.Link href="/timer">Timer</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </div>
  );
};

export default NavigationBar;
