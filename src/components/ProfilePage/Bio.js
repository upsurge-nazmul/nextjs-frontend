import { useEffect, useState } from "react";
import styles from "../../styles/EditProfile/profilePage.module.scss";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import VerifiedIcon from "@mui/icons-material/Verified";
import BioItem from "./BioItem";

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
      <BioItem label={"Username"} value={bioData.userName} />
      {bioData.email ? (
        <BioItem label={"Email"} value={bioData.email} />
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
        />
      )}
      {bioData.phone ? (
        <BioItem label={"Phone"} value={bioData.phone} />
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
        />
      )}
      <div className={styles.passwordArea}>
        <button className={styles.changePasswordButton}>Change Password</button>
      </div>
    </div>
  );
}
