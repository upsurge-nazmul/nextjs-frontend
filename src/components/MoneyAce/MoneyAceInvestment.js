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
        setassetchartdata(res.data.data);
        // console.log(res.data.data.chart_data);
        let d = res.data.data;
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
          // { name: "FD", value: d.fd_value },
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
      {currentmode === "main" && (
        <BackSvg
          className={styles.back}
          onClick={() => {
            setcurrenttab("dashboard");
          }}
        />
      )}
      <div className={styles.main}>
        <p className={styles.heading}>
          <img
            className={styles.headingicon}
            src="https://i.ibb.co/vP38sSj/Invest.png"
            alt=""
          />
          Investment Hub
          {!accountopened && <p className={styles.whiteheading}>ACCOUNT</p>}
          <div
            className={styles.bulletinbtn}
            onClick={() => setmode("bulletin")}
          >
            <NewspaperRoundedIcon className={styles.bulletinicon} />
          </div>
        </p>
        {accountopened &&
          (currentmode === "main" ? (
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
                        fill: "#ffffff",
                      },
                    },
                    axis: {
                      ticks: {
                        text: {
                          fill: "#fff",
                        },
                      },
                      legend: {
                        text: {
                          fill: "#fff",
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
                <p className={styles.head}>Asset Values</p>
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
          ) : currentmode === "stock" ? (
            <StocksDiv
              setcurrentmode={setcurrentmode}
              setcurrenttab={setcurrenttab}
              settoastdata={settoastdata}
              setmoneyacedata={setmoneyacedata}
            />
          ) : currentmode === "realestate" ? (
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
        {!accountopened && (
          <div className={styles.openacc}>
            <div className={styles.main}>
              <div className={styles.heading}>
                <div className={styles.namewrapper}>
                  <img
                    src="https://i.ibb.co/yXFLZCQ/Green-Header-Small-BG.png"
                    alt=""
                  />
                  <p>
                    {moneyacedata.is_demat_account_open
                      ? "Account details"
                      : "upsurge demat form"}
                  </p>
                </div>
              </div>
              <div className={styles.form}>
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
                <div className={styles.row}>
                  <div className={styles.chkbx}>
                    {userdata.gender === "male" ? (
                      <img
                        className={styles.Checkbox}
                        src="https://i.ibb.co/JjkK9wf/checkboxfilled.png"
                        alt=""
                      />
                    ) : (
                      <img
                        className={styles.Checkbox}
                        src="https://i.ibb.co/Gk8h9Sc/checkboxemptu.png"
                        alt=""
                      />
                    )}
                    <p>Male</p>
                    {userdata.gender === "female" ? (
                      <img
                        className={styles.Checkbox}
                        src="https://i.ibb.co/JjkK9wf/checkboxfilled.png"
                        alt=""
                      />
                    ) : (
                      <img
                        className={styles.Checkbox}
                        src="https://i.ibb.co/Gk8h9Sc/checkboxemptu.png"
                        alt=""
                      />
                    )}
                    <p>Female</p>
                  </div>
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
      {accountopened && currentmode === "main" && (
        <div className={styles.bottomrow}>
          <div className={styles.btn} onClick={() => setcurrentmode("stock")}>
            <p>Stocks</p>
          </div>
          <div
            className={styles.btn}
            onClick={() => setcurrentmode("realestate")}
          >
            <p>Real Estate</p>
          </div>
          <div className={styles.btn} onClick={() => setcurrentmode("gold")}>
            <p>Gold</p>
          </div>
          <div className={styles.btn} onClick={() => setcurrentmode("fd")}>
            <p>FD</p>
          </div>
          <div
            className={styles.btn}
            onClick={() => setcurrentmode("retirement")}
          >
            <p>Retirement</p>
          </div>{" "}
          <div className={styles.btn} onClick={() => setcurrenttab("Bank")}>
            <p>Savings A/c</p>
          </div>
        </div>
      )}
      {/* <BackSvg
        className={styles.back}
        onClick={() => {
          if (currentmode !== "main") {
            setcurrentmode("main");
            return;
          }
          setcurrenttab("dashboard");
        }}
      /> */}
    </div>
  );
}
