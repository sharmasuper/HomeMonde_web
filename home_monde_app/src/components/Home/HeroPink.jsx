import styles from "../../styles/HomeScroll.module.css";

const HeroPink = ({ progress }) => {
  return (
    <section
      className={styles.pink}
      style={{
        opacity: progress,
        transform: `translateY(${100 - progress * 100}px)`,
        pointerEvents: progress < 0.5 ? "none" : "auto",
      }}
    >
      <h1>Pink Component</h1>
      <p>This appears on scroll</p>
    </section>
  );
};

export default HeroPink;
