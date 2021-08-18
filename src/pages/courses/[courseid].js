import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import DashboardApis from "../../actions/apis/DashboardApis";
import LoginApis from "../../actions/apis/LoginApis";
import AvailableCourse from "../../components/Courses/AvailableCourse";
import CoursesComponent from "../../components/Courses/CoursesComponent";
import KidCards from "../../components/Courses/KidCards";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../components/Dashboard/DashboardLeftPanel";
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
  const availableCourses = ["", "", ""];
  const kiddata = ["", "", ""];
  return (
    <div className={styles.coursesPage}>
      <DashboardLeftPanel />
      <Toast data={toastdata} />
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
                    <svg
                      width="21"
                      height="16"
                      viewBox="0 0 21 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.5709 7.5407H17.3638H0.959731C0.705872 7.5407 0.5 7.74657 0.5 8.00043C0.5 8.25424 0.705897 8.46016 0.959731 8.46016H17.3638H18.5708L17.7173 9.3137L13.2136 13.8176L13.2136 13.8176C13.034 13.9972 13.034 14.2881 13.2135 14.4677C13.2135 14.4677 13.2135 14.4678 13.2136 14.4678M18.5709 7.5407L14.2173 14.8214C14.0299 15.0086 13.7843 15.1024 13.5387 15.1024C13.293 15.1024 13.0474 15.0086 12.86 14.8214L13.2136 14.4678M18.5709 7.5407L17.7173 6.68714L13.2134 2.18324C13.0338 2.00367 13.0338 1.71263 13.2134 1.53306C13.3929 1.35356 13.6841 1.35356 13.8636 1.53306L20.0059 7.67534L20.3594 7.32178L20.0059 7.67534C20.1854 7.85491 20.1854 8.14595 20.0059 8.32552L20.3519 8.67155L20.0059 8.32552L13.8639 14.4677M18.5709 7.5407L13.8639 14.4677M13.2136 14.4678C13.3035 14.5576 13.4204 14.6024 13.5387 14.6024C13.6569 14.6024 13.7738 14.5576 13.8639 14.4677M13.2136 14.4678L13.8639 14.4677"
                        fill="black"
                        stroke="#575880"
                      />
                    </svg>
                  </h2>
                  <div className={styles.wrapper}>
                    {availableCourses.map((item, index) => {
                      return <AvailableCourse key={"available" + index} />;
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
