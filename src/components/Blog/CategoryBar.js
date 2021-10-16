import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import styles from "../../styles/Blog/categorybar.module.scss";
import ArrowDown from "../SVGcomponents/ArrowDown";
import ArrowUp from "../SVGcomponents/ArrowUp";
function CategoryBar({ selectedCat, sortPosts }) {
  let allcategories = [
    "All Categories",
    "Finance",
    "Learning",
    "Savings",
    "Investment",
  ];
  const [categories, setcategories] = useState(allcategories.slice(0, 5));
  const [showfullcategories, setshowfullcategories] = useState(false);
  const router = useRouter();
  const category = router.query.category || "";
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
                item === "All Categories" && !category
                  ? styles.selected
                  : item.toLowerCase() === category.toLowerCase() &&
                    styles.selected
              }`}
              key={"category" + index}
              onClick={() => {
                if (item === "All Categories") {
                  router.push("/blogs");
                } else {
                  router.push("/blogs/" + item.toLowerCase());
                }
              }}
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
