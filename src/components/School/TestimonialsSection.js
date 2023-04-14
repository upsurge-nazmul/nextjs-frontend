import { useEffect, useRef, useState } from "react";
import styles from "../../styles/schools/testimonials.module.scss";
import { motion } from "framer-motion";
const teacherImages = [
  "https://imgcdn.upsurge.in/images/schools/teacher-1.png",
  "https://imgcdn.upsurge.in/images/schools/teacher-2.png",
  "https://imgcdn.upsurge.in/images/schools/teacher-3.png",
  "https://imgcdn.upsurge.in/images/schools/teacher-1.png",
  "https://imgcdn.upsurge.in/images/schools/teacher-2.png",
];

const studentImages = [
  "https://imgcdn.upsurge.in/images/schools/student-1.png",
  "https://imgcdn.upsurge.in/images/schools/student-2.png",
  "https://imgcdn.upsurge.in/images/schools/student-3.png",
  "https://imgcdn.upsurge.in/images/schools/student-1.png",
  "https://imgcdn.upsurge.in/images/schools/student-2.png",
];

const TestimonialsSection = () => {
  const [width, setWidth] = useState(0);
  const carousel = useRef(null);

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h2 className={styles.heading}>Testimonials</h2>
      </div>
      <div className={styles.contentWrapper}>
        <div className={`${styles.doodle} ${styles.dl1}`} />
        <div className={`${styles.doodle} ${styles.dl2}`} />
        <div className={`${styles.doodle} ${styles.dl3}`} />
        <div className={`${styles.doodle} ${styles.dl4}`} />
        <div className={styles.teacherWrapper}>
          <h3 className={styles.subHeading}>Principals & Teachers</h3>
          <div ref={carousel} className={styles.carouselContainer}>
            <motion.div
              whileTap={{ cursor: "grabbing" }}
              className={styles.carousel}
            >
              <motion.div
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
                className={styles.innerCarousel}
              >
                {teacherImages.map((image, index) => (
                  <motion.div key={index} className={styles.imageWrapper}>
                    <img src={image} alt="Teacher" className={styles.image} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className={styles.studentWrapper}>
          <h3 className={styles.subHeading}>Students</h3>
          <div ref={carousel} className={styles.carouselContainer}>
            <motion.div
              whileTap={{ cursor: "grabbing" }}
              className={styles.carousel}
            >
              <motion.div
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
                className={styles.innerCarousel}
              >
                {studentImages.map((image, index) => (
                  <motion.div key={index} className={styles.imageWrapper}>
                    <img src={image} alt="Teacher" className={styles.image} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
