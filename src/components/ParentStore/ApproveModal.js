import { AnimatePresence } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import Toast from "../Toast";
import styles from "../../styles/ParentStore/approvemodal.module.scss";
import DropDown from "../DropDown";
import BackButtonSvg from "../SVGcomponents/BackButtonSvg";
import PaymentSuccessSvg from "../SVGcomponents/PaymentSuccessSvg";
import PaymentSuccessBackground from "../SVGcomponents/PaymentSuccessBackground";
import displayRazorpay from "../../actions/RazorPay";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useRouter } from "next/dist/client/router";
import { MainContext } from "../../context/Main";
import DashbardApis from "../../actions/apis/DashboardApis";
import Spinner from "../Spinner";
export default function ApproveModal({ showmodal, setshowmodal, buydata }) {
  //modes will be start , category , template, assign
  const { userdata } = useContext(MainContext);
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);
  const [selectedchild, setselectedchild] = useState("Pihu Mehta");
  const [success, setsuccess] = useState(false);
  const router = useRouter();
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  useEffect(() => {
    if (!showmodal) {
      setsuccess(false);
      seterror("");
      setloading(false);
    }
  }, [showmodal]);
  async function handlepay() {
    if (buydata.item === "avatar") {
      setloading(true);
      let response = await DashbardApis.completerequest({
        request_id: buydata.request_id,
        type: "avatar",
      });
      if (response && response.data && response.data.success) {
        setsuccess(true);
      } else {
        seterror(response.data.message || "Error connecting to server");
        setloading(false);
      }
      return;
    }
    if (buydata.item === "voucher_request") {
      setloading(true);
      let response = await DashbardApis.completerequest({
        request_id: buydata.request_id,
        type: "voucher",
      });
      if (response && response.data && response.data.success) {
        setsuccess(true);
      } else {
        seterror(response.data.message || "Error connecting to server");
        setloading(false);
      }
      return;
    }
    if (!userdata.state) {
      seterror("Please set state in edit profile.");
      return;
    }
    if (!userdata.state) {
      seterror("Please set state in edit profile.");
      return;
    }
    let result = await displayRazorpay(
      {
        name: userdata.first_name + " " + userdata.last_name,
        email: userdata.email,
        contact: userdata.phone,
      },
      buydata.name,
      buydata.description,
      buydata.gstprice
        ? buydata.gstprice
        : buydata.total
        ? buydata.total
        : buydata.price,
      buydata.old_sub_id,
      setsuccess,
      buydata.item,
      seterror
    );
  }
  useEffect(() => {
    seterror("");
  }, [buydata]);
  return (
    <div className={styles.approveModal}>
      <Toast data={toastdata} />
      <AnimatePresence>
        {showmodal && !success ? (
          <div className={styles.approveModalWrapper}>
            <div
              className={styles.background}
              onClick={() => setshowmodal(false)}
            ></div>
            <div className={styles.cross} onClick={() => setshowmodal(false)}>
              <CancelOutlinedIcon className={styles.icon} />
            </div>
            <div className={styles.approveModalcontainer}>
              <div className={styles.heading}>
                <BackButtonSvg
                  className={styles.icon}
                  onClick={() => setshowmodal(false)}
                />
                <div className={`${styles.text} ${styles.flextext}`}>
                  <p>
                    Buy <span>{buydata.name || "Avatar"}</span>
                  </p>
                  <p>
                    {buydata.item !== "voucher_request"
                      ? buydata.item
                      : "Voucher"}
                    {buydata.item === "Subscription" ?? "for"}
                  </p>
                </div>
              </div>
              {buydata.item !== "Subscription" &&
                buydata.item !== "avatar" &&
                buydata.item !== "voucher_request" && (
                  <DropDown
                    className={styles.dropdownx}
                    placeholder="Select child"
                    options={["Pihu Mehta", "Rohan Mehta"]}
                    value={selectedchild}
                    setvalue={setselectedchild}
                  />
                )}
              <div className={styles.details}>
                <div className={styles.label}>Price Paid</div>
                {buydata.total && (
                  <div className={styles.value}>
                    ₹
                    {buydata.price +
                      "x" +
                      Math.round(buydata.total / buydata.price)}{" "}
                  </div>
                )}
                <div className={styles.value}>
                  {buydata.type === "points" ? "" : "₹"}
                  {buydata.total ? buydata.total : buydata.price}{" "}
                  {buydata.type === "points" ? "UniCoins" : ""}
                </div>
              </div>
              {buydata.discount && (
                <div className={styles.details}>
                  <div className={styles.label}>Discount</div>
                  <div className={styles.value}>{buydata.discount_detail}</div>
                  <div className={styles.value}>
                    {buydata.type === "points" ? "" : "₹"}
                    {buydata.discount_price}{" "}
                    {buydata.type === "points" ? "UniCoins" : ""}
                  </div>
                </div>
              )}
              {buydata.discount && (
                <div className={styles.details}>
                  <div className={styles.label}>Total</div>
                  <div className={styles.value}></div>
                  <div className={styles.value}>
                    {buydata.type === "points" ? "" : "₹"}
                    {buydata.total - buydata.discount_price}{" "}
                    {buydata.type === "points" ? "UniCoins" : ""}
                  </div>
                </div>
              )}
              {buydata.type !== "points" && (
                <div className={styles.details}>
                  <div className={styles.label}>Tax</div>
                  {buydata.total && (
                    <div className={styles.value}>
                      ₹
                      {(
                        (buydata.discount_price
                          ? buydata.total - buydata.discount_price
                          : buydata.total) * 0.18
                      ).toFixed(2)}
                      {"(18%)"}
                    </div>
                  )}
                  <div className={styles.value}>
                    {buydata.type === "points" ? "" : "₹"}
                    {buydata.gstprice ? buydata.gstprice : buydata.total}{" "}
                    {buydata.type === "points" ? "UniCoins" : ""}
                  </div>
                </div>
              )}
              {buydata.type !== "rs" && (
                <div className={styles.details}>
                  <div className={styles.label}>Available UniCoins</div>
                  <div className={styles.value}>
                    {buydata.available_points >
                    process.env.NEXT_PUBLIC_UNICOIN_VALUE
                      ? buydata.available_points /
                          process.env.NEXT_PUBLIC_UNICOIN_VALUE +
                        "K "
                      : buydata.available_points}{" "}
                    UniCoins
                  </div>
                </div>
              )}
              {error && <p className={styles.error}>{error}</p>}
              {error && error === "Please set state in edit profile." && (
                <p
                  className={styles.btn}
                  onClick={() => router.push("/dashboard/p/editprofile")}
                >
                  go to edit profile
                </p>
              )}
              {!loading ? (
                <div className={styles.button} onClick={handlepay}>
                  Confirm Purchase
                </div>
              ) : (
                <div className={styles.button}>
                  <Spinner />
                </div>
              )}
            </div>
          </div>
        ) : showmodal && success ? (
          <div className={styles.approveModalWrapper}>
            <div
              className={styles.background}
              onClick={() => setshowmodal(false)}
            ></div>
            <div className={styles.approveModalcontainer}>
              <div className={styles.heading}>
                <BackButtonSvg />
                <div className={styles.text}>
                  <p>Thank You!</p>
                  <p className={styles.payment}>Purchase was successful.</p>
                </div>
              </div>

              <div className={styles.svgholder}>
                <PaymentSuccessSvg className={styles.ticksvg} />
                <PaymentSuccessBackground className={styles.backsvg} />
              </div>
              <div
                className={styles.button}
                onClick={() => {
                  setshowmodal(false);
                  router.reload(window.location.pathname);
                }}
              >
                Done
              </div>
            </div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
