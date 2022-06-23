import styles from "../../styles/knowledgeQuest/Map.module.scss";
import { positions } from "./positions";

export default function QuestMap({ questData, changeView = () => {} }) {
  return (
    <>
      {questData && (
        <div className={styles.mainContent} id="quest-main">
          <div className={styles.headingSection}>
            <div className={styles.title}>{questData.title}</div>
            <div className={styles.description}>
              {questData.questDescription}
            </div>
          </div>
          <div className={styles.map}>
            {questData.chapters
              ? questData.chapters.length
                ? questData.chapters.map((chapter) => {
                    return (
                      <div
                        key={chapter.chapterNo}
                        className={
                          false ? styles.completedChapter : styles.chapter
                        }
                        style={
                          positions[`quest${questData.questNo}`][
                            chapter.chapterNo - 1
                          ]
                        }
                        onClick={() => changeView(chapter.type)}
                      >
                        <span>{chapter.chapterNo}.</span> {chapter.title}
                      </div>
                    );
                  })
                : ""
              : ""}
          </div>
        </div>
      )}
    </>
  );
}
