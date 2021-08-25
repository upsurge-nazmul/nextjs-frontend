import React from "react";
import styles from "../../styles/ParentStore/voucherCard.module.scss";
function Voucher() {
  const demokiddata = {
    image:
      "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQARtruuFZD4r-jkj2vo99Ql8CfWfaFpb7a5zMzyEtm46plv9bRRq5RrCHDsDIGgr2wOeSezORZU6aGohCb4tU",
    name: "tushar",
    points: "5.6k Points",
  };
  return (
    <div className={styles.voucherCard}>
      <img
        src="https://thesocialmediamc.com/wp-content/uploads/2020/11/Unacademy.jpeg"
        alt=""
        className={styles.userimg}
      />
      <div className={styles.nameandpoints}>
        <p className={styles.name}>20% Off on Unacademy</p>
        <p className={styles.points}>360 Points</p>
      </div>
    </div>
  );
}

export default Voucher;
