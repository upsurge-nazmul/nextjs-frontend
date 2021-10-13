import React, { useState } from "react";
import styles from "../../styles/Blog/categorybar.module.scss";
import ArrowDown from "../SVGcomponents/ArrowDown";
import ArrowUp from "../SVGcomponents/ArrowUp";
function CategoryBar() {
  let allcategories = [
    "All Categories",
    "Finance",
    "Learning",
    "Savings",
    "Investments",
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
          {categories.map((item, index) => (
            <div
              className={`${styles.category} ${
                item === "All Categories" ? styles.selected : ""
              }`}
              key={"category" + index}
            >
              {item} <div className={styles.underline}></div>
            </div>
          ))}
        </div>
      </div>
      {allcategories.length > 5 && (
        <div className={styles.more} onClick={onClickMore}>
          {showfullcategories ? "Less" : "More"}
          {showfullcategories ? <ArrowDown /> : <ArrowUp />}
        </div>
      )}
    </div>
  );
}

export default CategoryBar;
