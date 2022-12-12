import React, { useState, useEffect, useContext } from "react";
import styles from "../../../styles/WaitlistDashboard/parentlogin.module.scss";
import AuthAddParent from "../../../components/Auth/AuthAddParent";
import AuthLoginParent from "../../../components/Auth/AuthLoginParent";
import Toast from "../../../components/Toast";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import { MainContext } from "../../../context/Main";
import PageTitle from "../../../components/PageTitle";
import LoginApis from "../../../actions/apis/LoginApis";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";

export default function ParentLogin({ userdatafromserver }) {
  console.log(userdatafromserver);
  const { userdata, setuserdata } = useContext(MainContext);
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  useEffect(() => {
    setuserdata(userdatafromserver);
  }, [userdatafromserver]);
  const [mode, setmode] = useState("Parent Panel");
  const [error, seterror] = useState("");
  // useEffect(() => {
  //   if (userdatafromserver.parent_first_login) {
  //     setmode("Parent SignUp");
  //   } else if (userdatafromserver.parent_first_login) {
  //     return null;
  //   }
  // }, []);
  return (
    <div className={styles.parentlogin}>
      <DashboardLeftPanel type="kid" />
      <PageTitle title={`upsurge | Parent Panel`} />
      <Toast data={toastdata} />
      <div className={styles.content}>
        <DashboardHeader
          mode={mode}
          setmode={setmode}
          settoastdata={settoastdata}
        />
        {userdatafromserver.parent_first_login ? (
          <AuthAddParent
            parentEmail={userdatafromserver.parent_email}
            settoastdata={settoastdata}
            childId={userdatafromserver.user_id}
          />
        ) : (
          <AuthLoginParent
            parentEmail={userdatafromserver.parent_email}
            settoastdata={settoastdata}
            token={userdatafromserver.token}
            seterror={seterror}
          />
        )}
        {error && <>${error}</>}
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
        props: {
          isLogged: true,
          userdatafromserver: response.data.data,
        },
      };
    } else {
      return {
        props: {
          isLogged: true,
          userdatafromserver: response.data.data,
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
