import React from "react";
import Image from "../../assets/product/product.png";
import styles from "../../styles/Home/product.module.scss";

function ProductSection() {
  return (
    <section className={styles.productSection}>
      <div className={styles.left}>
        <div className={styles.circle}>
          <img src={Image.src} alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.heading}>
          Our{" "}
          <span className={styles.highlight}>
            Product <div className={styles.underline}></div>
          </span>
        </div>
        <div className={styles.button}>Retirment Calculator</div>
        <div className={`${styles.button} ${styles.finance}`}>
          Finance Courses
        </div>
        <div className={styles.button}>Finance Games</div>
        <div className={styles.button}>Budget Calculator</div>
      </div>
    </section>
  );
}

export default ProductSection;
