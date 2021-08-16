import React from "react";
import styles from "../../styles/Quest/sections.module.scss";
function Section({ data }) {
  return (
    <div className={styles.section}>
      <div className={styles.left}>
        <div className={styles.sectionball}>{data.sectionno}</div>
        <p className={styles.sectionno}>Section {data.sectionno}</p>
        <p className={styles.sectiontitle}>{data.title}</p>
        <p className={styles.chaptersandweeks}>{data.chaptersandweeks}</p>
      </div>
      <div className={styles.right}>
        {data.chapters.map((chapter) => {
          console.log(chapter.completion);
          return (
            <div className={styles.chapter}>
              <div
                className={styles.chapterball}
                style={{
                  backgroundColor:
                    chapter.completion === "100%" ? "#4166EB" : "#cecece",
                }}
              ></div>

              <div className={styles.bar}></div>
              <div className={styles.main}>
                <p className={styles.chapterno}>CHAPTER {chapter.chapterno}</p>
                <p className={styles.chaptertitle}>{chapter.title}</p>
                <div className={styles.progress}>
                  <div
                    className={styles.filler}
                    style={{ width: chapter.completion }}
                  ></div>
                </div>
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
