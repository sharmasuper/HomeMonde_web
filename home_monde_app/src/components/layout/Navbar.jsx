import { useState } from "react";
import styles from "../../styles/Navbar.module.css";
import { NavLink } from "react-router";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const links = [
    { name: "Home", path: "/home" },
    { name: "About", path: "/about" },
    { name: "Login", path: "/login" },
    { name: "Contact", path: "/contact" },
  ];
  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <span className={styles.icon}></span>
          <div>
            <h1>HOMEMONDE</h1>
            <small>LIFESTYLE</small>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`${styles.navLinks} ${open ? styles.active : ""}`}>
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Hamburger */}
        <div
          className={`${styles.hamburger} ${open ? styles.open : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
