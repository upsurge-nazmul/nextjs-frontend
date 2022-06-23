import styles from "../../styles/knowledgeQuest/Map.module.scss";
import { positions } from "./positions";

export default function QuestMap({
  questData,
  changeView = () => {},
  setActiveChapter = () => {},
}) {
  return (
    <>
      {questData && (
        <div className={styles.mapContent} id="quest-main">
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
                        onClick={() => {
                          changeView(chapter.type);
                          setActiveChapter(chapter.id);
                        }}
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
