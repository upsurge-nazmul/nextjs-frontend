import React, { useEffect, useState, useContext } from "react";
import { MainContext } from "../../../context/Main";
import DashboardApis from "../../../actions/apis/DashboardApis";
import ChoreComponent from "../../../components/Dashboard/ChoreComponent";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import ChoreModal from "../../../components/Chores/ChoreModal";
import ChoreTemplate from "../../../components/Chores/ChoreTemplate";
import styles from "../../../styles/Chores/chorepage.module.scss";
import HeadingArrow from "../../../components/SVGcomponents/HeadingArrow";
import LoginApis from "../../../actions/apis/LoginApis";
import Toast from "../../../components/Toast";
import { useRouter } from "next/dist/client/router";
import Loading from "../../../components/Loading";
import { choretemplates } from "../../../helpers/choretemplates";
import ChoreApis from "../../../actions/apis/ChoreApis";
import ChorePending from "../../../components/Chores/ChorePending";
import FillSpace from "../../../components/Dashboard/FillSpace";
import RejectChore from "../../../components/Dashboard/RejectChore";
import Tour from "../../../components/Tour/Tour";
import LeaderBoard from "../../../components/LeaderBoard";
import PageTitle from "../../../components/PageTitle";

function ChoresPage({
  choresdata,
  choresLeaderboardData,
  isLogged,
  userdatafromserver,
}) {
  const { setuserdata } = useContext(MainContext);

  const [mode, setmode] = useState("Chores");
  const router = useRouter();
  const [storyIndex, setStoryIndex] = useState(0);
  const [dataloaded, setdataloaded] = useState(false);
  const [chores, setchores] = useState([]);
  const [choremode, setchoremode] = useState("inprogress");
  const [showmodal, setshowmodal] = useState(false);
  const [deleteid, setdeleteid] = useState("");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [allchores, setallchores] = useState(choresdata || []);
  const [backupallchores, setbackupallchores] = useState(choresdata || []);
  useEffect(() => {
    if (!isLogged) {
      router.push("/");
    }
  }, [isLogged]);
  useEffect(() => {
    setdataloaded(true);
    console.log("cc", choresdata);
    setchores(
      choresdata.filter((item) => {
        if (item.is_reoccurring && JSON.stringify(item.latest_chore) !== "{}") {
          return item?.latest_chore?.completion === "approval";
        } else return item.completion === "approval";
      })
    );
    setallchores(
      choresdata.filter((item) => {
        if (item.is_reoccurring && JSON.stringify(item.latest_chore) !== "{}") {
          return item?.latest_chore?.completion !== "approval";
        } else return item.completion !== "approval";
      })
    );
  }, [choresdata]);
  useEffect(() => {
    if (choremode === "inprogress") {
      setallchores(
        backupallchores.filter((item) => {
          if (
            item.is_reoccurring &&
            JSON.stringify(item.latest_chore) !== "{}"
          ) {
            return (
              item?.latest_chore?.completion !== "completed" &&
              item?.latest_chore?.completion !== "approval"
            );
          } else
            return (
              item.completion !== "completed" && item.completion !== "approval"
            );
        })
      );
    } else if (choremode === "completed") {
      setallchores(
        backupallchores.filter((item) => item.completion === "completed")
      );
    } else if (choremode === "archived") {
      setallchores(
        backupallchores.filter((item) => item.completion === "archived")
      );
    }
  }, [choremode]);
  useEffect(() => {
    setuserdata(userdatafromserver);
  }, [userdatafromserver]);

  if (!dataloaded) {
    return <Loading />;
  } else
    return (
      <div className={styles.choresPage}>
        <PageTitle title={`upsurge | Chores`} />
        <DashboardLeftPanel />
        <Toast data={toastdata} />
        {deleteid && (
          <RejectChore
            setid={setdeleteid}
            id={deleteid}
            settoastdata={settoastdata}
            setchores={setchores}
            setallchores={setallchores}
          />
        )}
        <ChoreModal
          id="chore-modal"
          showmodal={showmodal}
          setshowmodal={setshowmodal}
          setStoryIndex={setStoryIndex}
          tourActive={router.query.showTour}
        />
        <div className={styles.contentWrapper}>
          <DashboardHeader
            mode={mode}
            setmode={setmode}
            settoastdata={settoastdata}
          />
          <div className={styles.mainContent}>
            <div className={styles.flexLeft}>
              <div className={styles.pendingChoresSection}>
                {/* <div>
                  <LeaderBoard data={choresLeaderboardData} />
                </div> */}
                <h2 className={styles.heading}>Pending For Approval</h2>
                <div className={styles.wrapper}>
                  {chores.map((item, index) => {
                    return (
                      <ChorePending
                        setchores={setchores}
                        setallchores={setallchores}
                        data={item}
                        key={"pendingchore" + index}
                        settoastdata={settoastdata}
                        setid={setdeleteid}
                      />
                    );
                  })}
                  {chores.length === 0 && (
                    <FillSpace
                      text="No pending approvals"
                      extrastyle={{ margin: "0" }}
                    />
                  )}
                </div>
              </div>

              <div className={styles.choreSection}>
                <div className={styles.headingWrapper}>
                  <h2
                    className={`${styles.heading} ${
                      choremode === "inprogress" ? styles.activechore : ""
                    }`}
                    onClick={() => setchoremode("inprogress")}
                  >
                    In Progress
                  </h2>
                  <h2
                    className={`${styles.heading} ${
                      choremode === "completed" ? styles.activechore : ""
                    }`}
                    onClick={() => setchoremode("completed")}
                  >
                    Completed
                  </h2>
                </div>
                <div className={styles.wrapper}>
                  {allchores.map((data, index) => {
                    return (
                      <ChoreComponent
                        setchores={setallchores}
                        data={data}
                        settoastdata={settoastdata}
                        key={"chorecomponent" + index}
                      />
                    );
                  })}
                  {allchores.length === 0 && (
                    <FillSpace
                      text={
                        choremode === "inprogress"
                          ? "No chores in progress"
                          : "No completed chores found."
                      }
                      extrastyle={{ margin: "0" }}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className={styles.flexRight}>
              <div
                className={`${styles.templateSection} ${
                  false ? styles.nokidlivesection : ""
                }`}
              >
                <h2 className={styles.heading}>Create Chores</h2>
                <div
                  className={styles.button}
                  id="chores-new-btn"
                  onClick={() => {
                    // if (
                    //   !userdatafromserver.plan_name ||
                    //   userdatafromserver.plan_name === "Free"
                    // ) {
                    //   settoastdata({
                    //     show: true,
                    //     msg: "Please buy a subscription first",
                    //     type: "error",
                    //   });
                    //   return;
                    // } else
                    if (router.query.showTour) {
                      setStoryIndex((prev) => prev + 1);
                    }
                    setshowmodal(true);
                  }}
                >
                  New Chore
                </div>
                <div className={styles.subheading}>or</div>
                <div className={styles.subheading}>Use a Template</div>
                <div className={styles.wrapper}>
                  {choretemplates[0].templates
                    .slice(0, 3)
                    .map((item, index) => {
                      return (
                        <ChoreTemplate
                          key={"choretemp" + index}
                          image={item.img}
                          name={item.name}
                          title={item.time}
                          cat={[choretemplates[0].name]}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
        {router.query.showTour && (
          <Tour
            story={[
              {
                ref: "#chores-new-btn",
                position: "bottom",
                content: `Click here to create a new chore.`,
                superimpose: true,
                required: true,
                highlightBg: true,
                isolate: true,
                disableBtns: true,
              },
              {
                ref: "#chore-modal",
                position: "bottom",
                content: `Select one category and click continue.`,
                required: true,
                disableBtns: true,
                isolate: true,
              },
              {
                ref: "#chore-modal",
                position: "bottom",
                content: `Choose any template.`,
                required: true,
                disableBtns: true,
                isolate: true,
              },
            ]}
            current={storyIndex}
            setcurrent={setStoryIndex}
            showtour={true}
          />
        )}
      </div>
    );
}

export default ChoresPage;

export async function getServerSideProps({ params, req }) {
  let token = req.cookies.accesstoken;
  let msg = "";
  if (token) {
    let kidsdata = await getkidsdata(token);
    if (kidsdata && !kidsdata.length > 0) {
      return {
        props: { isLogged: true, msg: msg || "Error" },
        redirect: {
          permanent: false,
          destination: "/dashboard/p?err=03",
          state: "err=03",
        },
      };
    }
    let response = await LoginApis.checktoken({
      token: token,
    });
    if (response && !response.data.success) {
      msg = response.data.msg;
      return {
        props: { isLogged: false, msg: msg || "Error" },
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    } else {
      let choresdata = await getchores(token);
      let choresLeaderboardData = await getLeaderboard(token);
      return {
        props: {
          isLogged: true,
          choresdata,
          choresLeaderboardData,
          userdatafromserver: response.data.data,
          msg: "",
        },
      };
    }
  } else {
    return {
      props: { isLogged: false, msg: "cannot get token", choresdata: [] },
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
}
async function getchores(token) {
  let response = await ChoreApis.getchores(null, token);
  if (response && response.data && response.data.data) {
    return response.data.data;
  } else {
    return [];
  }
}
async function getLeaderboard(token) {
  let response = await ChoreApis.getLeaderboard({ role: "parent" }, token);
  return response?.data?.data ?? [];
}
