import React, { useEffect } from "react";
import styles from "../../styles/Dashboard/kidmenu.module.scss";

function KidComponentMenu({ data, setshowmenu }) {
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
      <p className={styles.tab}>View Profile</p>
      <p className={styles.tab}>Edit Profile</p>
      <p className={styles.tab}>Delete Profile</p>
    </div>
  );
}

export default KidComponentMenu;
