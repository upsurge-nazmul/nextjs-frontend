import { useState } from "react";
import styles from "../../styles/StockSimulator/addWatchlist.module.scss";

export default function AddWatchlist({ action, data = [] }) {
  const [addedItems, setAddedItems] = useState([]);

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

  return (
    <div className={styles.addWatchlist}>
      <div className={styles.background} onClick={() => action(null)} />
      <div className={styles.main}>
        <div className={styles.listArea}>
          {data.length &&
            data.map((item) => {
              return (
                <div
                  key={item.symbol}
                  className={styles.listItem}
                  onClick={() => handleAddItem(item)}
                >
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.otherItem}>{item.symbol}</span>
                  <span className={styles.otherItem}>{"$" + item.value}</span>
                  <span className={styles.addButton}>
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
                    <span className={styles.closeButton}>
                      <span>x</span>
                    </span>
                  </div>
                );
              })
            : ""}
        </div>
        <div className={styles.footer}>
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
}
