import React,{useEffect, useState} from "react";
import styles from "../../styles/ParentStore/pendingreq.module.scss";
import RemoveSvg from "../SVGcomponents/RemoveSvg";
import { UniCoinValue } from "../../../config";
import DashbardApis from "../../actions/apis/DashboardApis";

export default function PendingRequests({ setshowmodal, setbuydata, data }) {
  const [removedata, setremovedata] = useState({
    price: 10,
    type: "rs",
    name: "",
    description: "",
  });
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState(false);
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  useEffect(async()=>{
    if (removedata.item === "avatar") {
      setloading(true);
      let response = await DashbardApis.deleterequest({
        request_id: removedata.request_id,
        type: "avatar",
      });
      if (response && response.data && response.data.success) {
      } else {
        seterror(response.data.message || "Error connecting to server");
      }
      return;
    }
    if (removedata.item === "voucher_request") {
      setloading(true);
      let response = await DashbardApis.deleterequest({
        request_id: removedata.request_id,
        type: "voucher",
      });
      if (response && response.data && response.data.success) {
      } else {
        seterror(response.data.message || "Error connecting to server");
      }
      return;
    }
  
  },[removedata])
  async function handlerejection(){ 
    setremovedata({
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
  }
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
      <div className={styles.flexTop}>
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
      </div>
      <div className={styles.flexBottom}>
      <div className={styles.button} onClick={hanldeapprove}>
        Approve Purchase
      </div>
      <div className={styles.removebutton}>
        <RemoveSvg onClick={handlerejection} />
      </div>
      </div>
    </div>
  );
}
