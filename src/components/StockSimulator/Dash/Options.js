import { useEffect, useState } from "react";
import styles from "../../../styles/StockSimulator/options.module.scss";

export default function SimulatorOptions({ companyDetails }) {
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [tradeMode, setTradeMode] = useState("");

  useEffect(() => {
    if (companyDetails) {
      setPrice(parseFloat(companyDetails.close));
    }
  }, [companyDetails]);

  const handleBuy = () => {
    console.log("Buy Rs", quantity * price);
    setTradeMode("Buy");
  };

  const handleSell = () => {
    console.log("Sell Rs", quantity * price);
    setTradeMode("Sell");
  };

  const handleCancel = () => {
    setTradeMode("");
    setQuantity(0);
  };

  const handleProceed = () => {
    console.log("Finally trade happens here for ", quantity * price, "$");
    setTradeMode("");
    setQuantity(0);
  };

  return (
    <div className={styles.simulatorOptoins}>
      <p className={styles.optionsTitle}>Quantity</p>
      <div className={styles.quantityInput}>
        <input
          type='number'
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
      {tradeMode && (
        <div className={styles.tradePopup}>
          <div
            className={styles.popupBackground}
            // onClick={() => setTradeMode("")}
          />
          <div className={styles.popupBody}>
            <div className={styles.messageArea}>
              <p className={styles.message}>
                Are you sure, you want to {tradeMode} for {quantity * price} ?
              </p>
            </div>
            <div className={styles.tradeActionArea}>
              <button className={styles.cancelButton} onClick={handleCancel}>
                Cancel
              </button>
              <button className={styles.proceedButton} onClick={handleProceed}>
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
