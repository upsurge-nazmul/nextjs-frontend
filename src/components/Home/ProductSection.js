import { useRouter } from "next/dist/client/router";
import React, { useContext } from "react";
import styles from "../../styles/Home/product.module.scss";
import ProductChoresSvg from "../SVGcomponents/ProductChoresSvg";
import ProductGameSvg from "../SVGcomponents/ProductGameSvg";
import ProductPeople from "../SVGcomponents/ProductPeople";
import QuestSvg from "../SVGcomponents/QuestSvg";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { MainContext } from "../../context/Main";
function ProductSection() {
  const router = useRouter();
  let data = [
    {
      title: "Knowledge Quest",
      pushTo: "/products/quest",
      description:
        "Interactive gamified lessons that cover fundamentals of entrepreneurship & personal finance, and include activities, games, stories and quizzes.",
    },
    {
      pushTo: "/products/games",
      title: "Games Arena",
      description:
        "A platform of our proprietary games where children can get hands-on experience in applying concepts to games and competing with other students.",
    },
    {
      pushTo: "/products/chores",
      title: "Chores",
      description:
        "Fun & rewarding way for parents to reinforce good financial behaviors by assigning jobs and rewarding children with UniCoins!",
    },
    {
      pushTo: "/products/liveclasses",
      title: "Live Workshops",
      description:
        "Live online & offline workshops, designed and delivered by our experts, on entrepreneurship and personal finance.",
    },
    {
      pushTo: "",
      title: "Competition & Challenges",
      description:
        "Offline games & competitions to give children the opportunities to gain recognition, build their profiles for higher studies & gain competitive capital.",
    },
    {
      pushTo: "",
      title: "Books & Board Games",
      description:
        "Range of book-sets & board games, focused on building modern skills & knowledge, with integrated AR features for families to enjoy together.",
    },
  ];
  const { theme } = useContext(MainContext);
  return (
    <section
      className={`${styles.productSection} ${
        theme === "dark" && styles.darkproductSection
      }`}
    >
      <h2 className={styles.heading}>Here's how we do it?</h2>
      <div className={styles.wrapper}>
        {data.splice(0, 3).map((item, index) => {
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
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
            </div>
          );
        })}
      </div>
      <div className={`${styles.wrapper} ${styles.wrapper2}`}>
        {data.map((item, index) => {
          return (
            <div
              className={`${styles.pillar}`}
              key={"pillar" + index}
              onClick={() => router.push(item.pushTo)}
            >
              {index === 0 ? (
                <ProductPeople className={styles.icon} />
              ) : index === 1 ? (
                <EmojiEventsIcon className={styles.icon} />
              ) : index === 2 ? (
                <DashboardIcon className={styles.icon} />
              ) : (
                <ProductPeople className={styles.icon} />
              )}
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ProductSection;
