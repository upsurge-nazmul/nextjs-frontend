import styles from "../../styles/knowledgeQuest/Map.module.scss";
import { useMediaQuery } from "@mui/material";
import { getPositions } from "./positions";

export default function QuestMap({
  questData,
  changeView = () => {},
  setActiveChapter = () => {},
  setActiveChapterNo = () => {},
  userLevel = 0,
}) {
  const isMobile = useMediaQuery("(max-width: 500px)");
  const isTablet = useMediaQuery("(min-width: 501px) and (max-width: 990px)");

  const positions = getPositions({ isMobile, isTablet });

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
                          userLevel >= chapter.chapterNo
                            ? styles.completedChapter
                            : userLevel + 1 === chapter.chapterNo
                            ? styles.chapter
                            : styles.disabledChapter
                          //  styles.chapter
                        }
                        style={
                          positions[`quest${questData?.questNo}`][
                            chapter.chapterNo - 1
                          ]
                        }
                        onClick={() => {
                          if (
                            userLevel >= chapter.chapterNo ||
                            userLevel + 1 === chapter.chapterNo
                          ) {
                            mixpanel.track("Knowledge Quest started", {
                              event: `Quest Started ${chapter.id}`,
                              chapterId: `${chapter.id}`,
                            });
                            changeView(chapter.type);
                            setActiveChapter(chapter.id);
                            setActiveChapterNo(chapter.chapterNo);
                          }
                        }}
                      >
                        <span>{chapter.title}</span>
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
