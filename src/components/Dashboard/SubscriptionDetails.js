import { useEffect, useState, useRef } from "react";
import PaymentsApi from "../../actions/apis/PaymentsApi";
import Modal from "../Modal";

import { useRouter } from "next/dist/client/router";
import LoginApis from "../../actions/apis/LoginApis";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import Fb from "../../components/SVGcomponents/Fb";
import Insta from "../../components/SVGcomponents/Insta";
import LinkedIN from "../../components/SVGcomponents/LinkedInSvg";
import styles from "../../styles/payments/subscriptionDetails.module.scss";
import ConfirmInvoice from "../../components/ConfirmInvoice";
import { useReactToPrint } from "react-to-print";

export default function SubscriptionDetails({ setShowSubscription, userdata }) {
  const pdfRef = useRef(null);
  const [subsData, setSubsData] = useState();

  async function fetchSubscriptionDetails() {
    const res = await PaymentsApi.getSubscriptionDetails();
    if (res && res.data && res.data.success) {
      let info = res.data.data;
      info.description = "Premium";
      setSubsData(info);
    }
  }

  useEffect(() => {
    fetchSubscriptionDetails();
  }, []);

  const handlerSave = useReactToPrint({
    content: () => pdfRef.current,
  });

  return (
    <Modal
      title={"Subscription Details"}
      actions={{
        cancelText: "Close",
        isCancel: true,
        handleCancel: () => setShowSubscription(false),
        isProceed: true,
        proceedText: "Print Invoice",
        handleProceed: handlerSave,
      }}
    >
      {subsData && (
        <div className={styles.container}>
          <div className={styles.invoiceContainer}>
            <div className={styles.invoiceWrapper}>
              {subsData && (
                <ConfirmInvoice
                  data={subsData}
                  userData={userdata}
                  ref={pdfRef}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
