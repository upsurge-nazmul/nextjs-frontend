import { useState } from "react";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import PageTitle from "../../../components/PageTitle";
import Toast from "../../../components/Toast";
import styles from "../../../styles/EditProfile/editprofile.module.scss";

export default function ProfilePage() {
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });

  return (
    <div className={styles.container}>
      <PageTitle title={`upsurge | Profile`} />
      <DashboardLeftPanel type="kid" />
      <Toast data={toastdata} />
      <div className={styles.content}>
        <h1>Edit Profile</h1>
      </div>
    </div>
  );
}
