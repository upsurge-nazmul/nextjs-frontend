import React, { useContext } from "react";
import styles from "../../styles/Home/partner.module.scss";
import PlayCircleSvg from "../SVGcomponents/PlayCircleSvg";
import { useRouter } from "next/dist/client/router";
import { MainContext } from "../../context/Main";
export default function PartnerSection({ dashboard, nomargin }) {
  const rewards = [
    "https://res.cloudinary.com/dyyjph6kx/image/upload/fl_lossy,f_auto,q_auto,w_auto/gift_vouchers/phpKqn4rb_wjxfwd.jpg",
    "https://res.cloudinary.com/dyyjph6kx/image/upload/fl_lossy,f_auto,q_auto,w_auto/gift_vouchers/phpyswS28_w9hfz7.jpg",
    "https://res.cloudinary.com/dyyjph6kx/image/upload/fl_lossy,f_auto,q_auto,w_auto/gift_vouchers/phpyYVFl1_lisbnd.png",
    "https://res.cloudinary.com/dyyjph6kx/image/upload/fl_lossy,f_auto,q_auto,w_auto/gift_vouchers/phpgzwRG4_mwhnz0.png",
    "https://res.cloudinary.com/dyyjph6kx/image/upload/gift_vouchers/phpNsJMuh_s3ah3y.png",
    "https://res.cloudinary.com/dyyjph6kx/image/upload/gift_vouchers/php7Z2XTZ_kfbtfw.png",
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
        Our UniCoin reward partners
      </div>
      <div className={`${styles.subheading} ${dashboard && styles.hidecursor}`}>
        {dashboard
          ? "Collect as many UniCoins and redeem them for special gifts and deals with our partner brands in our product"
          : `Collect UniCoin and redeem them for special gifts and deals with our
        partner brands.`}
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
    </div>
  );
}
