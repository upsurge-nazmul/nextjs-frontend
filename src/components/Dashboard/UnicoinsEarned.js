import React, { useState, useEffect, useContext } from "react";
import styles from "../../styles/Dashboard/unicoinsEarned.module.scss";
import UniCoinSvg from "../SVGcomponents/UniCoinSvg";
import { MainContext } from "../../context/Main";

function UnicoinsEarned() {
  const { setUnicoinsEarnedPopUp, unicoins, setUnicoins, setTotalUnicoins } =
    useContext(MainContext);

  return (
    <div className={styles.unicoinsEarned}>
      <div
        className={styles.background}
        onClick={() => {
          setTotalUnicoins((prev) => prev + unicoins);
          setUnicoinsEarnedPopUp(false);
          setUnicoins(0);
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
            setTotalUnicoins((prev) => prev + unicoins);
            setUnicoinsEarnedPopUp(false);
            setUnicoins(0);
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
