import styles from "../../../styles/StockSimulator/userStocks.module.scss";

export default function UserStocks({ data }) {
  const getShortForm = (name) => {
    let nameArr = name.split(" ");
    let res = "";
    for (let item of nameArr) {
      res += item.slice(0, 1);
    }
    return res.length > 2 ? res.slice(0, 2) : res;
  };

  return (
    <>
      {data &&
        data.length &&
        data.map((item, i) => {
          return (
            <div key={i} className={styles.card}>
              <div className={styles.iconArea}>
                <div className={styles.icon}>{getShortForm(item.name)}</div>
              </div>
              <div className={styles.nameArea}>
                <div className={styles.name}>{item.name}</div>
                <div className={styles.symbol}>{item.symbol}</div>
              </div>
              <div className={styles.valueArea}>
                <div className={styles.label}>Total Value</div>
                <div className={styles.value}>
                  {"₹" + parseFloat(item.total_value).toFixed(2)}
                </div>
              </div>
              <div className={styles.gainArea}>
                <div className={styles.gain}>{`+5%`}</div>
              </div>
              <div className={styles.buttonArea}>
                <button className={styles.button}>{"->"}</button>
              </div>
            </div>
          );
        })}
    </>
  );
}
