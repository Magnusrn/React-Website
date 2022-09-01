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
              <Nav className="m-auto">
                <Nav.Link className={styles.navbarItem} href="/">Home</Nav.Link>
                <Nav.Link className={styles.navbarItem} href="/about">About</Nav.Link>
                <Nav.Link className={styles.navbarItem} href="/blog">Blog</Nav.Link>
                <Nav.Link className={styles.navbarItem} href="/contact">Contact</Nav.Link>
                <Nav.Link className={styles.navbarItem} href="/timer">Timer</Nav.Link>
                <Nav.Link className={styles.navbarItem} href="/stopwatch">Stopwatch</Nav.Link>
                <Nav.Link className={styles.navbarItem} href="/terminal">Terminal</Nav.Link>
                <a className={styles.githubIcon} href="https://github.com/magnusrn">
                  <i className="fa-brands fa-github"></i>
                </a>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </div>
  );
};

export default NavigationBar;
