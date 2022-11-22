import { useState } from "react";
import { useEffect } from "react";
import styles from "../../styles/Buttons/animatedButton.module.scss";
import Animation from "./Animation";

export default function AnimatedButton({ children, handleClick, style }) {
  const [button, setButton] = useState();
  const [disabled, setDisabled] = useState(false);
  const [buttonState, setButtonState] = useState("ready");
  const [activeAnimation, setActiveAnimation] = useState(false);

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
        setActiveAnimation(true);
        setButtonState("complete");
        setTimeout(() => {
          handleClick();
          setTimeout(() => {
            // Reset button so user can select it again
            setDisabled(false);
            setButtonState("ready");
          }, 4000);
        }, 1000);
      }, 1800);
    }
  };

  // const clickButton = () => setActiveAnimation(true);

  return (
    <>
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
        style={style}
      >
        <div className={`${styles.message} ${styles.submitMessage}`}>
          <span className={styles.buttonText}>{children}</span>
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
          <span className={styles.buttonText}>{children}</span>
        </div>
      </button>
      <Animation
        button={button}
        activate={activeAnimation}
        setActivate={setActiveAnimation}
      />
    </>
  );
}
