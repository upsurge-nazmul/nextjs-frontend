import Modal from "../Modal";
import styles from "../../styles/GeneralComponents/onboarding.module.scss";

export default function Onboarding({
  setOpen = () => {},
  actionHandler = () => {},
}) {
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
          src="https://www.youtube.com/embed/5L4DQfVIcdg"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={styles.onboardingVideo}
        ></iframe>
      </div>
    </Modal>
  );
}
