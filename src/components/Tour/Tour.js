import React, { useEffect, useState } from "react";
import styles from "../../styles/tour.module.scss";
export default function Tour({ story }) {
  const [current, setcurrent] = useState(0);
  const [currentHeight, setcurrentHeight] = useState(0);
  const [currentleftOffset, setcurrentleftOffset] = useState(0);
  const [elementdata, setelementdata] = useState(null);
  const [tourdata, settourdata] = useState({
    width: 0,
    height: 0,
  });
  function getHeight() {
    let currentElement = document.querySelector(story[current].ref);
    setelementdata({
      height: currentElement.clientHeight,
      width: currentElement.clientwidth,
    });
    let h = currentElement.offsetTop;
    let l = currentElement.offsetLeft;
    if (!h) {
      h = currentElement.offsetParent.offsetTop;
    }
    if (!l) {
      l = currentElement.offsetParent.offsetLeft;
    }
    setcurrentleftOffset(l);
    setcurrentHeight(h);
  }
  useEffect(() => {
    getHeight();
  }, [current]);
  useEffect(() => {
    let element = document.querySelector("#tour-board");
    settourdata({ height: element.clientHeight, width: element.clientWidth });
  }, [current]);
  return (
    <div className={styles.tourWrapper}>
      <div className={styles.bg} />
      <div
        id="tour-board"
        className={styles.tour}
        style={{
          top:
            story[current].position === "top"
              ? currentHeight - 20
              : story[current].position === "bottom"
              ? elementdata?.height + currentHeight + 20
              : currentHeight - tourdata.width,
          left:
            story[current].position === "left"
              ? currentleftOffset - 20
              : story[current].position === "right"
              ? elementdata?.width + currentleftOffset + 20
              : currentleftOffset - tourdata.width,
        }}
      >
        Tour
      </div>
    </div>
  );
}
