import React from "react";
import Image from "../../assets/product/product.png";
import styles from "../../styles/Home/product.module.scss";
import ProductChoresSvg from "../SVGcomponents/ProductChoresSvg";
import ProductGameSvg from "../SVGcomponents/ProductGameSvg";
import ProductPeople from "../SVGcomponents/ProductPeople";
import QuestSvg from "../SVGcomponents/QuestSvg";

function ProductSection() {
  let data = [
    {
      title: "Knowledge Quest",
      description:
        "Knowledge Quest comprises byte sized interactive videos which include exercises, real life examples and a short quiz.",
    },
    {
      title: "Games Arena",
      description:
        "Challenge your friends over multiple games that are fun and experiential",
    },
    {
      title: "Chores",
      description:
        "Help young learners become financially responsible by earning money through chores or “Jobs” assigned by parents.",
    },
    {
      title: "Live Classes",
      description:
        "Interactive and fun workshops by experts for young learners to understand money management and entrepreneurship.",
    },
  ];
  return (
    <section className={styles.productSection}>
      <div className={styles.heading}>Products</div>
      <div className={styles.wrapper}>
        {data.map((item, index) => {
          return (
            <div className={`${styles.pillar}`} key={"pillar" + index}>
              {index === 0 ? (
                <QuestSvg className={styles.icon} />
              ) : index === 1 ? (
                <ProductGameSvg className={styles.icon} />
              ) : index === 2 ? (
                <ProductChoresSvg className={styles.icon} />
              ) : (
                <ProductPeople className={styles.icon} />
              )}
              <p className={styles.title}>{item.title}</p>
              <p className={styles.description}>{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ProductSection;
