import React, { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import KnowledgeQuestApi from "../../../../actions/apis/KnowledgeQuestApi";
import LoginApis from "../../../../actions/apis/LoginApis";
import Toast from "../../../../components/Toast";
import DashboardLeftPanel from "../../../../components/Dashboard/DashboardLeftPanel";
import styles from "../../../../styles/knowledgeQuest/Map.module.scss";
import DashboardHeader from "../../../../components/Dashboard/DashboardHeader";
import { positions } from "../../../../components/ChildQuest/positions";

export default function KnowledgeQuest({ userData, userLevel, questData }) {
  const router = useRouter();
  const { questId } = router.query;

  const [mode, setmode] = useState("");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [currentQuest, setCurrentQuest] = useState();

  useEffect(() => {
    if (questData && questId) {
      let curr = questData.find((q) => q.questId === questId);
      setCurrentQuest(curr);
    }
  }, [questId, questData]);

  console.log("%%%%%%%%%%", questData, currentQuest);

  return (
    <div className={styles.questPage}>
      <DashboardLeftPanel type="kid" />
      <Toast data={toastdata} />
      <div className={styles.contentWrapper}>
        <DashboardHeader mode={mode} setmode={setmode} />
        {currentQuest && (
          <div className={styles.mainContent} id="quest-main">
            <div className={styles.headingSection}>
              <div className={styles.title}>{currentQuest.title}</div>
              <div className={styles.description}>
                {currentQuest.questDescription}
              </div>
            </div>
            <div className={styles.map}>
              {currentQuest.chapters
                ? currentQuest.chapters.length
                  ? currentQuest.chapters.map((chapter) => {
                      return (
                        <div
                          key={chapter.chapterNo}
                          className={
                            false ? styles.completedChapter : styles.chapter
                          }
                          style={
                            positions[`quest${currentQuest.questNo}`][
                              chapter.chapterNo - 1
                            ]
                          }
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
