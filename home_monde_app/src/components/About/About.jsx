import React, { useEffect, useState } from "react";
import styles from "../../styles/About.module.css";
import { NavLink } from "react-router-dom";

/* ====== DATA (optimized & reusable) ====== */

const skills = [
  "Data Cleaning",
  "Exploratory Data Analysis",
  "Data Visualization",
  "SQL & Databases",
  "Python (Pandas, NumPy)",
  "Power BI / Tableau",
];

const tools = [
  "Python",
  "SQL",
  "Power BI",
  "Tableau",
  "Excel",
  "Google Analytics",
  "Jupyter Notebooks",
];

const stats = [
  { value: 23, suffix: "+", label: "Projects Completed" },
  { value: 13, suffix: "+", label: "Dashboards Built" },
  { value: 10, suffix: "+", label: "PPT & PDF" },
];

/* ====== COUNTER COMPONENT (inside same file) ====== */

const Counter = ({ end, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = Math.ceil(end / (duration / 16));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
};

/* ====== ABOUT PAGE ====== */

function About() {
  return (
    <div className={styles.about}>
      {/* ================= HERO SECTION ================= */}
      <section className={styles.hero}>
        <h1>
          Turning <span>Data</span> into <span>Insights</span>
        </h1>
        <p>
          We enable organizations to make informed decisions using reliable
          data, analytics, and visualization.
        </p>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className={styles.stats}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <h2>
              <Counter end={stat.value} suffix={stat.suffix} />
            </h2>
            <p>{stat.label}</p>
          </div>
        ))}
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className={styles.content}>
        {/* LEFT TEXT */}
        <div className={styles.text}>
          <h2>Who We Are</h2>
          <p>
            We specialize in analyzing complex datasets and transforming raw
            data into meaningful insights, with a strong focus on clarity,
            accuracy, and business impact.
          </p>
          <p>
            We deliver dashboards and performance insights that address
            real-world business challenges through data.
          </p>
        </div>

        {/* RIGHT CARDS */}
        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>📊 What We Do</h3>
            <ul className={styles.tagList}>
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          <div className={styles.card}>
            <h3>🛠 Tools We Use</h3>
            <ul className={styles.tagList}>
              {tools.map((tool, index) => (
                <li key={index}>{tool}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className={styles.cta}>
        <h2>Let’s Work With Data</h2>
        <p>
          Looking for insights that drive real business results? Let’s connect
          and build something impactful.
        </p>
        <button>
          <NavLink style={{ color: "white" }} to="/contact">
            Contact Me
          </NavLink>
        </button>
      </section>
    </div>
  );
}

export default About;
