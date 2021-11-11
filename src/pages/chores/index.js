import React, { useEffect, useState } from "react";
import DashboardApis from "../../actions/apis/DashboardApis";
import ChoreComponent from "../../components/Dashboard/ChoreComponent";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../components/Dashboard/DashboardLeftPanel";
import ChoreModal from "../../components/Chores/ChoreModal";
import ChorePending from "../../components/Chores/ChorePending";
import ChoreTemplate from "../../components/Chores/ChoreTemplate";
import styles from "../../styles/Chores/chorepage.module.scss";
import HeadingArrow from "../../components/SVGcomponents/HeadingArrow";
import LoginApis from "../../actions/apis/LoginApis";
import Toast from "../../components/Toast";
import { useRouter } from "next/dist/client/router";
import Loading from "../../components/Loading";
import ChoreApis from "../../actions/apis/ChoreApis";

function ChoresPage({ choresdata, isLogged }) {
  const [mode, setmode] = useState("chores");
  const router = useRouter();
  const [dataloaded, setdataloaded] = useState(false);
  const [chores, setchores] = useState([]);
  const [choremode, setchoremode] = useState("inprogress");
  const [showmodal, setshowmodal] = useState(false);
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
    setchores(choresdata.filter((item) => item.completion === "approval"));
  }, [choresdata]);
  useEffect(() => {
    if (choremode === "inprogress") {
      setallchores(
        backupallchores.filter((item) => item.completion !== "completed")
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
  if (!dataloaded) {
    return <Loading />;
  } else
    return (
      <div className={styles.choresPage}>
        <DashboardLeftPanel />
        <Toast data={toastdata} />
        <ChoreModal showmodal={showmodal} setshowmodal={setshowmodal} />
        <div className={styles.contentWrapper}>
          <DashboardHeader mode={mode} setmode={setmode} />
          <div className={styles.mainContent}>
            <div className={styles.flexLeft}>
              <div className={styles.pendingChoresSection}>
                <h2 className={styles.heading}>
                  Pending For Approval
                  <HeadingArrow />
                </h2>
                <div className={styles.wrapper}>
                  {chores.map((item, index) => {
                    return (
                      <ChorePending
                        setchores={setchores}
                        setallchores={setallchores}
                        data={item}
                        key={"pendingchore" + index}
                        settoastdata={settoastdata}
                      />
                    );
                  })}
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
                  <h2
                    className={`${styles.heading} ${
                      choremode === "archived" ? styles.activechore : ""
                    }`}
                    onClick={() => setchoremode("archived")}
                  >
                    Archived
                  </h2>
                </div>
                <div className={styles.wrapper}>
                  {allchores.map((data, index) => {
                    return (
                      <ChoreComponent
                        data={data}
                        settoastdata={settoastdata}
                        key={"chorecomponent" + index}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <div className={styles.flexRight}>
              <div
                className={`${styles.templateSection} ${
                  false ? styles.nokidlivesection : ""
                }`}
              >
                <h2 className={styles.heading}>
                  Create Chores
                  <HeadingArrow />
                </h2>
                <div
                  className={styles.button}
                  onClick={() => {
                    setshowmodal(true);
                  }}
                >
                  New Chore
                </div>
                <div className={styles.subheading}>or</div>
                <div className={styles.subheading}>Use a Template</div>
                <div className={styles.wrapper}>
                  <ChoreTemplate />
                  <ChoreTemplate />
                  <ChoreTemplate />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ChoresPage;

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
        props: { isLogged: false, msg: msg || "Error" },
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    } else {
      let choresdata = await getchores(token);
      return {
        props: {
          isLogged: true,
          choresdata,
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

async function getchores(token) {
  let response = await ChoreApis.getchores(null, token);
  if (response && response.data && response.data.data) {
    return response.data.data;
  } else {
    return [];
  }
}
