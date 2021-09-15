import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect } from "react";
import LoginApis from "../../actions/apis/LoginApis";
import { eraseCookie } from "../../actions/cookieUtils";
import { MainContext } from "../../context/Main";
import styles from "../../styles/Dashboard/menu.module.scss";
function Menu({ settoastdata }) {
  const { userdata, showmenu, setshowmenu, setuser, setuserdata } =
    useContext(MainContext);
  const router = useRouter();
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
      <p className={styles.heading}>Welcome, {userdata.first_name}</p>
      <p
        className={styles.tabs}
        onClick={() => {
          setshowmenu(false);
          router.push("/editprofile/parent");
        }}
      >
        Edit profile
      </p>
      <div className={styles.button} onClick={handleLogout}>
        Log out
      </div>
    </div>
  );
}

export default Menu;
