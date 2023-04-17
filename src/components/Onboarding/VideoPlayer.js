import styles from "../../styles/GeneralComponents/onboarding.module.scss";

export default function VideoPlayer({ setwatched }) {
  function handleTimeUpdate(e) {
    const video = e.target;
    const progress = video.currentTime / video.duration;
    if (progress > 0.9) {
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
          src="https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/video/kids+onboarding_3.mp4"
        />
      </video>
    </div>
  );
}
