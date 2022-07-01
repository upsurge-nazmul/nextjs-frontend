import React from "react";
import styles from "../../styles/Quest/sections.module.scss";

function Section({ data, level = 1 }) {
  return (
    <div className={styles.section}>
      <div className={styles.left}>
        <p className={styles.sectionno}>Section {data.questNo}</p>
        <p className={styles.sectiontitle}>{data.title}</p>
        <p className={styles.chaptersandweeks}>{data.chaptersandweeks}</p>
      </div>
      <div className={styles.right}>
        <div className={styles.numberingArea}>
          <div className={styles.number}>{data.questNo}</div>
          <div
            className={level === 1 ? styles.numberLine : styles.completeLine}
          />
        </div>
        {data.chapters.length ? (
          data.chapters.map((chapter, index) => {
            return (
              <div className={styles.chapterArea} key={"chapter" + index}>
                <div className={styles.chapter}>
                  <div className={styles.chapterball} />
                  <div
                    className={styles.chapterball}
                    style={{
                      backgroundColor:
                        level >= chapter.chapterNo ? "#4166EB" : "transparent",
                    }}
                  />
                  <div className={styles.verticalLine} />
                  <div
                    className={styles.verticalLine}
                    style={{
                      backgroundColor: "#4166EB",
                      height: chapter.completion,
                    }}
                  />
                  <div className={styles.main}>
                    <p className={styles.chapterno}>
                      CHAPTER {chapter.chapterNo}
                    </p>
                    <p className={styles.chaptertitle}>{chapter.title}</p>
                    <p className={styles.chapterNo}></p>
                    <p className={styles.remainingtime}>
                      {chapter.remainingtime}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.chapterArea}>
            <div className={styles.chapter}>
              <div className={styles.chapterball} />
              <div className={styles.verticalLine} />
              <div className={styles.main}>
                <p className={styles.chaptertitle}>Coming soon...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Section;
