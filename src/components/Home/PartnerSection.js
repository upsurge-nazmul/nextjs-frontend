import React, { useContext } from "react";
import styles from "../../styles/Home/partner.module.scss";
import PlayCircleSvg from "../SVGcomponents/PlayCircleSvg";
import { useRouter } from "next/dist/client/router";
import { MainContext } from "../../context/Main";
export default function PartnerSection({ dashboard, nomargin }) {
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
            : `Earn Unicoins and redeem it against your favourite brands`}
        </div>
        <PlayCircleSvg
          className={styles.leftarrow}
          onClick={() => handlemove("left")}
        />
        <PlayCircleSvg
          className={styles.rightarrow}
          onClick={() => handlemove("right")}
        />
        <div
          className={`${styles.wrapper} ${dashboard && styles.hidecursor}`}
          id="partnerwrapper"
        >
          {rewards.map((item, index) => {
            return (
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
            );
          })}
        </div>
        <div className={styles.marqueeWrapper}>
          <div className={styles.marquee}>
            {rewards.map((item, index) => {
              return (
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
              );
            })}
          </div>
          <div className={styles.marquee}>
            {rewards.map((item, index) => {
              return (
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
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
