import React from "react";
import styles from "../../styles/Quest/sections.module.scss";

function Section({ quest }) {
  return (
    <div className={styles.section}>
      <div className={styles.left}>
        <p className={styles.sectionno}>Section {quest.questNo}</p>
        <p className={styles.sectiontitle}>{quest.title}</p>
        <p className={styles.sectiondesc}>{quest.questDescription}</p>
      </div>
      <div className={styles.right}>
        <div className={styles.numberingArea}>
          <div className={styles.number}>{quest.questNo}</div>
          <div
            className={
              quest.level <= 1 ? styles.numberLine : styles.completeLine
            }
          />
        </div>
        {quest.chapters.length ? (
          quest.chapters.map((chapter, index) => {
            return (
              <div className={styles.chapterArea} key={"chapter" + index}>
                <div className={styles.chapter}>
                  <div
                    className={
                      quest.level >= chapter.chapterNo
                        ? styles.completedChapterBall
                        : styles.chapterball
                    }
                  />
                  <div
                    className={
                      quest.level >= chapter.chapterNo
                        ? styles.completedVerticalLine
                        : styles.verticalLine
                    }
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
