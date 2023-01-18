import { useState } from "react";
import styles from "../../styles/Home/products.module.scss";
import IconWithBg from "../SVGcomponents/IconWithBG";

const DATA = [
  {
    sn: 1,
    id: "kq",
    title: "Knowledge Quests",
    details:
      "Interactive gamified lessons that cover fundamentals of entrepreneurship & personal finance, and include activities, games, stories and quizzes.",
    side: "left",
    iconClr: "#4066eb",
    iconBorder: "#c6d2ff",
  },
  {
    sn: 2,
    id: "ga",
    title: "Games Arena",
    details:
      "A platform of our proprietary games where children can get hands-on experience in applying concepts to games and competing with other students.",
    side: "right",
    iconClr: "#17d1bc",
    iconBorder: "#91fed1",
  },
  {
    sn: 3,
    id: "chores",
    title: "Chores",
    details:
      "Fun & rewarding way for parents to reinforce good financial behaviors by assigning jobs and rewarding children with UniCoins!",
    side: "left",
    iconClr: "#fdcc03",
    iconBorder: "#feefad",
  },
  {
    sn: 4,
    id: "lw",
    title: "Live Workshops",
    details:
      "Live online & offline workshops, designed and delivered by our experts, on entrepreneurship and personal finance.",
    side: "right",
    iconClr: "#ff7f4c",
    iconBorder: "#ffebcd",
  },
  {
    sn: 5,
    id: "cc",
    title: "Competition & Challenges",
    details:
      "Offline games & competitions to give children the opportunities to gain recognition, build their profiles for higher studies & gain competitive capital.",
    side: "left",
    iconClr: "#ff6263",
    iconBorder: "#ffc8c8",
  },
  {
    sn: 6,
    id: "bbg",
    title: "Books & Board Games",
    details:
      "Range of book-sets & board games, focused on building modern skills & knowledge, with integrated AR features for families to enjoy together.",
    side: "right",
    iconClr: "#69dbf2",
    iconBorder: "#c7ebff",
  },
];

function ProductCard({ product, actionHandler }) {
  return (
    <div
      className={styles.product}
      onMouseEnter={() => actionHandler(product.id)}
      onMouseLeave={() => actionHandler("default")}
    >
      <div className={styles.icon}>
        <IconWithBg bgClr={product.iconClr} borderClr={product.iconBorder}>
          <img
            src={
              require(`../../assets/home/products/${product.id}.svg`).default
                .src
            }
            alt={product.title}
          />
        </IconWithBg>
      </div>
      <div className={styles.content}>
        <div className={styles.productTitle}>{product.title}</div>
        <div className={styles.productDetails}>{product.details}</div>
      </div>
    </div>
  );
}

export default function Products() {
  const [currentImg, setCurrentImg] = useState("default");

  return (
    <div className={styles.productsSection}>
      <div className={styles.title}>Here’s how we do it.</div>
      <div className={styles.mainContent}>
        <div className={styles.left}>
          {DATA.map((item) => {
            if (item.side === "left") {
              return (
                <ProductCard
                  product={item}
                  actionHandler={setCurrentImg}
                  key={item.id}
                />
              );
            }
          })}
        </div>
        <div className={styles.middle}>
          <div className={styles.screenshots}>
            <img
              src={
                require(`../../assets/home/products/${currentImg}_ss2.png`)
                  .default.src
              }
              alt={"Screenshot 2"}
              className={styles.ss2}
            />
            <img
              src={
                require(`../../assets/home/products/${currentImg}_ss1.png`)
                  .default.src
              }
              alt={"Screenshot 1"}
              className={styles.ss1}
            />
          </div>
        </div>
        <div className={styles.right}>
          {DATA.map((item) => {
            if (item.side === "right") {
              return (
                <ProductCard
                  product={item}
                  actionHandler={setCurrentImg}
                  key={item.id}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
