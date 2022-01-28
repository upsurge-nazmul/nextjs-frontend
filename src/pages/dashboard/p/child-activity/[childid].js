import React, { useContext, useEffect, useState } from "react";
import Toast from "../../../../components/Toast";
import DashboardHeader from "../../../../components/Dashboard/DashboardHeader";
import ChoreComponent from "../../../../components/Dashboard/ChoreComponent";
import DashboardLeftPanel from "../../../../components/Dashboard/DashboardLeftPanel";
import GameCard from "../../../../components/Dashboard/GameCard";
import { useRouter } from "next/dist/client/router";
import styles from "../../../../styles/ChildActivity/childactivity.module.scss";
import HeadingArrow from "../../../../components/SVGcomponents/HeadingArrow";
import { MainContext } from "../../../../context/Main";
import LoginApis from "../../../../actions/apis/LoginApis";
import ChoreApis from "../../../../actions/apis/ChoreApis";
import { getCookie } from "../../../../actions/cookieUtils";
export default function ChildActivity({ pendingchores }) {
  // modes are different pages like home,kids,store,payments,notifications
  const { setuserdata } = useContext(MainContext);
  const [mode, setmode] = useState("Child Activity");
  const [choremode, setchoremode] = useState("inprogress");
  const [chorearray, setchorearray] = useState(pendingchores ?? []);
  const router = useRouter();
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  useEffect(() => {
    if (choremode === "inprogress") {
      setchorearray(pendingchores);
    } else {
      x();
    }
    async function x() {
      let res = await ChoreApis.getcompletedchildchores(
        {
          child_id: router.query.childid,
        },
        getCookie("accesstoken")
      );
      if (res && res.data && res.data.success) {
        setchorearray(res.data.data);
      } else {
        setchorearray([]);
      }
    }
  }, [choremode]);
  return (
    <div className={styles.childactivity}>
      <DashboardLeftPanel />
      <Toast data={toastdata} />

      <div className={styles.contentWrapper}>
        <DashboardHeader
          mode={mode}
          setmode={setmode}
          settoastdata={settoastdata}
        />
        <div className={styles.mainContent}>
          <div className={styles.flexLeft}>
            <div className={styles.choreSection}>
              <h2 className={styles.mainheading}>
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
              </div>
              <div className={styles.wrapper}>
                {chorearray.map((data, index) => {
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
        props: { isLogged: false, msg },
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    } else {
      let pendinchores = await ChoreApis.getpendingchildchore(
        {
          child_id: params.childid,
        },
        token
      );
      return {
        props: {
          isLogged: true,
          pendingchores:
            pendinchores && pendinchores.data && pendinchores.data.data
              ? pendinchores.data.data
              : [],
        },
      };
    }
  } else {
    return {
      props: { isLogged: false, msg: "cannot get token" },
      redirect: {
        permanent: false,
        destination: "/?err=01",
      },
    };
  }
}
