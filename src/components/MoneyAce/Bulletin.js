import React, { useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import MoneyAceApis from "../../actions/apis/MoneyAceApis";
import styles from "../../styles/MoneyAce/bulletin.module.scss";
const demodata = [
  "GDP grew at 7.5% during the year",
  "Inflation was recorded at 7% during the year",
  "Interest rate on bank lending was 11% per annum during the year",
  "Stock indices moved down by 21% during the year",
  "Real estate prices moved up by 8% during the year",
  "Gold prices moved down by 1% during the year",
  "Interest rate on Fixed Deposits was 8% per annum during the year",
  "Interest rate on retirement funds was 9% per annum during the year",
  "Interest rate on Savings Account was 4% per annum during the year",
];
const data_international = [
  "GDP growth rates in USA are on an uptrend and US Dollar (USD) is appreciating against other global currencies",
  "Due to increase in GDP growth rates in USA, global crude prices are witnessing an uptick.",
];
export default function Bulletin({ setmode, canvassize }) {
  const [data, setdata] = useState();
  useEffect(() => {
    x();
    async function x() {
      let res = await MoneyAceApis.getbulletin();
      if (res && res.data && res.data.success) {
        setdata(res.data.data);
        console.log(res.data.data);
      }
    }
  }, []);
  return (
    <div className={styles.bulletin}>
      <div className={styles.pageholder}>
        <div className={styles.close} onClick={() => setmode("all")}>
          close
        </div>
        <HTMLFlipBook
          width={canvassize.width}
          height={canvassize.height + 50}
          size="stretch"
          maxWidth={600}
        >
          <div className={styles.page}>
            <div className={styles.pagecontent}>
              <p className={styles.pageno}>Page : 1</p>
              <p className={styles.heading}>FINANCIAL BULLETIN</p>
              <p className={styles.lowpdetail}>WRITTEN BY: UPSURGE</p>
              <p className={styles.highpdetail}>
                {`PREVIOUS YEAR’S ECONOMICS PERFORMANCE`}
              </p>
              <div className={styles.table}>
                <p className={styles.tableheading}>Economic indicator</p>
                <div className={styles.row}>
                  <p>GDP growth %</p>
                  <p>{data?.prev_data?.gdp || "7"}%</p>
                </div>
                <div className={styles.row}>
                  <p>Inflation %</p>
                  <p>{data?.prev_data?.inflation || "7"}%</p>
                </div>
                <div className={styles.row}>
                  <p>Intrest rates %</p>
                  <p>{data?.prev_data?.gdp || "7"}%</p>
                </div>
                <p className={styles.tableheading}>Asset returns</p>
                <div className={styles.row}>
                  <p>Stock market index</p>
                  <p>{data?.prev_data?.sensex_change || "7"}%</p>
                </div>
                <div className={styles.row}>
                  <p>Real estate price</p>
                  <p>{data?.prev_data?.realestate_change || "7"}%</p>
                </div>
                <div className={styles.row}>
                  <p>Gold price (per 10g)</p>
                  <p>{data?.prev_data?.gold_change || "7"}%</p>
                </div>
                <div className={styles.row}>
                  <p>FD rate %</p>
                  <p>{data?.prev_data?.fd_change || "7"}%</p>
                </div>
                <div className={styles.row}>
                  <p>Retirement funds rate %</p>
                  <p>{data?.prev_data?.retirementfund_change || "7"}%</p>
                </div>
                <div className={styles.row}>
                  <p>Savings rate %</p>
                  <p>{data?.prev_data?.saving_change || "7"}%</p>
                </div>
              </div>
              <ul className={styles.list}>
                {data?.prev_data?.economic_outlook.split("\n")?.map((item) => {
                  if (item === " " || !item) return null;
                  return <li key={item}>{item}</li>;
                })}
              </ul>
            </div>
          </div>
          <div className={styles.page}>
            {" "}
            <div className={styles.pagecontent}>
              <p className={styles.pageno}>Page : 2</p>
              <p className={styles.heading}>FINANCIAL BULLETIN</p>
              <p className={styles.lowpdetail}>WRITTEN BY: UPSURGE</p>
              <p className={styles.highpdetail}>
                {`CURRENT YEAR'S ECONOMIC OUTLOOK`}
              </p>
              <div className={styles.table}>
                <p className={styles.tableheading}>Economic indicator</p>
                <div className={styles.row}>
                  <p>GDP growth %</p>
                  <p>{data?.current_data?.gdp || "7"}%</p>
                </div>
                <div className={styles.row}>
                  <p>Inflation %</p>
                  <p>{data?.current_data?.inflation || "7"}%</p>
                </div>
                <div className={styles.row}>
                  <p>Intrest rates %</p>
                  <p>{data?.current_data?.gdp || "7"}%</p>
                </div>
                <p className={styles.tableheading}>Asset returns</p>
                <div className={styles.row}>
                  <p>Stock market index</p>
                  <p>{data?.current_data?.sensex_change || "7"}%</p>
                </div>
                <div className={styles.row}>
                  <p>Real estate price</p>
                  <p>{data?.current_data?.realestate_change || "7"}%</p>
                </div>
                <div className={styles.row}>
                  <p>Gold price (per 10g)</p>
                  <p>{data?.current_data?.gold_change || "7"}%</p>
                </div>
                <div className={styles.row}>
                  <p>FD rate %</p>
                  <p>{data?.current_data?.fd_change || "7"}%</p>
                </div>
                <div className={styles.row}>
                  <p>Retirement funds rate %</p>
                  <p>{data?.current_data?.retirementfund_change || "7"}%</p>
                </div>
                <div className={styles.row}>
                  <p>Savings rate %</p>
                  <p>{data?.current_data?.saving_change || "7"}%</p>
                </div>
              </div>
              <p className={styles.subheading}>International News</p>
              <div className={styles.news}>
                <div className={styles.left}>
                  <ul className={styles.list}>
                    {data?.current_data?.international_news
                      .split("\n")
                      ?.map((item) => {
                        if (item === " " || !item) return null;
                        return <li key={item}>{item}</li>;
                      })}
                  </ul>
                </div>
                <div className={styles.right}>
                  <img
                    className={styles.img}
                    src="https://imgcdn.upsurge.in/images/Dark-Green-Modern-Gradient-Wave-Linktree-Background-1-2.png"
                    alt=""
                  ></img>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.page}>
            {" "}
            <div className={styles.pagecontent}>
              <p className={styles.pageno}>Page : 3</p>
              <p className={styles.heading}>FINANCIAL BULLETIN</p>
              <p className={styles.lowpdetail}>WRITTEN BY: UPSURGE</p>
              <p className={styles.highpdetail}>
                {`CURRENT YEAR'S ECONOMIC OUTLOOK`}
              </p>
              <p className={styles.subheading}>Domestic News</p>
              <div className={styles.news}>
                <div className={styles.left}>
                  <ul className={styles.list}>
                    {data?.current_data?.domestic_news
                      .split("\n")
                      ?.map((item) => {
                        if (item === " " || !item) return null;
                        return <li key={item}>{item}</li>;
                      })}
                  </ul>
                </div>
                <div className={styles.right}>
                  <img
                    className={styles.img}
                    src="https://imgcdn.upsurge.in/images/Dark-Green-Modern-Gradient-Wave-Linktree-Background-3-4.png"
                    alt=""
                  ></img>
                </div>
              </div>
              <p className={styles.subheading}>Economic outlook for the year</p>
              <div className={styles.news}>
                <div className={styles.left}>
                  <ul className={styles.list}>
                    {data?.current_data?.economic_outlook
                      .split("\n")
                      ?.map((item) => {
                        if (item === " " || !item) return null;
                        return <li key={item}>{item}</li>;
                      })}
                  </ul>
                </div>
                <div className={styles.right}>
                  <img
                    className={styles.img}
                    src="https://imgcdn.upsurge.in/images/Dark-Green-Modern-Gradient-Wave-Linktree-Background-4-1.png"
                    alt=""
                  ></img>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.page}>
            {" "}
            <div className={styles.pagecontent}>
              <p className={styles.pageno}>Page : 4</p>
              <p className={styles.heading}>FINANCIAL BULLETIN</p>
              <p className={styles.lowpdetail}>WRITTEN BY: UPSURGE</p>
              <p className={styles.highpdetail}>
                {`CURRENT YEAR'S ECONOMIC OUTLOOK`}
              </p>
              <p className={styles.subheading}>
                Consensus estimates for various asset classes
              </p>
              <div className={styles.news}>
                <div className={styles.left}>
                  <ul className={styles.list}>
                    {data?.current_data?.consensus_estimates
                      .split("\n")
                      ?.map((item) => {
                        if (item === " " || !item) return null;
                        return <li key={item}>{item}</li>;
                      })}
                  </ul>
                </div>
                <div className={styles.right}>
                  <img
                    className={styles.img}
                    src="https://imgcdn.upsurge.in/images/Dark-Green-Modern-Gradient-Wave-Linktree-Background-2-1.png"
                    alt=""
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </HTMLFlipBook>
      </div>
    </div>
  );
}
