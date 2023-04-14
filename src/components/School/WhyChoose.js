import { useEffect } from "react";
import styles from "../../styles/schools/whyChoose.module.scss";
import { useRef } from "react";

const sliderData = [
  {
    childImage: "https://imgcdn.upsurge.in/images/schools/c1.png",
    bgImages: [
      "https://imgcdn.upsurge.in/images/schools/c1-ellipse-1.png",
      "https://imgcdn.upsurge.in/images/schools/c1-ellipse-2.png",
    ],
    points: [
      "500+ topics",
      "School level customization",
      "Student centric personalization",
    ],
  },
  {
    childImage: "https://imgcdn.upsurge.in/images/schools/c2.png",
    bgImages: [
      "https://imgcdn.upsurge.in/images/schools/c2-ellipse-1.png",
      "https://imgcdn.upsurge.in/images/schools/c2-ellipse-2.png",
    ],
    points: [
      "Structured curriculum",
      "Age appropriate from elementary to high school",
      "Created and curated by financial experts and educators.",
    ],
  },
  {
    childImage: "https://imgcdn.upsurge.in/images/schools/c3.png",
    bgImages: [
      "https://imgcdn.upsurge.in/images/schools/c3-ellipse-1.png",
      "https://imgcdn.upsurge.in/images/schools/c3-ellipse-2.png",
    ],
    points: [
      "Learning made fun",
      "Hands on activity based workshops",
      "Stimulations and real-time solutions",
    ],
  },
  {
    childImage: "https://imgcdn.upsurge.in/images/schools/c4.png",
    bgImages: [
      "https://imgcdn.upsurge.in/images/schools/c4-ellipse-1.png",
      "https://imgcdn.upsurge.in/images/schools/c4-ellipse-2.png",
    ],
    points: [
      "NEP Inclusive",
      "NEP mandates FL and Entrepreneurship",
      "First NEP inclusive program",
      "Competitions and Quests",
      "Teacher training workshops",
      "Workshop on hands on training to the students",
      "Easy learning sessions",
    ],
  },
];

const WhyChoose = () => {
  const imgList = useRef(null);

  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <div className={`${styles.doodle} ${styles.dl1}`} />
        <div className={`${styles.doodle} ${styles.dl2}`} />
        <div className={`${styles.hc1}`} />
        <div className={`${styles.hc2}`} />
        <h2 className={styles.heading}>Why choose Upsurge</h2>
      </div>
      <div className={styles.sliderWrapper}>
        <div className={styles.c1}></div>
        <div className={styles.c2}></div>
        <button
          onClick={() => {
            imgList.current.scrollBy(-600, 0);
          }}
          className={`${styles.button} ${styles.scrollLeftButton}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <div ref={imgList} className={`${styles.sliderContainer}`}>
          {sliderData.map((data, index) => (
            <div key={"slide-card" + index} className={styles.card}>
              <div className={styles.cardWrapper}>
                <div className={styles.imageContainer}>
                  <img src={data.childImage} className={styles.image} alt=" " />
                  <img src={data.bgImages[1]} className={styles.ellipse1} alt=" " />
                  <img src={data.bgImages[0]} className={styles.ellipse1} alt=" " />
                </div>
                <div className={styles.textContainer}>
                  <ul>
                    {data.points.map((point, i) => (
                      <li key={"point" + index + i}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            imgList.current.scrollBy(600, 0);
          }}
          className={`${styles.button} ${styles.scrollRightButton}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WhyChoose;
