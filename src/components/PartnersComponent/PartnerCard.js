import styles from "../../styles/Partner/partnerCard.module.scss";
import { useRouter } from "next/dist/client/router";

export default function PartnerCard({
  data,
  seeMoreCard = false,
  seeMoreClick = () => {},
}) {
  const router = useRouter();
  return (
    <>
      {seeMoreCard ? (
        <div className={styles.seeMoreCard} onClick={seeMoreClick}>
          <div className={styles.seeMore}>See more... </div>
        </div>
      ) : (
        <div
          className={styles.partnerCard}
          style={{
            backgroundColor: data
              ? data.color
                ? data.color
                : "transparent"
              : "transparent",
          }}
        >
          <div className={`${styles.card__face} ${styles.card__face__front}`}>
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
          </div>
          <div className={`${styles.card__face} ${styles.card__face__back}`}>
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
                  <button
                    className={styles.claimButton}
                    onClick={
                      data.link
                        ? () => {
                            router.push(data.link);
                          }
                        : () => console.log("claim clicked")
                    }
                  >
                    CLAIM NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
