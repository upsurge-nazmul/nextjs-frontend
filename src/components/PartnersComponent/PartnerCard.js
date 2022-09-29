import { useState } from "react";
import styles from "../../styles/Partner/partnerCard.module.scss";

export default function PartnerCard({
  data,
  seeMoreCard = false,
  seeMoreClick = () => {},
}) {
  const [flip, setFlip] = useState(false);

  return (
    <div
      className={styles.partnerCard}
      style={{ backgroundColor: data ? data.color : "transparent" }}
      onClick={() => setFlip((prev) => !prev)}
    >
      {seeMoreCard ? (
        <div className={styles.seeMore} onClick={seeMoreClick}>
          See more...{" "}
        </div>
      ) : !flip ? (
        <div className={styles.frontFace}>
          <img
            className={styles.banner}
            src={
              require(`../../assets/partners/${data.banner}.svg`).default.src
            }
            alt={data.name}
            loading="lazy"
          />
          <div className={styles.cardBody}>
            {data.badge && (
              <div className={styles.badgeArea}>
                <div className={styles.badge}>{data.badge}</div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.backFace}>
          <div className={styles.cardBody}>
            <div className={styles.claimArea}>
              <button className={styles.claimButton}>CLAIM NOW</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
