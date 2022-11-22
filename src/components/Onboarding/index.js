import Modal from "../Modal";
import styles from "../../styles/GeneralComponents/onboarding.module.scss";

export default function Onboarding({
  setOpen = () => {},
  actionHandler = () => {},
}) {
  /**
   * <iframe src="https://drive.google.com/file/d/1QzZ9zP2EP97mB-rwn-rgz4n6o081FB2M/preview" width="640" height="480" allow="autoplay"></iframe>
   */

  return (
    <Modal
      title={"Walkthrough upsurge"}
      actions={{
        cancelText: "Cancel",
        isCancel: false,
        handleCancel: () => {},
        proceedText: "Done",
        isProceed: true,
        handleProceed: actionHandler,
        proceedButtonType: "normal",
      }}
      onOutsideClick={() => setOpen(false)}
    >
      <div className={styles.onboardingScr}>
        <iframe
          src="https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/video/onboarding+video.mp4"
          title="Onboarding video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={styles.onboardingVideo}
        ></iframe>
      </div>
    </Modal>
  );
}
