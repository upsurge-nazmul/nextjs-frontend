import { useEffect, useState } from "react";
import styles from "../../styles/knowledgeQuest/Views.module.scss";
import FullScreen from "../SVGcomponents/FullScreen";
import FullScreenExit from "../SVGcomponents/FullScreenExit";

export default function RecordingView({ chapterId }) {
  const [fullScreen, setFullScreen] = useState(false);

  const manageFullScreen = () => {
    setFullScreen((prev) => !prev);
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.body.requestFullscreen();
    }
  };

  return (
    <div className={styles.view}>
      <iframe
        id="iframe"
        className={fullScreen ? styles.fullScreenIframe : styles.iframe}
        src={`/KnowledgeQuest/${chapterId}/story.html`}
        allowFullScreen={true}
      ></iframe>
      <button
        className={
          fullScreen ? styles.shrinkScreenButton : styles.fullScreenButton
        }
        onClick={manageFullScreen}
      >
        {fullScreen ? <FullScreenExit /> : <FullScreen />}
      </button>
    </div>
  );
}
