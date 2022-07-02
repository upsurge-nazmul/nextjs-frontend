import { useRouter } from "next/router";
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useContext,
} from "react";
import DashboardApis from "../../actions/apis/DashboardApis";
import MoneyAceApis from "../../actions/apis/MoneyAceApis";
import { getCookie } from "../../actions/cookieUtils";
import { MainContext } from "../../context/Main";
import styles from "../../styles/tour.module.scss";
export default function Tour({
  story,
  current,
  setcurrent,
  setshowtour,
  nextFunction,
  customCompletion,
  introComplete,
}) {
  const [currentHeight, setcurrentHeight] = useState(0);
  const [currentleftOffset, setcurrentleftOffset] = useState(0);
  const [elementdata, setelementdata] = useState(null);
  const [tourdata, settourdata] = useState({
    width: 0,
    height: 0,
  });
  const { widthHeight } = useContext(MainContext);
  const router = useRouter();
  function getHeight() {
    if (story[current]?.blank) return;
    if (story[current]?.intro) {
      setcurrentleftOffset("50%");
      setcurrentHeight("100%");
      return;
    }
    if (story[current]?.delay) {
      setTimeout(() => getDelayedHeight(), 300);
    }
    let currentElement = document.querySelector(story[current]?.ref);
    currentElement?.scrollIntoView();
    if (!currentElement) {
      setelementdata({
        height: 0,
        width: 0,
      });
      setcurrentleftOffset(0);
      setcurrentHeight(0);
      return;
    }
    let prevElement = document.querySelector(story[current - 1]?.ref);
    if (prevElement) {
      prevElement.classList.remove(styles.elevate);
      prevElement.classList.remove(styles.highlightBg);
      prevElement.classList.remove(styles.extraPadding);
      prevElement.classList.remove(styles.absolute);
    }
    if (story[current]?.isolate) {
      currentElement.classList.add(styles.elevate);
    }
    if (story[current]?.highlightBg) {
      currentElement.classList.add(styles.highlightBg);
    }
    if (story[current]?.extraPadding) {
      currentElement.classList.add(styles.extraPadding);
    }
    if (story[current]?.absolute) {
      currentElement.classList.add(styles.absolute);
    }
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
  function getDelayedHeight() {
    let currentElement = document.querySelector(story[current]?.ref);
    if (!currentElement) {
      setelementdata({
        height: 0,
        width: 0,
      });
      setcurrentleftOffset(0);
      setcurrentHeight(0);
      return;
    }
    if (story[current]?.isolate) {
      currentElement.classList.add(styles.elevate);
    }
    if (story[current]?.border) {
      currentElement.classList.add(styles.border);
    }
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
  async function finish() {
    if (introComplete) {
      let res = await DashboardApis.completeintroguide();
      console.log(res.data);
      if (res?.data?.success) {
        setshowtour(false);
        router.push("/dashboard/p");
      } else {
        console.log("something went wrong");
      }
      return;
    }
    let res = await MoneyAceApis.marktourfinished(getCookie("accesstoken"));
    if (res?.data?.success) {
      setshowtour(false);
    } else {
      console.log("something went wrong");
    }
  }
  useEffect(() => {
    getHeight();
  }, [current, widthHeight]);
  useEffect(() => {
    if (story[current]?.skip) {
      let prevElement = document.querySelector(story[current - 1]?.ref);
      if (prevElement) {
        prevElement.classList.remove(styles.elevate);
        prevElement.classList.remove(styles.highlightBg);
      }
      setcurrent((prev) => prev + 1);
      return;
    }
    let element = document.querySelector("#tour-board");
    if (element)
      settourdata({ height: element.clientHeight, width: element.clientWidth });
  }, [current, widthHeight]);

  function getstyle() {
    if (story[current]?.intro)
      return {
        marginLeft: "15%",
      };
    return {
      top:
        story[current]?.position === "top" ||
        story[current]?.position === "top-left"
          ? currentHeight - 20 - tourdata.height
          : story[current]?.position === "bottom" ||
            story[current]?.position === "bottom-left"
          ? elementdata?.height + currentHeight + 20
          : story[current]?.position === "left"
          ? elementdata?.height + currentHeight - 40
          : story[current]?.position === "top-center"
          ? currentHeight - tourdata.height - 20
          : currentHeight - tourdata.height,
      left:
        story[current]?.position === "top-left" ||
        story[current]?.position === "bottom-left"
          ? currentleftOffset - tourdata.width + 60
          : story[current]?.position === "left"
          ? currentleftOffset - tourdata.width - 20
          : story[current]?.position === "right"
          ? elementdata?.width + currentleftOffset + 20
          : story[current]?.position === "top-center"
          ? "52%"
          : currentleftOffset,
    };
  }

  if (story[current]?.blank) {
    return null;
  }
  return (
    <div
      className={`${styles.tourWrapper} ${
        story[current]?.superimpose && styles.superImposed
      } 
    `}
      style={story[current]?.disableBg ? { pointerEvents: "none" } : {}}
    >
      {
        <div
          className={`${styles.bg} ${
            story[current]?.disableBg && styles.disabledBG
          }`}
        />
      }
      <div
        id="tour-board"
        className={`${styles.tour} ${
          story[current]?.position === "top" && styles.bottomarrow
        }
        ${story[current]?.position === "bottom" && styles.toparrow}
        ${story[current]?.position === "left" && styles.leftarrow}
        ${story[current]?.position === "top-left" && styles.bottomrightarrow}
        ${story[current]?.position === "bottom-left" && styles.bottomleftarrow}
        ${story[current]?.position === "top-center" && styles.topcenterarrow}
        ${story[current]?.intro && styles.bubblearrow}
        `}
        style={getstyle()}
      >
        {story[current]?.content}

        {
          <div className={styles.buttons}>
            {!story[current]?.required && (
              <div className={styles.btn} onClick={finish}>
                SKIP
              </div>
            )}
            {story[current]?.last && (
              <div className={styles.btn} onClick={finish}>
                FINISH
              </div>
            )}
            {!story[current]?.disableBtns && current < story.length - 1 && (
              <div
                className={styles.btn}
                onClick={() => {
                  if (story[current]?.nextFunction) {
                    story[current]?.nextFunction();
                  }
                  setcurrent(current + 1);
                }}
              >
                NEXT
              </div>
            )}
          </div>
        }
      </div>
    </div>
  );
}
