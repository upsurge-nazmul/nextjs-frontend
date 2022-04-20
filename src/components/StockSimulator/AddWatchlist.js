import { useState } from "react";
import styles from "../../styles/StockSimulator/addWatchlist.module.scss";

export default function AddWatchlist({
  action,
  options = [],
  data = [],
  setData = () => {},
}) {
  const [addedItems, setAddedItems] = useState(data);

  const handleAddItem = (value) => {
    setAddedItems((prev) => {
      if (prev.find((item) => item === value)) {
        return prev;
      } else return [...prev, value];
    });
  };

  const handleRemoveItem = (value) => {
    setAddedItems((prev) => prev.filter((item) => item !== value));
  };

  const handleSubmit = (values) => {
    if (values && values.length) {
      setData(values);
    }
    action(null);
  };

  return (
    <div className={styles.addWatchlist}>
      <div className={styles.background} onClick={() => action(null)} />
      <div className={styles.main}>
        <div className={styles.titleArea}>
          <p>Available companies</p>
        </div>
        <div className={styles.listArea}>
          {options.length &&
            options.map((item) => {
              return (
                <div key={item.symbol} className={styles.listItem}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.otherItem}>{item.symbol}</span>
                  <span className={styles.otherItem}>{"$" + item.value}</span>
                  <span
                    className={styles.addButton}
                    onClick={() => handleAddItem(item)}
                  >
                    <span>+</span>
                  </span>
                </div>
              );
            })}
        </div>
        <div className={styles.addedItemsArea}>
          {addedItems.length
            ? addedItems.map((item) => {
                return (
                  <div
                    className={styles.addedItem}
                    onClick={() => handleRemoveItem(item)}
                  >
                    <span className={styles.addedItemName}>{item.name}</span>
                    {/* <span className={styles.closeButton}>
                      <span>x</span>
                    </span> */}
                  </div>
                );
              })
            : ""}
        </div>
        <div className={styles.footer}>
          <button onClick={() => handleSubmit(addedItems)}>
            Add To Watchlist
          </button>
        </div>
      </div>
    </div>
  );
}
