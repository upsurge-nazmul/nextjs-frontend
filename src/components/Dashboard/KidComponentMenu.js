import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import DashboardApis from "../../actions/apis/DashboardApis";
import styles from "../../styles/Dashboard/kidmenu.module.scss";

function KidComponentMenu({ data, setshowmenu, setkids, settoastdata }) {
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
  async function deletechild() {
    let res = await DashboardApis.deletechild({ id: data.id });
    if (res && res.data.success) {
      setkids((prev) => prev.filter((item) => item.id !== data.id));
      settoastdata({ show: true, type: "success", msg: "done" });
    } else {
      settoastdata({
        type: "error",
        show: true,
        msg: res.data.message || "error deleting",
      });
    }
  }
  return (
    <div className={styles.kidmenu} id={data.id}>
      <p
        className={styles.tab}
        onClick={() => router.push("/child/" + data.id)}
      >
        View Profile
      </p>
      <p
        className={styles.tab}
        onClick={() => router.push("/child/" + data.id)}
      >
        Edit Profile
      </p>
      <p className={styles.tab} onClick={deletechild}>
        Delete Profile
      </p>
    </div>
  );
}

export default KidComponentMenu;
