import { Router, useRouter } from "next/dist/client/router";
import React from "react";
import styles from "../../styles/cheatcodes/cheatcodecomponent.module.scss";
function CheatCodeComponent({ data, index }) {
  const router = useRouter();
  return (
    <div
      className={styles.cheatCodeComponent}
      onClick={() => router.push("/cheatcodes/" + index)}
    >
      <img src={data.img_url} alt="" />
      <div className={styles.textcontent}>
        <div className={styles.categories}>
          <p className={styles.category}>money</p>
          <p className={styles.category}>, investment</p>
        </div>
        <p className={styles.title}>{data.title}</p>
        <p className={styles.time}>August 01, 2021</p>
        <p className={styles.description}>
          If you are looking for ways to grow your money, you may consider
          putting it in mutual funds....
        </p>
      </div>
    </div>
  );
}

export default CheatCodeComponent;
