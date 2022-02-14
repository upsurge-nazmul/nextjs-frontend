import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import TribeApis from "../../actions/apis/TribeApis";
import { getCookie } from "../../actions/cookieUtils";
import styles from "../../styles/Dashboard/tribeApproval.module.scss";
import ClockSvg from "../SVGcomponents/ClockSvg";
import CompletedSvg from "../SVGcomponents/CompletedSvg";
import MenuSvg from "../SVGcomponents/MenuSvg";
import PendingSvg from "../SVGcomponents/PendingSvg";
import RemoveSvg from "../SVGcomponents/RemoveSvg";

export default function TribeApproval({ data }) {
  const [showmenu, setshowmenu] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (showmenu) document.addEventListener("mousedown", getifclickedoutside);
    else document.removeEventListener("mousedown", getifclickedoutside);
    function getifclickedoutside(e) {
      let menu = document.getElementById(`menu-${data.id}`);
      if (menu !== null && !menu.contains(e.target)) {
        setshowmenu(false);
      }
    }
    return () => {
      document.removeEventListener("mousedown", getifclickedoutside);
    };
  }, [showmenu]);
  async function hanldeapprove() {
    let res = await TribeApis.approveaddrequest(
      { id: data.id, type: data.type },
      getCookie("accesstoken")
    );
    if (res && res.data && res.data.success) {
      alert("done");
    }
  }
  return (
    <div className={styles.tribeApproval}>
      <img
        src={
          data.tribe_img_url ||
          "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQTFWtjP3S55GF9SiB8xsodk5w2QO5MichphEj4JcYRpo-Eewh5WdqGZH6G1OtIgoB-PmyPDWcx-9ieyysbz5g"
        }
        alt=""
      />
      <div className={styles.taskAndTo}>
        <div className={styles.task}>Add {data.child_name}</div>
        <div className={styles.to}>
          Requested by <span>{data.sender_name}</span>
        </div>
        <p className={styles.mobiletribe}>{data.name}</p>
      </div>
      <div className={styles.time}>
        <p>{data.name}</p>
      </div>
      <div className={styles.button} onClick={hanldeapprove}>
        Approve
      </div>
      <div className={styles.removebutton}>
        <RemoveSvg />
      </div>
    </div>
  );
}
