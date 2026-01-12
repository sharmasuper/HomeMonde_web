import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../../styles/CardSlider.module.css";

gsap.registerPlugin(ScrollTrigger);

const cardsData = [
  { title: "HOME", desc: "Go to home page" },
  { title: "ABOUT", desc: "Learn about us" },
  { title: "STRATEGY", desc: "Our business strategy" },
  { title: "PROPERTIES", desc: "Check properties" },
  { title: "CONTACT", desc: "Get in touch" },
];

const CardSlider = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      // Scroll entrance animation
      gsap.fromTo(
        card,
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Infinite subtle floating with rotation
      gsap.to(card, {
        y: "+=15",
        rotation: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 3 + i * 0.2,
      });
    });
  }, []);

  // 3D hover effect
  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(card, {
      rotationY: x * 0.05,
      rotationX: -y * 0.05,
      transformPerspective: 600,
      transformOrigin: "center",
      duration: 0.3,
    });
  };

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index];
    gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.5 });
  };

  return (
    <div className={styles.sliderContainer}>
      {cardsData.map((card, index) => (
        <div
          className={styles.card}
          key={index}
          ref={(el) => (cardsRef.current[index] = el)}
          onMouseMove={(e) => handleMouseMove(e, index)}
          onMouseLeave={() => handleMouseLeave(index)}
        >
          <h3>{card.title}</h3>
          <p>{card.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default CardSlider;
