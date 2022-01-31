import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import styles from "../../../styles/Dashboard/dashboard.module.scss";
import LoginApis from "../../../actions/apis/LoginApis";
import DashboardApis from "../../../actions/apis/DashboardApis";
import ChoreApis from "../../../actions/apis/ChoreApis";
import { MainContext } from "../../../context/Main";
import { getMessaging, getToken } from "@firebase/messaging";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import Toast from "../../../components/Toast";
import OtpNotVerfied from "../../../components/Auth/OtpNotVerified";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import EmailVerificationPending from "../../../components/EmailVerificationPending";
import HeadingArrow from "../../../components/SVGcomponents/HeadingArrow";
import KidComponent from "../../../components/Dashboard/KidComponent";
import NoKid from "../../../components/Dashboard/NoKid";
import ChoreComponent from "../../../components/Dashboard/ChoreComponent";
import NoApproval from "../../../components/Dashboard/NoApproval";
import TribeApproval from "../../../components/Dashboard/TribeApproval";
import Loading from "../../../components/Loading";
import GameCard from "../../../components/Dashboard/GameCard";
import { Game_Data } from "../../../static_data/Game_Data";
import WaitlistBlogs from "../../../components/WaitlistDashboard/WaitlistBlogs";
import BlogApis from "../../../actions/apis/BlogApis";
import DashboardBlogs from "../../../components/Dashboard/DashboardBlogs";

function Dashboard({
  isLogged,
  msg,
  blogdata,
  choresdata,
  kidsdata,
  liveclassdata,
  phone_verified,
  userdatafromserver,
}) {
  // modes are different pages like home,kids,store,payments,notifications
  const { setuserdata } = useContext(MainContext);
  const [mode, setmode] = useState("home");
  const router = useRouter();
  const [waitlistNum, setwaitlistNum] = useState(0);
  const [kids, setkids] = useState(kidsdata || []);
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
      scrollContainer.scrollLeft += evt.deltaY * 5;
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
        rightpanel.scrollHeight - 20 + "px"
      );
    }
  }, []);

  useEffect(() => {
    saveNotificationToken();
    async function saveNotificationToken() {
      let token = "";
      try {
        let messaging = getMessaging();
        token = await getToken(messaging);
        await NotificationApis.addToken({ type: "web", token });
      } catch (err) {
        console.log("notifications blocked");
      }
    }
  }, []);
  useEffect(() => {
    if (router.query.err) {
      if (router.query.err === "03") {
        settoastdata({
          show: true,
          type: "error",
          msg: "Please add a child first",
        });
        router.push("/dashboard/p");
      }
    }
  }, [router.query]);
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
          {userdatafromserver && (
            <div className={styles.mainContent}>
              <div className={styles.flexLeft} id="leftside">
                <div className={styles.kidsSection}>
                  <h2
                    className={styles.heading}
                    onClick={() => router.push("/dashboard/p/mykids")}
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
                    <h2
                      className={styles.heading}
                      onClick={() => router.push("/dashboard/p/chores")}
                    >
                      Approvals
                      <HeadingArrow />
                    </h2>
                    {chores.length > 0 || tribes.length > 0 ? (
                      <>
                        {chores.length > 0 && (
                          <>
                            <p
                              className={styles.subheading}
                              onClick={() => router.push("/dashboard/p/chores")}
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
                              onClick={() => router.push("/dashboard/p/tribes")}
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
                <DashboardBlogs blogs={blogdata} />
              </div>
            </div>
          )}
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
      msg = response.data.msg;
      return { props: { isLogged: false, msg: msg || "Error" } };
    } else {
      if (response.data.data.is_waiting_active) {
        return {
          props: { isLogged: false, msg: msg || "Error" },
          redirect: {
            permanent: false,
            destination: "/dashboard/w",
          },
        };
      }
      if (response.data.data.user_type !== "parent")
        return {
          props: { isLogged: false, msg: msg || "Error" },
          redirect: {
            permanent: false,
            destination: "/dashboard/k",
          },
        };
      let kidsdata = await getkidsdata(token);
      let liveclassdata = await getliveclasses(token);
      let blogs = await BlogApis.gethomeblogs();
      let choresdata = await getchores(token);
      return {
        props: {
          isLogged: true,
          phone_verified: response.data.data.phone_verified,
          choresdata,
          kidsdata,
          blogdata: blogs?.data.data || [],
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
  let response = await ChoreApis.getpendingchores(null, token);
  if (response && response.data && response.data.data) {
    return response.data.data;
  } else {
    return [];
  }
}
async function getliveclasses(token) {
  let response = await DashboardApis.getliveclasses(null, token);
  if (response && response.data && response.data.data)
    return response.data.data;
}
