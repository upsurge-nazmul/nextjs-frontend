import { useRouter } from "next/dist/client/router";
import React from "react";
import Image from "next/image";
import styles from "../../styles/Calculators/minicalc.module.scss";
export default function MiniCalcCard({ data, id }) {
  const router = useRouter();
  return (
    <div
      className={styles.calculator}
      onClick={() => router.push("/dashboard/p/calculator/" + id)}
    >
      <div className={styles.img}>
        <Image src={data.icon} layout="fill" objectFit="cover" />
      </div>
      <div className={styles.right}>
        {/* <div className={styles.categories}>
      {item.categories?.split(",").map((cat, index) => {
        return <p key={"morecat" + index}>{cat}</p>;
      })}
    </div> */}
        <div className={styles.title}>{data.heading}</div>
        <div className={styles.content}>
          {data.subheading.length > 250
            ? data.subheading.substring(0, 250) + "..."
            : data.subheading}
        </div>
      </div>
    </div>
  );
}
