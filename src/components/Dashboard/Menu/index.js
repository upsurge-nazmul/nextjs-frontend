import { useContext } from "react";
import styles from "../../../styles/Menu/menu.module.scss";
import { MainContext } from "../../../context/Main";
import { getfullname } from "../../../helpers/generalfunctions";
import LiveHelpRoundedIcon from "@mui/icons-material/LiveHelpRounded";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import EmailIcon from "@mui/icons-material/Email";
import GroupIcon from "@mui/icons-material/Group";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import HikingIcon from "@mui/icons-material/Hiking";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import PaymentIcon from "@mui/icons-material/Payment";
import EditIcon from "@mui/icons-material/Edit";
import EditSvg from "../../SVGcomponents/EditSvg";
import PaymentSvg from "../../SVGcomponents/PaymentSvg";
import SettingsSvg from "../../SVGcomponents/SettingsSvg";

export default function Menu({ kidLevel }) {
  const { userdata } = useContext(MainContext);
  return (
    <div className={styles.menu}>
      <div className={styles.arrow}></div>
      <div className={styles.leftSide}>
        <div className={styles.info}>
          <div className={styles.infoLeft}>
            <div className={styles.name}>
              {getfullname(userdata?.first_name, userdata?.last_name)}
            </div>
            <div className={styles.userName}>{userdata?.user_name}</div>
          </div>
          <div className={styles.infoRight}>
            {userdata?.user_type === "child" && kidLevel && (
              <div
                className={styles.level}
                onClick={() => {
                  // setshowmenu(false);
                  // setshowlevels((prev) => !prev);
                }}
              >
                <img
                  src={"/images/badges/badge_" + kidLevel + ".svg"}
                  alt="KidLevel"
                  className={styles.badge}
                />
                <span>{`Level ${kidLevel}`}</span>
              </div>
            )}
          </div>
        </div>
        <div className={styles.avatarArea}>
          <img
            id="avatar-button"
            src={
              userdata?.user_img_url ||
              "https://imgcdn.upsurge.in/images/default-avatar.png"
            }
            alt="Avatar"
            className={styles.menuAvatar}
          />
        </div>
        <div className={styles.avatarActionArea}>
          <button className={styles.editAvatarButton}>
            <EditIcon />
            <span>Edit Avatar</span>
          </button>
        </div>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.menuItems}>
          <div className={styles.menuItem}>
            <EditIcon />
            <span>Edit Profile</span>
          </div>
          <div className={styles.menuItem}>
            <GroupIcon />
            <span>Switch Account</span>
          </div>
          <div className={styles.menuItem}>
            <GroupAddOutlinedIcon />
            <span>Invite</span>
          </div>
        </div>
        <div className={styles.menuItems}>
          <div className={styles.menuItem}>
            <PaymentIcon />
            <span>Subscription</span>
          </div>
          <div className={styles.menuItem}>
            <HikingIcon />
            <span>Walkthrough</span>
          </div>
        </div>
        <div className={styles.actionArea}>
          <button className={styles.logoutButton}>
            <LogoutRoundedIcon />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
