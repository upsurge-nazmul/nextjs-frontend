import { useEffect, useState } from "react";
import UniCoinSvg from "../../components/SVGcomponents/UniCoinSvg";
import PlayStoreSvg from "../../components/SVGcomponents/PlayStoreSvg";
import styles from "../../styles/Dashboard/AppDownload.module.scss";
import CircularProgress from "@mui/material/CircularProgress";

const AppDownload = () => {
  
  return (
    <div className={styles.todaysQn}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerText}>{`Download our app now`}</div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.unicoinChip}>
            <UniCoinSvg className={styles.unicoinIcon} />
            <div className={styles.unicoins}>
              {/* {unicoins
                ? parseInt(unicoins) > 1000
                  ? `${parseFloat(unicoins / 1000)}k`
                  : unicoins
                : 0} */}
                +5000
            </div>
          </div>
        </div>
      </div>
      
        <div className={styles.questionContainer}>

            <div className={styles.question}>

            <a href="" target="_blank" rel="noreferrer" className={styles.button}>
                      <PlayStoreSvg />
                      Get it on Google Play
              </a>
            </div>
            
             
          
        </div>
      
    </div>
  );
};

export default AppDownload;
