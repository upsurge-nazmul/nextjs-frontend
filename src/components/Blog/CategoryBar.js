import { useRouter } from "next/dist/client/router";
import React, { useContext, useState } from "react";
import { MainContext } from "../../context/Main";
import styles from "../../styles/Blog/categorybar.module.scss";
import ArrowDown from "../SVGcomponents/ArrowDown";
import ArrowUp from "../SVGcomponents/ArrowUp";
function CategoryBar({ selectedCat, sortPosts, col, pushto }) {
  let allcategories = [
    "All Categories",
    "Finance",
    "Learning",
    "Savings",
    "Investment",
  ];
  const [categories, setcategories] = useState(allcategories.slice(0, 5));
  const [showfullcategories, setshowfullcategories] = useState(false);
  const { theme } = useContext(MainContext);
  const router = useRouter();
  const category = router.query.category || selectedCat || "";
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
      } ${theme === "dark" && styles.darkstyles}`}
    >
      <div className={styles.left}>
        <div className={styles.wrapper}>
          {categories.map((item, index) => (
            <div
              style={{ backgroundColor: col ? col : "white" }}
              className={`${styles.category} ${
                item === "All Categories" && !category
                  ? styles.selected
                  : item.toLowerCase() === category.toLowerCase() &&
                    styles.selected
              }`}
              key={"category" + index}
              onClick={() => {
                if (item === "All Categories") {
                  if (pushto) {
                    router.push("/dashboard/w/blogs");
                  } else router.push("/blogs");
                } else {
                  if (pushto) {
                    router.push(pushto + item.toLowerCase());
                  } else router.push("/blogs/" + item.toLowerCase());
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
