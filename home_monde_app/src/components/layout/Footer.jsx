import styles from "../../styles/Footer.module.css";
import logo from "../../assets/Homemonde_Logoo.webp";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.logoBox}>
          <img src={logo} alt="Terminal Logistics" />
        </div>

        <ul className={styles.navLinks}>
          <li>HOME</li>
          <li>ABOUT</li>
          <li>STRATEGY</li>
          <li>PROPERTIES</li>
          <li>CONTACT</li>
        </ul>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.bottom}>
        <p>9355 Wilshire Blvd Suite 350, Beverly Hills, CA 90210</p>
        <p>Copyright ©2022 TerminalLogistics.com</p>
      </div>
    </footer>
  );
};

export default Footer;
