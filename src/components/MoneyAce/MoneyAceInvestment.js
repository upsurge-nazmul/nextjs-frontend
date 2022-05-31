import React, { useContext, useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import styles from "../../styles/MoneyAce/investmenthub.module.scss";
import BigBackArrow from "../SVGcomponents/BigBackArrow";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import { Checkbox, Slider } from "@mui/material";
import HTMLFlipBook from "react-pageflip";
import BackSvg from "../SVGcomponents/MoneyAce/ui/BackSvg";
import BankDialog from "./BankDialog";
import { onlyNum, removenonnumber } from "../../helpers/validationHelpers";
import BankCards from "./BankCards";
import { MainContext } from "../../context/Main";
import { getIndianTime } from "../../helpers/timehelpers";
import { toIndianFormat } from "../../helpers/currency";
import MoneyAceApis from "../../actions/apis/MoneyAceApis";
import StocksDiv from "./Investment/StocksDiv";
import RealEstate from "./Investment/RealEstate";
import FDdiv from "./Investment/FDdiv";
import Golddiv from "./Investment/Golddiv";
import RetirementDiv from "./Investment/RetirementDiv";
import Bulletin from "./Bulletin";
import NineSlice from "../NineSlice";
export default function MoneyAceInvestment({
  setcurrenttab,
  canvassize,
  moneyacedata,
  setmoneyacedata,
  settoastdata,
  currentmode,
  setcurrentmode,
}) {
  const { setuser, userdata, setuserdata, widthHeight, setshowmenu } =
    useContext(MainContext);
  const [accountopened, setacoountopened] = useState(
    moneyacedata?.is_demat_account_open
  );
  const [assetdata, setassetdata] = useState(null);
  const [assetchartdata, setassetchartdata] = useState([]);
  const [mode, setmode] = useState("all");
  async function handleopenaccount() {
    let response = await MoneyAceApis.openDematAccount();
    if (response && response.data && response.data.success) {
      setmoneyacedata((prev) => ({ ...prev, ...response.data.data }));
      setacoountopened(true);
    }
  }
  useEffect(() => {
    if (mode !== "all") return;
    loadassetdata();
    async function loadassetdata() {
      let res = await MoneyAceApis.investmentrecords();
      if (res && res.data && res.data.success) {
        setassetchartdata(res.data.data.chartdata);
        // console.log(res.data.data.chart_data);
        let d = res.data.data.chartdata;
        console.log(d);
        if (d[0].data.length === 0 || d[1].data.length === 0) {
          setassetdata([
            {
              name: "Current Value",
              value: "₹" + 0,
            },
            {
              name: "Total investment",
              value: "₹" + 0,
            },
            {
              name: "Total return",
              value: "₹" + 0,
            },
          ]);
          return;
        }

        setassetdata([
          {
            name: "Current Value",
            value: "₹" + toIndianFormat(d[0].data[d[0].data.length - 1].y),
          },
          {
            name: "Total investment",
            value: "₹" + toIndianFormat(d[1].data[d[1].data.length - 1].y),
          },
          {
            name: "Total return",
            value:
              "₹" +
              toIndianFormat(
                d[0].data[d[0].data.length - 1].y -
                  d[1].data[d[1].data.length - 1].y
              ),
          },
          {
            name: "Average market return",
            value: res.data.data.market_average + " %",
          },
          // { name: "Retirement", value: d.retirementfund_value },
          // { name: "Saving Account", value: d.saving_value },
          // { name: "Crypto", value: d.crypto_value },
        ]);
      }
    }
  }, [mode]);
  return (
    <div className={styles.investment}>
      {mode === "bulletin" && (
        <Bulletin canvassize={canvassize} setmode={setmode} />
      )}

      <div className={styles.main}>
        <div className={styles.heading}>
          <NineSlice
            width={
              widthHeight.width < 860
                ? widthHeight.width * 0.18
                : widthHeight.width * 0.12
            }
            height={
              widthHeight.width < 860
                ? widthHeight.width * 0.05
                : widthHeight.width * 0.035
            }
            border={5}
            image="https://i.ibb.co/8Y5SZQ9/title-header-1.png"
            imageSize={{ x: 702, y: 195 }}
          >
            <p className={styles.title}>
              {currentmode === "main" ? "INVESTMENT HUB" : currentmode}
            </p>
          </NineSlice>
        </div>
        <div className={styles.mainbg}>
          <div className={styles.innerbg}></div>
        </div>
        {accountopened && (
          <div className={styles.container}>
            <div className={styles.graph}>
              <ResponsiveLine
                data={assetchartdata}
                margin={{ top: 40, right: 50, bottom: 60, left: 60 }}
                xScale={{ type: "point" }}
                colors={{ datum: "color" }}
                axisTop={null}
                axisRight={null}
                enableArea
                axisBottom={{
                  orient: "bottom",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: -15,
                  legend: "Month",
                  legendOffset: 40,
                  legendPosition: "middle",
                }}
                axisLeft={{
                  orient: "left",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Amount",
                  legendOffset: -50,
                  legendPosition: "middle",
                }}
                theme={{
                  dots: {
                    text: {
                      fill: "#380000",
                    },
                  },
                  axis: {
                    ticks: {
                      text: {
                        fill: "#380000",
                      },
                    },
                    legend: {
                      text: {
                        fill: "#380000",
                      },
                    },
                  },
                }}
                useMesh
                pointSize={10}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabelYOffset={-12}
              />
            </div>
            <div className={styles.right}>
              <div className={styles.wrapper}>
                {assetdata &&
                  assetdata.map((item, index) => {
                    return (
                      <div className={styles.row} key={"portfolio" + index}>
                        <p>
                          <div
                            className={styles.circle}
                            style={{
                              backgroundColor: assetchartdata
                                ? assetchartdata[index]?.color
                                : "white",
                            }}
                          ></div>
                          {item.name}
                        </p>
                        <p className={styles.value}>{item.value}</p>
                      </div>
                    );
                  })}
              </div>
              {/* <div className={styles.bottombtns}>
          <p className={styles.btn}>
            <p>Buy</p>
          </p>
          <p className={styles.btn}>
            <p>Sell</p>
          </p>
          <p className={styles.btn}>
            <p>Passbook</p>
          </p>
        </div> */}
            </div>
          </div>
        )}
        {currentmode === "stock" && (
          <StocksDiv
            setcurrentmode={setcurrentmode}
            setcurrenttab={setcurrenttab}
            settoastdata={settoastdata}
            setmoneyacedata={setmoneyacedata}
          />
        )}
        {accountopened &&
          (currentmode === "realestate" ? (
            <RealEstate
              setcurrentmode={setcurrentmode}
              setcurrenttab={setcurrenttab}
              settoastdata={settoastdata}
              setmoneyacedata={setmoneyacedata}
            />
          ) : currentmode === "fd" ? (
            <FDdiv
              setcurrentmode={setcurrentmode}
              settoastdata={settoastdata}
              setcurrenttab={setcurrenttab}
              setmoneyacedata={setmoneyacedata}
              moneyacedata={moneyacedata}
            />
          ) : currentmode === "gold" ? (
            <Golddiv
              setcurrentmode={setcurrentmode}
              settoastdata={settoastdata}
              setcurrenttab={setcurrenttab}
              setmoneyacedata={setmoneyacedata}
              moneyacedata={moneyacedata}
            />
          ) : currentmode === "retirement" ? (
            <RetirementDiv
              setcurrentmode={setcurrentmode}
              settoastdata={settoastdata}
              setmoneyacedata={setmoneyacedata}
              setcurrenttab={setcurrenttab}
              moneyacedata={moneyacedata}
            />
          ) : null)}
        {accountopened && currentmode === "main" && (
          <div className={styles.bottomrow}>
            <div
              className={styles.backbutton}
              onClick={() => setcurrenttab("dashboard")}
            >
              <img
                src="https://i.ibb.co/NxvRf9Z/icon-arrow3-left-0-1.png"
                alt=""
              />
            </div>
            <div className={styles.btn} onClick={() => setcurrentmode("stock")}>
              <img
              className={styles.blackImage}
                src="https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/moneyace_investment_icons/stock.png"
                alt=""
              />
              <p>Stocks</p>
            </div>
            <div
              className={styles.btn}
              onClick={() => setcurrentmode("realestate")}
            >
              <img
              className={styles.blackImage}
                src="https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/moneyace_investment_icons/home-insurance.png"
                alt=""
              />
              <p>Real Estate</p>
            </div>
            <div className={styles.btn} onClick={() => setcurrentmode("gold")}>
              <img
              className={styles.blackImage}
                src="https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/moneyace_investment_icons/gold-ingots.png"
                alt=""
              />
              <p>Gold</p>
            </div>
            <div className={styles.btn} onClick={() => setcurrentmode("fd")}>
              <img
              className={styles.blackImage}
                src="https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/moneyace_investment_icons/fd.png"
                alt=""
              />
              <p>FD</p>
            </div>
            <div
              className={styles.btn}
              onClick={() => setcurrentmode("retirement")}
            >
              <img
              className={styles.blackImage}
                src="https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/moneyace_investment_icons/pension.png"
                alt=""
              />
              <p>Retirement</p>
            </div>{" "}
            <div className={styles.btn} onClick={() => setcurrenttab("Bank")}>
              <img
                src="https://i.ibb.co/GMnGHP4/icon-moneybag-0-1.png"
                alt=""
              />
              <p>Savings A/c</p>
            </div>
          </div>
        )}
        {!accountopened && (
          <div className={styles.openacc}>
            <div className={styles.main}>
              <div
                className={styles.bg}
                onClick={() => {
                  if (moneyacedata?.account_number) {
                    setacoountopened(true);
                  }
                }}
              ></div>
              <div className={styles.form}>
                <div className={styles.subbg}>
                  <div className={styles.innerbg}></div>
                </div>
                <div className={styles.row}>
                  <p>Your name</p>
                  <input
                    value={(
                      userdata.first_name +
                      " " +
                      (userdata.last_name || "")
                    ).trim()}
                    type="text"
                  />
                </div>
                <div className={styles.row}>
                  <p>Your Dob</p>
                  <input value={getIndianTime(userdata.dob)} type="text" />
                </div>
                <div
                  className={styles.submit}
                  onClick={() => {
                    if (moneyacedata.is_demat_account_open) {
                      setacoountopened(true);
                      return;
                    }
                    handleopenaccount();
                  }}
                >
                  <p>
                    {moneyacedata.is_demat_account_open ? "Close" : "Submit"}
                  </p>
                </div>
              </div>
              <div className={styles.row}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
