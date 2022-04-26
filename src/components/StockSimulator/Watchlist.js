import { useState } from "react";
import styles from "../../styles/StockSimulator/watchlist.module.scss";
import AddWatchlist from "./AddWatchlist";

export default function Watchlist({
  watchlistData,
  setWatchlistData,
  companyData,
  action = () => {},
  active = "",
}) {
  const [openList, setOpenList] = useState(false);

  const handleClose = (value) => {
    setWatchlistData((prev) => prev.filter((item) => item.symbol !== value));
  };

  const handleAdd = () => {
    console.log("Add button clicked");
    setOpenList((prev) => !prev);
  };

  return (
    <div className={styles.watchlist}>
      {watchlistData && watchlistData.length ? (
        watchlistData.map((item) => {
          return (
            <div
              className={
                item.symbol === active ? styles.activeItem : styles.listItem
              }
              key={item.id}
              onClick={() => {
                action(item.symbol);
              }}
            >
              <button
                className={styles.closeButton}
                onClick={() => handleClose(item.symbol)}
              >
                x
              </button>
              <div
                style={{
                  backgroundColor: item.color,
                }}
                className={styles.colorCode}
              />
              <div className={styles.info}>
                <p className={styles.symbol}>{item.symbol}</p>
                <p className={styles.value} style={{ color: item.color }}>
                  {"$" + item.current_value}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <div className={styles.noWatchlist} onClick={handleAdd}>
          <p>Watchlist is empty</p>
        </div>
      )}
      {/* <div className={styles.addButton}>
        <button onClick={handleAdd}>+</button>
      </div> */}
      {openList && (
        <AddWatchlist
          {...{
            action: setOpenList,
            options: companyData,
            data: watchlistData,
            setData: setWatchlistData,
          }}
        />
      )}
    </div>
  );
}
