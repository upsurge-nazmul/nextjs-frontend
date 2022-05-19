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
    if (story[current].intro) {
      setcurrentleftOffset("50%");
      setcurrentHeight("100%");
      return;
    }
    let currentElement = document.querySelector(story[current].ref);
    currentElement.style.zIndex = "22";
    var rect = currentElement.getBoundingClientRect();
    var elementLeft, elementTop; //x and y
    var scrollTop = document.documentElement.scrollTop
      ? document.documentElement.scrollTop
      : document.body.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft
      ? document.documentElement.scrollLeft
      : document.body.scrollLeft;
    elementTop = rect.top + scrollTop;
    elementLeft = rect.left + scrollLeft;
    setelementdata({
      height: currentElement.clientHeight,
      width: currentElement.clientwidth,
    });
    // let h = currentElement.offsetTop;
    // let l = currentElement.offsetLeft;
    // if (!h) {
    //   h = currentElement.offsetParent.offsetTop;
    // }
    // if (!l) {
    //   l = currentElement.offsetParent.offsetLeft;
    // }
    setcurrentleftOffset(elementLeft);
    setcurrentHeight(elementTop);
  }
  useEffect(() => {
    getHeight();
  }, [current]);
  useEffect(() => {
    let element = document.querySelector("#tour-board");
    console.log(element);
    settourdata({ height: element.clientHeight, width: element.clientWidth });
  }, [current]);

  function getstyle() {
    if (story[current].intro)
      return {
        marginLeft: "15%",
      };
    return {
      top:
        story[current].position === "top"
          ? currentHeight - 20 - tourdata.height
          : story[current].position === "bottom"
          ? elementdata?.height + currentHeight + 20
          : currentHeight - tourdata.height,
      left:
        story[current].position === "left"
          ? currentleftOffset - 20
          : story[current].position === "right"
          ? elementdata?.width + currentleftOffset + 20
          : currentleftOffset,
    };
  }
  return (
    <div className={styles.tourWrapper}>
      <div className={styles.bg} />
      <div
        id="tour-board"
        className={`${styles.tour} ${
          story[current].position === "top" && styles.bottomarrow
        }
        ${story[current].position === "bottom" && styles.toparrow}
        ${story[current].intro && styles.bubblearrow}
        `}
        style={getstyle()}
      >
        {story[current].content}

        <div className={styles.buttons}>
          <div className={styles.btn}>SKIP</div>
          {current < story.length - 1 && (
            <div className={styles.btn} onClick={() => setcurrent(current + 1)}>
              NEXT
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
