import styles from "../../styles/Partner/partner.module.scss";

export default function PartnerCard({
  data,
  seeMoreCard = false,
  seeMoreClick = () => {},
}) {
  return (
    <div className={styles.partnerCard}>
      {seeMoreCard ? (
        <div className={styles.seeMore} onClick={seeMoreClick}>
          See more...{" "}
        </div>
      ) : (
        <>
          <img
            onClick={() => {}}
            className={styles.banner}
            src={data.banner}
            alt={data.name}
            loading="lazy"
          />
          <div className={styles.cardBody}>
            {data.badge && (
              <div className={styles.badgeArea}>
                <div className={styles.badge}>{data.badge}</div>
              </div>
            )}
            {data.claim && (
              <div className={styles.claimArea}>
                <button className={styles.claimButton}>CLAIM NOW</button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
