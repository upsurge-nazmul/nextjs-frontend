import React, { useState,useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/flashsaleoffer/flashsaleoffer.module.scss";
import PaymentsApi from "../actions/apis/PaymentsApi";
function FlashSaleOffer() {
const router = useRouter();
const [plans, setPlans] = useState();

async function fetchPlans() {
  const res = await PaymentsApi.getPlans();
  if (res && res.data && res.data.success) {
    setPlans(res.data.data);
  }
}

useEffect(() => {
  fetchPlans();
}, []);
  return (
    <div className={styles.main}>
        <p className={styles.text}>
          FLASH SALE !<br /> 
          Grab upsurge Premium at ₹499<s>₹4799</s> 
        </p>
        <div className={styles.button}  onClick={() => {
                router.push(`/payments/phonepe?plan_id=${plans[1].id}`);
              }}>CLAIM NOW</div>
    </div>
  );
}

export default FlashSaleOffer;