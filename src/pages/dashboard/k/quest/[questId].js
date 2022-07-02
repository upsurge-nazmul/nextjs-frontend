import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/dist/client/router";
import { MainContext } from "../../../../context/Main";
import KnowledgeQuestApi from "../../../../actions/apis/KnowledgeQuestApi";
import LoginApis from "../../../../actions/apis/LoginApis";
import Toast from "../../../../components/Toast";
import DashboardLeftPanel from "../../../../components/Dashboard/DashboardLeftPanel";
import styles from "../../../../styles/knowledgeQuest/QuestDetails.module.scss";
import DashboardHeader from "../../../../components/Dashboard/DashboardHeader";
import QuestMap from "../../../../components/ChildQuest/QuestMap";
import RecordingView from "../../../../components/ChildQuest/RecordingView";
import ActivityView from "../../../../components/ChildQuest/ActivityView";
import QuizView from "../../../../components/ChildQuest/QuizView";
import { getCookie } from "../../../../actions/cookieUtils";

const LESSON_TYPES = ["recording", "activity", "quiz"];

const democoncepts = [
  "Money",
  "Currency",
  "Banking",
  "Payments",
  "Money Management",
  "Quiz",
  "Activity",
];

export default function KnowledgeQuest({ userData, questData }) {
  const router = useRouter();
  const { userdata, setuserdata } = useContext(MainContext);
  const { questId } = router.query;

  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [currentQuest, setCurrentQuest] = useState();
  const [view, setView] = useState();
  const [currentChapter, setCurrentChapter] = useState();
  const [activeChNo, setActiveChNo] = useState(0);

  useEffect(() => {
    setuserdata(userData);
  }, [userData]);

  useEffect(() => {
    if (questData && questId) {
      let curr = questData.find((q) => q.questId === questId);
      setCurrentQuest(curr);
    }
  }, [questId, questData]);

  useEffect(() => {
    async function fetchQuestLevel() {
      let level = await KnowledgeQuestApi.initiate(
        { quest_id: questId },
        getCookie("accesstoken")
      );
      if (level && level.data && level.data.success) {
        setActiveChNo(level.data.data.level);
      }
    }
    fetchQuestLevel();
  }, [questId]);

  const handleBack = () => {
    setView();
    setCurrentChapter();
  };

  const handleDone = () => {
    KnowledgeQuestApi.update({
      level: activeChNo + 1,
      quest_id: currentQuest.questId,
    });
    setActiveChNo((prev) => prev + 1);
    setView();
    setCurrentChapter();
  };

  return (
    <div className={styles.questPage}>
      <DashboardLeftPanel type="kid" />
      <Toast data={toastdata} />
      <div className={styles.contentWrapper}>
        <DashboardHeader />
        <div className={styles.mainContent}>
          {currentQuest && (
            <div className={styles.headingSection}>
              <p className={styles.heading}>{currentQuest.title}</p>
              <p className={styles.about}>{currentQuest.questDescription}</p>
              <p className={styles.heading}>Concepts Covered</p>
              <div className={styles.conceptswrapper}>
                {democoncepts.map((concept, index) => {
                  return (
                    <div className={styles.concept} key={"concept" + index}>
                      {concept}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {view ? (
            <div className={styles.views}>
              {view === LESSON_TYPES[0] ? (
                <RecordingView
                  {...{
                    chapterId: currentChapter,
                  }}
                />
              ) : view === LESSON_TYPES[1] ? (
                <ActivityView
                  {...{
                    chapterId: currentChapter,
                  }}
                />
              ) : view === LESSON_TYPES[2] ? (
                <QuizView
                  {...{
                    chapterId: currentChapter,
                    questId: currentQuest.questId,
                    handleDone,
                    setuserdata,
                  }}
                />
              ) : (
                ""
              )}
              <div className={styles.actionArea}>
                <button className={styles.backButton} onClick={handleBack}>
                  Go Back
                </button>
                {(view === LESSON_TYPES[0] || view === LESSON_TYPES[1]) && (
                  <button className={styles.doneButton} onClick={handleDone}>
                    Done
                  </button>
                )}
              </div>
            </div>
          ) : (
            <QuestMap
              questData={currentQuest}
              changeView={setView}
              setActiveChapter={setCurrentChapter}
              activeChapterNo={activeChNo}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params, req }) {
  let token = req.cookies.accesstoken;
  let msg = "";
  if (token) {
    let response = await LoginApis.checktoken({
      token: token,
    });
    if (response && !response.data.success) {
      msg = response.data.msg;
      return {
        props: { isLogged: false, msg },
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    } else {
      let questRes = await KnowledgeQuestApi.getQuestData(null, token);
      return {
        props: {
          isLogged: true,
          userData: response.data.data,
          questData: questRes
            ? questRes.data
              ? questRes.data.success
                ? questRes.data.data
                : null
              : null
            : null,
        },
      };
    }
  } else {
    return {
      props: { isLogged: false, msg: "cannot get token" },
      redirect: {
        permanent: false,
        destination: "/?err=01",
      },
    };
  }
}
