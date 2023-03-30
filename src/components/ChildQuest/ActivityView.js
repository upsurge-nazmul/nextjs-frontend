import { useEffect, useRef, useState } from "react";
import { isMobileOnly } from "react-device-detect";
import styles from "../../styles/knowledgeQuest/Views.module.scss";
import ActionArea from "../Games/ActionArea";
import FullScreen from "../SVGcomponents/FullScreen";
import FullScreenExit from "../SVGcomponents/FullScreenExit";

export default function ActivityView({ chapterId, handleBack, handleDone }) {
  const contentRef = useRef();
  const [fullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    if (contentRef && contentRef.current) {
      if (contentRef.current.requestFullscreen) {
        contentRef.current.requestFullscreen();
        setFullScreen(true);
        if (isMobileOnly) {
          if (window.screen.orientation.lock) {
            window.screen.orientation
              .lock("landscape")
              .then(() => console.log("orientation landscape"))
              .catch((e) => console.log(e.message));
          } else {
            console.log("Screen rotation is not supported");
          }
        }
      }
    }
  }, [contentRef]);

  return (
    <div className={styles.view} ref={contentRef}>
      <div className={styles.fullScreenView}>
        <iframe
          id="iframe"
          className={styles.iframe}
          src={`/KnowledgeQuest/${chapterId}/story.html`}
          allowFullScreen={true}
        ></iframe>
        <ActionArea
          onClose={() => {
            setFullScreen(false);
            document.exitFullscreen();
            handleBack();
          }}
          onDone={() => {
            setFullScreen(false);
            mixpanel.track("Knowledge Quest finished", {
              event: `Quest Finished ${chapterId}`,
              chapterId: `${chapterId}`,
            });
            document.exitFullscreen();
            handleDone();
          }}
          fullScreen={fullScreen}
          showDone={handleDone}
        />
      </div>
    </div>
  );
}
