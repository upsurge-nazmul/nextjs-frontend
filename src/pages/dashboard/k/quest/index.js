import React, { useEffect, useState } from "react";
import KnowledgeQuestApi from "../../../../actions/apis/KnowledgeQuestApi";
import LoginApis from "../../../../actions/apis/LoginApis";
import Toast from "../../../../components/Toast";
import DashboardLeftPanel from "../../../../components/Dashboard/DashboardLeftPanel";
import styles from "../../../../styles/knowledgeQuest/Quest.module.scss";
import DashboardHeader from "../../../../components/Dashboard/DashboardHeader";
import HeadArea from "../../../../components/ChildQuest/HeadArea";
import MainSection from "../../../../components/ChildQuest/MainSection";

export default function KnowledgeQuest({ userData, userLevel, questData }) {
  const [mode, setmode] = useState("Knowledge Quest");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });

  return (
    <div className={styles.questPage}>
      <DashboardLeftPanel type="kid" />
      <Toast data={toastdata} />
      <div className={styles.contentWrapper}>
        <DashboardHeader mode={mode} />
        <div className={styles.mainContent} id="quest-main">
          <HeadArea />
          <MainSection data={questData} />
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
