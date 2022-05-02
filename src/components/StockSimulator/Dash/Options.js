import { useEffect, useState } from "react";
import SimulatorApis from "../../../actions/apis/SimulatorApis";
import styles from "../../../styles/StockSimulator/options.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import Popup from "../Popup";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

export default function SimulatorOptions({ companyDetails, userData, token }) {
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

  const quantityInput = (
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
          onClick={() => setQuantity((prev) => parseFloat(prev) - 1)}
        >
          -
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.simulatorOptoins}>
      <p className={styles.optionsTitle}>Quantity</p>
      {quantityInput}
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
          title={companyDetails.name}
        >
          {!isLoading && !tradeMsg ? (
            <div className={styles.tradePopupArea}>
              {quantityInput}
              <div className={styles.tradeInfo}>
                <div className={styles.tradeType}>
                  <span
                    className={
                      tradeMode === "buy" ? styles.buyColor : styles.sellColor
                    }
                  >
                    {tradeMode.toUpperCase()}
                  </span>
                </div>
                <div className={styles.tradeValue}>
                  <div className={styles.price}>
                    <span className={styles.label}>Price </span>
                    <span className={styles.value}>
                      {"₹" + price.toFixed(2)}
                    </span>
                  </div>
                  <div className={styles.total}>
                    <span className={styles.label}>Total </span>
                    <span className={styles.value}>
                      {"₹" + (quantity * price).toFixed(2)}
                    </span>
                  </div>
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
