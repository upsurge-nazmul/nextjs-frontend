import { useState } from "react";
import styles from "../../styles/Partner/partnerCardOnClick.module.scss";

export default function PartnerCard({
  data,
  seeMoreCard = false,
  seeMoreClick = () => {},
}) {
  const [flip, setFlip] = useState(false);

  return (
    <>
      {!flip ? (
        <div
          className={styles.partnerCardFront}
          style={{ backgroundColor: data ? data.color : "transparent" }}
          onClick={() => setFlip((prev) => !prev)}
        >
          {seeMoreCard ? (
            <div className={styles.seeMore} onClick={seeMoreClick}>
              See more...{" "}
            </div>
          ) : (
            <div className={styles.frontFace}>
              <img
                className={styles.banner}
                src={
                  require(`../../assets/partners/${data.banner}.svg`).default
                    .src
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
          )}
        </div>
      ) : (
        <div
          className={styles.partnerCardBack}
          style={{ backgroundColor: data ? data.color : "transparent" }}
          onClick={() => setFlip((prev) => !prev)}
        >
          <div className={styles.backFace}>
            <div className={styles.bannerArea}>
              <img
                className={styles.smallBanner}
                src={
                  require(`../../assets/partners/${data.banner}.svg`).default
                    .src
                }
                alt={data.name}
                loading="lazy"
              />
            </div>
            <div className={styles.cardBody}>
              <div className={styles.details}>
                {data.details ? data.details : ""}
              </div>
              <div className={styles.terms}>
                {data.details ? "Terms and Conditions apply." : ""}
              </div>
              <div className={styles.claimArea}>
                <button className={styles.claimButton}>CLAIM NOW</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
