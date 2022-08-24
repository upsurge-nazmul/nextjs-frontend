import styles from "../../styles/Careers/jd.module.scss";
import { PositionData } from "./staticData";

export default function JD({ position }) {
  return (
    <div className={styles.jd}>
      <div className={styles.heading}>upsurge is hiring</div>
      <div className={styles.title}>
        {PositionData.find((item) => item.id === position).position}
      </div>
      <iframe
        id="iframe"
        className={styles.iframe}
        src={`/JDs/${position}.html`}
      ></iframe>
    </div>
  );
}
