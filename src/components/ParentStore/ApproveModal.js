import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import Toast from "../Toast";
import styles from "../../styles/ParentStore/approvemodal.module.scss";
import DropDown from "../DropDown";
import BackButtonSvg from "../SVGcomponents/BackButtonSvg";
import PaymentSuccessSvg from "../SVGcomponents/PaymentSuccessSvg";
import PaymentSuccessBackground from "../SVGcomponents/PaymentSuccessBackground";
import displayRazorpay from "../../actions/RazorPay";

export default function ApproveModal({ showmodal, setshowmodal, buydata }) {
  //modes will be start , category , template, assign
  const [userdata, setuserdata] = useState(null);
  const [mode, setmode] = useState("category");
  const [selectedchild, setselectedchild] = useState("Pihu Mehta");
  const [success, setsuccess] = useState(false);
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
      buydata.amount,
      setsuccess
    );
  }
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
                <BackButtonSvg />
                <div className={styles.text}>
                  <p>
                    Buy <span>{buydata.name || "Avatar"}</span>
                  </p>
                  <p>{buydata.item || "Avatar"} for</p>
                </div>
              </div>
              <DropDown
                className={styles.dropdownx}
                placeholder="Select child"
                options={["Pihu Mehta", "Rohan Mehta"]}
                value={selectedchild}
                setvalue={setselectedchild}
              />
              <div className={styles.details}>
                <div className={styles.label}>Price</div>
                <div className={styles.value}>
                  {buydata.amount} {buydata.type === "points" ? "Points" : "₹"}
                </div>
              </div>
              {buydata.type !== "rs" && (
                <div className={styles.details}>
                  <div className={styles.label}>Available Points</div>
                  <div className={styles.value}>2.5K Points</div>
                </div>
              )}
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
                onClick={() => setshowmodal(false)}
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
