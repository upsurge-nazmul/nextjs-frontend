import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/Home/benefits.module.scss";
import ImageDisplay from "../Benefits/ImageDisplay";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const DATA = [
  {
    id: 1,
    title: "Kickstart your child’s financial education journey",
    description:
      "Financial literacy is a life-skill and the earlier your children start, the easier it will be for them to achieve their financial goals. Through our games, courses and live classes, all designed by experts, children will understand money, saving, investing and entrepreneurship like never before!",
    img: "https://imgcdn.upsurge.in/images/landing/benefits-stock/1.jpg",
    frameType: "vertical",
  },
  {
    id: 2,
    title: "Learning by doing",
    description:
      "We believe that learning is most effective when it’s through play! Our games, activities and quizzes will instill healthy money habits that will last a lifetime.",
    img: "https://imgcdn.upsurge.in/images/landing/benefits-stock/2.jpg",
    frameType: "horizontal",
  },
  {
    id: 3,
    title: "Developing entrepreneurial mindsets.",
    description:
      "Equip your children with the necessary skills and knowledge to understand and evaluate the fundamentals of business and starting-up, and (hopefully) be the next unicorn founder.",
    img: "https://imgcdn.upsurge.in/images/landing/benefits-stock/3.jpg",
    frameType: "default",
  },
  {
    id: 4,
    title: "Earn real rewards",
    description:
      "As adults, when we do any job well, we get rewarded. Then why should it be any different for children? Students get rewarded with Unicoins for jobs well done, which can be redeemed for books, games, vouchers and educational courses from your favorite brands.",
    img: "https://imgcdn.upsurge.in/images/landing/benefits-stock/4.jpg",
    frameType: "vertical",
  },
  {
    id: 5,
    title: "Develop 21st century skills & knowledge",
    description: `While jobs & roles change, the skills needed to succeed remain the same. Our offerings help children gain confidence & excel by developing their critical & analytical thinking and problem-solving skills.`,
    img: "https://imgcdn.upsurge.in/images/landing/benefits-stock/5.jpg",
    frameType: "horizontal",
  },
];

const COLORS = [
  { id: 1, bg: "#4066eb", shadowClr: "#bac3e4" },
  { id: 2, bg: "#fdcc03", shadowClr: "#FFF3C3" },
  { id: 3, bg: "#ff6263", shadowClr: "#f7baba" },
  { id: 4, bg: "#17d1bc", shadowClr: "#95e0d8" },
  { id: 5, bg: "#333333", shadowClr: "#9e9e9e" },
];

function Benefits() {
  const [current, setCurrent] = useState(0);
  const [currentImageData, setCurrentImageData] = useState(0);
  const [changeImage, setChangeImage] = useState(false);

  return (
    <div className={styles.content}>
      <div className={styles.left}>
        <div className={styles.heading}>Why upsurge?</div>
        <div className={styles.collapseables}>
          <div className={styles.line} />
          <div className={styles.benefits}>
            {DATA.map((item) => {
              return (
                <div
                  className={styles.benefit}
                  style={item.id === DATA.length ? { marginBottom: 0 } : {}}
                  key={item.id}
                  onClick={() => {
                    setChangeImage(true);
                    setCurrent(item.id - 1);
                    setTimeout(() => {
                      setChangeImage(false);
                      setCurrentImageData(item.id - 1);
                    }, 1000);
                  }}
                >
                  <div
                    className={
                      item.id === current + 1
                        ? styles.activeCircle
                        : styles.circle
                    }
                    style={
                      item.id === current + 1
                        ? {
                            backgroundColor: COLORS[item.id - 1].bg,
                            boxShadow: `0 0 2px 5px ${
                              COLORS[item.id - 1].shadowClr
                            }`,
                          }
                        : {}
                    }
                  />
                  <div className={styles.title}>{item.title}</div>
                  <div
                    className={
                      item.id === current + 1
                        ? styles.openDrawer
                        : styles.closeDrawer
                    }
                  >
                    <div className={styles.description}>{item.description}</div>
                    <div className={styles.action}>
                      Learn More <ArrowRightAltIcon />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div
          className={changeImage ? styles.fadeOutImage : styles.fadeInImage}
          key={DATA[currentImageData].id}
        >
          <ImageDisplay
            src={DATA[currentImageData].img}
            alt={DATA[currentImageData].title}
            frameType={DATA[currentImageData].frameType}
          />
        </div>
      </div>
    </div>
  );
}

export default Benefits;
