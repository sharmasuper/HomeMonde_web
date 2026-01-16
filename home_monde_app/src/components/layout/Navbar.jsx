import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../../styles/Navbar.module.css";

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
        {/* LOGO */}
        <div className={styles.logo}>
          <img
            src="/Images/Homemonde_Logoo.webp"
            alt="HomeMonde"
            className={styles.logoImg}
          />

          <div className={styles.brandText}>
            <h2>HomeMonde</h2>
            <span>Lifestyle</span>
          </div>
        </div>

        {/* NAV LINKS */}
        <nav className={`${styles.navLinks} ${open ? styles.active : ""}`}>
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* HAMBURGER */}
        <div
          className={`${styles.hamburger} ${open ? styles.open : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
