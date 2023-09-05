import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import LoginApis from "../../actions/apis/LoginApis";
import { eraseCookie, setCookie } from "../../actions/cookieUtils";
import LiveHelpRoundedIcon from "@mui/icons-material/LiveHelpRounded";
import { MainContext } from "../../context/Main";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import styles from "../../styles/Dashboard/menu.module.scss";
import EmailIcon from "@mui/icons-material/Email";
import EditSvg from "../SVGcomponents/EditSvg";
import PaymentSvg from "../SVGcomponents/PaymentSvg";
import GroupIcon from "@mui/icons-material/Group";
import SettingsSvg from "../SVGcomponents/SettingsSvg";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import HikingIcon from "@mui/icons-material/Hiking";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import { getfullname } from "../../helpers/generalfunctions";
import AuthComponent from "../Auth/AuthComponent";
import PaymentIcon from "@mui/icons-material/Payment";

function Menu({
  settoastdata = () => {},
  showauth,
  setshowauth,
  menuType,
  waitilistmenu,
  setSavedUser,
  setShowOnboarding,
  kidLevel,
  setshowlevels,
  setShowPremiumPopup,
}) {
  const {
    savedUsers,
    setSavedUsers,
    userdata,
    showmenu,
    setshowmenu,
    setuser,
    setuserdata,
  } = useContext(MainContext);

  const router = useRouter();
  const [showUsers, setshowUsers] = useState(false);

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

  useEffect(() => {
    function getifclickedoutside(e) {
      var avbtn = document.getElementById("avatar-button");
      var menu = document.getElementById("menu-main");
      if (e.target === avbtn) {
        return;
      } else if (
        menu !== null &&
        !menu.contains(e.target) &&
        !router.query.showTour
      ) {
        setshowmenu(false);
      }
    }
    document.addEventListener("mousedown", getifclickedoutside);
    return () => {
      document.removeEventListener("mousedown", getifclickedoutside);
    };
    // eslint-disable-next-line
  }, []);
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
    <div
      className={`${styles.menu} ${router.query.showTour && styles.tourMenu}`}
      id="menu-main"
    >
      <div className={styles.top}>
        <p className={styles.heading}>
          {getfullname(userdata?.first_name, userdata?.last_name)}
        </p>
        <p
          className={styles.subheading}
          onClick={() => {
            setshowmenu(false);
            if (waitilistmenu) {
              router.push("/dashboard/w/editprofile");
            } else if (menuType === "child") {
              router.push("/dashboard/k/editprofile");
            } else router.push("/dashboard/p/editprofile");
          }}
        >
          Edit profile
        </p>
        <div className={styles.arrow}></div>
      </div>
      <div
        className={`${styles.switchTab} ${showUsers && styles.switchActive}`}
        id="switch-tab"
      >
        <div
          className={styles.switch}
          onClick={() => {
            setshowUsers(!showUsers);
          }}
        >
          <GroupIcon className={styles.paymentIcon} />
          Switch Accounts
        </div>
        {showUsers && (
          <div className={styles.userWrapper}>
            {savedUsers.map((user) => {
              if (user.id === userdata.user_id) return null;
              return (
                <div
                  // onClick={() => handleChangeUser(user)}
                  onClick={() => {
                    setshowauth(true);
                    setSavedUser(user);
                  }}
                  className={`${styles.innerUser} ${
                    user.id === userdata.user_id && styles.selectedUser
                  }`}
                  key={user.id}
                >
                  <img src={user.image} alt="" />
                  <div className={styles.userInfo}>
                    <p>{user.name}</p>
                    <p>{user.type}</p>
                  </div>
                </div>
              );
            })}

            <div
              className={`${styles.innerUser} `}
              onClick={() => setshowauth(true)}
            >
              <GroupAddIcon className={styles.icon} />
              <div className={styles.userInfo}>
                <p>Add new account</p>
              </div>
            </div>
          </div>
        )}
      </div>
      {menuType === "child" && !waitilistmenu && (
        <>
          <p
            className={styles.tabs}
            onClick={() => {
              setshowmenu(false);
              router.push("/dashboard/k/invite");
            }}
          >
            <GroupAddOutlinedIcon className={styles.editIcon} />
            Invite
          </p>
        </>
      )}
      {menuType !== "child" && !waitilistmenu && (
        <>
          <p
            className={styles.tabs}
            onClick={() => {
              setshowmenu(false);
              router.push("/dashboard/p/invite");
            }}
          >
            <GroupAddOutlinedIcon className={styles.editIcon} />
            Invite
          </p>
        </>
      )}
      {waitilistmenu && (
        <p
          className={styles.tabs}
          onClick={() => {
            setshowmenu(false);
            router.push("/dashboard/w/contact");
          }}
        >
          <EmailIcon className={styles.contacticon} />
          Contact us
        </p>
      )}
      {waitilistmenu && (
        <p
          className={styles.tabs}
          onClick={() => {
            setshowmenu(false);
            router.push("/dashboard/w/faq");
          }}
        >
          <LiveHelpRoundedIcon className={styles.contacticon} />
          FAQ
        </p>
      )}
      {/* {!waitilistmenu && (
        <div
          className={styles.tabs}
          onMouseEnter={() => setrotatesetting(true)}
          onMouseLeave={() => setrotatesetting(false)}
          onClick={() => {
            setshowmenu(false);
            router.push("/editprofile/parent");
          }}
        >
          <div
            className={`${styles.settings} ${styles.icon} ${
              rotatesetting ? styles.rotate : ""
            }`}
          >
            <SettingsSvg />
          </div>
          Settings
        </div>
      )} */}
      <div className={styles.tabgrp}>
        {userdata?.user_type === "child" && kidLevel && (
          <div
            className={styles.button}
            onClick={() => {
              setshowmenu(false);
              setshowlevels((prev) => !prev);
            }}
          >
            <img
              src={"/images/badges/badge_" + kidLevel + ".svg"}
              alt="KidLevel"
              className={styles.img}
            />
            Level {kidLevel}
          </div>
        )}
        {menuType === "child" ? (
          <div
            className={styles.button}
            onClick={() => {
              setshowmenu(false);
              setShowPremiumPopup((prev) => !prev);
            }}
          >
            <PaymentIcon className={styles.icon} />
            Subscription
          </div>
        ) : (
          <></>
        )}
        <div
          className={styles.button}
          onClick={() => {
            setshowmenu(false);
            setShowOnboarding((prev) => !prev);
          }}
        >
          <HikingIcon className={styles.icon} />
          Walkthrough
        </div>
      </div>
      <div className={styles.tabgrp}>
        <div className={styles.button} onClick={handleLogout}>
          <LogoutRoundedIcon className={styles.icon} />
          Log out
        </div>
      </div>
    </div>
  );
}

export default Menu;
