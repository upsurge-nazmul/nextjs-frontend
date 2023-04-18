import React from "react";
import styles from "../styles/GeneralComponents/unicoinsAwards.module.scss";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import UniCoinSvg from "./SVGcomponents/UniCoinSvg";
import LoginApis from "../actions/apis/LoginApis";
function UnicoinsAwards({
  unicoins = 3000,
  setShowUnicoinsAwards,
  setshowauth,
  setauthmode,
  setUnicoinsRewards,
  unicoinsRewards,
  source,
}) {
  console.log(`source`,source);
  async function signup(e) {
    e?.preventDefault();
    setshowauth(true);
    setauthmode("parentChild");
    setShowUnicoinsAwards(false);
  }
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
  console.log("Showing");
  return (
    <div className={styles.trendingGames}>
      <div className={styles.background}></div>
      <div className={`${styles.block} ${styles.blockLarger}`}>
        <div
          className={styles.cross}
          onClick={() => {
            setShowUnicoinsAwards(false);
          }}
        >
          <CancelOutlinedIcon className={styles.icon} />
        </div>
        <div className={styles.flexBox}>
          <div>
            <h2 style={{ display: "flex" }}>
              <UniCoinSvg className={styles.unicoin} clr="purple" />
              {unicoins} Unicoins Awarded!
            </h2>
            <p className={styles.redeemParagraph}>
              Redeem now for exciting rewards from your favourite brands
            </p>
            <button
              onClick={() => {
                signup();
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

export default UnicoinsAwards;
