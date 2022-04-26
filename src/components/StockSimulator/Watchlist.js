import { useState, useEffect } from "react";
import styles from "../../styles/StockSimulator/watchlist.module.scss";
import AddWatchlist from "./AddWatchlist";
import { getRandomColor } from "../../helpers/color";
import LoginApis from "../../actions/apis/LoginApis";
import SimulatorApis from "../../actions/apis/SimulatorApis";

export default function Watchlist({
  token,
  companyData,
  action = () => {},
  active = "",
}) {
  const [watchlistData, setWatchlistData] = useState();
  const [openList, setOpenList] = useState(false);

  useEffect(() => {
    async function fetchWatchlist() {
      let watchlist = await SimulatorApis.getWatchlist({ token });
      setWatchlistData(watchlist.data.data.rows);
    }
    fetchWatchlist();
  }, [token]);

  const handleClose = (value) => {
    setWatchlistData((prev) => prev.filter((item) => item.symbol !== value));
  };

  const handleAdd = () => {
    console.log("Add button clicked");
    setOpenList((prev) => !prev);
  };

  // console.log("@@@@@@@@@@", watchlistData);

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
      <div className={styles.addButton}>
        <button onClick={handleAdd}>+</button>
      </div>
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
