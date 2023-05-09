import React, { useState, useEffect } from "react";
import styles from "../../styles/Dashboard/unicoinsEarned.module.scss";
import UniCoinSvg from "../SVGcomponents/UniCoinSvg";

function UnicoinsEarned({
  setUnicoinsEarnedPopUp,
  setUpdateUnicoinsAnimation,
  unicoins,
}) {
  return (
    <div className={styles.unicoinsEarned}>
      <div
        className={styles.background}
        onClick={() => {
          setUpdateUnicoinsAnimation(true);
          setUnicoinsEarnedPopUp(false);
        }}
      ></div>
      <div className={styles.block}>
        <div className={styles.heading}>YAY!!!</div>
        <div className={styles.unicoins}>
          <UniCoinSvg className={styles.svg} /> {unicoins} Unicoins Earned
        </div>
        <div
          className={styles.button}
          onClick={() => {
            setUpdateUnicoinsAnimation(true);
            setUnicoinsEarnedPopUp(false);
          }}
        >
          Collect
        </div>
        <img className={styles.confetti} src="/confetti.png" alt="Coin" />
        <img className={styles.coinImage} src="/coinImage.png" alt="Coin" />
      </div>
    </div>
  );
}

export default UnicoinsEarned;
