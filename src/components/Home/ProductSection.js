import { useRouter } from "next/dist/client/router";
import React from "react";
import styles from "../../styles/Home/product.module.scss";
import ProductChoresSvg from "../SVGcomponents/ProductChoresSvg";
import ProductGameSvg from "../SVGcomponents/ProductGameSvg";
import ProductPeople from "../SVGcomponents/ProductPeople";
import QuestSvg from "../SVGcomponents/QuestSvg";

function ProductSection() {
  const router = useRouter();
  let data = [
    {
      title: "Knowledge Quest",
      pushTo: "/products/quest",
      description:
        "Interactive courses that cover fundamentals of finance, including earning, budgeting, saving, and investing, and entrepreneurship and include exercises, real-life examples and short quizzes.",
    },
    {
      pushTo: "/products/games",
      title: "Games Arena",
      description:
        "Our platform with multiple proprietary games where children can apply financial concepts to real-experiences based games and understand finance, investing, and entrepreneurship in a fun and compelling way.",
    },
    {
      pushTo: "/products/chores",
      title: "Chores",
      description:
        "Fun and rewarding way for parents to reinforce good financial behaviors in children by assigning jobs to them and rewarding them with UniCoins – which will help them understand that they have to work to earn money!",
    },
    {
      pushTo: "/products/liveclasses",
      title: "Live Classes",
      description:
        "Engaging fun workshops and courses for children, by experts and our founders, around important topics such as money management, career development and entrepreneurship.",
    },
  ];
  return (
    <section className={styles.productSection}>
      <div className={styles.heading}>Our Products</div>
      <div className={styles.wrapper}>
        {data.map((item, index) => {
          return (
            <div
              className={`${styles.pillar}`}
              key={"pillar" + index}
              onClick={() => router.push(item.pushTo)}
            >
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
