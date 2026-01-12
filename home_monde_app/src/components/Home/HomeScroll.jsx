import { useEffect, useState } from "react";
import styles from "../../styles/HomeScroll.module.css";
import HeroBlack from "./HeroBlack";
import HeroPink from "./HeroPink";

const HomeScroll = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const value = Math.min(window.scrollY / window.innerHeight, 1);
      setProgress(value);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={styles.wrapper}>
      <HeroBlack progress={progress} />
      <HeroPink progress={progress} />
    </div>
  );
};

export default HomeScroll;
