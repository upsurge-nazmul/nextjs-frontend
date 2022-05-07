import { useEffect, useState } from "react";
import styles from "../../../styles/StockSimulator/balanceSheet.module.scss";
import SimulatorApis from "../../../actions/apis/SimulatorApis";

export default function BalanceSheet({ token, company }) {
  const [balanceSheet, setBalanceSheet] = useState([]);

  useEffect(() => {
    async function fetchBalanceSheet() {
      let balSheet = await SimulatorApis.getBalanceSheet({
        payload: {
          symbol: company.symbol,
        },
        token,
      });
      if (balSheet.data.success) {
        setBalanceSheet(balSheet.data.data.rows);
      }
    }
    if (company) {
      fetchBalanceSheet();
    }
  }, [company]);

  return (
    <div className={styles.balanceSheet}>
      <div className={styles.container}>
        <div className={styles.rows}>
          <div className={styles.headRow}>
            {/* <div className={styles.rowitem}>Name</div> */}
            {/* <div className={styles.rowitem}>Symbol</div> */}
            <div className={styles.rowitem}>Properties</div>
            <div className={styles.rowitem}>Total Revenue</div>
            <div className={styles.rowitem}>Revenue Growth</div>
            <div className={styles.rowitem}>EBITDA</div>
            <div className={styles.rowitem}>EBITDA Margin %</div>
            <div className={styles.rowitem}>Net Income</div>
            <div className={styles.rowitem}>Net Income Growth</div>
            <div className={styles.rowitem}>Net Income Margin %</div>
            <div className={styles.rowitem}>P/LTM EPS</div>
            <div className={styles.rowitem}>P/NTM EPS</div>
            <div className={styles.rowitem}>TEV/LTM EBIDTA</div>
            <div className={styles.rowitem}>TEV/NTM EBIDTA</div>
            <div className={styles.rowitem}>PEG ratio</div>
            <div className={styles.rowitem}>Market Capitalization</div>
            <div className={styles.rowitem}>Return on Equity</div>
            <div className={styles.rowitem}>Return on Capital</div>
            <div className={styles.rowitem}>Share Price</div>
            <div className={styles.rowitem}>Stock Return</div>
            <div className={styles.rowitem}>Volume</div>
            <div className={styles.rowitem}>LT Debt/Equity</div>
            <div className={styles.rowitem}>EBITDA/Interest Exp.</div>
            <div className={styles.rowitem}>Net debt/EBITDA</div>
          </div>
          {balanceSheet.map((row, index) => {
            return (
              <div className={styles.row} key={index}>
                {/* <div className={styles.rowitem}>{row.name}</div> */}
                {/* <div className={styles.rowitem}>{row.symbol}</div> */}
                <div className={styles.rowitem}>
                  {String(row.date).slice(0, 4)}
                </div>
                <div className={styles.rowitem}>
                  {parseFloat(row.total_revenue).toFixed(2)}
                </div>
                <div className={styles.rowitem}>
                  {parseFloat(row.revenue_growth).toFixed(2)}
                </div>
                <div className={styles.rowitem}>
                  {parseFloat(row.ebitda).toFixed(2)}
                </div>
                <div className={styles.rowitem}>
                  {parseFloat(row.ebitda_margin_percentage).toFixed(2)}
                </div>
                <div className={styles.rowitem}>
                  {parseFloat(row.net_income).toFixed(2)}
                </div>
                <div className={styles.rowitem}>
                  {parseFloat(row.net_income_growth).toFixed(2)}
                </div>
                <div className={styles.rowitem}>
                  {parseFloat(row.net_income_margin_percentage).toFixed(2)}
                </div>
                <div className={styles.rowitem}>
                  {parseFloat(row.p_per_ltm_eps).toFixed(2)}
                </div>
                <div className={styles.rowitem}>
                  {parseFloat(row.p_per_ntm_eps).toFixed(2)}
                </div>
                <div className={styles.rowitem}>
                  {parseFloat(row.tev_per_ltm_ebidta).toFixed(2)}
                </div>
                <div className={styles.rowitem}>
                  {parseFloat(row.tev_per_ntm_ebidta).toFixed(2)}
                </div>
                <div className={styles.rowitem}>
                  {parseFloat(row.peg_ratio).toFixed(2)}
                </div>
                <div className={styles.rowitem}>
                  {parseFloat(row.market_capitalization).toFixed(2)}
                </div>
                <div className={styles.rowitem}>
                  {parseFloat(row.return_on_equity).toFixed(2)}
                </div>
                <div className={styles.rowitem}>
                  {parseFloat(row.return_on_capital).toFixed(2)}
                </div>
                <div className={styles.rowitem}>
                  {parseFloat(row.share_price).toFixed(2)}
                </div>
                <div className={styles.rowitem}>
                  {parseFloat(row.stock_return).toFixed(2)}
                </div>
                <div className={styles.rowitem}>
                  {parseFloat(row.volume).toFixed(2)}
                </div>
                <div className={styles.rowitem}>
                  {parseFloat(row.lt_debt_per_equity).toFixed(2)}
                </div>
                <div className={styles.rowitem}>
                  {parseFloat(row.ebitda_per_interest_exp).toFixed(2)}
                </div>
                <div className={styles.rowitem}>
                  {parseFloat(row.net_debt_per_ebitda).toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
