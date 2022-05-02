import { useState } from "react";
import SimulatorApis from "../../actions/apis/SimulatorApis";
import styles from "../../styles/StockSimulator/watchlist.module.scss";
import AddWatchlist from "./AddWatchlist";
import Popup from "./Popup";

export default function Watchlist({
  watchlistData,
  setWatchlistData,
  companyData,
  action = () => {},
  active = "",
  token,
  settoastdata,
}) {
  const [openList, setOpenList] = useState(false);
  const [deleteItem, setDeleteItem] = useState();

  const handleRemoveItem = async () => {
    let deletedItem = await SimulatorApis.removeFromWatchlist({
      payload: { id: deleteItem.id },
      token,
    });
    if (deletedItem.data.success) {
      setWatchlistData((prev) =>
        prev.filter((item) => item.id !== deleteItem.id)
      );
      setDeleteItem();
      settoastdata({
        show: true,
        type: "success",
        msg: deletedItem.data.message,
      });
    }
  };

  // const handleAdd = () => {
  //   console.log("Add button clicked");
  //   setOpenList((prev) => !prev);
  // };

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
                onClick={() => setDeleteItem(item)}
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
                  ₹{parseFloat(item.current_value).toFixed(2)}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <div
          className={styles.noWatchlist}
          // onClick={handleAdd}
        >
          <p></p>
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
      {deleteItem && (
        <Popup
          actions={{
            cancelText: "Cancel",
            isCancel: true,
            handleCancel: () => setDeleteItem(),
            proceedText: "Yes",
            isProceed: true,
            handleProceed: handleRemoveItem,
          }}
          onOutsideClick={() => setDeleteItem()}
        >
          <p>Do you want to remove {deleteItem.name} from your watchlist? </p>
        </Popup>
      )}
    </div>
  );
}
