import { useEffect, useState } from "react";
import SimulatorApis from "../../../actions/apis/SimulatorApis";
import styles from "../../../styles/StockSimulator/options.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import Popup from "../Popup";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { toIndianFormat } from "../../../helpers/currency";

const MAX_VALUE = 100000;
const MIN_VALUE = 0;

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
  const [holdingToBuy, setHoldingToBuy] = useState();
  const [ammountToSell, setAmmountToSell] = useState();
  const [errorText, setErrorText] = useState("");
  const [helperText, setHelperText] = useState("");

  useEffect(() => {
    async function fetchUserHoldings() {
      let hlds = await SimulatorApis.getUserHoldings({
        payload: { user_id: userData.user_id },
        token,
        type: simulatorType,
      });
      if (
        hlds.data &&
        hlds.data.success &&
        hlds.data.data &&
        hlds.data.data.length
      ) {
        setHoldingToBuy(hlds.data.data[0].amount);

        let comp = hlds.data.data.find(
          (comp) => comp.symbol === companyDetails.symbol
        );
        if (comp) {
          setAmmountToSell(comp.amount);
        } else {
          setAmmountToSell();
        }
      }
    }
    fetchUserHoldings();
  }, [companyDetails]);

  useEffect(() => {
    if (companyDetails) {
      setPrice(parseFloat(companyDetails.close));
    }
  }, [companyDetails]);

  useEffect(() => {
    if (quantity < MIN_VALUE || quantity > MAX_VALUE) {
      setErrorText(`Quantity should be ${MIN_VALUE} to ${MAX_VALUE}`);
    } else if (
      tradeMode === "buy" &&
      holdingToBuy &&
      quantity * price > holdingToBuy
    ) {
      setErrorText(
        `You can buy maximum ${parseInt(
          holdingToBuy / price
        )} stocks of this company`
      );
    } else if (tradeMode === "sell" && !ammountToSell) {
      setErrorText(`You do not have this stock to sell`);
    } else if (tradeMode === "sell" && quantity > ammountToSell) {
      setErrorText(`You can sell maximum ${parseInt(ammountToSell)} stocks`);
    } else {
      setErrorText("");
    }
  }, [tradeMode, quantity, holdingToBuy, ammountToSell]);

  useEffect(() => {
    if (!errorText && tradeMode === "buy" && holdingToBuy) {
      setHelperText(
        `You can buy maximum ${parseInt(
          holdingToBuy / price
        )} stocks of this company`
      );
    } else if (!errorText && tradeMode === "sell" && ammountToSell) {
      setHelperText(`You have ${parseInt(ammountToSell)} stocks to sell`);
    } else {
      setHelperText("");
    }
  }, [tradeMode, holdingToBuy, ammountToSell, errorText]);

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
          min={MIN_VALUE}
          max={MAX_VALUE}
          // onFocus={() => setErrorText("")}
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
      {errorText && <div className={styles.error}>{errorText}</div>}
      {helperText && <div className={styles.helper}>{helperText}</div>}
      <button
        className={errorText ? styles.disabledButton : styles.buyButton}
        onClick={errorText ? () => {} : () => setTradeMode("buy")}
      >
        <div className={styles.buttonTitle}>Buy</div>
        <div className={styles.buttonInfo}>
          <span>
            <span>Price</span> <span>{"₹" + toIndianFormat(price)}</span>
          </span>
          <span>
            <span>Total</span>{" "}
            <span>{"₹" + toIndianFormat(quantity * price)}</span>
          </span>
        </div>
      </button>
      <button
        className={errorText ? styles.disabledButton : styles.sellButton}
        onClick={errorText ? () => {} : () => setTradeMode("sell")}
      >
        <div className={styles.buttonTitle}>Sell</div>
        <div className={styles.buttonInfo}>
          <span>
            <span>Price</span> <span>{"₹" + toIndianFormat(price)}</span>
          </span>
          <span>
            <span>Total</span>{" "}
            <span>{"₹" + toIndianFormat(quantity * price)}</span>
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
            isProceed: !errorText && !tradeMsg,
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
                  <div>{toIndianFormat(price)}</div>
                  <div
                    className={
                      tradeMode === "buy" ? styles.buyHelper : styles.sellHelper
                    }
                  >
                    {/* {tradeMode === "buy" ? "LOWEST PRICE" : "HIGHEST PRICE"} */}
                  </div>
                </div>
              </div>
              <div className={styles.quantity}>
                <div className={styles.label}>QUANTITY </div>
                <input
                  type="number"
                  className={styles.value}
                  value={quantity}
                  min={MIN_VALUE}
                  max={MAX_VALUE}
                  onChange={(e) => setQuantity(e.target.value)}
                  // onFocus={() => setErrorText("")}
                />
                {errorText && <div className={styles.error}>{errorText}</div>}
                {helperText && (
                  <div className={styles.helper}>{helperText}</div>
                )}
              </div>
              <div className={styles.total}>
                <div className={styles.label}>TOTAL | INR </div>
                <div className={styles.value}>
                  {toIndianFormat(quantity * price)}
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
