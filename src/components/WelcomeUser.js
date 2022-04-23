import React from "react";
import DashboardApis from "../actions/apis/DashboardApis";
import { getCookie } from "../actions/cookieUtils";
import styles from "../styles/GeneralComponents/welcome.module.scss";
import BottomArrowBubble from "./SVGcomponents/BottomArrowBubble";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Curve1 from "./SVGcomponents/Curve1";
import Curve2 from "./SVGcomponents/Curve2";
import Jasper from "./SVGcomponents/Jasper";
export default function WelcomeUser({ name, setshow }) {
  async function handleclick() {
    let res = await DashboardApis.markwelcomecomplete(
      {},
      getCookie("accesstoken")
    );
    setshow(false);
  }
  return (
    <div className={styles.welcomemodal}>
      <div className={styles.background} onClick={handleclick}></div>
      <div className={styles.main}>
        <div className={styles.cross} onClick={handleclick}>
          <CancelOutlinedIcon className={styles.icon} />
        </div>
        <Curve1 className={styles.curve1} />
        <Curve2 className={styles.curve2} />
        <div className={styles.leftpart}>
          <div className={styles.text}>
            <BottomArrowBubble className={styles.bottomarrow} />
            <p className={styles.heading}>{`Hi ${name}`}</p>
            <p className={styles.subheading}>{`Welcome to upsurge!`}</p>
            <p className={styles.subheading}>
              {`I am Jasper, the resident unicorn and I will be your guide throughout upsurge! 
Thank you for signing up for our Early Access Program. Here you will get a taste of what we have in store for your and your children, and there are prizes to be won!
`}
            </p>
            <p className={styles.subheading}>
              {`Complete the games, activities, quizzes & tasks, and earn UniCoins - our platform currency. Those with the most UniCoins at the end will get free access to our platform & many other exciting prizes! 
`}
            </p>
            <p className={styles.subheading}>
              {`You can click on milestones to get started and track your progress. 
Hope you have a rewarding time at upsurge! 
`}
            </p>
          </div>
        </div>
        <Jasper className={styles.jasper} />
      </div>
    </div>
  );
}
