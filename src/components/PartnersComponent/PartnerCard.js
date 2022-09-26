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
        <img
          onClick={() => {}}
          className={styles.banner}
          src={data}
          alt="Reward partner"
          loading="lazy"
        />
      )}
    </div>
  );
}
