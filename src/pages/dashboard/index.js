import React, { useContext, useEffect, useState } from "react";
import DashboardApis from "../../actions/apis/DashboardApis";
import LoginApis from "../../actions/apis/LoginApis";
import Toast from "../../components/Toast";
import ChoreComponent from "../../components/Dashboard/ChoreComponent";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../components/Dashboard/DashboardLeftPanel";
import GameCard from "../../components/Dashboard/GameCard";
import KidComponent from "../../components/Dashboard/KidComponent";
import LiveClass from "../../components/Dashboard/LiveClass";
import NoKid from "../../components/Dashboard/NoKid";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/Dashboard/dashboard.module.scss";
import HeadingArrow from "../../components/SVGcomponents/HeadingArrow";
import OtpNotVerfied from "../../components/Auth/OtpNotVerified";
import { MainContext } from "../../context/Main";
import EmailVerificationPending from "../../components/EmailVerificationPending";
import TribeApproval from "../../components/Dashboard/TribeApproval";
import NoApproval from "../../components/Dashboard/NoApproval";
import Loading from "../../components/Loading";
import NotificationApis from "../../actions/apis/NotificationApis";
import { getMessaging, getToken } from "@firebase/messaging";

function Dashboard({
  isLogged,
  msg,
  choresdata,
  gamesdata,
  kidsdata,
  liveclassdata,
  phone_verified,
  userdatafromserver,
}) {
  let tempchores = [
    {
      id: "wqe",
      image:
        "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQTFWtjP3S55GF9SiB8xsodk5w2QO5MichphEj4JcYRpo-Eewh5WdqGZH6G1OtIgoB-PmyPDWcx-9ieyysbz5g",
      title: "Prepare Monthly Budget",
      assigned_to: "Assigned to Pulkit",
      time: "Due in 3 days",
      completion: "completed",
      due_date: new Date().setHours(new Date().getHours() + 24 * 7),
    },
    {
      id: "wqasde",
      image:
        "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQTFWtjP3S55GF9SiB8xsodk5w2QO5MichphEj4JcYRpo-Eewh5WdqGZH6G1OtIgoB-PmyPDWcx-9ieyysbz5g",
      title: "Prepare Monthly Budget",
      assigned_to: "Assigned to Pulkit",
      time: "Due in 3 days",
      completion: "pending",
      due_date: new Date().setHours(new Date().getHours() + 24 * 7),
    },
    {
      id: "wqqwee",
      image:
        "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQTFWtjP3S55GF9SiB8xsodk5w2QO5MichphEj4JcYRpo-Eewh5WdqGZH6G1OtIgoB-PmyPDWcx-9ieyysbz5g",
      title: "Prepare Monthly Budget",
      assigned_to: "Assigned to Pulkit",
      time: "Due in 3 days",
      completion: "pending",
      due_date: new Date().setHours(new Date().getHours() + 24 * 7),
    },
    {
      id: "wqweqe",
      image:
        "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQTFWtjP3S55GF9SiB8xsodk5w2QO5MichphEj4JcYRpo-Eewh5WdqGZH6G1OtIgoB-PmyPDWcx-9ieyysbz5g",
      title: "Prepare Monthly Budget",
      assigned_to: "Assigned to Pulkit",
      time: "Due in 3 days",
      completion: "pending",
      due_date: new Date().setHours(new Date().getHours() + 24 * 7),
    },
  ];
  // modes are different pages like home,kids,store,payments,notifications
  const { setuserdata } = useContext(MainContext);
  const [mode, setmode] = useState("home");
  const router = useRouter();
  const [kids, setkids] = useState(kidsdata || []);
  const [familyfun, setfamilyfun] = useState(gamesdata || []);
  const [chores, setchores] = useState(choresdata || []);
  const [showConfirmation, setshowConfirmation] = useState(false);
  const [confirmationgiven, setconfirmationgiven] = useState(false);
  const [tribes, settribes] = useState([]);
  const [liveclasses, setliveclasses] = useState(liveclassdata || []);
  const [phoneverified, setphoneverified] = useState(phone_verified);
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  useEffect(() => {
    const scrollContainer = document.querySelector("#gamecardwrapper");
    if (!scrollContainer) return;
    scrollContainer.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer.scrollLeft += evt.deltaY;
    });
  });
  useEffect(() => {
    if (!userdatafromserver) {
      router.push("/?err=01");
    } else {
      setuserdata(userdatafromserver);
    }
  }, [userdatafromserver]);

  useEffect(() => {
    if (userdatafromserver?.user_type === "child") {
      router.push("/kiddashboard");
    }
  }, [userdatafromserver]);

  useEffect(() => {
    let rightpanel = document.getElementById("rightpanel");
    let leftside = document.getElementById("leftside");
    if (rightpanel) {
      leftside.style.setProperty(
        "--height",
        rightpanel.scrollHeight - 100 + "px"
      );
    }
  }, []);

  useEffect(() => {
    saveNotificationToken();
    async function saveNotificationToken() {
      let messaging = getMessaging();
      let token = await getToken(messaging);
      let response = await NotificationApis.addToken({ type: "web", token });
    }
  }, []);

  if (!userdatafromserver) {
    return <Loading />;
  } else
    return (
      <div className={styles.dashboard}>
        <DashboardLeftPanel />
        <Toast data={toastdata} />

        {userdatafromserver &&
          userdatafromserver.user_type !== "child" &&
          !phoneverified && (
            <OtpNotVerfied
              userphone={userdatafromserver?.phone}
              setphoneverified={setphoneverified}
            />
          )}
        <div className={styles.contentWrapper}>
          <DashboardHeader
            mode={mode}
            setmode={setmode}
            settoastdata={settoastdata}
          />
          {userdatafromserver && !userdatafromserver.email_verified && (
            <EmailVerificationPending settoastdata={settoastdata} />
          )}
          <div className={styles.mainContent}>
            <div className={styles.flexLeft} id="leftside">
              <div className={styles.kidsSection}>
                <h2
                  className={styles.heading}
                  onClick={() => router.push("/mykids")}
                >
                  My Kids
                  <HeadingArrow />
                </h2>
                {kids.length > 0 && (
                  <div className={styles.heads}>
                    <p className={styles.blacnkhead1}></p>
                    <p className={styles.head1}>CHILD INFO</p>
                    <p className={styles.head2}>PENDING CHORES</p>
                    <p className={styles.head3}>COURSE PROGRESS</p>
                    <p className={styles.blacnkhead2}></p>
                  </div>
                )}
                {kids.length > 0 ? (
                  <div className={`${styles.wrapper}`}>
                    {kids.map((item, index) => {
                      return (
                        <KidComponent
                          confirmationgiven={confirmationgiven}
                          setshowConfirmation={setshowConfirmation}
                          setkids={setkids}
                          settoastdata={settoastdata}
                          data={item}
                          key={"kidcomponent" + index}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <NoKid setkids={setkids} />
                )}
              </div>
              {kids.length > 0 && (
                <div className={styles.choreSection}>
                  <h2 className={styles.heading}>
                    Approvals
                    <HeadingArrow />
                  </h2>
                  {chores.length > 0 || tribes.length > 0 ? (
                    <>
                      {chores.length > 0 && (
                        <>
                          <p
                            className={styles.subheading}
                            onClick={() => router.push("/chores")}
                          >
                            Chores
                          </p>
                          <div className={styles.wrapper}>
                            {chores.map((data, index) => {
                              return (
                                <ChoreComponent
                                  data={data}
                                  setchores={setchores}
                                  settoastdata={settoastdata}
                                  key={data.id}
                                />
                              );
                            })}
                          </div>
                        </>
                      )}
                      {tribes.length > 0 && (
                        <>
                          <p
                            className={styles.subheading}
                            onClick={() => router.push("/tribes")}
                          >
                            Tribes
                          </p>
                          <div className={styles.wrapper}>
                            {tribes.map((data, index) => {
                              return (
                                <TribeApproval
                                  data={data}
                                  key={"chorecomponent" + index}
                                />
                              );
                            })}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <NoApproval />
                  )}
                </div>
              )}
            </div>
            <div className={styles.flexRight} id="rightpanel">
              <div className={styles.gameSection}>
                <h2
                  className={styles.heading}
                  onClick={() => router.push("/games")}
                >
                  Family Fun
                  <HeadingArrow />
                </h2>

                <div className={styles.wrapper} id="gamecardwrapper">
                  {familyfun.map((data, index) => {
                    return (
                      <GameCard data={data} key={"gamecardcomponent" + index} />
                    );
                  })}
                </div>
              </div>
              <div className={`${styles.liveClassSection} `}>
                <h2
                  className={styles.heading}
                  onClick={() => router.push("/courses/home")}
                >
                  Live Classes
                  <HeadingArrow />
                </h2>
                <div className={styles.wrapper}>
                  {liveclasses.map((data, index) => {
                    return (
                      <LiveClass
                        data={data}
                        index={index}
                        key={"liveclasscomponent" + index}
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

export default Dashboard;

export async function getServerSideProps({ params, req }) {
  let token = req.cookies.accesstoken;
  let msg = "";
  if (token) {
    let response = await LoginApis.checktoken({
      token: token,
    });
    if (response && !response.data.success) {
      console.log(response.data);
      msg = response.data.msg;
      return { props: { isLogged: false, msg: msg || "Error" } };
    } else {
      let kidsdata = await getkidsdata(token);
      let gamesdata = await getgames(token);
      let liveclassdata = await getliveclasses(token);
      let choresdata = await getchores(token);
      return {
        props: {
          isLogged: true,
          phone_verified: response.data.data.phone_verified,
          choresdata,
          gamesdata,
          kidsdata,
          liveclassdata,
          userdatafromserver: response.data.data,
          msg: "",
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
  } else {
    return [];
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
