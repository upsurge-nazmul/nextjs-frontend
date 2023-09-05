import { useState } from "react";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import PageTitle from "../../../components/PageTitle";
import Toast from "../../../components/Toast";
import styles from "../../../styles/EditProfile/editprofile.module.scss";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";

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
      <div className={styles.contentArea}>
        <DashboardHeader
          mode={`Welcome, ${"User Name"}`}
          settoastdata={settoastdata}
        />
        <div className={styles.mainContent}>
          <div className={styles.leftContent}>
            <DoubleItemArea>
              <div>First Name Input</div>
              <div>Last Name Input</div>
            </DoubleItemArea>
            <SingleItemArea>School Input</SingleItemArea>
            <DoubleItemArea>
              <div className={styles.cityInput}>City Input</div>
              <div className={styles.stateInput}>State Input</div>
            </DoubleItemArea>
            <DoubleItemArea>
              <div className={styles.dobInput}>DOB Input</div>
              <div className={styles.genderInput}>Gender Input</div>
            </DoubleItemArea>
            <SingleItemArea>
              <button className={styles.saveButton}>Save Changes</button>
            </SingleItemArea>
          </div>
          <div className={styles.rightContent}>
            <div className={styles.avatarArea}>
              <div className="avatar">Avatar</div>
            </div>
            <div className={styles.userNameArea}>User Name</div>
            <div className={styles.emailArea}>Email</div>
            <div className={styles.phoneArea}>Phone</div>
            <div className={styles.passwordArea}>
              <button className={styles.changePasswordButton}>
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
