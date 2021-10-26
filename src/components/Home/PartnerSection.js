import React from "react";
import styles from "../../styles/Home/partner.module.scss";
import Marquee from "react-fast-marquee";
import PlayCircleSvg from "../SVGcomponents/PlayCircleSvg";
export default function PartnerSection() {
  const partners = [
    "https://1000logos.net/wp-content/uploads/2021/06/Zomato-logo.png",
    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    "https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png",
    "https://cdn.thewire.in/wp-content/uploads/2021/01/31155736/Myntra_logo.png",
    "https://getlogovector.com/wp-content/uploads/2020/11/byjus-logo-vector.png",
    "https://1000logos.net/wp-content/uploads/2021/06/Zomato-logo.png",
    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    "https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png",
    "https://cdn.thewire.in/wp-content/uploads/2021/01/31155736/Myntra_logo.png",
    "https://getlogovector.com/wp-content/uploads/2020/11/byjus-logo-vector.png",
  ];

  function handlemove(direction) {
    console.log(direction);
    let partnerwrapper = document.getElementById("partnerwrapper");
    if (direction === "right") {
      partnerwrapper.scrollLeft += 300;
    } else {
      partnerwrapper.scrollLeft -= 300;
    }
  }
  return (
    <div className={styles.partner}>
      <div className={styles.heading}>Our UniCoin Rewards Partners</div>
      <div className={styles.subheading}>
        Collect UniCoin and redeem them for special gifts and deals with our
        partner brands.
      </div>
      <PlayCircleSvg
        className={styles.leftarrow}
        onClick={() => handlemove("left")}
      />
      <PlayCircleSvg
        className={styles.rightarrow}
        onClick={() => handlemove("right")}
      />
      <div className={styles.wrapper} id="partnerwrapper">
        {partners.map((item, index) => {
          return (
            <img
              key={"partner" + index}
              className={styles.img}
              src={item}
              alt=""
            />
          );
        })}
      </div>
    </div>
  );
}
