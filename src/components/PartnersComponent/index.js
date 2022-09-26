import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "../../styles/Partner/partner.module.scss";
import PartnerCard from "./PartnerCard";

const rewards = [
  "https://imgcdn.upsurge.in/images/partners/phpKqn4rb_wjxfwd.webp",
  "https://imgcdn.upsurge.in/images/partners/phpyswS28_w9hfz7.webp",
  "https://imgcdn.upsurge.in/images/partners/phpyYVFl1_lisbnd.webp",
  "https://imgcdn.upsurge.in/images/partners/phpgzwRG4_mwhnz0.webp",
  "https://imgcdn.upsurge.in/images/partners/phpNsJMuh_s3ah3y.png",
  "https://imgcdn.upsurge.in/images/partners/php7Z2XTZ_kfbtfw.png",
  "https://imgcdn.upsurge.in/images/bharatpe-1008905-1626341577.png",
  "https://imgcdn.upsurge.in/images/Phone-Pe-Logo-wine.png",
  "https://imgcdn.upsurge.in/images/Cred-logo-0709211000.png",
  "https://imgcdn.upsurge.in/images/logo.png",
  "https://imgcdn.upsurge.in/images/Paytm-Logo-wine.png",
  "https://imgcdn.upsurge.in/images/Cred-logo-0709211000.png",
  "https://imgcdn.upsurge.in/images/logo.png",
  "https://imgcdn.upsurge.in/images/Paytm-Logo-wine.png",
  "https://imgcdn.upsurge.in/images/bharatpe-1008905-1626341577.png",
  "https://imgcdn.upsurge.in/images/Phone-Pe-Logo-wine.png",
  "https://imgcdn.upsurge.in/images/Cred-logo-0709211000.png",
  "https://imgcdn.upsurge.in/images/logo.png",
  "https://imgcdn.upsurge.in/images/Paytm-Logo-wine.png",
  "https://imgcdn.upsurge.in/images/Cred-logo-0709211000.png",
  "https://imgcdn.upsurge.in/images/logo.png",
  "https://imgcdn.upsurge.in/images/Paytm-Logo-wine.png",
  "https://imgcdn.upsurge.in/images/bharatpe-1008905-1626341577.png",
  "https://imgcdn.upsurge.in/images/Phone-Pe-Logo-wine.png",
  "https://imgcdn.upsurge.in/images/Cred-logo-0709211000.png",
  "https://imgcdn.upsurge.in/images/logo.png",
  "https://imgcdn.upsurge.in/images/Paytm-Logo-wine.png",
  "https://imgcdn.upsurge.in/images/Cred-logo-0709211000.png",
  "https://imgcdn.upsurge.in/images/logo.png",
  "https://imgcdn.upsurge.in/images/Paytm-Logo-wine.png",
];

export default function PartnersComponent() {
  const partnersRef = useRef();
  const [maxContent, setMaxContent] = useState(8);

  return (
    <div className={styles.partnerPage}>
      <div className={styles.partnerCards} ref={partnersRef}>
        {rewards.slice(0, maxContent).map((item, i) => {
          return <PartnerCard data={item} key={i} />;
        })}
        {rewards.length > maxContent ? (
          <PartnerCard
            seeMoreCard
            seeMoreClick={() => setMaxContent((prev) => Number(prev) + 3)}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
