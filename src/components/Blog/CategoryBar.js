import React, { useState } from "react";
import styles from "../../styles/Blog/categorybar.module.scss";
function CategoryBar() {
  let allcategories = [
    "All Categories",
    "Finance",
    "Learning",
    "Savings",
    "Investments",
    // "Finance",
    // "Learning",
    // "Savings",
    // "Investments",
  ];
  const [categories, setcategories] = useState(allcategories.slice(0, 5));
  const [showfullcategories, setshowfullcategories] = useState(false);

  function onClickMore() {
    setshowfullcategories(!showfullcategories);
    if (showfullcategories) {
      setcategories(allcategories.slice(0, 5));
    } else setcategories(allcategories);
  }
  return (
    <div
      className={`${styles.categoryBar} ${
        showfullcategories ? styles.fullCategories : ""
      }`}
    >
      <div className={styles.left}>
        <div className={styles.wrapper}>
          {categories.map((item) => (
            <div
              className={`${styles.category} ${
                item === "All Categories" ? styles.selected : ""
              }`}
            >
              {item} <div className={styles.underline}></div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.more} onClick={onClickMore}>
        {showfullcategories ? "Less" : "More"}
        {showfullcategories ? (
          <svg
            width="14"
            height="16"
            viewBox="0 0 14 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 1.00056L7 14.7148"
              stroke="#AEAEAE"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13 7L7 0.999999L1 7"
              stroke="#AEAEAE"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        ) : (
          <svg
            width="14"
            height="16"
            viewBox="0 0 14 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 14.7143V1"
              stroke="#AEAEAE"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M1 8.71484L7 14.7148L13 8.71484"
              stroke="#AEAEAE"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        )}
      </div>
    </div>
  );
}

export default CategoryBar;
