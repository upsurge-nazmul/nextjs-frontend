import { useEffect } from "react";
import styles from "../../styles/schools/sections.module.scss";
import ImageSlider from "./ImageSlider";

const images = [
  "https://imgcdn.upsurge.in/images/schools/financial-literacy-1.png",
  "https://imgcdn.upsurge.in/images/schools/financial-literacy-2.png",
  "https://imgcdn.upsurge.in/images/schools/financial-literacy-3.png",
  "https://imgcdn.upsurge.in/images/schools/financial-literacy-1.png",
];

const FinancialSection = () => {
  return (
    <div className={styles.containerYellow}>
      <h2 className={styles.heading}>Financial Literacy</h2>
      <ImageSlider images={images} />
    </div>
  );
};

export default FinancialSection;
