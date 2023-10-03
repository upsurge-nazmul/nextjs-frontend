import React from "react";
import styles from "../../styles/DownloadGames/AvailableGames.module.scss";
import { Download_Games_Data } from "../../../src/static_data/Game_Data";
import DownloadIcon from "@mui/icons-material/Download";
import HeadingArrow from "../SVGcomponents/HeadingArrow";
import { useRouter } from "next/router";

const AvailableGames = () => {
  const router = useRouter();

  const downloadFile = (url, fileName) => {
    fetch(url, {
      method: "get",
      mode: "no-cors",
      referrerPolicy: "no-referrer",
    })
      .then((res) => res.blob())
      .then((res) => {
        const aElement = document.createElement("a");
        aElement.setAttribute("download", fileName);
        const href = URL.createObjectURL(res);
        aElement.href = href;
        aElement.setAttribute("target", "_blank");
        aElement.click();
        URL.revokeObjectURL(href);
      });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Flagship Games <HeadingArrow /></h2>
      <div className={styles.gamelistwrapper}>
        {Object.keys(Download_Games_Data).map((item, index) => {
          return (
            <div
              key={"game" + index}
              className={styles.gameCard}
            // onClick={() => router.push(`/games/${item}`)}
            >
              <div className={styles.flexleft}>
                <img src={Download_Games_Data[item].logo} alt="" />
                <div>
                  {/* <span className={styles.subheading}>Download Options</span> */}

                  <div className={styles.btnContainer}>
                    <a href={Download_Games_Data[item].playstore} target="_blank" rel="noreferrer">
                      <img
                        className={styles.badge}
                        src="/images/DownloadGames/playstore.png"
                        alt="PlayStore"
                      />
                    </a>

                  </div>
                  <div className={styles.btnContainer}>
                    <a href={Download_Games_Data[item].apple} target="_blank" rel="noreferrer">
                      <img
                        className={styles.badge}
                        src="/images/DownloadGames/apple.png"
                        alt="Apple store"
                      />
                    </a>

                  </div>
                  
                </div>
              </div>
              <div className={styles.flexright}>
                <p className={styles.title}>{Download_Games_Data[item].name}</p>
                <p className={styles.detail}>
                  {Download_Games_Data[item].description}
                </p>

              </div>







              {/* <a href={Download_Games_Data[item].microsoft} target="_blank" rel="noreferrer">
                  <img
                    className={styles.badge}
                    src="/images/DownloadGames/ms_1.png"
                    alt="MicroSoft"
                  />
                </a> */}
              {/* <div className={styles.btnContainer}>
                <button onClick={() => downloadFile(Download_Games_Data[item].android_link, Download_Games_Data[item].name)} >
                  Download APK
                </button>
                <button onClick={() => downloadFile(Download_Games_Data[item].windows_link)}>
                  Download EXE
                </button>
              </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AvailableGames;
