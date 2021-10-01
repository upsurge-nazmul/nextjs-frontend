import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/Home/how.module.scss";
import HowBlob from "../SVGcomponents/HowBlob";
import HowSvg from "../SVGcomponents/HowSvg";
import PauseSvg from "../SVGcomponents/PauseSvg";
import PlaySvg from "../SVGcomponents/PlaySvg";
function How() {
  const [play, setplay] = useState(false);
  const videoref = useRef();
  const [ispaused, setispaused] = useState(false);
  function playpause() {
    if (!videoref.current.paused) {
      videoref.current.pause();
      setplay(false);
    } else {
      videoref.current.play();
      setplay(true);
    }
  }

  return (
    <div className={styles.howSection}>
      <div className={styles.heading}>
        <HowBlob className={styles.blob} />
        How it works
      </div>
      <div className={styles.container}>
        {play ? (
          <PauseSvg onClick={playpause} className={styles.pauseIcon} />
        ) : (
          <PlaySvg className={styles.playicon} onClick={playpause} />
        )}

        <video ref={videoref} src="/videos/demo.mp4"></video>
      </div>
    </div>
  );
}

export default How;
// <iframe
//   className={styles.video}
//   width="560"
//   height="315"
//   src="https://www.youtube.com/embed/jV68yMnH01o?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=0&amp;start=1&enablejsapi=1"
//   title="YouTube video player"
//   frameborder="0"
//   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;modestbranding"
//   allowfullscreen
// ></iframe>
