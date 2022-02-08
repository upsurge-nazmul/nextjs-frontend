import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import DashboardApis from "../../../actions/apis/DashboardApis";
import LoginApis from "../../../actions/apis/LoginApis";
import ChoreComponent from "../../../components/Dashboard/ChoreComponent";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import KidComponent from "../../../components/Dashboard/KidComponent";
import NoKid from "../../../components/Dashboard/NoKid";
import LeftPanel from "../../../components/LeftPanel";
import HeadingArrow from "../../../components/SVGcomponents/HeadingArrow";
import ChoreApis from "../../../actions/apis/ChoreApis";
import styles from "../../../styles/mykids/mykids.module.scss";
import Toast from "../../../components/Toast";
import { Calc_Data } from "../../../static_data/Calc_Data";
import Image from "next/image";
import MiniCalcCard from "../../../components/Calculators/MiniCalcCard";
import FillSpace from "../../../components/Dashboard/FillSpace";

export default function GoalWizard({
  choresdata,
  kidsdata,
  userdatafromserver,
}) {
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
      <Toast data={toastdata} />
      <DashboardLeftPanel />
      <div className={styles.contentWrapper}>
        <DashboardHeader mode={mode} setmode={setmode} />

        <div className={styles.mainContent}>
          <div className={styles.flexLeft}>
            <div className={styles.kidsSection}>
              {kids.length > 0 && (
                <div className={styles.heads}>
                  <p className={styles.blacnkhead1}></p>
                  <p className={styles.head1}>CHILD INFO</p>
                  <p className={styles.head2}>PENDING CHORES</p>
                  <p className={styles.head3}>QUEST PROGRESS</p>
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
                  <FillSpace
                    text={`You can add ${5 - kids.length} more children`}
                  />
                </div>
              ) : (
                <NoKid setkids={setkids} />
              )}
            </div>
          </div>

          <div className={styles.flexRight}>
            {kids.length > 0 && (
              <div
                className={`${styles.templateSection} ${
                  false ? styles.nokidlivesection : ""
                }`}
              >
                <h2 className={styles.heading}>Add New Child</h2>
                <div
                  className={`${styles.button} ${
                    userdatafromserver.num_kids === 5 && styles.maximumlimit
                  }`}
                  onClick={() => {
                    if (userdatafromserver.num_kids === 5) {
                      settoastdata({
                        type: "error",
                        show: true,
                        msg: "Maximum child limit reached",
                      });
                      return;
                    }
                    router.push("/dashboard/p/child/add");
                  }}
                >
                  New Child
                </div>
              </div>
            )}
            <div className={`${styles.calcSection}`}>
              <h2
                className={styles.heading}
                onClick={() => router.push("/dashboard/p/calculators")}
              >
                Calculators
                <HeadingArrow className={styles.icon} />
              </h2>
              <div className={styles.wrapper}>
                {Object.keys(Calc_Data).map((item) => {
                  return (
                    <MiniCalcCard data={Calc_Data[item]} key={item} id={item} />
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
          choresdata: choresdata || [],
          userdatafromserver: response.data.data,
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
  if (response && response.data && response.data.success) {
    return response.data.data;
  } else {
    return [];
  }
}
