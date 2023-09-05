import styles from "../../styles/GeneralComponents/customInput.module.scss";

export default function Input({ label = "", ...props }) {
  return (
    <div className={styles.customInput}>
      {label && <label for={label}>{label}</label>}
      <input id={label} name={label} {...props} />
    </div>
  );
}
