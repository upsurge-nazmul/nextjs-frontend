import { useEffect, useState } from "react";
import styles from "../../../styles/StockSimulator/companyInfo.module.scss";

export default function CompanyInfo({
  companyData = [],
  simulatorDailyData = [],
}) {
  const [selectedCompany, setSelectedCompany] = useState(companyData[0].symbol);
  const [companyInfo, setCompanyInfo] = useState();

  useEffect(() => {
    if (simulatorDailyData.length) {
      let currentCompany = simulatorDailyData.find(
        (item) => item.Symbol === selectedCompany
      );
      setCompanyInfo(currentCompany);
    }
  }, [simulatorDailyData]);

  const handleChange = (e) => {
    setSelectedCompany(e.target.value);
  };

  return (
    <div className={styles.companyInfo}>
      <div className={styles.selectArea}>
        <select
          name="companies"
          id="companies"
          value={selectedCompany}
          onChange={handleChange}
          className={styles.companySelect}
        >
          {companyData.length
            ? companyData.map((comp, i) => {
                return (
                  <option value={comp.symbol} key={i}>
                    {comp.name}
                  </option>
                );
              })
            : ""}
        </select>
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
