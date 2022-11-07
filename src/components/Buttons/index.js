import styles from "../../styles/Buttons/common.module.scss";
import AnimatedButton from "./AnimatedButton";

export default function Buttons({
  type = "common",
  children,
  themeBg = "#4066eb",
  themeClr = "#fff",
}) {
  return (
    <>
      {type === "animated" ? (
        <AnimatedButton>{children}</AnimatedButton>
      ) : (
        <button
          className={styles.commonButton}
          style={{ backgroundColor: themeBg, color: themeClr }}
        >
          {children}
        </button>
      )}
    </>
  );
}
