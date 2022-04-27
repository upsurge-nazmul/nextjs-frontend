import { useEffect, useState } from "react";
import SimulatorApis from "../../../actions/apis/SimulatorApis";
import styles from "../../../styles/StockSimulator/options.module.scss";

export default function SimulatorOptions({ companyDetails, userData, token }) {
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [tradeMode, setTradeMode] = useState("");

  useEffect(() => {
    if (companyDetails) {
      setPrice(parseFloat(companyDetails.close));
    }
  }, [companyDetails]);

  const handleBuy = async () => {
    console.log("buy Rs", quantity * price, companyDetails);
    const boughtStock = await SimulatorApis.buyStock({
      payload: {
        userId: userData.user_id,
        name: companyDetails.name,
        symbol: companyDetails.symbol,
        date: companyDetails.date,
        quantity: quantity,
        price: price,
        trade_type: "buy",
      },
      token,
    });
    console.log("bought stocks", boughtStock);
  };

  const handleSell = async () => {
    console.log("Sell Rs", quantity * price, companyDetails);
    const soldStock = await SimulatorApis.sellStock({
      payload: {
        userId: userData.user_id,
        name: companyDetails.name,
        symbol: companyDetails.symbol,
        date: companyDetails.date,
        quantity: quantity,
        price: price,
        trade_type: "sell",
      },
      token,
    });
    console.log("bought stocks", soldStock);
  };

  const handleCancel = () => {
    setTradeMode("");
    setQuantity(0);
  };

  const handleProceed = () => {
    console.log("Finally trade happens here for ", quantity * price, "$");
    if (tradeMode === "buy") {
      handleBuy();
    }
    if (tradeMode === "sell") {
      handleSell();
    }
    setTradeMode("");
    setQuantity(0);
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
      <button className={styles.buyButton} onClick={() => setTradeMode("buy")}>
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
      <button
        className={styles.sellButton}
        onClick={() => setTradeMode("sell")}
      >
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
              {quantity > 0 ? (
                <p className={styles.message}>
                  Are you sure, you want to {tradeMode} for {quantity * price} ?
                </p>
              ) : (
                <p className={styles.message}>Please add quantity</p>
              )}
            </div>
            <div className={styles.tradeActionArea}>
              <button className={styles.cancelButton} onClick={handleCancel}>
                Cancel
              </button>
              {quantity > 0 ? (
                <button
                  className={styles.proceedButton}
                  onClick={handleProceed}
                >
                  Proceed
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
