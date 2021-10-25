import React from "react";
import styles from "../../styles/Home/partner.module.scss";
import Marquee from "react-fast-marquee";
export default function PartnerSection() {
  const partners = [
    "https://1000logos.net/wp-content/uploads/2021/06/Zomato-logo.png",
    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    "https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png",
    "https://cdn.thewire.in/wp-content/uploads/2021/01/31155736/Myntra_logo.png",
    "https://getlogovector.com/wp-content/uploads/2020/11/byjus-logo-vector.png",
  ];
  return (
    <div className={styles.partner}>
      <div className={styles.heading}>Our UniCoin Rewards Partners</div>
      <div className={styles.subheading}>
        Collect UniCoin and redeem them for special gifts and deals with our
        partner brands.
      </div>
      <div className={styles.wrapper}>
        <Marquee gradientWidth={100} gradientColor={[65, 102, 235]}>
          {partners.map((item) => {
            return <img className={styles.img} src={item} />;
          })}
        </Marquee>
      </div>
    </div>
  );
}
