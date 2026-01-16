import React from "react";
import styles from "../../styles/About.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
/* ====== DATA (kept outside component for optimization) ====== */

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
];

const stats = [
  { value: "50+", label: "Projects Completed" },
  { value: "10+", label: "Dashboards Built" },
  { value: "3+", label: "Years Experience" },
];

function About() {
  return (
    <div className={styles.about}>
      {/* ================= HERO SECTION ================= */}
      <section className={styles.hero}>
        <h1>
          Turning <span>Data</span> into <span>Insights</span>
        </h1>
        <p>
          I’m a Data Analyst who helps businesses make smarter decisions using
          data, dashboards, and actionable insights.
        </p>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className={styles.stats}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <h2>{stat.value}</h2>
            <p>{stat.label}</p>
          </div>
        ))}
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className={styles.content}>
        {/* LEFT TEXT */}
        <div className={styles.text}>
          <h2>Who I Am</h2>
          <p>
            I specialize in analyzing complex datasets and transforming raw
            numbers into meaningful stories. My focus is on clarity, accuracy,
            and business impact.
          </p>
          <p>
            From dashboards to performance insights, I love solving real-world
            problems using data.
          </p>
        </div>

        {/* RIGHT CARDS */}
        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>📊 What I Do</h3>
            <ul className={styles.tagList}>
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          <div className={styles.card}>
            <h3>🛠 Tools I Use</h3>
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
