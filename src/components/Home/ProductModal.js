import React from "react";
import { motion } from "framer-motion";
import styles from "../../styles/Home/product-modal.module.scss";

const ProductModal = ({ data, setModal }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
      },
    },
  };
  const item = {
    hidden: { y: 100, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };
  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="hidden"
      variants={container}
      className={styles.bgModal}
    >
      <motion.div variants={item} className={styles.modalCard}>
        <div className={styles.cardHeader}>
          <div className={styles.headerBody}>
            <button
              onClick={() => setModal((prev) => ({ ...prev, show: false }))}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                />
              </svg>
            </button>
            <div className={styles.headingContainer}>
              {data.icon}
              <h4 className={styles.heading}>{data.title}</h4>
            </div>
          </div>
          <img src={data.image} className={styles.headerImage} />
        </div>
        <div className={styles.cardFooter}>
          <p className={styles.description}>{data.description}</p>
          <div className={styles.ctaContainer}>
            <button className={styles.cta}>{data.cta}</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductModal;
