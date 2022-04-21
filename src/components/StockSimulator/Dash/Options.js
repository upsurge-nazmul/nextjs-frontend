import { useEffect, useState } from "react";
import styles from "../../../styles/StockSimulator/options.module.scss";

export default function SimulatorOptions({ companyDetails }) {
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (companyDetails) {
      setPrice(companyDetails.Close);
    }
  }, [companyDetails]);

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
          // className={styles.quantityInput}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <div className={styles.inputButtonArea}>
          <div
            className={styles.inputIncrease}
            onClick={() => setQuantity((prev) => prev + 1)}
          >
            +
          </div>
          <div
            className={styles.inputDescrease}
            onClick={() => setQuantity((prev) => prev - 1)}
          >
            -
          </div>
        </div>
      </div>
      <button className={styles.buyButton} onClick={handleBuy}>
        <div className={styles.buttonTitle}>Buy</div>
        <div className={styles.buttonInfo}>
          <span>
            <span>Price</span> <span>{"$" + price.toFixed(2)}</span>
          </span>
          <span>
            <span>Total</span>{" "}
            <span>{"$" + (quantity * price).toFixed(2)}</span>
          </span>
        </div>
      </button>
      <button className={styles.sellButton} onClick={handleSell}>
        <div className={styles.buttonTitle}>Sell</div>
        <div className={styles.buttonInfo}>
          <span>
            <span>Price</span> <span>{"$" + price.toFixed(2)}</span>
          </span>
          <span>
            <span>Total</span>{" "}
            <span>{"$" + (quantity * price).toFixed(2)}</span>
          </span>
        </div>
      </button>
    </div>
  );
}
