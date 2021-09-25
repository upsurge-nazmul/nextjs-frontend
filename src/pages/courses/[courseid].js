import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import DashboardApis from "../../actions/apis/DashboardApis";
import LoginApis from "../../actions/apis/LoginApis";
import AvailableCourse from "../../components/Courses/AvailableCourse";
import CoursesComponent from "../../components/Courses/CoursesComponent";
import KidCards from "../../components/Courses/KidCards";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../components/Dashboard/DashboardLeftPanel";
import ApproveModal from "../../components/ParentStore/ApproveModal";
import HeadingArrow from "../../components/SVGcomponents/HeadingArrow";
import Toast from "../../components/Toast";
import styles from "../../styles/Courses/coursesPage.module.scss";
function CoursesPage({ liveclassdata }) {
  const [mode, setmode] = useState("Courses");
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
      name: "Learn Investment Basics",
      description:
        "This Investments for beginners course teaches you the basics fast. It includes quizzes and assignments too..",
      amount: 3500,
    },
    {
      name: "Learn Investment Basics",
      description:
        "This Investments for beginners course teaches you the basics fast. It includes quizzes and assignments too..",
      amount: 3500,
    },
    {
      name: "Learn Investment Basics",
      description:
        "This Investments for beginners course teaches you the basics fast. It includes quizzes and assignments too..",
      amount: 3500,
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
        {courseid === "home" ? (
          <>
            <div className={styles.switch}>
              <p
                className={`${styles.tabs} ${
                  state === "inprogress" ? styles.selected : ""
                }`}
                onClick={() => {
                  if (state !== "inprogress") setstate("inprogress");
                }}
              >
                In Progress
              </p>
              <p
                className={`${styles.tabs} ${
                  state === "completed" ? styles.selected : ""
                }`}
                onClick={() => {
                  if (state !== "completed") setstate("completed");
                }}
              >
                Completed
              </p>
            </div>

            <div className={styles.mainContent}>
              <div className={styles.flexLeft}>
                <div className={styles.coursesSection}>
                  {courses.map((data, index) => {
                    return (
                      <CoursesComponent
                        key={"courseComponent" + index}
                        data={{
                          img_url: data.image,
                          course_progress: 50,
                          current_course: data.title,
                          subheading: data.age,
                        }}
                      />
                    );
                  })}
                </div>
                <div className={`${styles.availableCourses} `}>
                  <h2 className={styles.heading}>
                    Available Courses
                    <HeadingArrow />
                  </h2>
                  <div className={styles.wrapper}>
                    {availableCourses.map((item, index) => {
                      return (
                        <AvailableCourse
                          data={item}
                          setbuydata={setbuydata}
                          setshowmodal={setshowmodal}
                          key={"available" + index}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className={styles.flexRight}>
                {kiddata.map((item, index) => {
                  return <KidCards key={"kidCard" + index} />;
                })}
              </div>
            </div>
          </>
        ) : null}
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
      return { props: { isLogged: false, msg } };
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
    return { props: { isLogged: false, msg: "cannot get token" } };
  }
}
async function getkidsdata(token) {
  let response = await DashboardApis.getkids(null, token);
  if (response && response.data && response.data.data)
    return response.data.data;
}
async function getchores(token) {
  let response = await DashboardApis.getpendingchores(null, token);
  if (response && response.data && response.data.data) {
    return response.data.data;
  }
}
async function getgames(token) {
  let response = await DashboardApis.getgames(null, token);
  if (response && response.data && response.data.data)
    return response.data.data;
}
async function getliveclasses(token) {
  let response = await DashboardApis.getliveclasses(null, token);
  if (response && response.data && response.data.data)
    return response.data.data;
}
