import React from "react";
import styles from "../../styles/HthirdCom.module.css";
import { FaChartLine, FaDatabase, FaProjectDiagram } from "react-icons/fa";

function HthirdCom() {
  const skills = [
    {
      icon: <FaChartLine />,
      title: "Data Visualization",
      description:
        "Transforming complex data into interactive charts and dashboards using tools like Power BI, Tableau, and Python libraries.",
    },
    {
      icon: <FaDatabase />,
      title: "Data Management",
      description:
        "Efficiently handling, cleaning, and organizing large datasets using SQL, Excel, and Python.",
    },
    {
      icon: <FaProjectDiagram />,
      title: "Analytics & Insights",
      description:
        "Analyzing trends, generating actionable insights, and supporting data-driven business decisions.",
    },
  ];

  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>Key Skills & Expertise</h2>
      <div className={styles.grid}>
        {skills.map((skill, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.icon}>{skill.icon}</div>
            <h3 className={styles.title}>{skill.title}</h3>
            <p className={styles.description}>{skill.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HthirdCom;
