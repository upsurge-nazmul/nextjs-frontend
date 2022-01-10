import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import Toast from "../Toast";
import styles from "../../styles/ParentStore/approvemodal.module.scss";
import DropDown from "../DropDown";
import BackButtonSvg from "../SVGcomponents/BackButtonSvg";
import PaymentSuccessSvg from "../SVGcomponents/PaymentSuccessSvg";
import PaymentSuccessBackground from "../SVGcomponents/PaymentSuccessBackground";
import displayRazorpay from "../../actions/RazorPay";
import { useRouter } from "next/dist/client/router";

export default function ApproveModal({ showmodal, setshowmodal, buydata }) {
  //modes will be start , category , template, assign
  const [userdata, setuserdata] = useState(null);
  const [error, seterror] = useState("");
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
    }
  }, [showmodal]);
  async function handlepay() {
    if (buydata.type === "points") {
      setsuccess(true);
      return;
    }
    let result = await displayRazorpay(
      buydata.name,
      buydata.description,
      buydata.total ? buydata.total : buydata.price,
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
                    {buydata.item || "Avatar"}{" "}
                    {buydata.item === "Subscription" ?? "for"}
                  </p>
                </div>
              </div>
              {buydata.item !== "Subscription" && (
                <DropDown
                  className={styles.dropdownx}
                  placeholder="Select child"
                  options={["Pihu Mehta", "Rohan Mehta"]}
                  value={selectedchild}
                  setvalue={setselectedchild}
                />
              )}
              <div className={styles.details}>
                <div className={styles.label}>Price</div>
                {buydata.total && (
                  <div className={styles.value}>
                    ₹
                    {buydata.price +
                      "x" +
                      Math.round(buydata.total / buydata.price)}{" "}
                  </div>
                )}
                <div className={styles.value}>
                  {buydata.type === "points" ? "Points" : "₹"}
                  {buydata.total ? buydata.total : buydata.price}{" "}
                </div>
              </div>
              {buydata.type !== "rs" && (
                <div className={styles.details}>
                  <div className={styles.label}>Available Points</div>
                  <div className={styles.value}>2.5K Points</div>
                </div>
              )}
              {error && <p className={styles.error}>{error}</p>}
              <div className={styles.button} onClick={handlepay}>
                Confirm Purchase
              </div>
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
