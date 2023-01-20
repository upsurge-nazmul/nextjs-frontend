import React from "react";
import styles from "../../../styles/Products/questsections.module.scss";

const SmarterMoneySection = () => {
  const data = [
    {
      content: "Make your child\u0027s screen time meaningful & developmental.",
      img: "/images/quest/quest_01.png",
    },
    {
      content: "Become good with money, eventually money-smart.",
      img: "/images/quest/quest_02.png",
    },
    {
      content: "Inspire the next-gen to start businesses",
      img: "/images/quest/quest_03.png",
    },
    {
      content: "Learn Life skills for the Twenty-First Century.",
      img: "/images/quest/quest_04.png",
    },
  ];
  return (
    <div className={styles.container}>
      <h2>Get Smarter About Money</h2>
      <br /><br />
      <div className={styles.cardWrap}>
        {data.map((item, index) => (
          <div key={index} className={styles.card}>
            <img src={item?.img} alt="" className="" />
            <p>{item?.content}</p>
          </div>
        ))}
      </div>
      <button className={styles.button}>Claim your FREE access now</button>
    </div>
  );
};

export default SmarterMoneySection;
