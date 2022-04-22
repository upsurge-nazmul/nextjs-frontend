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
      null,
      getCookie("accesstoken")
    );
    setshow(false);
  }
  return (
    <div className={styles.welcomemodal}>
      <div className={styles.background} onClick={handleclick}></div>
      <div className={styles.main}>
        <div className={styles.cross} onClick={() => setshow(false)}>
          <CancelOutlinedIcon className={styles.icon} />
        </div>
        <Curve1 className={styles.curve1} />
        <Curve2 className={styles.curve2} />
        <div className={styles.leftpart}>
          <div className={styles.text}>
            <BottomArrowBubble className={styles.bottomarrow} />
            <p className={styles.heading}>{`Hi ${name}, wassup !`}</p>
            <p className={styles.subheading}>
              {`Since I am a Unicorn (no, not the billion $$ kind) and so it only
            makes sense that I am the resident money expert here at upsurge. I
            will be your mentor throughout the platform, where children will get
            to understand money, investing, and entrepreneurship like never
            before.`}
            </p>
            <p className={styles.subheading}>
              {`They can go on knowledge quests, play one of the many games
            in the Arena, or earn UniCoins by completing chores. They can then
            redeem the UniCoins they've earned for real prizes from brands they
            (and you) love!`}
            </p>
          </div>
        </div>
        <Jasper className={styles.jasper} />
      </div>
    </div>
  );
}
