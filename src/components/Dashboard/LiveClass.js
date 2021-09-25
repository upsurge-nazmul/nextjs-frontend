import { useRouter } from "next/dist/client/router";
import React from "react";
import styles from "../../styles/Dashboard/liveclass.module.scss";

function LiveClass({ data, index }) {
  const router = useRouter();
  return (
    <div className={styles.liveClass}>
      <img
        src={data.image}
        alt=""
        onClick={() => router.push("/class/" + index)}
      />
      <div className={styles.classContent}>
        <p
          className={styles.title}
          onClick={() => router.push("/class/" + index)}
        >
          {data.title}
        </p>
        <p className={styles.date}>{data.age}</p>
        <p className={styles.assign}>
          {index === 0 ? "Assigned" : `Assign Course ->`}
        </p>
      </div>
    </div>
  );
}

export default LiveClass;
