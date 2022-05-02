import styles from "../../styles/StockSimulator/popup.module.scss";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

export default function Popup({
  title = "",
  actions = {
    cancelText: "Cancel",
    isCancel: true,
    handleCancel: () => {},
    proceedText: "Proceed",
    isProceed: false,
    handleProceed: () => {},
  },
  onOutsideClick = () => {},
  children,
}) {
  return (
    <div className={styles.tradePopup}>
      <div className={styles.popupBackground} onClick={onOutsideClick} />
      <div className={styles.cross} onClick={actions.handleCancel}>
        <CancelOutlinedIcon className={styles.icon} />
      </div>
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
