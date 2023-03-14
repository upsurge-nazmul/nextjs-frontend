import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/flashsaleoffer/flashsaleoffer.module.scss";
import LoginApis from "../actions/apis/LoginApis";
import PaymentsApi from "../actions/apis/PaymentsApi";
function FlashSaleOfferPremium() {
const router = useRouter();
const [show, setShow] = useState(true);
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
async function closePremiumSaleOffer() {
    let response = await LoginApis.closePremiumSaleOffer();
    if (!response.data.success) {
        setShow(false);
    } else {
        setShow(false);
    }
  }
  return (<>
  {show ? (
      <div className={styles.main}>
        <div className={styles.closeButton} onClick={()=>{closePremiumSaleOffer();}}>
              X
    </div>
    <p className={styles.text}>
          FLASH SALE!!! upgrade to 12 month plan and get upsurge goodies 
        </p>
        <div className={styles.button}  onClick={() => {
            router.push(`/payments/stripe?plan_id=${plans[2].id}`);
        }}>CLAIM NOW</div>
        </div>
    ) : (
        <></>
    )
    }
  </>
  )
}

    export default FlashSaleOfferPremium;