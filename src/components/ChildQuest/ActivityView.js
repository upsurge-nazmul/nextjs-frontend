import { useEffect, useState } from "react";
import styles from "../../styles/knowledgeQuest/Views.module.scss";
import FullScreen from "../SVGcomponents/FullScreen";
import FullScreenExit from "../SVGcomponents/FullScreenExit";

export default function ActivityView({ chapterId, handleBack, handleDone }) {
  const [fullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    if (document) {
      document.body.requestFullscreen();
      setFullScreen(true);
    }
  }, []);

  return (
    <div className={styles.view}>
      <div className={styles.activityView}>
        <iframe
          id="iframe"
          className={fullScreen ? styles.fullScreenIframe : styles.iframe}
          src={`/KnowledgeQuest/${chapterId}/story.html`}
          allowFullScreen={true}
        ></iframe>
      </div>
      <button
        className={styles.doneButton}
        onClick={() => {
          setFullScreen(false);
          document.exitFullscreen();
          handleDone();
        }}
      >
        Done
      </button>
      <button
        className={styles.fullScreenButton}
        onClick={() => {
          setFullScreen(false);
          document.exitFullscreen();
          handleBack();
        }}
      >
        {fullScreen ? <FullScreenExit /> : <FullScreen />}
      </button>
    </div>
  );
}
