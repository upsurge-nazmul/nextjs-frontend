import { useState, useEffect } from "react";
import SimulatorChart from "./SimulatorChart";
import styles from "../../../styles/StockSimulator/dash.module.scss";
import SimulatorOptions from "./Options";
import CompanyInfo from "./CompanyInfo";
import ChartDuration from "./ChartDuration";
import ChartOptions from "./ChartOptions";
import CompanySelection from "./CompanySelection";
import { getDateRange } from "../../../helpers/timehelpers";
import SimulatorApis from "../../../actions/apis/SimulatorApis";

const ChartModeOptions = ["candlestick", "line"];
const ChartDurations = [
  { name: "1 Month", value: 30 },
  { name: "3 Months", value: 90 },
  { name: "6 Months", value: 180 },
  { name: "1 Year", value: 365 },
  { name: "5 Years", value: 1825 },
];

export default function SimulatorDash({
  token,
  simulatorDailyData,
  companyData,
  selectedSymbol,
  setSelectedSymbol,
  userData,
  setWatchlistData,
}) {
  const [chartMode, setChartMode] = useState(ChartModeOptions[0]);
  const [selectedDuration, setSelectedDuration] = useState(
    ChartDurations[0].name
  );
  const [selectedCompany, setSelectedCompany] = useState(simulatorDailyData[0]);
  const [simulatorMonthlyData, setSimulatorMonthlyData] = useState();

  useEffect(() => {
    async function fetchStocks() {
      let monthlyStocks = await SimulatorApis.getStocks({
        payload: {
          from: getDateRange(selectedDuration).from,
          to: getDateRange(selectedDuration).to,
          symbol: selectedSymbol,
        },
        token,
      });
      setSimulatorMonthlyData(monthlyStocks.data.data.rows);
    }
    fetchStocks();
  }, [token, selectedSymbol, selectedDuration]);

  useEffect(() => {
    if (simulatorDailyData.length) {
      let currentCompany = simulatorDailyData.find(
        (item) => item.symbol === selectedSymbol
      );
      setSelectedCompany(currentCompany);
    }
  }, [selectedSymbol, simulatorDailyData]);

  const handleAddToWatchlist = async () => {
    let watchlistItem = {
      userId: userData.user_id,
      name: selectedCompany.name,
      symbol: selectedCompany.symbol,
      current_value: selectedCompany.close,
    };
    let addedItem = await SimulatorApis.addToWatchlist({
      payload: watchlistItem,
      token,
    });
    if (addedItem.data.data) {
      setWatchlistData((prev) => [...prev, addedItem.data.data]);
    }
  };

  return (
    <div className={styles.simulatorDash}>
      <div className={styles.dashLeft}>
        <div className={styles.chartOptionArea}>
          <div className={styles.selectArea}>
            <CompanySelection
              {...{
                value: selectedSymbol,
                setvalue: setSelectedSymbol,
                options: companyData,
              }}
            />
          </div>
          <div className={styles.buttonArea}>
            <button onClick={handleAddToWatchlist}>Add to Watchlist</button>
          </div>
          <div className={styles.switchArea}>
            <ChartOptions {...{ chartMode, setChartMode, ChartModeOptions }} />
          </div>
        </div>
        {simulatorMonthlyData && (
          <SimulatorChart
            simulatorMonthlyData={simulatorMonthlyData}
            chartMode={chartMode}
            ChartModeOptions={ChartModeOptions}
            width="95%"
            height="600px"
          />
        )}
        <ChartDuration
          value={selectedDuration}
          action={setSelectedDuration}
          options={ChartDurations}
          width="95%"
        />
      </div>
      <div className={styles.dashRight}>
        {selectedCompany && <CompanyInfo companyInfo={selectedCompany} />}
        {selectedCompany && (
          <SimulatorOptions companyDetails={selectedCompany} />
        )}
      </div>
    </div>
  );
}
