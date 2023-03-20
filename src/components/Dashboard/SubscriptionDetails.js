import { useEffect, useState, useRef } from "react";
import PaymentsApi from "../../actions/apis/PaymentsApi";
import Modal from "../Modal";
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
      info.h_cgst = 9;
      info.cgst = (info.amount * 9) / 100;
      info.h_sgst = 9;
      info.sgst = (info.amount * 9) / 100;
      info.h_igst = 18;
      info.igst = (info.amount * 18) / 100;
      info.taxable_value = info.amount - (info.amount * 18) / 100;
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
