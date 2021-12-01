import { Router, useRouter } from "next/dist/client/router";
import React from "react";
import styles from "../../styles/Dashboard/unicoinSummary.module.css";
import Fb from "..//SVGcomponents/Fb";
import Insta from "../SVGcomponents/Insta";
import LinkedIN from "../SVGcomponents/LinkedInSvg";

const UnicoinsSummary =({unicoins}) => {
    return (
    <div className={styles.cover}>
        <p className={styles.heading}>{unicoins}</p>
            <div className={styles.restBlock}>
            <p className={styles.restName}>Earned Unicoins</p>
            
        </div>
        
        {/* <div className={styles.green}></div>
        <div className={styles.white}></div>
        <div className={styles.ball4}></div>
        <div className={styles.yellow}></div> */}
    </div>
    );
}

export default UnicoinsSummary;