import React from "react";
import styles from "../../styles/ParentStore/voucherCard.module.scss";
function Voucher({ data }) {
  return (
    <div className={styles.voucherCard}>
      <img src={data.img_url} alt="" className={styles.userimg} />
      <div className={styles.nameandpoints}>
        <p className={styles.name}>{data.name}</p>
        <p className={styles.points}>{data.points}</p>
      </div>
    </div>
  );
}

export default Voucher;
