import FullscreenIcon from "@mui/icons-material/Fullscreen";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../../styles/Games/actionArea.module.scss";

export default function ActionArea({
  onClose = () => {},
  onDone = () => {},
  fullScreen = false,
  showDone = false,
}) {
  return (
    <div className={styles.actionArea}>
      <button className={styles.fullScreenButton} onClick={onClose}>
        {fullScreen ? <CloseIcon /> : <FullscreenIcon />}
      </button>
      {showDone ? (
        <button className={styles.doneButton} onClick={onDone}>
          <DoneIcon />
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
