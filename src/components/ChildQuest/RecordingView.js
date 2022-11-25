import { useEffect, useState } from "react";
import styles from "../../styles/knowledgeQuest/Views.module.scss";
import FullScreen from "../SVGcomponents/FullScreen";
import FullScreenExit from "../SVGcomponents/FullScreenExit";

export default function RecordingView({ chapterId, handleBack, handleDone }) {
  const [fullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    if (document) {
      document.body.requestFullscreen();
      setFullScreen(true);
    }
  }, []);

  return (
    <div className={styles.view}>
      <div className={styles.fullScreenView}>
        <iframe
          id="iframe"
          className={styles.iframe}
          src={`/KnowledgeQuest/${chapterId}/story.html`}
          allowFullScreen={true}
        ></iframe>
        <div className={styles.actionArea}>
          <button
            className={styles.doneButton}
            onClick={() => {
              setFullScreen(false);
              mixpanel.track('Knowledge Quest',{'event':`Quest Finished ${chapterId}`, 'chapterId':`${chapterId}`});
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
      </div>
    </div>
  );
}
