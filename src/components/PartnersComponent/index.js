import { useRef } from "react";
import { useState } from "react";
import styles from "../../styles/Partner/partner.module.scss";
import PartnerCard from "./PartnerCard";
import { PARTNERS } from "../../static_data/Partners_Data";

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
