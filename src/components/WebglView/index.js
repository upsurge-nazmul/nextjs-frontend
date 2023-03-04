import { useEffect, useState } from "react";
import { WEBGL_BASE_URL } from "../../../config";
import styles from "./style.module.scss";
import { isMobileOnly } from "react-device-detect";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

export default function WebglView({
  key = "HignAndLow_WebGL",
  setView = () => {},
  handleDone = null,
}) {
  const [fullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    if (!isMobileOnly) {
      if (document) {
        if (document.body.requestFullscreen) {
          document.body.requestFullscreen();
          setFullScreen(true);
        }
      }
    }
  }, []);

  return (
    <div className={styles.view}>
      <div className={styles.fullScreenView}>
        <iframe
          id="iframe"
          className={styles.iframe}
          src={`${WEBGL_BASE_URL}/games/prod/${key}/index.html`}
          allowFullScreen={true}
        ></iframe>
        <div className={styles.actionArea}>
          <button
            className={styles.fullScreenButton}
            onClick={() => {
              setFullScreen(false);
              if (!isMobileOnly) document.exitFullscreen();
              mixpanel.track("Game Closed", { event: `Game closed` });
              setView();
            }}
          >
            {fullScreen ? (
              <CloseIcon style={{ height: "80px", width: "80px" }} />
            ) : (
              <FullscreenIcon style={{ height: "80px", width: "80px" }} />
            )}
          </button>
          {handleDone ? (
            <button
              className={styles.doneButton}
              onClick={() => {
                handleDone();
                mixpanel.track("Knowledge Quest", {
                  event: `Quest Finished ${chapterId}`,
                });
                setFullScreen(false);
                if (!isMobileOnly) document.exitFullscreen();
                setView();
              }}
            >
              <DoneIcon style={{ height: "80px", width: "80px" }} />
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
