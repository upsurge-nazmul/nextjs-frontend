import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "../../styles/Partner/partner.module.scss";
import PartnerCard from "./PartnerCard";

const PARTNERS = [
  {
    sl: 1,
    name: "",
    banner: "https://imgcdn.upsurge.in/images/partners/phpKqn4rb_wjxfwd.webp",
    badge: "New",
    claim: true,
  },
  {
    sl: 2,
    name: "",
    banner: "https://imgcdn.upsurge.in/images/partners/phpyswS28_w9hfz7.webp",
    badge: "",
    claim: true,
  },
  {
    sl: 3,
    name: "",
    banner: "https://imgcdn.upsurge.in/images/partners/phpyYVFl1_lisbnd.webp",
    badge: "",
  },
  {
    sl: 4,
    name: "",
    banner: "https://imgcdn.upsurge.in/images/partners/phpgzwRG4_mwhnz0.webp",
    badge: "New",
  },
  {
    sl: 5,
    name: "",
    banner: "https://imgcdn.upsurge.in/images/partners/phpNsJMuh_s3ah3y.png",
    badge: "",
  },
  {
    sl: 6,
    name: "",
    banner: "https://imgcdn.upsurge.in/images/partners/php7Z2XTZ_kfbtfw.png",
    badge: "New",
  },
];

export default function PartnersComponent() {
  const partnersRef = useRef();
  const [maxContent, setMaxContent] = useState(8);

  return (
    <div className={styles.partnerPage}>
      <div className={styles.partnerCards} ref={partnersRef}>
        {PARTNERS.slice(0, maxContent).map((item, i) => {
          return <PartnerCard data={item} key={i} />;
        })}
        {PARTNERS.length > maxContent ? (
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
