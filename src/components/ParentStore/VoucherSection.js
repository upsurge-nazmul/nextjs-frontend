import React from "react";
import styles from "../../styles/ParentStore/VoucherSection.module.scss";
import HeadingArrow from "../SVGcomponents/HeadingArrow";
import Voucher from "./Voucher";

export default function VoucherSection({ vouchers }) {
  const d = ["", "", ""];
  return (
    <div className={styles.VoucherSection}>
      <h2 className={styles.heading}>
        Vouchers
        <HeadingArrow />
      </h2>
      <div className={styles.wrapper}>
        {vouchers.map((item, index) => (
          <Voucher data={item} key={"voucher" + index} />
        ))}
      </div>
    </div>
  );
}
