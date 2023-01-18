import React from "react";
import styles from "../../styles/DownloadGames/FeaturedGameBanner.module.scss";
import { Download_Games_Data } from "../../static_data/Game_Data";

const FeaturedGameBanner = () => {
  let allImages = [];
  Object.keys(Download_Games_Data).map((item, index) => {
    allImages.push(...Download_Games_Data[item].images);
  });
  return (
    <div className={styles.banner}>
      <div className={styles.slider}>
        <figure>
          {allImages.map((item, index) => (
            <img key={index} src={item} alt="" />
          ))}
        </figure>
      </div>
    </div>
  );
};

export default FeaturedGameBanner;
