import React from "react";
import styles from "../../styles/Quest/sections.module.scss";

function Section({ data, level }) {
  return (
    <div className={styles.section}>
      <div className={styles.right}>
        {/* <div className={styles.numberingArea}>
          {data.sectionno > 1 && (
            <div
              className={
                level >= data.sectionno
                  ? styles.completeNumberLineLine
                  : styles.emptyNumberLine
              }
            />
          )}
          <div className={styles.number}>{data.sectionno}</div>
        </div> */}
        <div className={styles.chapterArea}>
          <div className={styles.chapter}>
            <div
              className={
                level >= data.sectionno ? styles.completeBall : styles.emptyBall
              }
            >
              {data.sectionno}
            </div>
            <div
              className={
                level >= data.sectionno ? styles.completeLine : styles.emptyLine
              }
            />
            <div className={styles.main}>
              <p className={styles.chapterno}>SECTION {data.sectionno}</p>
              <p className={styles.chaptertitle}>{data.title}</p>
              <p className={styles.chapterno}></p>
              <p className={styles.remainingtime}>{data.des}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section;
