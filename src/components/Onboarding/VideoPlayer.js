import styles from "../../styles/GeneralComponents/onboarding.module.scss";
import { assetsVideo } from "../../utils/utils";

export default function VideoPlayer({ setwatched }) {
  function handleTimeUpdate(e) {
    const video = e.target;
    const progress = video.currentTime / video.duration;
    console.log(progress);
    if (progress > 0.7) {
      setwatched(true);
    } else {
      setwatched(false);
    }
  }
  return (
    <div className={styles.onboardingScr}>
      <video
        className={styles.onboardingScr}
        onTimeUpdate={handleTimeUpdate}
        controls
      >
        <source
          src={assetsVideo('video/kids+onboarding_3.mp4')}
        />
      </video>
    </div>
  );
}
