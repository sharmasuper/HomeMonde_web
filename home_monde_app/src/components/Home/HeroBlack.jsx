import styles from "../../styles/HomeScroll.module.css";

const HeroBlack = ({ progress }) => {
  return (
    <section
      className={styles.black}
      style={{
        opacity: 1 - progress,
        transform: `translateY(-${progress * 100}px)`,
        pointerEvents: progress > 0.5 ? "none" : "auto",
      }}
    >
      <h1>Black Component</h1>
      <p>This disappears on scroll</p>
    </section>
  );
};

export default HeroBlack;
