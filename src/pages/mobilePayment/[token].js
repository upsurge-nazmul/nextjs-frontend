import React, { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/payments/mobilePayment.module.scss";
import LoginApis from "../../actions/apis/LoginApis";
import SubscriptionDetails from "../../components/Dashboard/SubscriptionDetails";
import ChosePremiumPopUp from "../../components/ChosePremiumPopUp";

export default function MobilePayment({}) {
  const router = useRouter();
  const { token } = router.query;
  const [user, setUser] = useState();

  async function fetchUser() {
    const response = await LoginApis.checktoken({ token });
    if (response && response.data && response.data.success) {
      setUser(response.data.data);
    }
  }

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  return (
    <div className={styles.mainView}>
      {user && user.premium_plan ? (
        <SubscriptionDetails userdata={user} />
      ) : (
        <ChosePremiumPopUp />
      )}
    </div>
  );
}
