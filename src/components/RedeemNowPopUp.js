import React from "react";
import styles from "../styles/GeneralComponents/redeemNow.module.scss";
import UniCoinSvg from "./SVGcomponents/UniCoinSvg";
import { useRouter } from "next/dist/client/router";
import DashboardApis from "../actions/apis/DashboardApis";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
function RedeemNowPopUp({ 
  unicoins,
  setShowRedeemNow,
  reached_5k,
  reached_10k,
}) {
  const router = useRouter();
  const rewards = [
    "https://imgcdn.upsurge.in/images/partners/phpKqn4rb_wjxfwd.webp",
    "https://imgcdn.upsurge.in/images/partners/phpyswS28_w9hfz7.webp",
    "https://imgcdn.upsurge.in/images/partners/phpyYVFl1_lisbnd.webp",
    "https://imgcdn.upsurge.in/images/partners/phpgzwRG4_mwhnz0.webp",
    "https://imgcdn.upsurge.in/images/partners/phpNsJMuh_s3ah3y.png",
    "https://imgcdn.upsurge.in/images/partners/php7Z2XTZ_kfbtfw.png",
  ];
  const rewards1 = [
    "https://imgcdn.upsurge.in/images/partners/phpNsJMuh_s3ah3y.png",
    "https://imgcdn.upsurge.in/images/partners/phpyYVFl1_lisbnd.webp",
    "https://imgcdn.upsurge.in/images/partners/php7Z2XTZ_kfbtfw.png",
    "https://imgcdn.upsurge.in/images/partners/phpyswS28_w9hfz7.webp",
    "https://imgcdn.upsurge.in/images/partners/phpKqn4rb_wjxfwd.webp",
    "https://imgcdn.upsurge.in/images/partners/phpgzwRG4_mwhnz0.webp",
  ];
  return (
    <div className={styles.redeemNow}>
      <div
        className={styles.background}
        onClick={async () => {
          if(unicoins>=10000 && reached_5k == false){
            await DashboardApis.updateUserJourneyData({ shown: true, reached_5k: true });
          }
          await DashboardApis.updateUserJourneyData({ shown: true });
          setShowRedeemNow(false);
        }}
      ></div>
      <div className={`${styles.block} ${styles.blockLarger}`}>
        <div
          className={styles.cross}
          onClick={async () => {
            if(unicoins>=10000 && reached_5k == false){
              await DashboardApis.updateUserJourneyData({ shown: true, reached_5k: true });
            }
            await DashboardApis.updateUserJourneyData({ shown: true });
            setShowRedeemNow(false);
          }}
        >
          <CancelOutlinedIcon className={styles.icon} />
        </div>
        <div className={styles.flexBox}>
          <div className={styles.flexChild1}>
            <h2 className={styles.heading} style={{ display: "flex" }}>
              <UniCoinSvg className={styles.unicoin} clr="black" />
              {unicoins} Unicoins Earned!
            </h2>
            <h4>Congratulations!</h4>
            <p className={styles.redeemParagraph}>
              You have worked really well to make this possible. Go ahead and
              treat yourself with some amazing vouchers!
            </p>
            <button
              onClick={async () => {
                if(unicoins>=10000 && reached_5k == false){
                  await DashboardApis.updateUserJourneyData({ shown: true, reached_5k: true });
                }
                await DashboardApis.updateUserJourneyData({ shown: true });
                setShowRedeemNow(false);
                router.push("/dashboard/k/store");
              }}
              className={styles.playButton}
            >
              Redeem Now
            </button>
          </div>
          <div className={styles.imagesFlexBox}>
            <div className={styles.rewards}>
              {rewards.map((item) => {
                return (
                  <div className={styles.rewardImages}>
                    <img
                      className={styles.rewardImages}
                      src={item}
                      alt="item"
                    />
                  </div>
                );
              })}
            </div>
            <div className={styles.rewards1}>
              {rewards1.map((item) => {
                return (
                  <div className={styles.rewardImages1}>
                    <img
                      className={styles.rewardImages1}
                      src={item}
                      alt="item"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RedeemNowPopUp;
