import { useState } from "react";
import styles from "../../styles/WaitlistDashboard/rewardDetails.module.scss";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export default function RewardDetails({ data, isMobile = false }) {
  const [showRedm, setShowRedm] = useState(false);
  const [showTrms, setShowTrms] = useState(false);

  return (
    <div className={isMobile ? styles.mobileContainer : styles.container}>
      <div className={styles.item}>
        <div className={styles.itemLabel}>Description</div>
        <div
          className={styles.itemValue}
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      </div>
      <div className={styles.item}>
        <div className={styles.itemLabel}>Expired In</div>
        <div
          className={styles.itemValue}
          dangerouslySetInnerHTML={{ __html: data.expiryAndValidity }}
        />
      </div>
      <div className={styles.item}>
        <div className={styles.itemLabel}>Available Denominations</div>
        <div className={styles.itemValue}>{data.valueDenominations}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.itemLabel}>Delivery Type</div>
        <div className={styles.itemValue}>
          {data.deliveryType.toUpperCase()}
        </div>
      </div>
      <div className={styles.item}>
        <div
          className={styles.itemLabel}
          onClick={() => setShowRedm((prev) => !prev)}
        >
          <p>Redemption Instructions</p>
          <div className={styles.labelButton}>
            {showRedm ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
          </div>
        </div>
        {showRedm ? (
          <div
            className={styles.overflowContent}
            dangerouslySetInnerHTML={{ __html: data.redemptionInstructions }}
          />
        ) : (
          <div />
        )}
      </div>
      <div className={styles.item}>
        <div
          className={styles.itemLabel}
          onClick={() => setShowTrms((prev) => !prev)}
        >
          <p>Terms & Conditions</p>
          <div className={styles.labelButton}>
            {showTrms ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
          </div>
        </div>
        {showTrms ? (
          <div
            className={styles.overflowContent}
            dangerouslySetInnerHTML={{
              __html: data.termsAndConditionsInstructions,
            }}
          />
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
