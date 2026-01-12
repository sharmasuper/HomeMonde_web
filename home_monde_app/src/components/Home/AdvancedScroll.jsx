import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../../styles/AdvancedScroll.module.css";
import TypebotImg from "../../assets/TypebotImg.png";

gsap.registerPlugin(ScrollTrigger);

const AdvancedScroll = () => {
  const containerRef = useRef(null);
  const blackRef = useRef(null);
  const pinkRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          scrub: true,
          pin: true,
        },
      });

      // BLACK → OUT
      tl.to(blackRef.current, {
        scale: 0.9,
        opacity: 0,
        y: -120,
        ease: "power2.out",
      });

      // PINK → IN
      tl.fromTo(
        pinkRef.current,
        { opacity: 0, y: 120, scale: 1.1 },
        { opacity: 1, y: 0, scale: 1, ease: "power2.out" },
        "<"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={styles.wrapper}>
      {/* BLACK PANEL */}
      <section ref={blackRef} className={`${styles.panel} ${styles.black}`}>
        <div className={styles.blackContent}>
          <h1>
            HACK THE BOT GAME:
            <br />
            BUILD FASTER,
            <br />
            CHAT SMARTER
          </h1>

          <p>
            Typebot is a no-code platform that enables you to effortlessly
            create and integrate advanced chatbots into websites and chat
            platforms like WhatsApp.
          </p>
        </div>
      </section>

      {/* PINK PANEL */}
      {/* PINK PANEL */}
      <section ref={pinkRef} className={`${styles.panel} ${styles.pink}`}>
        <div className={styles.pinkContent}>
          {/* Logo */}
          <div className={styles.logo}>
            <p>logo</p>
          </div>

          {/* Text */}
          <p className={styles.pinkText}>
            Picture a bot that goes beyond answering questions: it builds
            relationships, shares content, sparks conversations, and reflects
            your business's personality and values. With over 3 billion people
            on messaging apps,{" "}
            <strong>
              it's time to connect with your customers where they are.
            </strong>
          </p>

          {/* CTA */}
          <button className={styles.cta}>Get started free</button>

          {/* Tabs (visual only for now) */}
          <div className={styles.tabs}>
            <span className={styles.active}>Marketing</span>
            <span>Support & Product</span>
            <span>Sales</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdvancedScroll;
