import React from "react";
import styles from "../../styles/ParentStore/VoucherSection.module.scss";
import HeadingArrow from "../SVGcomponents/HeadingArrow";
import Reward from "../WaitlistDashboard/Reward";
import Voucher from "./Voucher";

export default function VoucherSection({ vouchers, unicoins }) {
  return (
    <div className={styles.VoucherSection}>
      <h2 className={styles.heading}>
        Vouchers
        <HeadingArrow />
      </h2>
      <div className={styles.wrapper}>
        {vouchers.map((item, index) => (
          <Reward data={item.data} key={item.id} unicoin={unicoins} />
        ))}
      </div>
    </div>
  );
}
