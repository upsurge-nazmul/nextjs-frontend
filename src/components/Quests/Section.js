import React from "react";
import styles from "../../styles/Quest/sections.module.scss";
function Section({ data }) {
  return (
    <div className={styles.section}>
      <div className={styles.left}>
        <p className={styles.sectionno}>Section {data.sectionno}</p>
        <p className={styles.sectiontitle}>{data.title}</p>
        <p className={styles.chaptersandweeks}>{data.chaptersandweeks}</p>
      </div>
      <div className={styles.right}>
        {data.chapters.map((chapter, index) => {
          return (
            <div className={styles.chapter} key={"chapter" + index}>
              <div className={styles.main}>
                <p className={styles.chapterno}>CHAPTER {chapter.chapterno}</p>
                <p className={styles.chaptertitle}>{chapter.title}</p>
                <p className={styles.chapterno}></p>
                <p className={styles.remainingtime}>{chapter.remainingtime}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Section;
