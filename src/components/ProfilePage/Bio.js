import { useState } from "react";
import styles from "../../styles/EditProfile/profilePage.module.scss";

export default function Bio({ data }) {
  const [username, setusername] = useState(data?.user_name || "");
  const [phone, setphone] = useState(data?.phone || "");
  const [changephone, setchangephone] = useState("");
  const [confirmphone, setconfirmphone] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [showpassotp, setshowpassotp] = useState(false);
  const [showphoneotp, setshowphoneotp] = useState(false);
  const [showpopup, setshowpopup] = useState(false);
  const [showphonepopup, setshowphonepopup] = useState(false);
  const [showimgsetter, setshowimgsetter] = useState(false);
  const [showavatarmodal, setshowavatarmodal] = useState(false);

  return (
    <div className={styles.rightContent}>
      <div className={styles.avatarArea}>
        <div className="avatar">Avatar</div>
      </div>
      <div className={styles.userNameArea}>User Name</div>
      <div className={styles.emailArea}>Email</div>
      <div className={styles.phoneArea}>Phone</div>
      <div className={styles.passwordArea}>
        <button className={styles.changePasswordButton}>Change Password</button>
      </div>
    </div>
  );
}
