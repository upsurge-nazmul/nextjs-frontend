import { useContext } from "react";
import { useRouter } from "next/dist/client/router";
import styles from "../../../styles/Menu/menu.module.scss";
import { MainContext } from "../../../context/Main";
import { getfullname } from "../../../helpers/generalfunctions";
import GroupIcon from "@mui/icons-material/Group";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import HikingIcon from "@mui/icons-material/Hiking";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import PaymentIcon from "@mui/icons-material/Payment";
import EditIcon from "@mui/icons-material/Edit";
import { eraseCookie, setCookie } from "../../../actions/cookieUtils";
import LoginApis from "../../../actions/apis/LoginApis";

export default function Menu({
  settoastdata = () => {},
  menuType,
  waitilistmenu,
  setShowOnboarding,
  kidLevel,
  setshowlevels,
  setShowPremiumPopup,
  setShowLoggedInUsers,
}) {
  const router = useRouter();
  const { setSavedUsers, userdata, setshowmenu, setuser, setuserdata } =
    useContext(MainContext);

  async function handleLogout() {
    let res = await LoginApis.logout();
    if (res && res.data && res.data.success) {
      let savedUsersData = localStorage.getItem("savedUsers");
      if (savedUsersData) {
        savedUsersData = JSON.parse(savedUsersData);
        const index = savedUsersData.findIndex(
          (item) => item.id === userdata.user_id
        );
        if (index !== -1) {
          savedUsersData.splice(index, 1);
        }
        localStorage.setItem("savedUsers", JSON.stringify(savedUsersData));
        setSavedUsers(savedUsersData);
        if (savedUsersData.length > 0) {
          return handleChangeUser(savedUsersData[0]);
        }
      }
      eraseCookie("accesstoken");
      setuser(null);
      setuserdata(null);
      router.push("/");
    } else {
      settoastdata({
        show: true,
        msg: "Error logging out try again later or clear cache",
        type: "error",
      });
    }
  }

  async function handleChangeUser(data) {
    if (userdata.user_id === data.id) {
      return;
    }
    let response = await LoginApis.checktoken({
      token: data.token,
    });
    if (response && !response?.data?.success) {
      settoastdata({
        show: true,
        msg: "Token expired",
        type: "error",
      });
      let savedUsersData = localStorage.getItem("savedUsers");
      if (savedUsersData) {
        savedUsersData = JSON.parse(savedUsersData);
        const index = savedUsersData.findIndex((item) => item.id === data.id);
        if (index !== -1) {
          savedUsersData.splice(index, 1);
        }
        localStorage.setItem("savedUsers", JSON.stringify(savedUsersData));
        setSavedUsers(savedUsersData);
      }
    } else {
      settoastdata({
        show: true,
        msg: "Account switched",
        type: "success",
      });
      setCookie("accesstoken", data.token);
      setuserdata(response.data.data);
      setuser(response.data.data.id);
      if (userdata.user_type !== "child") {
        router.push("/dashboard/p");
      } else router.push("/dashboard/k");
    }
  }

  return (
    <div className={styles.menu}>
      <div className={styles.menuBg} onClick={() => setshowmenu(false)}></div>
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
                  setshowmenu(false);
                  setshowlevels((prev) => !prev);
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
          <div
            className={styles.menuItem}
            onClick={() => {
              setshowmenu(false);
              if (waitilistmenu) {
                router.push("/dashboard/w/editprofile");
              } else if (menuType === "child") {
                router.push("/dashboard/k/editprofile");
              } else router.push("/dashboard/p/editprofile");
            }}
          >
            <EditIcon />
            <span>Edit Profile</span>
          </div>
          <div
            className={styles.menuItem}
            onClick={() => {
              setShowLoggedInUsers(true);
              setshowmenu(false);
            }}
          >
            <GroupIcon />
            <span>Switch Account</span>
          </div>
          <div
            className={styles.menuItem}
            onClick={() => {
              setshowmenu(false);
              router.push("/dashboard/k/invite");
            }}
          >
            <GroupAddOutlinedIcon />
            <span>Invite</span>
          </div>
        </div>
        <div className={styles.menuItems}>
          <div
            className={styles.menuItem}
            onClick={() => {
              setshowmenu(false);
              setShowPremiumPopup((prev) => !prev);
            }}
          >
            <PaymentIcon />
            <span>Subscription</span>
          </div>
          <div
            className={styles.menuItem}
            onClick={() => {
              setshowmenu(false);
              setShowOnboarding((prev) => !prev);
            }}
          >
            <HikingIcon />
            <span>Walkthrough</span>
          </div>
        </div>
        <div className={styles.actionArea}>
          <button className={styles.logoutButton} onClick={handleLogout}>
            <LogoutRoundedIcon />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
