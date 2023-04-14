import React from "react";
import ImageSlider from "./ImageSlider";
import styles from "../../styles/schools/sections.module.scss";

const images = [
  "https://imgcdn.upsurge.in/images/schools/entrepreneurship-1.png",
  "https://imgcdn.upsurge.in/images/schools/entrepreneurship-2.png",
  "https://imgcdn.upsurge.in/images/schools/entrepreneurship-3.png",
  "https://imgcdn.upsurge.in/images/schools/entrepreneurship-1.png",
];

const EntrepreneurshipSection = () => {
  return (
    <div className={styles.containerRed}>
      <h2 className={styles.heading}>Entrepreneurship</h2>
      <ImageSlider images={images} />
    </div>
  );
};

export default EntrepreneurshipSection;
