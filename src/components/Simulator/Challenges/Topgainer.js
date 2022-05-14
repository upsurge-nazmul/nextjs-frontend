import { useEffect, useState } from "react";
import styles from "../../../styles/StockSimulator/topgainer.module.scss";
import CompanySelection from "../Dash/CompanySelection";

export default function Topgainer({ list }) {
  const [selectedSymbol, setSelectedSymbol] = useState();
  const [selectedCompany, setSelectedCompany] = useState();

  useEffect(() => {
    if (selectedSymbol) {
      let sel = list.find((item) => item.symbol === selectedSymbol);
      setSelectedCompany(sel);
    }
  }, [selectedSymbol]);

  console.log("!!!!!!!!!!", list, selectedSymbol, selectedCompany);

  return (
    <div className={styles.topgainer}>
      <div className={styles.topSection}>
        <div className={styles.titleArea}>
          <div className={styles.title}>Top Gainer</div>
          <button className={styles.infoButton}>i</button>
        </div>
        <div className={styles.description}>
          Sed morbi pulvinar ornare gravida. Pulvinar turpis pellentesque
          porttitor nec phasellus justo, viverra. Duis varius risus, in tellus.
          In enim tincidunt nulla.
        </div>
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.leftside}>
          {list && list.length && (
            <CompanySelection
              {...{
                value: selectedSymbol,
                setvalue: setSelectedSymbol,
                options: list,
              }}
            />
          )}
        </div>
        <div className={styles.rightside}>
          <div className={styles.rightTitle}>Selected Stock</div>
        </div>
      </div>
    </div>
  );
}
