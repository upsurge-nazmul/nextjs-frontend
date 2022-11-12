import styles from "../../styles/Buttons/common.module.scss";
import AnimatedButton from "./AnimatedButton";

export default function Buttons({
  type = "common",
  children,
  themeBg = "#4066eb",
  themeClr = "#fff",
  handleClick = () => {},
}) {
  return (
    <>
      {type === "animated" ? (
        <AnimatedButton
          handleClick={handleClick}
          style={{ backgroundColor: themeBg, color: themeClr, fill: themeClr }}
        >
          {children}
        </AnimatedButton>
      ) : (
        <button
          className={styles.commonButton}
          style={{ backgroundColor: themeBg, color: themeClr }}
          onClick={handleClick}
        >
          {children}
        </button>
      )}
    </>
  );
}
