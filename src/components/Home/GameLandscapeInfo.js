import { useRouter } from "next/dist/client/router";
import React from "react";
import styles from "../../styles/Home/gamelandscaped.module.scss";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
export default function GameLandscapeInfo({ setshow }) {
  const router = useRouter();

  return (
    <div className={styles.terms}>
      <div className={styles.background} onClick={() => setshow(false)}></div>
      <div className={styles.cross} onClick={() => setshow(false)}>
        <CancelOutlinedIcon className={styles.icon} />
      </div>
      <div className={styles.main}>
        <p className={styles.heading}>How to switch to landscape</p>
        <p className={styles.details}>
          1. Swipe down from the top of the screen
        </p>
        <p className={styles.details}>
          2. Swipe down from the Quick Settings icons again
        </p>
        <p className={styles.details}>3. Tap the Auto Rotate icon.</p>
        <p className={styles.details}>
          4. Rotate your phone to change the screen orientation (if Auto Rotate
          is enabled).
        </p>
        <p className={styles.details}>
          5. Rotate your phone and tap the manual Rotate button (if Auto Rotate
          is disabled).
        </p>
      </div>
    </div>
  );
}
