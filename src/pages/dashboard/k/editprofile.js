import { useState, useEffect, useContext } from "react";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import PageTitle from "../../../components/PageTitle";
import Toast from "../../../components/Toast";
import styles from "../../../styles/EditProfile/editprofile.module.scss";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import ModernInputBox from "../../../components/ModernInputBox";
import { MainContext } from "../../../context/Main";
import KidApis from "../../../actions/apis/KidApis";
import LoginApis from "../../../actions/apis/LoginApis";
import ProfilePage from "../../../components/ProfilePage";

const DoubleItemArea = ({ children }) => {
  console.log("double item", children);
  return (
    <div className={styles.doubleItemArea}>
      <div className={styles.firstItem}>{children[0]}</div>
      <div className={styles.secondItem}>{children[1]}</div>
    </div>
  );
};

const SingleItemArea = ({ children }) => {
  return <div className={styles.singleItemArea}>{children}</div>;
};

export default function EditProfile({ data, childavatars }) {
  const { userdata, setuserdata } = useContext(MainContext);

  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [firstname, setfirstname] = useState(data?.first_name || "");
  const [lastname, setlastname] = useState(data?.last_name || "");

  useEffect(() => {
    setuserdata(data);
  }, []);

  return (
    <div className={styles.container}>
      <PageTitle title={`upsurge | Profile`} />
      <DashboardLeftPanel type="kid" />
      <Toast data={toastdata} />
      <div className={styles.contentArea}>
        <DashboardHeader
          mode={`Welcome, ${"User Name"}`}
          settoastdata={settoastdata}
        />
        <ProfilePage data={data} childavatars={childavatars} />
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
      let childavatars = await KidApis.getavatars(null, token);
      if (childavatars && childavatars.data && childavatars.data.success) {
        return {
          props: {
            data: response.data.data,
            childavatars: childavatars.data.data,
          },
        };
      } else {
        return {
          props: {
            data: response.data.data,
            childavatars: [],
          },
        };
      }
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
