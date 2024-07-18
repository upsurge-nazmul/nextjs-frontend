import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/dist/client/router";
import { MainContext } from "../../../../context/Main";
import KnowledgeQuestApi from "../../../../actions/apis/KnowledgeQuestApi";
import LoginApis from "../../../../actions/apis/LoginApis";
import Toast from "../../../../components/Toast";
import DashboardLeftPanel from "../../../../components/Dashboard/DashboardLeftPanel";
import styles from "../../../../styles/knowledgeQuest/quest.module.scss";
import DashboardHeader from "../../../../components/Dashboard/DashboardHeader";
import HeadArea from "../../../../components/ChildQuest/HeadArea";
import MainSection from "../../../../components/ChildQuest/MainSection";
import Tabs from "../../../../components/ChildQuest/Tabs";
import PageTitle from "../../../../components/PageTitle";
import ChosePremiumPopUp from "../../../../components/ChosePremiumPopUp";

const QUEST_TYPES = [
  {
    questTypeId: "FL",
    title: "Financial Literacy",
    background: "#fcd9d9",
    font: "#850606",
  },
  {
    questTypeId: "ER",
    title: "Entrepreneurship",
    background: "#e8cae8",
    font: "#931393",
  },
  {
    questTypeId: "CQ",
    title: "Career Quests",
    background: "#ccc",
    font: "#333",
  },
  { questTypeId: "LS", title: "Life Skills", background: "#ccc", font: "#333" },
];

export default function KnowledgeQuest({ userData, questData }) {
  const router = useRouter();
  const { setuserdata } = useContext(MainContext);
  const [tab, setTab] = useState();
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [showSubToPremium, setShowSubToPremium] = useState(false);
  useEffect(() => {
    setuserdata(userData);
  }, [userData]);

  const handleCardClick = (id) => {
    router.push(`/dashboard/k/quest/${id}?questTypeId=${tab.questTypeId}`);
  };

  const handleTabClick = (tab) => {
    router.push({
      pathname: router.pathname,
      query: { questTypeId: tab.questTypeId },
    });
    setTab(tab);
  };

  useEffect(() => {
    // set tab from query params
    if (router.isReady) {
      let currentTab = router.query.questTypeId;
      if (currentTab) {
        let tab = QUEST_TYPES.find((qt) => qt.questTypeId === currentTab);
        if (tab) {
          setTab(tab);
        } else handleTabClick(QUEST_TYPES[0]);
      } else handleTabClick(QUEST_TYPES[0]);
    }
  }, [router.query]);

  return (
    <div className={styles.questPage}>
      <PageTitle title={`upsurge | Quests`} />
      <DashboardLeftPanel type="kid" />
      <Toast data={toastdata} />
      <div className={styles.contentWrapper}>
        <DashboardHeader mode={"Quests"} settoastdata={settoastdata} />
        {showSubToPremium && (
          <ChosePremiumPopUp setChoseToPremium={setShowSubToPremium} />
        )}
        <div className={styles.mainContent} id="quest-main">
          {tab && (
            <>
              <Tabs
                list={QUEST_TYPES}
                current={tab}
                setCurrent={handleTabClick}
              />
              {/* <HeadArea
              data={questData}
              tab={tab}
              handleCardClick={handleCardClick}
            /> */}
              <MainSection
                data={questData}
                handleCardClick={handleCardClick}
                QUEST_TYPES={QUEST_TYPES}
                tab={tab}
                userData={userData}
                setShowSubToPremium={setShowSubToPremium}
              />
            </>
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
