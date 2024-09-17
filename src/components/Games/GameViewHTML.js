import { useEffect, useRef, useState } from "react";
import styles from "../../styles/Games/gameViewHTML.module.scss";
import ActionArea from "./ActionArea";
import { isMobileOnly } from "react-device-detect";

export default function GameViewHTML({ game, setGame, handleDone = () => {} }) {
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
    <div className={styles.gameView} ref={contentRef}>
      <div className={styles.fullScreenView}>
        <iframe
          id="iframe"
          className={styles.iframe}
          src={game.htmlSource}
          allowFullScreen={true}
        ></iframe>
        <ActionArea
          onClose={() => {
            setFullScreen(false);
            document?.exitFullscreen();
            setGame();
          }}
          onDone={() => {
            setFullScreen(false);
            document?.exitFullscreen();
            handleDone();
          }}
          fullScreen={fullScreen}
          showDone={handleDone}
        />
      </div>
    </div>
  );
}
