import React from "react";
import styles from "./NavigationBar.module.css";

const NavigationBar = () => {
  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.navWrapper}>
            <div className={styles.logo}>
              <a href="/">Magnus</a>
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
          </ul>
        </div>
      </nav>

      {/* <div className={`${styles.menuIcon} ${styles.toggleIcon}`} >
        <span className={`${styles.icon} ${styles.iconBars}`}></span>
        <span
          className={`${styles.icon} ${styles.iconBars} ${styles.overlay}`}
        ></span>
      </div>

      <div className={styles.overlayMenu}>
        <ul id={styles.menu}>
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
            <a href="timer">Timer</a>
          </li>
          <li>
            <a href="terminal">Terminal</a>
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default NavigationBar;
