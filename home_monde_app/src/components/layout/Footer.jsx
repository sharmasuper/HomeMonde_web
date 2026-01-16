import styles from "../../styles/Footer.module.css";
import logo from "../../assets/Homemonde_Logoo.webp";
import { NavLink } from "react-router";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.logoBox}>
          <img src={logo} alt="Terminal Logistics" />
        </div>

        <ul className={styles.navLinks}>
          <li>
            <NavLink to="/home">HOME</NavLink>
          </li>
          <li>
            <NavLink to="/about">ABOUT</NavLink>
          </li>
          {/* <li>STRATEGY</li>
          <li>PROPERTIES</li> */}
          <li>
            <NavLink to="/about">CONTACT</NavLink>
          </li>
        </ul>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.bottom}>
        <p>
          G-88, near UCO Bank, Sitapura Industrial Area, Sitapura, Jaipur,
          Rajasthan 302022, India
        </p>
        <p>Copyright © {new Date().getFullYear()} HomeMondeLifeStyle.com</p>
      </div>
    </footer>
  );
};

export default Footer;
