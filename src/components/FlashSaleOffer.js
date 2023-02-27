import React, { useContext, useState } from "react";
import styles from "../styles/flashsaleoffer/flashsaleoffer.module.scss";
import { useRouter } from "next/router";
function FlashSaleOffer() {
const router = useRouter();
  return (
    <div className={styles.main}>
        <p className={styles.text}>
          FLASH SALE!!! Grab Upsurge Premium at <s>₹4799</s>₹499 
        </p>
        <div className={styles.button}  onClick={() => {
                router.push(`/payments/stripe?amount=${499}`);
              }}>CLAIM NOW</div>
    </div>
  );
}

export default FlashSaleOffer;