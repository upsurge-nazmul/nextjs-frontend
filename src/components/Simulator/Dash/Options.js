import { useEffect, useState } from "react";
import SimulatorApis from "../../../actions/apis/SimulatorApis";
import styles from "../../../styles/StockSimulator/options.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import Popup from "../Popup";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

export default function SimulatorOptions({
  companyDetails,
  userData,
  token,
  simulatorType,
}) {
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [tradeMode, setTradeMode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tradeMsg, setTradeMsg] = useState("");
  const [tradeSuccess, setTradeSuccess] = useState(false);

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
      type: simulatorType,
    });
    console.log("bought stocks", boughtStock);
    if (boughtStock.data.status === 200) setIsLoading(false);
    if (boughtStock.data.message) setTradeMsg(boughtStock.data.message);
    if (boughtStock.data.success) setTradeSuccess(boughtStock.data.success);
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
      type: simulatorType,
    });
    console.log("sold stocks", soldStock);
    if (soldStock.data.status === 200) setIsLoading(false);
    if (soldStock.data.message) setTradeMsg(soldStock.data.message);
    if (soldStock.data.success) setTradeSuccess(soldStock.data.success);
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
          <button
            className={styles.inputIncrease}
            onClick={() => setQuantity((prev) => parseFloat(prev) + 1)}
          >
            +
          </button>
          <button
            className={styles.inputDescrease}
            onClick={() =>
              setQuantity((prev) => (prev > 0 ? parseFloat(prev) - 1 : prev))
            }
          >
            -
          </button>
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
            proceedText: tradeMode === "buy" ? "BUY" : "SELL",
            isProceed: quantity > 0 && !tradeMsg,
            handleProceed: handleProceed,
            proceedButtonType: tradeMode,
          }}
          title={companyDetails.name}
        >
          {!isLoading && !tradeMsg ? (
            <div className={styles.tradePopupArea}>
              <div className={styles.tradeTitle}>
                <div
                  className={
                    tradeMode === "buy" ? styles.buyTitle : styles.sellTitle
                  }
                >
                  {tradeMode.toUpperCase()}
                </div>
              </div>
              <div className={styles.price}>
                <div className={styles.label}>AT PRICE | INR </div>
                <div className={styles.value}>
                  <div>{price.toFixed(2)}</div>
                  <div
                    className={
                      tradeMode === "buy" ? styles.buyHelper : styles.sellHelper
                    }
                  >
                    {tradeMode === "buy" ? "LOWEST PRICE" : "HIGHEST PRICE"}
                  </div>
                </div>
              </div>
              <div className={styles.quantity}>
                <div className={styles.label}>AMOUNT </div>
                <input
                  type="number"
                  className={styles.value}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className={styles.total}>
                <div className={styles.label}>TOTAL | INR </div>
                <div className={styles.value}>
                  {(quantity * price).toFixed(2)}
                </div>
              </div>
            </div>
          ) : tradeMsg ? (
            <div className={styles.tradeResponse}>
              <div className={styles.responseIcon}>
                {tradeSuccess ? (
                  <div className={styles.successIcon}>
                    <CheckCircleIcon />
                  </div>
                ) : (
                  <div className={styles.failureIcon}>
                    <ErrorIcon />
                  </div>
                )}
              </div>
              <p className={styles.popupMessage}>{tradeMsg}</p>
            </div>
          ) : (
            <CircularProgress />
          )}
        </Popup>
      )}
    </div>
  );
}
