import React, { useContext } from "react";
import styles from "../../styles/Home/partner.module.scss";
import PlayCircleSvg from "../SVGcomponents/PlayCircleSvg";
import { useRouter } from "next/dist/client/router";
import { MainContext } from "../../context/Main";
import TryUpsurge from "./TryUpsurge";
export default function PartnerSection({ dashboard, nomargin,setshowauth,setauthmode }) {
  const rewards = [
    "https://imgcdn.upsurge.in/images/partners/phpKqn4rb_wjxfwd.webp",
    "https://imgcdn.upsurge.in/images/partners/phpyswS28_w9hfz7.webp",
    "https://imgcdn.upsurge.in/images/partners/phpyYVFl1_lisbnd.webp",
    "https://imgcdn.upsurge.in/images/partners/phpgzwRG4_mwhnz0.webp",
    "https://imgcdn.upsurge.in/images/partners/phpNsJMuh_s3ah3y.png",
    "https://imgcdn.upsurge.in/images/partners/php7Z2XTZ_kfbtfw.png",
  ];
  const { theme } = useContext(MainContext);
  const router = useRouter();
  function handlemove(direction) {
    let partnerwrapper = document.getElementById("partnerwrapper");
    if (direction === "right") {
      partnerwrapper.scrollLeft += 300;
    } else {
      partnerwrapper.scrollLeft -= 300;
    }
  }
  return (
    <div className={styles.partnerSection}>
      <div
        className={`${dashboard ? styles.dashboard : styles.partner} ${
          theme === "dark" && styles.darkpartner
        }`}
        style={nomargin ? { margin: 0 } : {}}
        id="partner-section"
      >
        <div className={styles.headingContainer}>
        <div
          className={`${styles.heading} ${dashboard && styles.hidecursor}`}
          onClick={() => {
            if (dashboard) {
              return;
            }
            router.push("/benefits/rewards");
          }}
          >
          Not over yet! You get to earn rewards everyday 
        </div>
        <div
          className={`${styles.subheading} ${dashboard && styles.hidecursor}`}
          >
          {dashboard
            ? "Collect as many UniCoins and redeem them for special gifts and deals with our partner brands."
            : `Earn Unicoins and redeem them for coupons of your favourite brands`}
        </div>
        <TryUpsurge
        content={"Try Upsurge Free"}
        setauthmode={setauthmode}
        setshowauth={setshowauth}
        inSection={true}
      />
            </div>
        <div
          className={`${styles.wrapper} ${dashboard && styles.hidecursor}`}
          id="partnerwrapper"
        >
          <div className={styles.imageswrapper}>
            <div className={styles.imagewrapper1}>

          {rewards.map((item, index) => {
            return (
              <div key={"partner" + index} className={styles.images1}>
              <img
                onClick={() => {
                  if (dashboard) {
                    return;
                  }
                  router.push("/benefits/rewards");
                }}
                key={"partner" + index}
                className={`${styles.img} ${dashboard && styles.hidecursor}`}
                src={item}
                alt="Reward partner"
                loading="lazy"
                />
              </div>
            );
          })}
            </div>
                <div className={styles.imagewrapper2}>
          {rewards.map((item, index) => {
            return (
              <div key={"partner" + index} className={styles.images1}>
              <img
                onClick={() => {
                  if (dashboard) {
                    return;
                  }
                  router.push("/benefits/rewards");
                }}
                key={"partner" + index}
                className={`${styles.img} ${dashboard && styles.hidecursor}`}
                src={item}
                alt="Reward partner"
                loading="lazy"
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
