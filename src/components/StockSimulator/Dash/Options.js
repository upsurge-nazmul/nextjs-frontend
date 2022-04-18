import { useState } from "react";
import styles from "../../../styles/StockSimulator/options.module.scss";

export default function SimulatorOptions({ price = 0 }) {
  const [quantity, setQuantity] = useState(0);

  const handleBuy = () => {
    console.log("Buy Rs", quantity * price);
  };

  const handleSell = () => {
    console.log("Sell Rs", quantity * price);
  };

  return (
    <div className={styles.simulatorOptoins}>
      <p className={styles.optionsTitle}>Quantity</p>
      <div className={styles.quantityInput}>
        <input
          type="number"
          className={styles.quantityInput}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <button className={styles.buyButton} onClick={handleBuy}>
        <div className={styles.buttonTitle}>Buy</div>
        <div className={styles.buttonInfo}>
          <span>Price {price}</span>
          <span>Total {quantity * price}</span>
        </div>
      </button>
      <button className={styles.sellButton} onClick={handleSell}>
        <div className={styles.buttonTitle}>Sell</div>
        <div className={styles.buttonInfo}>
          <span>Price {price}</span>
          <span>Total {quantity * price}</span>
        </div>
      </button>
    </div>
  );
}
