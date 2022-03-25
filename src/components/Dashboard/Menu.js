import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import LoginApis from "../../actions/apis/LoginApis";
import { eraseCookie } from "../../actions/cookieUtils";
import LiveHelpRoundedIcon from "@mui/icons-material/LiveHelpRounded";
import { MainContext } from "../../context/Main";
import styles from "../../styles/Dashboard/menu.module.scss";
import EmailIcon from "@mui/icons-material/Email";
import EditSvg from "../SVGcomponents/EditSvg";
import PaymentSvg from "../SVGcomponents/PaymentSvg";
import SettingsSvg from "../SVGcomponents/SettingsSvg";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import { getfullname } from "../../helpers/generalfunctions";
function Menu({ settoastdata, menuType, waitilistmenu }) {
  const { userdata, showmenu, setshowmenu, setuser, setuserdata } =
    useContext(MainContext);
  const router = useRouter();
  const [rotatesetting, setrotatesetting] = useState(false);
  async function handleLogout() {
    let res = await LoginApis.logout();
    if (res && res.data && res.data.success) {
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
      } else if (menu !== null && !menu.contains(e.target)) {
        setshowmenu(false);
      }
    }
    document.addEventListener("mousedown", getifclickedoutside);
    return () => {
      document.removeEventListener("mousedown", getifclickedoutside);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <div className={styles.menu} id="menu-main">
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
      {/* <p
        className={styles.tabs}
        onClick={() => {
          setshowmenu(false);
          if (waitilistmenu) {
            router.push("/dashboard/w/editprofile");
          } else if (menuType === "child") {
            router.push("/dashboard/k/editprofile");
          } else router.push("/dashboard/p/editprofile");
        }}
      >
        <EditSvg className={styles.editIcon} />
        Edit profile
      </p> */}
      {menuType !== "child" && !waitilistmenu && (
        <>
          <p
            className={styles.tabs}
            onClick={() => {
              setshowmenu(false);
              router.push("/dashboard/p/payments");
            }}
          >
            <PaymentSvg className={styles.paymentIcon} />
            Payments
          </p>
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
        <div className={styles.button} onClick={handleLogout}>
          <LogoutRoundedIcon className={styles.icon} />
          Log out
        </div>
      </div>
    </div>
  );
}

export default Menu;
