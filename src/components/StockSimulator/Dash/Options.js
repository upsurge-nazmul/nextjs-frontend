import { useEffect, useState } from "react";
import SimulatorApis from "../../../actions/apis/SimulatorApis";
import styles from "../../../styles/StockSimulator/options.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import Popup from "../Popup";

export default function SimulatorOptions({ companyDetails, userData, token }) {
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [tradeMode, setTradeMode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tradeMsg, setTradeMsg] = useState("");

  useEffect(() => {
    if (companyDetails) {
      setPrice(parseFloat(companyDetails.close));
    }
  }, [companyDetails]);

  const handleBuy = async () => {
    console.log("buy Rs", quantity * price, companyDetails);
    const boughtStock = await SimulatorApis.buyStock({
      payload: {
        user_id: userData.user_id,
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
    if (boughtStock.data.status === 200) setIsLoading(false);
    if (boughtStock.data.message) setTradeMsg(boughtStock.data.message);
  };

  const handleSell = async () => {
    console.log("Sell Rs", quantity * price, companyDetails);
    setIsLoading(true);
    const soldStock = await SimulatorApis.sellStock({
      payload: {
        user_id: userData.user_id,
        name: companyDetails.name,
        symbol: companyDetails.symbol,
        date: companyDetails.date,
        quantity: quantity,
        price: price,
        trade_type: "sell",
      },
      token,
    });
    console.log("sold stocks", soldStock);
    if (soldStock.data.status === 200) setIsLoading(false);
    if (soldStock.data.message) setTradeMsg(soldStock.data.message);
  };

  const handleCancel = () => {
    setTradeMode("");
    setQuantity(0);
    setIsLoading(false);
    setTradeMsg("");
  };

  const handleProceed = () => {
    console.log("Finally trade happens here for ", quantity * price, "$");
    if (tradeMode === "buy") {
      handleBuy();
    }
    if (tradeMode === "sell") {
      handleSell();
    }
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
            <span>Price</span> <span>{"₹" + price.toFixed(2)}</span>
          </span>
          <span>
            <span>Total</span>{" "}
            <span>{"₹" + (quantity * price).toFixed(2)}</span>
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
            <span>Price</span> <span>{"₹" + price.toFixed(2)}</span>
          </span>
          <span>
            <span>Total</span>{" "}
            <span>{"₹" + (quantity * price).toFixed(2)}</span>
          </span>
        </div>
      </button>
      {tradeMode && (
        <Popup
          actions={{
            cancelText: tradeMsg ? "Close" : "Cancel",
            isCancel: true,
            handleCancel: handleCancel,
            proceedText: "Proceed",
            isProceed: quantity > 0 && !tradeMsg,
            handleProceed: handleProceed,
          }}
          title="Confirmation"
        >
          {!isLoading && !tradeMsg ? (
            <div>
              {quantity > 0 ? (
                <p className={styles.popupMessage}>
                  Are you sure, you want to {tradeMode} for {quantity * price} ?
                </p>
              ) : (
                <p className={styles.popupMessage}>Please add quantity</p>
              )}
            </div>
          ) : tradeMsg ? (
            <p className={styles.popupMessage}>{tradeMsg}</p>
          ) : (
            <CircularProgress />
          )}
        </Popup>
      )}
    </div>
  );
}
