import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import styles from "../../../styles/Dashboard/dashboard.module.scss";
import LoginApis from "../../../actions/apis/LoginApis";
import TribeApis from "../../../actions/apis/TribeApis";
import DashboardApis from "../../../actions/apis/DashboardApis";
import ChoreApis from "../../../actions/apis/ChoreApis";
import { MainContext } from "../../../context/Main";
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
import FillSpace from "../../../components/Dashboard/FillSpace";
import Refer from "../../../components/WaitlistDashboard/Refer";
import TodaysQuestion from "../../../components/WaitlistDashboard/TodaysQuestion";
import QuizApis from "../../../actions/apis/QuizApis";
import Tour from "../../../components/Tour/Tour";
import Jasper from "../../../components/SVGcomponents/Jasper";
import PageTitle from "../../../components/PageTitle";

function Dashboard({
  isLogged,
  msg,
  homeBlogs,
  allBlogs,
  choresdata,
  kidsdata,
  phone_verified,
  userdatafromserver,
  triberequests,
  todaysquestion,
}) {
  // modes are different pages like home,kids,store,payments,notifications
  const { setuserdata, userdata } = useContext(MainContext);
  const [mode, setmode] = useState("home");
  const router = useRouter();
  const [waitlistNum, setwaitlistNum] = useState(0);
  const [kids, setkids] = useState(kidsdata || []);
  const [chores, setchores] = useState(choresdata || []);
  const [showConfirmation, setshowConfirmation] = useState(false);
  const [confirmationgiven, setconfirmationgiven] = useState(false);
  const [currentTourIndex, setcurrentTourIndex] = useState(0);
  const [tribes, settribes] = useState([]);
  const [phoneverified, setphoneverified] = useState(phone_verified);
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [showToolTip, setShowToolTip] = useState({
    show: false,
    msg: "",
  });
  const [showtour, setshowtour] = useState(
    !userdatafromserver?.intro_guide_completed
  );

  const [tribeRequestsFromServer, setTribeRequestsFromServer] = useState(
    triberequests || []
  );
  useEffect(() => {
    if (router.query.storyIndex) {
      setcurrentTourIndex(Number(router.query.storyIndex));
    }
  }, [router.query]);
  const story = [
    {
      intro: true,
      content: (
        <div className={styles.introdiv}>
          <p className={styles.heading}>
            Welcome to your dashboard,{userdata?.first_name}
          </p>
          <p className={styles.text}>
            {`I am Jasper and i i'll help you get started.`}
          </p>
          <Jasper className={styles.jasper} />
        </div>
      ),
    },
    {
      ref: "#upsurge-logo",
      isolate: true,
      required: false,
      highlightBg: true,
      position: "bottom",
      content: `You can go back to home page, by clicking upsurge logo.`,
    },
    {
      ref: "#add-child-btn",
      position: "bottom",
      text: "Welcome to upsurge!",
      content: (
        <div className={styles.introdiv}>
          <p className={styles.heading}>Add child</p>
          <p className={styles.text}>
            {`Let's start by adding your child details.`}
          </p>
          <Jasper className={styles.jasper} />
        </div>
      ),
      required: false,
      disableBtns: true,
      isolate: true,
      skip: kids.length > 0,
    },
    {
      ref: "#children-div",
      content: (
        <div className={styles.introdiv}>
          <p className={styles.heading}>Congratulations!</p>
          <p className={styles.text}>
            {`You have successfully added your child.`}
          </p>
        </div>
      ),
      superimpose: true,
      position: "bottom",
      required: false,
      isolate: true,
    },
    {
      ref: "#approvals-div",
      position: "bottom",
      content: `You'll see approval requests from your children, here.`,
      superimpose: true,
      required: false,
      isolate: true,
    },
    {
      ref: "#todays-question",
      position: "bottom",
      content: `You can answer questions and get rewards.`,
      superimpose: true,
      required: false,
      isolate: true,
    },
    {
      ref: "#refer-div",
      position: "bottom",
      content: `You can refer your friends from here.`,
      superimpose: true,
      required: false,
      isolate: true,
    },
    {
      ref: "#dashboard-blogs",
      position: "bottom",
      content: `You can access blogs from here.`,
      superimpose: true,
      required: false,
      highlightBg: true,
      isolate: true,
    },
    {
      ref: "#chores-leftpanel",
      position: "bottom",
      content: `Now lets start allotting chores.`,
      disableBtns: true,
      superimpose: true,
      required: false,
      highlightBg: true,
      isolate: true,
    },
    {
      ref: "#quest-leftpanel",
      position: "bottom",
      content: `You can track the quest progress of your children.`,
      superimpose: true,
      required: false,
      highlightBg: true,
      isolate: true,
    },
    {
      ref: "#games-leftpanel",
      position: "bottom",
      content: `You can play games here.`,
      superimpose: true,
      required: false,
      highlightBg: true,
      isolate: true,
    },
    {
      ref: "#store-leftpanel",
      position: "bottom",
      content: `Now lets go to store.`,
      superimpose: true,
      required: false,
      highlightBg: true,
      isolate: true,
    },
  ];

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
        <PageTitle title={`upsurge | Dashboard`} />
        <DashboardLeftPanel />
        <Toast data={toastdata} />
        {/* {phoneverified && showtour && (
          <Tour
            story={story}
            current={currentTourIndex}
            setcurrent={setcurrentTourIndex}
            showtour={showtour}
            setshowtour={setshowtour}
            introComplete={true}
          />
        )} */}
        {userdatafromserver &&
          userdatafromserver.user_type !== "child" &&
          !phoneverified && (
            <OtpNotVerfied
              userphone={userdatafromserver?.phone}
              setphoneverified={setphoneverified}
              email={userdatafromserver?.email}
            />
          )}
        <div className={styles.contentWrapper}>
          <DashboardHeader
            mode={mode}
            setmode={setmode}
            settoastdata={settoastdata}
            setShowToolTip={setShowToolTip}
            showToolTip={showToolTip}
          />
          {userdatafromserver && !userdatafromserver.email_verified && (
            <EmailVerificationPending settoastdata={setShowToolTip} />
          )}
          {userdatafromserver && (
            <div
              className={`${styles.mainContent} ${
                kids.length === 0 && styles.nokidmaincontent
              }`}
            >
              <div className={styles.topSection}>
                {kids && kids.length ? (
                  <>
                    <div className={styles.flexLeft} id="leftside">
                      <div className={styles.kidsSection} id="children-div">
                        <div className={styles.head}>
                          <h2 className={styles.heading}>My Children</h2>
                          <div
                            className={styles.btn}
                            onClick={() =>
                              router.push("/dashboard/p/child/add")
                            }
                          >
                            + Add child
                          </div>
                        </div>

                        <div className={styles.heads}>
                          <p className={styles.head1}>CHILD INFO</p>
                          <p className={styles.head2}>PENDING CHORES</p>
                          <p className={styles.head3}>QUEST PROGRESS</p>
                        </div>
                        <div className={`${styles.wrapper}`}>
                          {kids.map((item, index) => {
                            return (
                              <KidComponent
                                confirmationgiven={confirmationgiven}
                                setshowConfirmation={setshowConfirmation}
                                setkids={setkids}
                                settoastdata={setShowToolTip}
                                data={item}
                                key={"kidcomponent" + index}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className={styles.flexRight} id="rightpanel">
                      {kids.length > 0 && (
                        <div className={styles.choreSection}>
                          <h2
                            className={styles.heading}
                            onClick={() => router.push("/dashboard/p/chores")}
                          >
                            Approvals
                            <HeadingArrow />
                          </h2>
                          {chores.length > 0 ||
                          tribeRequestsFromServer.length > 0 ? (
                            <>
                              {chores.length > 0 && (
                                <>
                                  <p
                                    className={styles.subheading}
                                    onClick={() =>
                                      router.push("/dashboard/p/chores")
                                    }
                                  >
                                    Chores
                                  </p>
                                  <div className={styles.wrapper}>
                                    {chores.map((data, index) => {
                                      return (
                                        <ChoreComponent
                                          data={data}
                                          setchores={setchores}
                                          settoastdata={setShowToolTip}
                                          key={data.id}
                                        />
                                      );
                                    })}
                                  </div>
                                </>
                              )}
                              {tribeRequestsFromServer.length > 0 && (
                                <>
                                  <p
                                    className={styles.subheading}
                                    onClick={() =>
                                      router.push("/dashboard/p/tribes")
                                    }
                                  >
                                    Tribes
                                  </p>
                                  <div className={styles.wrapper}>
                                    {tribeRequestsFromServer.map(
                                      (data, index) => {
                                        return (
                                          <TribeApproval
                                            data={data}
                                            key={
                                              data.id ||
                                              "chorecomponent" + index
                                            }
                                            settoastdata={setShowToolTip}
                                            settribes={
                                              setTribeRequestsFromServer
                                            }
                                          />
                                        );
                                      }
                                    )}
                                  </div>
                                </>
                              )}
                            </>
                          ) : (
                            <FillSpace
                              id="approvals-div"
                              text="Currently there are no Approval pending."
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className={styles.noData}>
                    <NoKid setkids={setkids} />
                  </div>
                )}
              </div>
              <div className={styles.questionSection}>
                {todaysquestion && <TodaysQuestion data={todaysquestion} />}
                <Refer settoastdata={setShowToolTip} />
              </div>
              <div className={styles.blogsSection}>
                {allBlogs ? (
                  <DashboardBlogs
                    allBlogs={allBlogs.rows}
                    highlightblogs={homeBlogs}
                  />
                ) : (
                  ""
                )}
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
    if (response && !response?.data?.success) {
      msg = response.data.msg;
      return { props: { isLogged: false, msg: msg || "Error" } };
    } else {
      if (response.data.is_waiting_active) {
        return {
          props: { isLogged: false, msg: msg || "Error" },
          redirect: {
            permanent: false,
            destination: "/dashboard/w",
          },
        };
      }
      if (response?.data?.data?.user_type !== "parent")
        return {
          props: { isLogged: false, msg: msg || "Error" },
          redirect: {
            permanent: false,
            destination: "/dashboard/k",
          },
        };
      let kidsdata = await getkidsdata(token);
      let allBlogs = await BlogApis.getallblogs();
      let homeBlogs = await BlogApis.gethomeblogs();
      let choresdata = await getchores(token);
      let triberequests = await gettriberequests(token);
      let tq = await QuizApis.todaysquestion(null, token);
      return {
        props: {
          isLogged: true,
          phone_verified: response.data.data.phone_verified,
          choresdata,
          kidsdata,
          homeBlogs: homeBlogs?.data.data || [],
          allBlogs: allBlogs?.data.data || [],
          triberequests,
          userdatafromserver: response.data.data,
          todaysquestion: tq?.data?.success ? tq.data.data : null,
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
  else return null;
}
async function getchores(token) {
  let response = await ChoreApis.getpendingchores(null, token);
  if (response && response.data && response.data.data) {
    return response.data.data;
  } else {
    return [];
  }
}

async function gettriberequests(token) {
  let response = await TribeApis.gettriberequests(null, token);
  if (response && response.data && response.data.success)
    return response.data.data;
  else return [];
}
