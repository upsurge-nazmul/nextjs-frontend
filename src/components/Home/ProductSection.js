import React from "react";
import Image from "../../assets/product/product.png";
import styles from "../../styles/Home/product.module.scss";

function ProductSection() {
  return (
    <section className={styles.productSection}>
      <div className={styles.left}>
        <div className={styles.heading}>
          Our{" "}
          <span className={styles.highlight}>
            Product <div className={styles.underline}></div>
          </span>
        </div>
        <div className={styles.button}>Live Classes</div>
        <div className={`${styles.button} ${styles.finance}`}>
          Interactive Learning Modules
          <p>Financial courses help you learn about finance and more.</p>
        </div>
        <div className={styles.button}>Games</div>
        <div className={styles.button}>Quizzes</div>
        <div className={styles.button}>Tournaments</div>
      </div>

      <div className={styles.right}>
        <div className={styles.circle}>
          <div className={styles.green}></div>
          <div className={styles.red}></div>
          <div className={styles.yellow}></div>
          <img src={Image.src} alt="" />
        </div>
      </div>
    </section>
  );
}

export default ProductSection;
