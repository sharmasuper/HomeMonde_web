import { useEffect, useRef } from "react";
import gsap from "gsap";

const cardsData = [
  {
    title: "COGS",
    desc: "Clear insight into costs driving SKU profitability",
    img: "/Images/COGS.png",
  },
  {
    title: "HRMS",
    desc: "Actionable insights into workforce structure and spend",
    img: "/Images/HRMS.png",
  },
  {
    title: "RETURN",
    desc: "Analyze product returns to improve quality decisions",
    img: "/Images/RETURN.png",
  },
  {
    title: "DPR",
    desc: "Real-time visibility into daily production performance",
    img: "/Images/DPR.png",
  },
  // {
  //   title: "",
  //   desc: "Worldwide textile distribution",
  //   img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
  // },
];

const CardSlider = () => {
  const sliderRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const totalWidth = slider.scrollWidth / 2;

    animationRef.current = gsap.to(slider, {
      x: -totalWidth,
      duration: 50,
      ease: "none",
      repeat: -1,
    });

    return () => animationRef.current?.kill();
  }, []);

  const pause = () => animationRef.current?.pause();
  const play = () => animationRef.current?.play();

  return (
    <section className="card-slider">
      {/* BACKGROUND IMAGE (IMG TAG ONLY) */}
      <img
        src="/Images/back2.png"
        alt="Background"
        className="card-slider__bg"
      />

      {/* OVERLAY */}
      <div className="card-slider__overlay" />

      {/* HEADING */}
      <div className="card-slider__heading">
        <h2>Explore Our Analytics Capabilities</h2>
        <p>
          Modern data analytics powered by innovation, accuracy, and a global
          perspective.
        </p>
      </div>

      {/* SLIDER */}
      <div className="card-slider__viewport">
        <div
          ref={sliderRef}
          className="card-slider__track"
          onMouseEnter={pause}
          onMouseLeave={play}
        >
          {[...cardsData, ...cardsData].map((card, index) => (
            <div key={index} className="card-slider__card">
              <img src={card.img} alt={card.title} />
              <div className="card-slider__body">
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STYLES */}
      <style jsx>{`
        .card-slider {
          position: relative;
          padding: 5rem 1.5rem;
          overflow: hidden;
          font-family: Inter, system-ui, sans-serif;
          color: #f1f5f9;
        }

        /* Background img */
        .card-slider__bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 2;
        }

        /* Overlay */
        .card-slider__overlay {
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.58);
          z-index: 1;
        }

        /* Content above bg */
        .card-slider__heading,
        .card-slider__viewport {
          position: relative;
          z-index: 2;
        }

        .card-slider__heading {
          text-align: center;
          margin-bottom: 3rem;
        }

        .card-slider__heading h2 {
          font-size: 2.5rem;
          font-weight: 800;
        }

        .card-slider__heading p {
          color: #cbd5e1;
          max-width: 600px;
          margin: 0.5rem auto 0;
        }

        .card-slider__viewport {
          overflow: hidden;
        }

        .card-slider__track {
          display: flex;
          gap: 1.5rem;
          width: max-content;
        }

        .card-slider__card {
          min-width: 220px;
          background: rgba(45, 47, 45, 0.41);
          border-radius: 20px;
          overflow: hidden;
          backdrop-filter: blur(8px);
          transition: transform 0.3s ease;
        }

        .card-slider__card:hover {
          transform: scale(1.08);
        }

        .card-slider__card img {
          width: 100%;
          height: 140px;
          object-fit: cover;
        }

        .card-slider__body {
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .card-slider__body h3 {
          margin-bottom: 0.3rem;
        }

        .card-slider__body p {
          font-size: 0.9rem;
          color: #cbd5e1;
        }

        @media (max-width: 768px) {
          .card-slider__card {
            min-width: 180px;
          }
        }
      `}</style>
    </section>
  );
};

export default CardSlider;
