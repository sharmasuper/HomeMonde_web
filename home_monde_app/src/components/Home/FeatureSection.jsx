import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import styles from "../../styles/FeatureSection.module.css";
import TypebotImg from "../../assets/TypebotImg.png"; // replace with your image

const accordionData = [
  {
    title: "Effortless building experience",
    desc: "Our platform allows developers to build projects quickly and efficiently with minimal setup and intuitive tools.",
  },
  {
    title: "Extensive chat capabilities",
    desc: "Engage with AI-powered chat features that provide real-time assistance, suggestions, and conversation handling.",
  },
  {
    title: "Designed for human delight",
    desc: "Every interaction is crafted to be enjoyable and intuitive, making complex workflows feel simple and fun.",
  },
  {
    title: "Made with love for developers",
    desc: "We prioritize developer experience, ensuring all tools are flexible, customizable, and powerful.",
  },
  {
    title: "Continuously evolving technology",
    desc: "Typebot's technology is constantly evolving, with regular updates that include bug fixes, new features, and performance enhancements.",
  },
];

const FeatureSection = () => {
  const [activeIndex, setActiveIndex] = useState(4);
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
      <div className={styles.left}>
        {accordionData.map((item, index) => (
          <div
            className={`${styles.accordionItem} ${
              activeIndex === index ? styles.active : ""
            }`}
            key={index}
            ref={(el) => (accordionRefs.current[index] = el)}
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

      <div className={styles.right}>
        <div className={styles.imageWrapper}>
          <img src={TypebotImg} alt="Graphic" />
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
