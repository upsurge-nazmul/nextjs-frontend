import { useState, useEffect } from "react";
import SimulatorChart from "./SimulatorChart";
import styles from "../../../styles/StockSimulator/dash.module.scss";
import SimulatorOptions from "./Options";
import CompanyInfo from "./CompanyInfo";
import ChartOptions from "./ChartOptions";
import CompanySelection from "./CompanySelection";
import FinancialRecord from "../FinancialRecord";
import ButtonGroup from "../ButtonGroup";
import { getDateRange } from "../../../helpers/timehelpers";
import SimulatorApis from "../../../actions/apis/SimulatorApis";

const ChartModeOptions = ["candlestick", "line"];
const ChartDurations = [
  { name: "1 Month", value: "1 Month" },
  { name: "3 Months", value: "3 Months" },
  { name: "6 Months", value: "6 Months" },
  { name: "1 Year", value: "1 Year" },
  { name: "5 Years", value: "5 Years" },
];

export default function SimulatorDash({
  token,
  companyData,
  selectedSymbol,
  setSelectedSymbol,
  userData,
  watchlistData,
  setWatchlistData,
  simulatorType,
}) {
  const [chartMode, setChartMode] = useState(ChartModeOptions[0]);
  const [selectedDuration, setSelectedDuration] = useState(
    ChartDurations[0].value
  );
  const [selectedCompany, setSelectedCompany] = useState();
  const [simulatorMonthlyData, setSimulatorMonthlyData] = useState();
  const [showAddToWatchlistButton, setShowAddToWatchlistButton] =
    useState(true);
  const [showFR, setShowFR] = useState(false); // FD = Financial Data

  useEffect(() => {
    async function fetchStocks() {
      let monthlyStocks = await SimulatorApis.getStocks({
        payload: {
          from: getDateRange(selectedDuration).from,
          to: getDateRange(selectedDuration).to,
          symbol: selectedSymbol,
        },
        token,
        type: simulatorType,
      });
      setSimulatorMonthlyData(monthlyStocks.data.data.rows);
    }
    fetchStocks();
  }, [token, selectedSymbol, selectedDuration]);

  useEffect(() => {
    if (simulatorMonthlyData && simulatorMonthlyData.length) {
      let currentCompany = simulatorMonthlyData[0];
      setSelectedCompany(currentCompany);
    }
  }, [selectedSymbol, simulatorMonthlyData]);

  useEffect(() => {
    if (selectedCompany && watchlistData && watchlistData.length) {
      let selectedCompanyExistsInWatchlist = watchlistData.filter(
        (d) => d.symbol === selectedCompany.symbol
      );
      if (selectedCompanyExistsInWatchlist.length) {
        setShowAddToWatchlistButton(false);
      } else {
        setShowAddToWatchlistButton(true);
      }
    }
  }, [selectedCompany, watchlistData]);

  const handleAddToWatchlist = async () => {
    let watchlistItem = {
      user_id: userData.user_id,
      name: selectedCompany.name,
      symbol: selectedCompany.symbol,
      current_value: selectedCompany.close,
    };
    let addedItem = await SimulatorApis.addToWatchlist({
      payload: watchlistItem,
      token,
      type: simulatorType,
    });
    if (addedItem.data.data) {
      setWatchlistData((prev) => [...prev, addedItem.data.data]);
    }
  };

  return (
    <div className={styles.simulatorDash}>
      {!showFR && (
        <>
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
              {/* This buttons are for PC and tabs only */}
              <div className={styles.buttonArea}>
                {simulatorType === "stocksimulator" && (
                  <button
                    className={styles.fdButton}
                    onClick={() => setShowFR(true)}
                  >
                    Financial Record
                  </button>
                )}
                {showAddToWatchlistButton && (
                  <button
                    className={styles.watchlistButton}
                    onClick={handleAddToWatchlist}
                  >
                    Add to Watchlist
                  </button>
                )}
              </div>
              {/* Chart selection options for pc and tablet */}
              <div className={styles.switchArea}>
                <ChartOptions
                  {...{ chartMode, setChartMode, ChartModeOptions }}
                />
              </div>
            </div>
            {simulatorMonthlyData && (
              <div className={styles.chartArea}>
                <SimulatorChart
                  simulatorMonthlyData={simulatorMonthlyData}
                  chartMode={chartMode}
                  ChartModeOptions={ChartModeOptions}
                  className={styles.charts}
                />
                <ButtonGroup
                  value={selectedDuration}
                  action={setSelectedDuration}
                  options={ChartDurations}
                />
              </div>
            )}
          </div>
          <div className={styles.dashRight}>
            <div className={styles.topArea}>
              <div className={styles.buttons}>
                {/* Chart selection options for phone */}
                <ChartOptions
                  {...{ chartMode, setChartMode, ChartModeOptions }}
                />
                {/* This buttons are for phones only */}
                {simulatorType === "stocksimulator" && (
                  <button
                    className={styles.fdButton}
                    onClick={() => setShowFR(true)}
                  >
                    Financial Record
                  </button>
                )}
                {showAddToWatchlistButton && (
                  <button
                    className={styles.watchlistButton}
                    onClick={handleAddToWatchlist}
                  >
                    Add to Watchlist
                  </button>
                )}
              </div>
            </div>
            {selectedCompany && <CompanyInfo companyInfo={selectedCompany} />}
            {selectedCompany && (
              <SimulatorOptions
                companyDetails={selectedCompany}
                userData={userData}
                token={token}
                simulatorType={simulatorType}
              />
            )}
          </div>
        </>
      )}
      {showFR && (
        <FinancialRecord
          company={selectedCompany}
          token={token}
          setShowFR={setShowFR}
        />
      )}
    </div>
  );
}
