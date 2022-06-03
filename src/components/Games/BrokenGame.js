import { useRouter } from "next/router";
import React from "react";
import styles from "../../styles/Games/brokengame.module.scss";
import BrokenGameConroller from "../SVGcomponents/BrokenGameConroller";
export default function BrokenGame({ goBackTo }) {
  const router = useRouter();
  return (
    <div className={styles.mobileerr}>
      <div className={styles.box}>
        <BrokenGameConroller className={styles.jasper} />
        <p className={styles.heading}>Oh no!</p>
        <p>
          {`This game is not yet available for phones & tablets. Please use
                a laptop or PC to play it.`}
        </p>
        <div
          className={styles.button}
          onClick={() => router.push(goBackTo || "/")}
        >
          Go back
        </div>
      </div>
    </div>
  );
}
