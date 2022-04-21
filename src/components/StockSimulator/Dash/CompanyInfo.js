import { useEffect, useState } from "react";
import styles from "../../../styles/StockSimulator/companyInfo.module.scss";

export default function CompanyInfo({
  selectedCompany,
  simulatorDailyData = [],
}) {
  const [companyInfo, setCompanyInfo] = useState();

  useEffect(() => {
    if (simulatorDailyData.length) {
      let currentCompany = simulatorDailyData.find(
        (item) => item.Symbol === selectedCompany
      );
      setCompanyInfo(currentCompany);
    }
  }, [selectedCompany, simulatorDailyData]);

  return (
    <div className={styles.companyInfo}>
      <div className={styles.selectArea}>
        {companyInfo && (
          <div className={styles.volumeArea}>
            <span>Volume</span>
            <span>{companyInfo.Volume || "2250$"}</span>
          </div>
        )}
      </div>
      {companyInfo && (
        <div className={styles.infoArea}>
          <div className={styles.infoItem}>
            <span>O</span>
            <span>{companyInfo.Open.toFixed(2)}</span>
          </div>
          <div className={styles.infoItem}>
            <span>H</span>
            <span>{companyInfo.High.toFixed(2)}</span>
          </div>
          <div className={styles.infoItem}>
            <span>L</span>
            <span>{companyInfo.Low.toFixed(2)}</span>
          </div>
          <div className={styles.infoItem}>
            <span>C</span>
            <span>{companyInfo.Close.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
