import { useState } from "react";
import { useEffect } from "react";
import styles from "../../styles/Buttons/animatedButton.module.scss";

export default function AnimatedButton({ children, handleClick }) {
  const [button, setButton] = useState();
  const [disabled, setDisabled] = useState(false);
  const [buttonState, setButtonState] = useState("ready");

  useEffect(() => {
    setButton(document.getElementById("button"));
  }, []);

  // cycle through button states when clicked
  const clickButton = () => {
    if (!disabled) {
      setDisabled(true);
      // Loading stage
      setButtonState("loading");
      setTimeout(() => {
        // Completed stage
        setButtonState("complete");
        handleClick();
        setTimeout(() => {
          setTimeout(() => {
            // Reset button so user can select it again
            setDisabled(false);
            setButtonState("ready");
          }, 4000);
        }, 320);
      }, 1800);
    }
  };

  return (
    <div className={styles.buttonArea}>
      <button
        id="button"
        className={`${styles.button} ${
          buttonState === "loading"
            ? styles.loading
            : buttonState === "complete"
            ? styles.complete
            : styles.ready
        }`}
        onClick={clickButton}
      >
        <div className={`${styles.message} ${styles.submitMessage}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 12.2">
            <polyline stroke="currentColor" points="2,7.1 6.5,11.1 11,7.1 " />
            <line stroke="currentColor" x1="6.5" y1="1.2" x2="6.5" y2="10.3" />
          </svg>
          <span className={styles.buttonText}>Submit</span>
        </div>

        <div className={`${styles.message} ${styles.loadingMessage}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17">
            <circle className={styles.loadingCircle} cx="2.2" cy="10" r="1.6" />
            <circle className={styles.loadingCircle} cx="9.5" cy="10" r="1.6" />
            <circle
              className={styles.loadingCircle}
              cx="16.8"
              cy="10"
              r="1.6"
            />
          </svg>
        </div>

        <div className={`${styles.message} ${styles.successMessage}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 11">
            <polyline
              stroke="currentColor"
              points="1.4,5.8 5.1,9.5 11.6,2.1 "
            />
          </svg>
          <span className={styles.buttonText}>Success</span>
        </div>
      </button>
    </div>
  );
}
