import React from "react";
import styles from "../../styles/ParentStore/VoucherSection.module.scss";
import HeadingArrow from "../SVGcomponents/HeadingArrow";
import AvailablePointCard from "./AvailablePointCard";
import LiveClass from "./LiveClass";
import Voucher from "./Voucher";

export default function VoucherSection() {
  const d = ["", "", ""];
  return (
    <div className={styles.VoucherSection}>
      <h2 className={styles.heading}>
        Vouchers
        <HeadingArrow />
      </h2>
      <div className={styles.wrapper}>
        {d.map((item) => (
          <Voucher />
        ))}
      </div>
    </div>
  );
}
