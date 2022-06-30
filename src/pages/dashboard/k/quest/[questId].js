import React, { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
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

const TYPES = ["recording", "activity", "quiz"];

export default function KnowledgeQuest({ userData, userLevel, questData }) {
  const router = useRouter();
  const { questId } = router.query;

  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [currentQuest, setCurrentQuest] = useState();
  const [view, setView] = useState();
  const [currentChapter, setCurrentChapter] = useState();

  useEffect(() => {
    if (questData && questId) {
      let curr = questData.find((q) => q.questId === questId);
      setCurrentQuest(curr);
    }
  }, [questId, questData]);

  const handleBack = () => {
    setView();
    setCurrentChapter();
  };

  const handleDone = () => {
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
              <div className={styles.title}>{currentQuest.title}</div>
              <div className={styles.description}>
                {currentQuest.questDescription}
              </div>
            </div>
          )}
          {view ? (
            <div className={styles.views}>
              {view === TYPES[0] ? (
                <RecordingView
                  {...{
                    chapterId: currentChapter,
                  }}
                />
              ) : view === TYPES[1] ? (
                <ActivityView
                  {...{
                    chapterId: currentChapter,
                  }}
                />
              ) : view === TYPES[2] ? (
                <QuizView
                  {...{
                    chapterId: currentChapter,
                  }}
                />
              ) : (
                ""
              )}
              <div className={styles.actionArea}>
                <button className={styles.backButton} onClick={handleBack}>
                  Go Back
                </button>
                {view === TYPES[0] && (
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
      let level = await KnowledgeQuestApi.initiate(
        { id: "money-quest" },
        token
      );
      let questRes = await KnowledgeQuestApi.getQuestData(null, token);
      return {
        props: {
          isLogged: true,
          userData: response.data.data,
          userLevel:
            level && level.data && level.data.success
              ? level.data.data.level
              : 1,
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
