import React, { useEffect, useState } from "react";
import DashboardHeader from "../../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../../components/Dashboard/DashboardLeftPanel";
import Section from "../../../../components/Quests/Section";
import BookMarkSvg from "../../../../components/SVGcomponents/BookMarkSvg";
import PeopleSvg from "../../../../components/SVGcomponents/PeopleSvg";
import ProjectSvg from "../../../../components/SVGcomponents/ProjectSvg";
import Toast from "../../../../components/Toast";
import styles from "../../../../styles/Quest/quest.module.scss";
import DashboardApis from "../../../../actions/apis/DashboardApis";
import LoginApis from "../../../../actions/apis/LoginApis";
import KnowledgeQuestApi from "../../../../actions/apis/KnowledgeQuestApi";
import Selection from "../../../../components/Selection";

const democoncepts = [
  "Investing",
  "Saving",
  "Assets",
  "Mutual Funds",
  "Investing",
  "Saving",
  "Assets",
  "Mutual Funds",
];

export default function Quests({ kidsdata, questData }) {
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [mode, setmode] = useState("Knowledge Quest");
  const [kidsOptions, setKidsOptions] = useState();
  const [selectedkid, setSelectedKid] = useState();
  const [selectedKidsLevel, setSelectedKidsLevel] = useState();

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
    if (selectedkid) {
      async function fetchKidsLevel() {
        let res = await KnowledgeQuestApi.getLevel({
          userId: selectedkid,
        });
        if (res && res.data && res.data.success) {
          let lev = res.data.data ? res.data.data : 0;
          setSelectedKidsLevel(lev);
        }
      }
      fetchKidsLevel();
    }
  }, [selectedkid]);

  return (
    <div className={styles.quest}>
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
        <div className={styles.maincontent}>
          <div className={styles.left}>
            <p className={styles.heading}>About the Quest</p>
            <p className={styles.about}>
              {`This introductory quests takes children through the concepts of money, banking, payments and money management. To progress, you have to complete each chapter, and complete all six to earn the completion badge and 1,000 UniCoins.`}
            </p>
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
                    setvalue={setSelectedKid}
                    options={kidsOptions}
                    placeholder="Select Child"
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className={styles.section}>
              {questData &&
                questData.length &&
                questData.map((quest, index) => (
                  <Section data={quest} level={2} key={"section" + index} />
                ))}
            </div>
          </div>
          <div className={styles.right}>
            {/* <div className={styles.buttonwrapper}>
              <div className={styles.bookmarkbutton}>
                <BookMarkSvg />
                Bookmark
              </div>
              <div className={styles.startbutton}>Start quest</div>
            </div> */}
            {/* <div className={styles.details}>
              <div className={styles.section}>
                <p className={styles.number}>34</p>
                <p className={styles.name}>session</p>
              </div>
              <div className={styles.section}>
                <p className={styles.number}>4</p>
                <p className={styles.name}>projects</p>
              </div>
              <div className={styles.section}>
                <p className={styles.number}>3</p>
                <p className={styles.name}>challenges</p>
              </div>
            </div> */}
          </div>
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
