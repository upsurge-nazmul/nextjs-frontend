import React from "react";
import styles from "../../styles/ParentStore/VoucherSection.module.scss";
import HeadingArrow from "../SVGcomponents/HeadingArrow";
import Reward from "../WaitlistDashboard/Reward";
import Voucher from "./Voucher";

export default function VoucherSection({ vouchers, unicoins, email, phone }) {
  return (
    <div className={styles.VoucherSection}>
      <h2 className={styles.heading}>
        Rewards
        <HeadingArrow />
      </h2>
      <div className={styles.wrapper}>
        {vouchers.map((item, index) => (
          <Reward
            data={item.data}
            key={item.id}
            unicoin={unicoins}
            email={email}
            phone={phone}
          />
        ))}
      </div>
    </div>
  );
}
