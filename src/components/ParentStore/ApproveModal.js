import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import Toast from "../Toast";
import styles from "../../styles/ParentStore/approvemodal.module.scss";
import DropDown from "../DropDown";
import BackButtonSvg from "../SVGcomponents/BackButtonSvg";
import PaymentSuccessSvg from "../SVGcomponents/PaymentSuccessSvg";
import PaymentSuccessBackground from "../SVGcomponents/PaymentSuccessBackground";

export default function ApproveModal({ showmodal, setshowmodal }) {
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
                    Buy <span>Investment Basics</span>
                  </p>
                  <p>Course for</p>
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
                <div className={styles.value}>800 Points</div>
              </div>
              <div className={styles.details}>
                <div className={styles.label}>Available Points</div>
                <div className={styles.value}>2.5K Points</div>
              </div>
              <div className={styles.button} onClick={() => setsuccess(true)}>
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
