import React from "react";
import styles from "../../styles/Blog/pagination.module.scss";

function Pagination({ data, setpage, page }) {
  return (
    <div className={styles.pagination}>
      <p className={styles.head}>Pages</p>
      {data.map((pagen, index) => {
        return (
          <p
            className={`${styles.page} ${
              page == index + 1 ? styles.active : ""
            }`}
            onClick={() => setpage(index + 1)}
          >
            {index + 1}
          </p>
        );
      })}
    </div>
  );
}

export default Pagination;
