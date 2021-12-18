import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import DashboardApis from "../../actions/apis/DashboardApis";
import styles from "../../styles/Dashboard/kidmenu.module.scss";
import Confirmation from "../Confirmation";

function KidComponentMenu({
  data,
  setshowmenu,
  setkids,
  settoastdata,
  deletechild,
  setshowConfirmation,
}) {
  const router = useRouter();
  useEffect(() => {
    function getifclickedoutside(e) {
      var menu = document.getElementById(data.id);
      var menubutton = document.getElementById(data.id + "menu-button");
      if (e.target === menubutton) {
        return;
      } else if (menu !== null && !menu.contains(e.target)) {
        setshowmenu(false);
      }
    }
    document.addEventListener("mousedown", getifclickedoutside);
    return () => document.addEventListener("mousedown", getifclickedoutside);
  }, []);

  return (
    <div className={styles.kidmenu} id={data.id}>
      <p
        className={styles.tab}
        onClick={() => router.push("/dashboard/p/child/" + data.id)}
      >
        View Profile
      </p>
      <p
        className={styles.tab}
        onClick={() => router.push("/dashboard/p/child/" + data.id)}
      >
        Edit Profile
      </p>
      <p className={styles.tab} onClick={() => setshowConfirmation(true)}>
        Delete Profile
      </p>
    </div>
  );
}

export default KidComponentMenu;
