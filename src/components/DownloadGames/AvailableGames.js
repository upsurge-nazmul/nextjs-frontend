import React from "react";
import styles from "../../styles/DownloadGames/AvailableGames.module.scss";
import { Download_Games_Data } from "../../../src/static_data/Game_Data";
import DownloadIcon from "@mui/icons-material/Download";
import { useRouter } from "next/router";

const AvailableGames = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Available Games for Download</h2>
      <div className={styles.gamelistwrapper}>
        {Object.keys(Download_Games_Data).map((item, index) => {
          return (
            <div
              key={"game" + index}
              className={styles.gameCard}
              // onClick={() => router.push(`/games/${item}`)}
            >
              <img src={Download_Games_Data[item].logo} alt="" />
              <p className={styles.title}>{Download_Games_Data[item].name}</p>
              <p className={styles.detail}>
                {Download_Games_Data[item].description}
              </p>
              {/* <p
                  className={styles.activebutton}
                  onClick={() => handleclick(item)}
                >
                  Play
                </p> */}

              {/* {comingsoongames.includes(item) ? (
                  <p className={styles.button}>Coming Soon....</p>
                ) : (
                  <p
                    className={styles.activebutton}
                    onClick={() => {
                      router.push("/games/" + item);
                    }}
                  >
                    Play
                  </p>
                )} */}
              <button
                onClick={() => router.push(`/games/download/${item}`)}
                className={styles.activebutton}
              >
                Download <DownloadIcon fontSize="small" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AvailableGames;
