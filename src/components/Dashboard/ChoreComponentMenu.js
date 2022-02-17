import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import DashboardApis from "../../actions/apis/DashboardApis";
import styles from "../../styles/Dashboard/choremenu.module.scss";
import Confirmation from "../Confirmation";

export default function ChoreComponentMenu({
  data,
  setshowmenu,
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
    <div className={styles.choremenu} id={data.id}>
      <p
        className={styles.tab}
        onClick={() => router.push("/dashboard/p/managechore/" + data.id)}
      >
        Edit Chore
      </p>
      <p className={styles.tab} onClick={() => setshowConfirmation(true)}>
        Delete Chore
      </p>
    </div>
  );
}
