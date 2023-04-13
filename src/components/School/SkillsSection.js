import styles from "../../styles/schools/sections.module.scss";
import ImageSlider from "./ImageSlider";

const images = [
  "https://imgcdn.upsurge.in/images/schools/skills-1.png",
  "https://imgcdn.upsurge.in/images/schools/skills-2.png",
  "https://imgcdn.upsurge.in/images/schools/skills-3.png",
  "https://imgcdn.upsurge.in/images/schools/skills-1.png",
];

const SkillsSection = () => {
  return (
    <div className={styles.containerGreen}>
      <h2 className={styles.heading}>Life skills</h2>
      <ImageSlider images={images} />
    </div>
  );
};

export default SkillsSection;
