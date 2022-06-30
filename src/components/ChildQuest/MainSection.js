// import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/knowledgeQuest/MainSection.module.scss";
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import QuestCard from "./QuestCard";

export default function MainSection({ data }) {
  const router = useRouter();
  // const [expanded, setExpanded] = useState(1);

  const handleCardClick = (id) => {
    router.push(`/dashboard/k/quest/${id}`);
  };

  return (
    <div className={styles.mainSection}>
      {data &&
        data.length &&
        data.map((item) => {
          return (
            <QuestCard
              handleCardClick={handleCardClick}
              data={item}
              key={item.questNo}
            />
          );
        })}

      {/* {data &&
        data.length &&
        data.map((item) => {
          return (
            <Accordion
              key={item.questNo}
              expanded={expanded === item.questNo}
              onChange={() =>
                expanded === item.questNo
                  ? setExpanded()
                  : setExpanded(item.questNo)
              }
              className={styles.accordion}
            >
              <AccordionSummary className={styles.accordionSummary}>
                {item.title}
              </AccordionSummary>
              <AccordionDetails className={styles.accordionDetails}>
                {item.chapters
                  ? item.chapters.length
                    ? item.chapters.map((chp) => {
                        return (
                          <div
                            key={chp.chapterNo}
                            className={styles.accordionBody}
                          >
                            <div className={styles.chapterNo}>
                              {chp.chapterNo}
                            </div>
                            <div className={styles.chapterTitle}>
                              {chp.title}
                            </div>
                          </div>
                        );
                      })
                    : ""
                  : ""}
                <div className={styles.questAction}>
                  <button
                    className={styles.chapterButton}
                    onClick={() =>
                      router.push(`/dashboard/k/quest/${item.questId}`)
                    }
                  >
                    Continue
                    <ArrowRightAltIcon className={styles.buttonIcon} />
                  </button>
                </div>
              </AccordionDetails>
            </Accordion>
          );
        })} */}
    </div>
  );
}
