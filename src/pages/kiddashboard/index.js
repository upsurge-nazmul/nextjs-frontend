import React, { useEffect, useState } from "react";
import DashboardApis from "../../actions/apis/DashboardApis";
import LoginApis from "../../actions/apis/LoginApis";
import Toast from "../../components/Toast";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../components/Dashboard/DashboardLeftPanel";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/kidDashboard/kiddashboard.module.scss";
import ProfileSection from "../../components/KidDashboard/ProfileSection";
import KidChore from "../../components/KidDashboard/KidChore";
import KidCourses from "../../components/KidDashboard/KidCourses";

function KidDashboard({ isLogged, msg }) {
  // modes are different pages like home,kids,store,payments,notifications
  const [mode, setmode] = useState("home");
  const router = useRouter();
  const [kids, setkids] = useState([]);
  const [familyfun, setfamilyfun] = useState([]);
  const [chores, setchores] = useState([]);
  const [liveclasses, setliveclasses] = useState([]);
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });

  useEffect(() => {
    if (isLogged === false) {
      console.log(isLogged);
      settoastdata({
        show: true,
        type: "error",
        msg: msg,
      });
      router.push("/");
    }
  }, [isLogged]);

  useEffect(() => {
    getkidsdata();
    getgames();
    getliveclasses();
    getchores();
    async function getkidsdata() {
      let response = await DashboardApis.getkids();
      if (response.data.data) setkids(response.data.data);
    }
    async function getchores() {
      let response = await DashboardApis.getpendingchores();
      if (response.data.data) {
        setchores(response.data.data);
      }
    }
    async function getgames() {
      let response = await DashboardApis.getgames();
      if (response.data.data) setfamilyfun(response.data.data);
    }
    async function getliveclasses() {
      let response = await DashboardApis.getliveclasses();
      if (response.data.data) setliveclasses(response.data.data);
    }
  }, []);
  let topusers = [
    {
      img_url:
        "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=24&q=80",
      name: "Jason Smith",
      votes: "12.5k",
    },
    {
      img_url:
        "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=24&q=80",
      name: "Jason Smith",
      votes: "12.5k",
    },
    {
      img_url:
        "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=24&q=80",
      name: "Jason Smith",
      votes: "12.5k",
    },
    {
      img_url:
        "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=24&q=80",
      name: "Jason Smith",
      votes: "12.5k",
    },
    {
      img_url:
        "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=24&q=80",
      name: "Jason Smith",
      votes: "12.5k",
    },
    {
      img_url:
        "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=24&q=80",
      name: "Jason Smith",
      votes: "12.5k",
    },
    {
      img_url:
        "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=24&q=80",
      name: "Jason Smith",
      votes: "12.5k",
    },
    {
      img_url:
        "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=24&q=80",
      name: "Jason Smith",
      votes: "12.5k",
    },
    {
      img_url:
        "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=24&q=80",
      name: "Jason Smith",
      votes: "12.5k",
    },
    {
      img_url:
        "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=24&q=80",
      name: "Jason Smith",
      votes: "12.5k",
    },
    {
      img_url:
        "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=24&q=80",
      name: "Jason Smith",
      votes: "12.5k",
    },
    {
      img_url:
        "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=24&q=80",
      name: "Jason Smith",
      votes: "12.5k",
    },
    {
      img_url:
        "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=24&q=80",
      name: "Jason Smith",
      votes: "12.5k",
    },
    {
      img_url:
        "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=24&q=80",
      name: "Jason Smith",
      votes: "12.5k",
    },
  ];
  return (
    <div className={styles.kiddashboard}>
      <DashboardLeftPanel type="kid" />
      <Toast data={toastdata} />
      <div className={styles.contentWrapper}>
        <DashboardHeader mode={mode} setmode={setmode} />
        <div className={styles.mainContent}>
          <div className={styles.flexLeft}>
            <ProfileSection />
            {kids.length > 0 && (
              <div className={styles.choreSection}>
                <h2 className={styles.heading}>
                  Leaderboards
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
                  {topusers.map((user) => {
                    return (
                      <div className={styles.topuser}>
                        <img src={user.img_url} alt="" />
                        <p className={styles.name}>{user.name}</p>
                        <p className={styles.votes}>
                          {user.votes}{" "}
                          <svg
                            width="9"
                            height="9"
                            viewBox="0 0 9 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.84371 1.89215L4.84371 0.685039L3.99016 1.53859L1.38867 4.14008C1.36743 4.16133 1.33304 4.16133 1.3118 4.14008C1.2906 4.11888 1.2906 4.08441 1.3118 4.06321L4.85962 0.515382C4.88087 0.494138 4.91525 0.494138 4.9365 0.515382L5.29005 0.161828L4.9365 0.515385L8.48418 4.06297C8.48418 4.06297 8.48418 4.06298 8.48418 4.06298C8.49506 4.07386 8.50024 4.08703 8.50024 4.10156C8.50024 4.11615 8.49502 4.1293 8.48425 4.14007C8.463 4.16124 8.42867 4.16121 8.40745 4.13999L8.40744 4.13999L5.80596 1.53859L4.95241 0.685068L4.95241 1.89215L4.95241 8.0394C4.95241 8.06937 4.92803 8.09375 4.89806 8.09375C4.86807 8.09375 4.84371 8.06939 4.84371 8.0394L4.84371 1.89215Z"
                              fill="black"
                              stroke="#4166EB"
                            />
                          </svg>
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <div className={styles.flexRight}>
            {kids.length > 0 && (
              <div className={styles.gameSection}>
                <h2 className={styles.heading}>
                  My Chores
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
                  <KidChore data={chores[0]} />
                  <KidChore data={chores[0]} />
                  <KidChore data={chores[0]} />
                </div>
              </div>
            )}
            <div
              className={`${styles.liveClassSection} ${
                kids.length === 0 ? styles.nokidlivesection : ""
              }`}
            >
              <h2 className={styles.heading}>
                My courses
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
                {liveclasses.map((data) => {
                  console.log(liveclasses);
                  return (
                    <KidCourses
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KidDashboard;

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
      return { props: { isLogged: true } };
    }
  } else {
    return { props: { isLogged: false, msg: "cannot get token" } };
  }
}
