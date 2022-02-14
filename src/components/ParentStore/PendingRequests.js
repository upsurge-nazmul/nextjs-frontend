import React from "react";
import styles from "../../styles/ParentStore/pendingreq.module.scss";
import RemoveSvg from "../SVGcomponents/RemoveSvg";
import { UniCoinValue } from "../../../config";

export default function PendingRequests({ setshowmodal, setbuydata, data }) {
  function hanldeapprove() {
    setbuydata({
      request_id: data.id,
      item:
        data.request_type === "avatar"
          ? "avatar"
          : data.request_type === "voucher"
          ? "voucher_request"
          : "else",
      available_points: data.child_unicoins,
      name:
        data.request_type === "avatar"
          ? data.avatar_data.name + " Avatar"
          : data.request_type === "voucher"
          ? data.voucher_data.name
          : "",
      description: `Requested by ${data.child_name}`,
      price:
        data.request_type === "avatar"
          ? data.avatar_data.points
          : data.request_type === "voucher"
          ? Number(data.price) > 1000
            ? Number(data.price) / UniCoinValue + "K "
            : data.price
          : "",
      type: "points",
    });
    setshowmodal(true);
  }

  return (
    <div className={styles.pendingRequest}>
      <img
        src={
          data.request_type === "avatar"
            ? data.avatar_data.img_url
            : data.request_type === "voucher"
            ? data.voucher_data.img_url
            : ""
        }
        alt=""
      />
      <div className={styles.taskAndTo}>
        <div className={styles.task}>
          {data.request_type === "avatar"
            ? data.avatar_data.name + " Avatar"
            : data.request_type === "voucher"
            ? data.voucher_data.name
            : ""}
        </div>
        <div className={styles.to}>Requested by {data.child_name}</div>
      </div>
      <div className={styles.points}>
        <p className={styles.number}>
          {data.request_type === "avatar"
            ? data.avatar_data.points
            : data.request_type === "voucher"
            ? Number(data.price) > 1000
              ? Number(data.price) / UniCoinValue + "K "
              : data.price
            : ""}
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
