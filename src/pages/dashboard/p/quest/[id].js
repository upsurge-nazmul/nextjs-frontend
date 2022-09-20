import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/dist/client/router";
import DashboardHeader from "../../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../../components/Dashboard/DashboardLeftPanel";
import Section from "../../../../components/Quests/Section";
import Toast from "../../../../components/Toast";
import styles from "../../../../styles/Quest/quest.module.scss";
import DashboardApis from "../../../../actions/apis/DashboardApis";
import LoginApis from "../../../../actions/apis/LoginApis";
import KnowledgeQuestApi from "../../../../actions/apis/KnowledgeQuestApi";
import Selection from "../../../../components/Selection";
import NoKid from "../../../../components/Dashboard/NoKid";
import { MainContext } from "../../../../context/Main";
import PageTitle from "../../../../components/PageTitle";

export default function Quests({ kidsdata, questData, userdatafromserver }) {
  const { setuserdata, userdata } = useContext(MainContext);
  const router = useRouter();
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [mode, setmode] = useState("Knowledge Quest");
  const [kidsOptions, setKidsOptions] = useState();
  const [selectedkid, setSelectedKid] = useState();
  const [levelUpdated, setLevelUpdated] = useState(false);

  useEffect(() => {
    if (!userdatafromserver) {
      router.push("/?err=01");
    } else {
      setuserdata(userdatafromserver);
    }
  }, [userdatafromserver]);

  useEffect(() => {
    if (kidsdata && kidsdata.length) {
      let newData = [];
      for (let kid of kidsdata) {
        newData.push({
          name: kid.first_name + " " + kid.last_name,
          value: kid.id,
        });
      }
      setKidsOptions(newData);
    }
  }, [kidsdata]);

  useEffect(() => {
    if (kidsOptions && kidsOptions.length) setSelectedKid(kidsOptions[0].value);
  }, [kidsOptions]);

  useEffect(() => {
    if (selectedkid && questData && !levelUpdated) {
      async function fetchKidsLevel() {
        for (let quest of questData) {
          let res = await KnowledgeQuestApi.getLevel({
            userId: selectedkid,
            quest_id: quest.questId,
          });
          if (res && res.data && res.data.success) {
            quest.level = res.data.data;
          }
        }
        setLevelUpdated(true);
      }
      fetchKidsLevel();
    }
  }, [selectedkid, questData, levelUpdated]);

  const handleSelection = (val) => {
    setLevelUpdated(false);
    setSelectedKid(val);
  };

  return (
    <div className={styles.quest}>
      <PageTitle />
      <DashboardLeftPanel />
      <Toast data={toastdata} />
      <div className={styles.contentWrapper}>
        <DashboardHeader mode={mode} setmode={setmode} />
        <div className={styles.mainhead}>
          <img
            src="https://i.ibb.co/XpQ4TYc/6-L4pbu-K66d3-80-DX634-DY634-CX494-CY497.png"
            alt=""
          />
          <div className={styles.right}>
            <p className={styles.questheading}>upsurge Quest</p>
            <p className={styles.age}>Age 10-12</p>
          </div>
          <div className={styles.creditandweeks}>
            <p className={styles.credits}>1000 UniCoins</p>
          </div>
        </div>
        {kidsOptions ? (
          <>
            <div className={styles.maincontent}>
              <div className={styles.left}>
                <div className={styles.midSection}>
                  <div className={styles.knowledgeSection}>
                    <p className={styles.heading}>Knowledge Quest Content</p>
                    <p className={styles.content}>
                      Follow the course content to learn more about Investing.
                    </p>
                  </div>
                  <div className={styles.dropdownArea}>
                    {kidsOptions && kidsOptions.length ? (
                      <Selection
                        value={selectedkid}
                        setvalue={handleSelection}
                        options={kidsOptions}
                        placeholder="Select Child"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className={styles.section}>
                  {levelUpdated &&
                    questData &&
                    questData.length &&
                    questData.map((quest, index) => (
                      <Section quest={quest} key={"section" + index} />
                    ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.noData}>
            <NoKid backTo="/dashboard/p/quest/upsurge-quest" />
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
      return { props: { isLogged: false, msg: msg || "Error" } };
    } else {
      let kidsdata = await getkidsdata(token);
      let questRes = await KnowledgeQuestApi.getQuestData(null, token);
      return {
        props: {
          isLogged: true,
          kidsdata,
          questData:
            questRes && questRes.data && questRes.data.success
              ? questRes.data.data
              : null,
          userdatafromserver: response.data.data,
        },
      };
    }
  } else {
    return { props: { isLogged: false, msg: "cannot get token" } };
  }
}

async function getkidsdata(token) {
  let response = await DashboardApis.getkids(null, token);
  if (response && response.data && response.data.data)
    return response.data.data;
  else return null;
}
