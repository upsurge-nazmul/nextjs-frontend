import React from "react";
import LiveClass from "./LiveClass";
import styles from "../../styles/ParentStore/liveClassSections.module.scss";
import HeadingArrow from "../SVGcomponents/HeadingArrow";

function LiveClassSection({ setbuydata, setshowmodal }) {
  const data = [
    {
      name: "Learn Investment Basics",
      description:
        "This Investments for beginners course teaches you the basics fast. It includes quizzes and assignments too..",
      amount: 3500,
    },
  ];
  return (
    <div className={styles.liveClassSection}>
      <h2 className={styles.heading}>
        Available Live Classes
        <HeadingArrow />
      </h2>
      <div className={styles.wrapper}>
        {data.map((item, index) => (
          <LiveClass
            setbuydata={setbuydata}
            setshowmodal={setshowmodal}
            data={item}
            key={"LiveClass" + index}
          />
        ))}
      </div>
    </div>
  );
}

export default LiveClassSection;
