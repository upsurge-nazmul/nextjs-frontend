import React from "react";
import styles from "../../styles/MoneyAce/coursejobcard.module.scss";

export default function CourseJobCard({
  data,
  isActive,
  isCompleted,
  handleClick,
  settoastdata,
  type,
}) {
  const images = {
    stamina: "https://i.ibb.co/8XPn9kg/energy.png",
    morale: "https://i.ibb.co/G0nJ3Pn/morality.png",
    salary: "https://i.ibb.co/4ZKjFgG/salary.png",
    cost: "https://i.ibb.co/4ZKjFgG/salary.png",
  };
  return (
    <div
      className={`${styles.card} ${
        !isActive && !isCompleted && styles.inactive
      }`}
    >
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
        <div
          className={styles.btn}
          onClick={() => {
            if (isCompleted) return;
            if (!isActive) {
              return settoastdata({
                show: true,
                type: "error",
                msg: (type ? type : "Job") + " is not active",
              });
            }
            handleClick(data.id);
          }}
        >
          <div className={styles.btnInside}>
            {isCompleted ? "Completed" : `START`}
          </div>
        </div>
      </div>
    </div>
  );
}
