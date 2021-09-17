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
  // modes are different pages like home,kids,store,payments,notifications
  const { setuserdata } = useContext(MainContext);
  const [mode, setmode] = useState("home");
  const router = useRouter();
  const [kids, setkids] = useState(kidsdata || []);
  const [familyfun, setfamilyfun] = useState(gamesdata || []);
  const [chores, setchores] = useState(choresdata || []);
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
      router.push("/");
    } else {
      setuserdata(userdatafromserver);
    }
  }, [userdatafromserver]);

  useEffect(() => {
    if (userdatafromserver?.user_type === "child") {
      router.push("/kiddashboard");
    }
  }, [userdatafromserver]);
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
          <div className={styles.flexLeft}>
            <div className={styles.kidsSection}>
              <h2 className={styles.heading}>
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
                <div className={styles.wrapper}>
                  {kids.map((item, index) => {
                    return (
                      <KidComponent data={item} key={"kidcomponent" + index} />
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
                  Chores
                  <HeadingArrow />
                </h2>
                <div className={styles.wrapper}>
                  {chores.map((data, index) => {
                    return (
                      <ChoreComponent
                        data={data}
                        key={"chorecomponent" + index}
                      />
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
            )}
            <div
              className={`${styles.liveClassSection} ${
                kids.length === 0 ? styles.nokidlivesection : ""
              }`}
            >
              <h2 className={styles.heading}>
                Live Classes
                <HeadingArrow />
              </h2>
              <div className={styles.wrapper}>
                {liveclasses.map((data, index) => {
                  return (
                    <LiveClass data={data} key={"liveclasscomponent" + index} />
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
