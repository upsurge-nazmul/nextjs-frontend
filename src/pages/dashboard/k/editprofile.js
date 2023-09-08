import { useState, useEffect, useContext } from "react";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import PageTitle from "../../../components/PageTitle";
import Toast from "../../../components/Toast";
import styles from "../../../styles/EditProfile/editprofile.module.scss";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import { MainContext } from "../../../context/Main";
import KidApis from "../../../actions/apis/KidApis";
import LoginApis from "../../../actions/apis/LoginApis";
import ProfilePage from "../../../components/ProfilePage";

export default function EditProfile({ userData, childavatars }) {
  const { userdata, setuserdata } = useContext(MainContext);

  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });

  useEffect(() => {
    setuserdata(userData);
  }, []);

  return (
    <div className={styles.container}>
      <PageTitle title={`upsurge | Profile`} />
      <DashboardLeftPanel type="kid" />
      <Toast data={toastdata} />
      <div className={styles.contentArea}>
        <DashboardHeader
          mode={`Welcome, ${userData?.first_name}`}
          settoastdata={settoastdata}
        />
        {userdata && (
          <ProfilePage data={userdata} childavatars={childavatars} />
        )}
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
        props: { msg },
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    } else {
      return {
        props: {
          userData: response.data.data,
        },
      };
    }
  } else {
    return {
      props: { msg: "cannot get token" },
      redirect: {
        permanent: false,
        destination: "/?err=01",
      },
    };
  }
}
