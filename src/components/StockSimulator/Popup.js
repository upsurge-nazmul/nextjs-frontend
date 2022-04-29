import styles from "../../styles/StockSimulator/popup.module.scss";

export default function Popup({
  title = "",
  actions = {
    cancelText: "Cancel",
    proceedText: "Proceed",
  },
  onOutsideClick = () => {},
  children,
}) {
  return (
    <div className={styles.tradePopup}>
      <div className={styles.popupBackground} onClick={onOutsideClick} />
      <div className={styles.popupBody}>
        <div className={styles.titleArea}>
          <p className={styles.title}>{title}</p>
        </div>
        <div className={styles.messageArea}>{children}</div>
        <div className={styles.tradeActionArea}>
          {actions.isCancel ? (
            <button
              className={styles.cancelButton}
              onClick={actions.handleCancel}
            >
              {actions.cancelText}
            </button>
          ) : (
            ""
          )}
          {actions.isProceed ? (
            <button
              className={styles.proceedButton}
              onClick={actions.handleProceed}
            >
              {actions.proceedText}
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
