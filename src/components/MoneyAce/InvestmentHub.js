import React, { useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import styles from "../../styles/MoneyAce/investmenthub.module.scss";
import BigBackArrow from "../SVGcomponents/BigBackArrow";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";

export default function InvestmentHub({ setcurrenttab }) {
  const data = [
    {
      id: "stocks",
      color: "#17D1BC",
      data: [
        {
          x: "plane",
          y: 258,
        },
        {
          x: "helicopter",
          y: 155,
        },
        {
          x: "boat",
          y: 244,
        },
        {
          x: "train",
          y: 212,
        },
        {
          x: "subway",
          y: 213,
        },
        {
          x: "bus",
          y: 156,
        },
        {
          x: "car",
          y: 296,
        },
        {
          x: "moto",
          y: 106,
        },
        {
          x: "bicycle",
          y: 100,
        },
        {
          x: "horse",
          y: 101,
        },
        {
          x: "skateboard",
          y: 45,
        },
        {
          x: "others",
          y: 194,
        },
      ],
    },
    {
      id: "Real Estate",
      color: "#FF6263",
      data: [
        {
          x: "plane",
          y: 2528,
        },
        {
          x: "helicopter",
          y: 1255,
        },
        {
          x: "boat",
          y: 2244,
        },
        {
          x: "train",
          y: 212,
        },
        {
          x: "subway",
          y: 213,
        },
        {
          x: "bus",
          y: 156,
        },
        {
          x: "car",
          y: 296,
        },
        {
          x: "moto",
          y: 106,
        },
        {
          x: "bicycle",
          y: 100,
        },
        {
          x: "horse",
          y: 101,
        },
        {
          x: "skateboard",
          y: 45,
        },
        {
          x: "others",
          y: 194,
        },
      ],
    },
    {
      id: "Gold",
      color: "#FDCC03",
      data: [
        {
          x: "plane",
          y: 2528,
        },
        {
          x: "helicopter",
          y: 1255,
        },
        {
          x: "boat",
          y: 2244,
        },
        {
          x: "train",
          y: 212,
        },
        {
          x: "subway",
          y: 213,
        },
        {
          x: "bus",
          y: 156,
        },
        {
          x: "car",
          y: 296,
        },
        {
          x: "moto",
          y: 106,
        },
        {
          x: "bicycle",
          y: 100,
        },
        {
          x: "horse",
          y: 101,
        },
        {
          x: "skateboard",
          y: 425,
        },
        {
          x: "others",
          y: 154,
        },
      ],
    },
    {
      id: "FD",
      color: "#4166EB",
      data: [
        {
          x: "plane",
          y: 2228,
        },
        {
          x: "helicopter",
          y: 1555,
        },
        {
          x: "boat",
          y: 2244,
        },
        {
          x: "train",
          y: 2212,
        },
        {
          x: "subway",
          y: 213,
        },
        {
          x: "bus",
          y: 156,
        },
        {
          x: "car",
          y: 2926,
        },
        {
          x: "moto",
          y: 1106,
        },
        {
          x: "bicycle",
          y: 1010,
        },
        {
          x: "horse",
          y: 1011,
        },
        {
          x: "skateboard",
          y: 4125,
        },
        {
          x: "others",
          y: 154,
        },
      ],
    },
    {
      id: "Retirement",
      color: "#90d117",
      data: [
        {
          x: "plane",
          y: 200,
        },
        {
          x: "helicopter",
          y: 200,
        },
        {
          x: "boat",
          y: 200,
        },
        {
          x: "train",
          y: 1212,
        },
        {
          x: "subway",
          y: 200,
        },
        {
          x: "bus",
          y: 1561,
        },
        {
          x: "car",
          y: 200,
        },
        {
          x: "moto",
          y: 1106,
        },
        {
          x: "bicycle",
          y: 200,
        },
        {
          x: "horse",
          y: 1011,
        },
        {
          x: "skateboard",
          y: 4125,
        },
        {
          x: "others",
          y: 154,
        },
      ],
    },
    {
      id: "Fund Saving",
      color: "#ff8762",
      data: [
        {
          x: "plane",
          y: 100,
        },
        {
          x: "helicopter",
          y: 100,
        },
        {
          x: "boat",
          y: 100,
        },
        {
          x: "train",
          y: 100,
        },
        {
          x: "subway",
          y: 100,
        },
        {
          x: "bus",
          y: 100,
        },
        {
          x: "car",
          y: 100,
        },
        {
          x: "moto",
          y: 100,
        },
        {
          x: "bicycle",
          y: 100,
        },
        {
          x: "horse",
          y: 100,
        },
        {
          x: "skateboard",
          y: 100,
        },
        {
          x: "others",
          y: 100,
        },
      ],
    },
  ];
  const entities = [
    "Stocks",
    "Real Estate",
    "Gold",
    "FD",
    "Retirement",
    "Saving Account",
  ];
  const [mode, setmode] = useState("all");
  const [passbookfilter, setpassbookfilter] = useState("all");
  const demoPortfolio = [
    { name: "Stocks", value: 800 },
    { name: "Real Estate", value: 800 },
    { name: "Gold", value: 800 },
    { name: "FD", value: 800 },
    { name: "Retirement", value: 800 },
    { name: "Saving Account", value: 800 },
  ];
  return (
    <div className={styles.investmenthub}>
      <div className={styles.main}>
        <img
          className={styles.bgimage}
          src="/images/backgrounds/laptop.png"
          alt=""
        />

        <div className={styles.bg}>
          {mode === "passbook" ? (
            <>
              <p className={styles.heading}>
                <BigBackArrow
                  onClick={() => setmode("all")}
                  className={styles.headingicon}
                />
                Passbook
              </p>
              <div className={styles.headwrapper}>
                {entities.map((item) => {
                  return (
                    <div
                      className={`${styles.entity} ${
                        passbookfilter === item && styles.selectedentity
                      }`}
                      key={item}
                      onClick={() => {
                        if (passbookfilter === item) {
                          return setpassbookfilter("all");
                        }
                        setpassbookfilter(item);
                      }}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
              <div className={styles.wrapper}>
                <div className={styles.hrow}>
                  <p>Date</p>
                  <p>Particulars</p>
                  <p className={styles.debitcred}>
                    <span className={styles.debt}>Debit</span> /{" "}
                    <span className={styles.cred}>Credit</span>
                    {` (₹)`}
                  </p>
                  <p>{`Balance(₹)`}</p>
                </div>
                <div className={styles.row}>
                  <p>22/02/2022</p>
                  <p>Stocks</p>
                  <p>500</p>
                  <p>2500</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className={styles.heading}>
                <BigBackArrow
                  onClick={() => setcurrenttab("citymap")}
                  className={styles.headingicon}
                />
                Investment Hub
                <div className={styles.bulletin}>
                  <NewspaperRoundedIcon className={styles.bulletinicon} />
                </div>
              </p>
              <div className={styles.headwrapper}>
                {entities.map((item) => {
                  return (
                    <div
                      className={`${styles.entity} ${
                        mode === item && styles.selectedentity
                      }`}
                      key={item}
                      onClick={() => {
                        if (mode === item) {
                          return setmode("all");
                        }
                        setmode(item);
                      }}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
              <div className={styles.bottomcontainer}>
                <div className={styles.graph}>
                  <ResponsiveLine
                    data={data}
                    margin={{ top: 40, right: 50, bottom: 60, left: 60 }}
                    xScale={{ type: "point" }}
                    colors={{ datum: "color" }}
                    yScale={{
                      type: "linear",
                      min: "auto",
                      max: "auto",
                      stacked: true,
                      reverse: false,
                    }}
                    yFormat=" >-.2f"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                      orient: "bottom",
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
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
                    pointSize={10}
                    pointColor={{ theme: "background" }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: "serieColor" }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                  />
                </div>
                <div className={styles.buttons}>
                  {mode !== "all" && (
                    <>
                      <div className={styles.button}>Buy</div>
                      <div className={styles.button}>Sell</div>
                    </>
                  )}
                  <div
                    className={styles.passbookbtn}
                    onClick={() => {
                      if (mode !== "all") {
                        setpassbookfilter(mode);
                      }
                      setmode("passbook");
                    }}
                  >
                    Passbook
                  </div>
                  <div className={styles.portfolio}>
                    <p className={styles.heading}>Portfolio</p>
                    {demoPortfolio.map((item, index) => {
                      if (mode !== "all" && mode !== item.name) {
                        return null;
                      }
                      return (
                        <div className={styles.row} key={"portfolio" + index}>
                          <p>{item.name}</p>
                          <p>{item.value}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
