import styles from "../../styles/GeneralComponents/modal.module.scss";

export default function Modal({
  title = "",
  actions = {
    cancelText: "Cancel",
    isCancel: true,
    handleCancel: () => {},
    proceedText: "Proceed",
    isProceed: false,
    handleProceed: () => {},
    proceedButtonType: "normal",
  },
  onOutsideClick = () => {},
  children,
}) {
  return (
    <div className={styles.tradePopup}>
      <div className={styles.popupBackground} onClick={onOutsideClick} />
      <div className={styles.popupBody}>
        {title && (
          <div className={styles.titleArea}>
            <p className={styles.title}>{title}</p>
          </div>
        )}
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
