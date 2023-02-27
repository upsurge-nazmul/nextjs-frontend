import styles from "../styles/flashsaleoffer/flashsaleoffer.module.scss";
import { useRouter } from "next/router";
import LoginApis from "../actions/apis/LoginApis";
import { useState } from "react";
function FlashSaleOfferPremium() {
const router = useRouter();
const [show, setShow] = useState(true);
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
            router.push(`/payments/stripe?amount=${2000}`);
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