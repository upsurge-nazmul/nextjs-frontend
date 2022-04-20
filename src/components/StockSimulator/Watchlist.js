import { useState } from "react";
import styles from "../../styles/StockSimulator/watchlist.module.scss";
import AddWatchlist from "./AddWatchlist";

export default function Watchlist({ companyData }) {
  const [watchlistData, setWatchlistData] = useState(companyData.slice(0, 3));
  const [openList, setOpenList] = useState(false);
  const colors = [
    "aqua",
    "burlywood",
    "blueviolet",
    "cornflowerblue",
    "coral",
    "olivedrab",
  ];

  const handleClose = (value) => {
    setWatchlistData((prev) => prev.filter((item) => item.symbol !== value));
  };

  const handleAdd = () => {
    console.log("Add button clicked");
    setOpenList((prev) => !prev);
  };

  return (
    <div className={styles.watchlist}>
      {watchlistData && watchlistData.length
        ? watchlistData.map((item, i) => {
            // let rand = Math.floor(Math.random() * colors.length);
            return (
              <div className={styles.listItem} key={i}>
                <button
                  className={styles.closeButton}
                  onClick={() => handleClose(item.symbol)}
                >
                  x
                </button>
                <div
                  style={{
                    backgroundColor: colors[i],
                  }}
                  className={styles.colorCode}
                />
                <div className={styles.info}>
                  <p className={styles.symbol}>{item.symbol}</p>
                  <p className={styles.value} style={{ color: colors[i] }}>
                    {"$" + item.value}
                  </p>
                </div>
              </div>
            );
          })
        : ""}
      <div className={styles.addButton}>
        <button onClick={handleAdd}>+</button>
      </div>
      {openList && (
        <AddWatchlist {...{ action: setOpenList, data: companyData }} />
      )}
    </div>
  );
}
