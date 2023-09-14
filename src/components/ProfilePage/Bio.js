import { useEffect, useState } from "react";
import styles from "../../styles/EditProfile/profilePage.module.scss";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import VerifiedIcon from "@mui/icons-material/Verified";
import BioItem from "./BioItem";
import DashboardApis from "../../actions/apis/DashboardApis";
import EmailOTP from "../Auth/EmailOTP";

export default function Bio({
  data = null,
  emailVerificationHandler = () => {},
  phoneVerificationHandler = () => {},
  settoastdata = () => {},
}) {
  const [bioData, setBioData] = useState({
    userName: "",
    email: "",
    parentEmail: "",
    phone: "",
    parentPhone: "",
  });
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [showEmailOTP, setShowEmailOTP] = useState(false);

  useEffect(() => {
    if (data) {
      setBioData({
        userName: data.user_name || "",
        email: data.email || "",
        parentEmail: data.parent_email || "",
        phone: data.phone || "",
        parentPhone: data.parent_phone || "",
      });
      setEmailVerified(data.email_verified);
      setPhoneVerified(data.phone_verified);
    }
  }, [data]);

  const handleEditUser = async (item) => {
    console.log("!!!!!!!!!", item);
    const response = await DashboardApis.updatechildprofile({
      user_name: item,
    });
    console.log("updated user profile", response.data);
    if (response && response.data && response.data.success) {
      const responseData = response.data.data;
      setBioData((prev) => ({ ...prev, userName: responseData.user_name }));
      settoastdata({
        show: true,
        msg: response.data.message,
        type: "success",
      });
    } else {
      settoastdata({ show: true, msg: response.data.message, type: "error" });
    }
  };

  const handleEditEmail = async (item) => {
    console.log("!!!!!!!!!", item);
    const response = await DashboardApis.updatechildprofile({
      parent_email: item,
    });
    console.log("updated user profile", response.data);
    if (response && response.data && response.data.success) {
      const responseData = response.data.data;
      if (response.data.message === "OTP sent to parent email address") {
        setShowEmailOTP(true);
        setBioData((prev) => ({
          ...prev,
          parentEmail: responseData.requested_parent_email,
        }));
      } else {
        setBioData((prev) => ({
          ...prev,
          parentEmail: responseData.parent_email,
        }));
      }
      settoastdata({
        show: true,
        msg: response.data.message,
        type: "success",
      });
    } else {
      settoastdata({ show: true, msg: response.data.message, type: "error" });
    }
  };

  const handleEditPhone = async (item) => {
    console.log("!!!!!!!!!", item);
  };

  // console.log("data", data);

  return (
    <div className={styles.bio}>
      <div className={styles.avatarArea}>
        <img
          onClick={() => {}}
          id="avatar"
          src={
            data?.user_img_url ||
            "https://imgcdn.upsurge.in/images/default-avatar.png"
          }
          alt="User Avatar"
          className={styles.avatarImg}
        />
      </div>
      <BioItem
        label={"Username"}
        value={bioData.userName}
        editActionHandler={handleEditUser}
      />
      {bioData.email ? (
        <BioItem
          label={"Email"}
          value={bioData.email}
          editActionHandler={handleEditEmail}
        />
      ) : (
        <BioItem
          label={"Parent Email"}
          value={bioData.parentEmail}
          additionalAction={
            emailVerified
              ? {
                  icon: <VerifiedIcon style={{ color: "#5955e5" }} />,
                  label: "Email Verified",
                }
              : {
                  icon: <GppMaybeIcon style={{ color: "#de6869" }} />,
                  label: "Click here to Resend verification email",
                  actionHandler: emailVerificationHandler,
                }
          }
          editActionHandler={handleEditEmail}
        />
      )}
      {bioData.phone ? (
        <BioItem
          label={"Phone"}
          value={bioData.phone}
          editActionHandler={handleEditPhone}
        />
      ) : (
        <BioItem
          label={"Parent Phone"}
          value={bioData.parentPhone}
          additionalAction={
            phoneVerified
              ? {
                  icon: <VerifiedIcon style={{ color: "#5955e5" }} />,
                  label: "Phone Verified",
                }
              : {
                  icon: <GppMaybeIcon style={{ color: "#de6869" }} />,
                  label: "Click here to Verify your phone number",
                  actionHandler: phoneVerificationHandler,
                }
          }
          editActionHandler={handleEditPhone}
        />
      )}
      <div className={styles.passwordArea}>
        <button className={styles.changePasswordButton}>Change Password</button>
      </div>
      {showEmailOTP && (
        <div>
          <EmailOTP
            setshowOTP={setShowEmailOTP}
            userphone={bioData.parentEmail}
            setEmail={(data) =>
              setBioData((prev) => ({ ...prev, email: data }))
            }
          />
        </div>
      )}
    </div>
  );
}
