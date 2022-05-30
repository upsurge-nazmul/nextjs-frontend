import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import ChoreApis from "../../../actions/apis/ChoreApis";
import DashboardApis from "../../../actions/apis/DashboardApis";
import LoginApis from "../../../actions/apis/LoginApis";
import AvailableCourse from "../../../components/Courses/AvailableCourse";
import CoursesComponent from "../../../components/Courses/CoursesComponent";
import KidCards from "../../../components/Courses/KidCards";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import ApproveModal from "../../../components/ParentStore/ApproveModal";
import QuestCard from "../../../components/Quests/QuestCard";
import HeadingArrow from "../../../components/SVGcomponents/HeadingArrow";
import Toast from "../../../components/Toast";
import styles from "../../../styles/Courses/coursesPage.module.scss";
function CoursesPage({ liveclassdata }) {
  const [mode, setmode] = useState("Knowledge Quest");
  const router = useRouter();
  const { courseid } = router.query;
  const [state, setstate] = useState("inprogress");
  const [courses, setcourses] = useState(liveclassdata || []);
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const availableCourses = [
    {
      name: "upsurge Quest",
      description:
        "This introductory quests takes children through the concepts of money, banking, payments and money management. To progress, you have to complete each chapter, and complete all six to earn the completion badge and 1,000 UniCoins.",
      amount: 3500,
      img_url:
        "https://i.ibb.co/XpQ4TYc/6-L4pbu-K66d3-80-DX634-DY634-CX494-CY497.png",
      id: "upsurge-quest",
    },
  ];
  const kiddata = ["", "", ""];
  const [showmodal, setshowmodal] = useState(false);
  const [buydata, setbuydata] = useState({
    price: 10,
    type: "rs",
    name: "",
    description: "",
  });
  return (
    <div className={styles.coursesPage}>
      <DashboardLeftPanel />
      <Toast data={toastdata} />
      <ApproveModal
        showmodal={showmodal}
        setshowmodal={setshowmodal}
        buydata={buydata}
      />
      <div className={styles.contentWrapper}>
        <DashboardHeader mode={mode} setmode={setmode} />
        <div className={styles.mainContent}>
          <div className={styles.flexLeft}>
            <div className={`${styles.availableCourses} `}>
              <h2 className={styles.heading}>Preview Quests</h2>
              <div className={styles.wrapper}>
                {availableCourses.map((item, index) => {
                  return (
                    <QuestCard
                      data={item}
                      setbuydata={setbuydata}
                      setshowmodal={setshowmodal}
                      key={item.id}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          {/* <div className={styles.flexRight}>
            {kiddata.map((item, index) => {
              return <KidCards key={"kidCard" + index} />;
            })}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default CoursesPage;

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
      let kidsdata = await getkidsdata(token);
      let gamesdata = await getgames(token);
      let liveclassdata = await getliveclasses(token);
      let choresdata = await getchores(token);

      return {
        props: {
          isLogged: true,
          choresdata,
          gamesdata,
          kidsdata,
          liveclassdata,
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
async function getkidsdata(token) {
  let response = await DashboardApis.getkids(null, token);
  if (response && response.data && response.data.data)
    return response.data.data;
  else return null;
}
async function getchores(token) {
  let response = await ChoreApis.getpendingchores(null, token);
  if (response && response.data && response.data.data) {
    return response.data.data;
  } else return null;
}
async function getgames(token) {
  let response = await DashboardApis.getgames(null, token);
  if (response && response.data && response.data.data)
    return response.data.data;
  else return null;
}
async function getliveclasses(token) {
  let response = await DashboardApis.getliveclasses(null, token);
  if (response && response.data && response.data.data)
    return response.data.data;
  else return null;
}
