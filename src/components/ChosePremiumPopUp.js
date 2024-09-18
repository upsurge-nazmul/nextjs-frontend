import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styles from "../styles/GeneralComponents/chosePremium.module.scss";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import PaymentsApi from "../actions/apis/PaymentsApi";
import { CircularProgress } from "@mui/material";
import Plans from "./Plans";

function ChosePremiumPopUp({
  setChoseToPremium = () => {},
  token = "",
  sendDataToReactNativeApp = () => {},
}) {
  const router = useRouter();
  const [plans, setPlans] = useState();
  const [loading, setLoading] = useState(true);

  async function fetchPlans() {
    const res = await PaymentsApi.getPlans({ scheme: process.env.NODE_ENV });
    if (res && res.data && res.data.success) {
      setPlans(res.data.data);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPlans();
    console.log(plans);
  }, []);
  if (loading) {
    return (
      <div
        style={{
          height: "100%",
          minHeight: "80vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={100} />
      </div>
    );
  }
  return (
    <div className={styles.subToPremium}>
      <div
        className={styles.background}
        onClick={() => {
          if (router.pathname === "/dashboard/k") {
            setChoseToPremium(false);
          } else {
            router.push(`/dashboard/k`);
          }
        }}
      ></div>
      <div className={styles.block}>
        <div
          className={styles.cross}
          onClick={() => {
            setChoseToPremium(false);
            sendDataToReactNativeApp();
          }}
        >
          <CancelOutlinedIcon className={styles.icon} />
        </div>

        <div className={`${styles.section} ${styles.topsectionheader}`}>
          <div className={styles.sectionLeft}>
            <h2 className={styles.header}>upsurge Premium</h2>
            <p className={styles.subheading}>
              Get access to premium quests and games
            </p>
          </div>
          <div className={styles.sectionRight}>
            <ul>
              <li className={styles.sectionItem}>20 Quests </li>
              <li className={styles.sectionItem}>16 Educational Games</li>
              <li className={styles.sectionItem}>
                5 Flagship Games (1000 hours)
              </li>
              <li className={styles.sectionItem}>Events and Challenges</li>
              <li className={styles.sectionItem}>10,000 Bonus Unicoins</li>
              <li className={styles.sectionItem}>Redeem Vouchers</li>
              <li className={styles.sectionItem}>
                Win monthly rewards worth ₹25,000{" "}
              </li>
            </ul>
          </div>
        </div>

        <Plans />

        <p
          className={styles.clickable}
          onClick={() => {
            sendDataToReactNativeApp();
            // if (router.pathname === "/dashboard/k") {
            //   setChoseToPremium(false);
            // } else {
            //   router.push(`/dashboard/k`);
            // }
          }}
        >
          Continue using the free version
        </p>
      </div>
    </div>
  );
}

export default ChosePremiumPopUp;
