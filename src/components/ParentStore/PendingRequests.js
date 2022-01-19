import React from "react";
import styles from "../../styles/ParentStore/pendingreq.module.scss";
import RemoveSvg from "../SVGcomponents/RemoveSvg";

export default function PendingRequests({ setshowmodal, setbuydata, data }) {
  function hanldeapprove() {
    setbuydata({
      request_id: data.id,
      item: "avatar",
      available_points: data.child_unicoins,
      name:
        data.request_type === "avatar" ? data.avatar_data.name + " Avatar" : "",
      description: `Requested by ${data.child_name}`,
      price: data.request_type === "avatar" ? data.avatar_data.points : "",
      type: "points",
    });
    setshowmodal(true);
  }
  console.log(data);
  return (
    <div className={styles.pendingRequest}>
      <img
        src={data.request_type === "avatar" ? data.avatar_data.img_url : ""}
        alt=""
      />
      <div className={styles.taskAndTo}>
        <div className={styles.task}>
          {data.request_type === "avatar"
            ? data.avatar_data.name + " Avatar"
            : ""}
        </div>
        <div className={styles.to}>Requested by {data.child_name}</div>
      </div>
      <div className={styles.points}>
        <p className={styles.number}>
          {data.request_type === "avatar" ? data.avatar_data.points : ""}
        </p>
        <p>UniCoins</p>
      </div>
      <div className={styles.button} onClick={hanldeapprove}>
        Approve Purchase
      </div>
      <div className={styles.removebutton}>
        <RemoveSvg />
      </div>
    </div>
  );
}
