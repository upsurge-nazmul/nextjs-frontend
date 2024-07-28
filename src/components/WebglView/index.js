import { useEffect, useRef, useState } from "react";
import { isMobileOnly } from "react-device-detect";
import styles from "./style.module.scss";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import ActionArea from "../Games/ActionArea";

export default function WebglView({
  gameKey = "",
  setView = () => {},
  handleDone = null,
  type = "games",
}) {
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
        {gameKey && (
          <iframe
            id="iframe"
            className={styles.iframe}
            src={`${process.env.NEXT_PUBLIC_WEBGL_BASE_URL}/${type}/prod/${gameKey}/index.html`}
            allowFullScreen={true}
          ></iframe>
        )}
        <ActionArea
          onClose={() => {
            setFullScreen(false);
            document.exitFullscreen();
            mixpanel.track("Game Closed", { event: `Game closed` });
            setView();
          }}
          onDone={() => {
            handleDone();
            mixpanel.track("Knowledge Quest", {
              event: `Quest Finished ${gameKey}`,
            });
            setFullScreen(false);
            document.exitFullscreen();
            setView();
          }}
          fullScreen={fullScreen}
          showDone={handleDone}
        />
      </div>
    </div>
  );
}
