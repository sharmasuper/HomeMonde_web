import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import styles from "../../styles/FeatureSection.module.css";

/* ===== DATA (Data Analyst Website) ===== */

const accordionData = [
  {
    title:
      "What is the role of the Data Analytics team at Homemonde Lifestyle?",
    desc: "The Data Analytics team enables data-driven decision-making by transforming raw data into actionable insights across sales, operations, finance, supply chain, and workforce management.",
  },
  {
    title: "Which departments does the analytics team support?",
    desc: "We work closely with Sales, Marketing, Finance, Operations, Manufacturing, HR, and Leadership, ensuring each function has accurate and timely insights.",
  },
  {
    title: "What type of reports and dashboards are created?",
    desc: "We develop executive dashboards, operational reports, cost & profitability analysis, performance trackers, and trend analysis tailored to business priorities.",
  },
  {
    title: "What tools and platforms are used by the analytics team?",
    desc: "Our primary tools include Power BI, Microsoft Excel, SQL, and automation workflows, selected based on data volume, reporting frequency, and business needs.",
  },
  {
    title: "5. How often are dashboards and reports updated?",
    desc: "Depending on the use case, reports are updated daily, weekly, monthly, or in real-time, ensuring stakeholders always work with the latest data.",
  },
];

const FeatureSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const accordionRefs = useRef([]);

  useEffect(() => {
    accordionRefs.current.forEach((item, index) => {
      if (item) {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power3.out",
          }
        );
      }
    });
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className={styles.featureSection}>
      {/* LEFT SIDE - ACCORDION */}
      <div className={styles.left}>
        {accordionData.map((item, index) => (
          <div
            key={index}
            ref={(el) => (accordionRefs.current[index] = el)}
            className={`${styles.accordionItem} ${
              activeIndex === index ? styles.active : ""
            }`}
          >
            <button
              className={styles.accordionHeader}
              onClick={() => toggleAccordion(index)}
            >
              {item.title}
              <span className={styles.icon}>
                {activeIndex === index ? "▲" : "▼"}
              </span>
            </button>

            <div
              className={styles.accordionContent}
              style={{
                maxHeight: activeIndex === index ? "200px" : "0px",
              }}
            >
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE - IMAGE */}
      <div className={styles.right}>
        <div className={styles.imageWrapper}>
          <img src="/Images/DAImg.png" alt="Data Analytics Illustration" />
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
