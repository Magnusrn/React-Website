import React, { useState } from "react";
import styles from "./NavigationBar.module.css";

const NavigationBar = () => {
  let [burgerMenuVisible, setBurgerMenuVisible] = useState(false);
  const toggleBurgerMenu = () => {
    setBurgerMenuVisible(!burgerMenuVisible);
  };

  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.navWrapper}>
          <div className={styles.logo}>
            <a href="/">M</a>
          </div>
          <ul className={styles.menu}>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="about">About</a>
            </li>
            <li>
              <a href="contact">Contact</a>
            </li>
            <li>
              <a href="timer">Timers</a>
            </li>
            <li>
              <a href="terminal">Terminal</a>
            </li>
            <li>
              <a href="https://github.com/magnusrn"><i className="fa-brands fa-github"></i></a>
            </li>
          </ul>
          
          <div className={styles.hamburgerMenu} onClick={toggleBurgerMenu}>
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </nav>

      {burgerMenuVisible && (
        <div className={styles.mobileMenu}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="about">About</a>
          </li>
          <li>
            <a href="contact">Contact</a>
          </li>
          <li>
            <a href="timer">Timers</a>
          </li>
          <li>
            <a href="terminal">Terminal</a>
          </li>
        </div>
      )}
    </div>
  );
};

export default NavigationBar;
