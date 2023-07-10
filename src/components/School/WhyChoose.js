import styles from "../../styles/schools/whyChoose.module.scss";
import { useState, useEffect } from "react";
import EllipseOne from "./EllipseOne";
import EllipseTwo from "./EllipseTwo";
import { AnimatePresence, motion } from "framer-motion";

const sliderData = [
  {
    childImage: "https://imgcdn.upsurge.in/images/schools/c1.png",
    // childImage: "/images/school/school-child-1.png",
    color: "#FDCC03",
    points: [
      "500+ topics",
      "School level customization",
      "Student centric personalization",
    ],
  },
  {
    childImage: "https://imgcdn.upsurge.in/images/schools/c2.png",
    // childImage: "/images/school/school-child-2.png",
    color: "#17D1BC",
    points: [
      "Structured curriculum",
      "Age appropriate from elementary to high school",
      "Created and curated by financial experts and educators.",
    ],
  },
  {
    childImage: "https://imgcdn.upsurge.in/images/schools/c4.png",
    // childImage: "/images/school/school-child-3.png",
    color: "#4166EB",
    points: [
      "Learning made fun",
      "Hands on activity based workshops",
      "Stimulations and real-time solutions",
    ],
  },
  {
    childImage: "https://imgcdn.upsurge.in/images/schools/c3.png",
    // childImage: "/images/school/school-child-4.png",
    color: "#FF6263",
    points: [
      "NEP Inclusive",
      "NEP mandates FL and Entrepreneurship",
      "First NEP inclusive program",
      "Competitions and Quests",
      "Teacher training workshops",
      "Workshop on hands on training to the students",
      // "Easy learning sessions",
    ],
  },
];

const WhyChoose = () => {
  const [currentSlide, setCurrentSlide] = useState(2);

  useEffect(() => {
    const id = setInterval(() => {
      if (currentSlide === sliderData.length - 1) {
        setCurrentSlide(0);
      } else {
        setCurrentSlide(currentSlide + 1);
      }
    }, 5000);
    return () => clearInterval(id);
  }, [currentSlide]);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Why choose upsurge</h2>
      <div className={styles.sliderWrapper}>
        <AnimatePresence>
          <motion.div
            key={currentSlide}
            className={`${styles.sliderContainer}`}
          >
            <div className={styles.card}>
              <div className={styles.cardWrapper}>
                {sliderData[currentSlide].points.reverse().map((item, ind) => (
                  <motion.div
                    initial={{ scale: 0.2 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.2 }}
                    duration={{ duration: 1.5 }}
                    key={"points-" + ind}
                    className={styles.cloud}
                  >
                    <p>{item}</p>
                  </motion.div>
                ))}
                <div className={styles.imageContainer}>
                  <motion.img
                    inherit={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src={sliderData[currentSlide].childImage}
                    className={styles.image}
                    alt=""
                  />
                  <EllipseOne
                    color={sliderData[currentSlide].color}
                    className={styles.ellipse}
                  />
                  <EllipseTwo
                    color={sliderData[currentSlide].color + "70"}
                    className={`${styles.ellipse} ${styles.secondEllipse}`}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className={styles.nav}>
        {sliderData.map((_, i) => (
          <div
            key={"nav-dot-" + i}
            onClick={() => setCurrentSlide(i)}
            className={`${styles.dot} ${i === currentSlide && styles.active}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default WhyChoose;
