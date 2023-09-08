import Image from "next/image";
import styles from "../../../styles/Products/questsections.module.scss";

const TravelSection = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        Travel the world with Kiara to learn about <br />
        evolution of money and currencies.
      </h2>
      <br />
      <div className={styles.bannerContainer}>
        <div className={styles.innerBanner}>
          <img
            src={"/images/quest/travel-section.png"}
            // alt="Travel"
            // layout="fill"
            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, (max-width: 900px) 300vw,33vw"
            className={styles.banner}
          />
        </div>
      </div>
      <button className={styles.button}>Explore More</button>
    </div>
  );
};

export default TravelSection;
