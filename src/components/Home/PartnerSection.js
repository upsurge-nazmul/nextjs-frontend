import React from "react";
import styles from "../../styles/Home/partner.module.scss";
import PlayCircleSvg from "../SVGcomponents/PlayCircleSvg";
import { useRouter } from "next/dist/client/router";
export default function PartnerSection({ dashboard }) {
  const rewards = [
    "https://res.cloudinary.com/dyyjph6kx/image/upload/fl_lossy,f_auto,q_auto,w_auto/gift_vouchers/phpyswS28_w9hfz7.jpg",
    "https://res.cloudinary.com/dyyjph6kx/image/upload/fl_lossy,f_auto,q_auto,w_auto/gift_vouchers/phpyYVFl1_lisbnd.png",
    "https://res.cloudinary.com/dyyjph6kx/image/upload/fl_lossy,f_auto,q_auto,w_auto/gift_vouchers/phpgzwRG4_mwhnz0.png",
  ];
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
    <div className={`${dashboard ? styles.dashboard : styles.partner}`}>
      <div
        className={`${styles.heading} ${dashboard && styles.hidecursor}`}
        onClick={() => {
          if (dashboard) {
            return;
          }
          router.push("/benefits/rewards");
        }}
      >
        Our UniCoin Reward Partners
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
              alt=""
            />
          );
        })}
      </div>
    </div>
  );
}
