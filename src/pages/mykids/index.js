import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import ChoreApis from "../../actions/apis/ChoreApis";
import DashboardApis from "../../actions/apis/DashboardApis";
import LoginApis from "../../actions/apis/LoginApis";
import ChoreComponent from "../../components/Dashboard/ChoreComponent";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../components/Dashboard/DashboardLeftPanel";
import KidComponent from "../../components/Dashboard/KidComponent";
import NoKid from "../../components/Dashboard/NoKid";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import LeftPanel from "../../components/LeftPanel";
import HeadingArrow from "../../components/SVGcomponents/HeadingArrow";
import styles from "../../styles/mykids/mykids.module.scss";

export default function GoalWizard({ choresdata, kidsdata }) {
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [kids, setkids] = useState(kidsdata || []);
  const [chores, setchores] = useState([]);
  const [showConfirmation, setshowConfirmation] = useState(false);
  const [confirmationgiven, setconfirmationgiven] = useState(false);
  const router = useRouter();
  const [choremode, setchoremode] = useState("inprogress");
  const [mode, setmode] = useState("My Kids");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [allchores, setallchores] = useState(choresdata || []);
  const [backupallchores, setbackupallchores] = useState(choresdata || []);
  useEffect(() => {
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
  return (
    <div className={styles.mykids}>
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <DashboardLeftPanel />
      <div className={styles.contentWrapper}>
        <DashboardHeader mode={mode} setmode={setmode} />

        <div className={styles.mainContent}>
          <div className={styles.flexLeft}>
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
            <div className={styles.choreSection}>
              <h2 className={styles.heading}>
                Chores
                <HeadingArrow />
              </h2>
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
                Add New Child
                <HeadingArrow />
              </h2>
              <div
                className={styles.button}
                onClick={() => {
                  router.push("/child/add");
                }}
              >
                New Child
              </div>

              <div className={styles.wrapper}></div>
            </div>
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
      return {
        props: { isLogged: false, msg: msg || "Error" },
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    } else {
      let choresdata = await getchores(token);
      let kidsdata = await getkidsdata(token);

      return {
        props: {
          isLogged: true,
          choresdata,
          kidsdata,
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
