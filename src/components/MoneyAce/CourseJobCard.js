import React from "react";
import styles from "../../styles/MoneyAce/coursejobcard.module.scss";

export default function CourseJobCard({ data, isActive }) {
  const images = {
    stamina: "https://i.ibb.co/8XPn9kg/energy.png",
    morale: "https://i.ibb.co/G0nJ3Pn/morality.png",
    salary: "https://i.ibb.co/4ZKjFgG/salary.png",
    cost: "https://i.ibb.co/4ZKjFgG/salary.png",
  };
  return (
    <div className={`${styles.card} ${!isActive && styles.inactive}`}>
      <div className={styles.main}>
        <img className={styles.icon} src={data.image} alt="" />
        <p className={styles.title}>{data.name}</p>
        <p className={styles.description}>{data.description}</p>
        <div className={styles.benefits}>
          {Object.keys(data.benefits).map((item) => {
            return (
              <div className={styles.benefit} key={item}>
                <p className={styles.text}>{item}</p>
                <img src={images[item]} alt="" />
                <p className={styles.text}>{data.benefits[item]}</p>
              </div>
            );
          })}
        </div>
        <div className={styles.btn}>
          <div className={styles.btnInside}>START</div>
        </div>
      </div>
    </div>
  );
}
