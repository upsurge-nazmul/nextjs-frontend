import React, { useContext, useState, useEffect } from "react";
import styles from "../../styles/Home/values.module.scss";
import Money from "../../components/SVGcomponents/ValuesPage/Money";
import ManageMoney from "../../components/SVGcomponents/ValuesPage/ManageMoneySvg";
import BudgetSvg from "../../components/SVGcomponents/ValuesPage/BudgetSvg";
import BusinessSvg from "../../components/SVGcomponents/ValuesPage/BusinessSvg";
import EntrepreneurSvg from "../../components/SVGcomponents/ValuesPage/EntrepreneurSvg";
import { useRouter } from "next/dist/client/router";
import { MainContext } from "../../context/Main";
import TryUpsurge from "./TryUpsurge";
import Image from "next/image";

export default function Values({ insidebenefits, setauthmode, setshowauth }) {
  const router = useRouter();
  const { widthHeight } = useContext(MainContext);
  const [current, setcurrent] = useState(1);
  const [showauth1, setshowauth1] = useState(false);
  const [authmode1, setauthmode1] = useState("");
  const values = [
    {
      a: "1",
    },
    {
      a: "2",
    },
    { a: "3" },
    {
      a: "4",
    },
    { a: "5" },
  ];
  useEffect(() => {
    setauthmode1(authmode1);
    setshowauth1(showauth1);
  }, [authmode1, showauth1]);
  const [interval, setinterval] = useState(null);
  useEffect(() => {
    if (!insidebenefits) {
      return;
    }
    if (interval) {
      return;
    }
    if (widthHeight.width > 860) {
      if (interval) clearInterval(interval);
      return;
    }
    setinterval(setInterval(() => setcurrent((prev) => (prev + 1) % 5), 2000));
    return () => clearInterval(interval);
  }, [widthHeight]);
  return (
    <div
      className={`${styles.valueSection} ${
        insidebenefits && styles.benefitmodifications
      }`}
    >
      <h2 className={styles.heading}>
        Through upsurge, we aim to create a money-wise generation by providing
        Financial Literacy for Kids and Students{" "}
      </h2>
      {widthHeight.width < 860 && insidebenefits ? (
        <div className={styles.mobilesection}>
          <div className={styles.holder}>
            {current === 1 ? (
              <Money
                className={styles.icon}
                onClick={() => router.push("/benefits")}
              />
            ) : current === 2 ? (
              <ManageMoney
                className={styles.icon}
                onClick={() => router.push("/benefits")}
              />
            ) : current === 3 ? (
              <BudgetSvg
                className={styles.icon}
                onClick={() => router.push("/benefits")}
              />
            ) : current === 4 ? (
              <EntrepreneurSvg
                className={styles.icon}
                onClick={() => router.push("/benefits")}
              />
            ) : (
              <BusinessSvg
                className={styles.icon}
                onClick={() => router.push("/benefits")}
              />
            )}
            <p>
              {current === 1
                ? `Understand how ‘money’ works in the 21st century`
                : current === 2
                ? `Learn to wisely manage money & be fiscally responsible `
                : current === 3
                ? `Practice profitable Investing & multiply their money `
                : current === 4
                ? `Develop an entrepreneurial & growth mindset `
                : `Understand, evaluate & start businesses`}
            </p>
          </div>
          <div className={styles.navbar}>
            {values.map((item, index) => {
              return (
                <div
                  className={`${styles.ball} ${
                    index === current ? styles.active : null
                  }`}
                  key={"values" + index}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <>
          <div className={styles.midSection}>
            <div className={styles.holder}>
              <Money
                className={styles.icon}
                onClick={() => router.push("/benefits")}
              />
              <h3>Understand how ‘money’ works in the 21st century</h3>
            </div>
            <div className={styles.holder}>
              <ManageMoney
                className={styles.icon}
                onClick={() => router.push("/benefits")}
              />
              <h3>Learn to wisely manage money & be fiscally responsible </h3>
            </div>
            <div className={styles.holder}>
              <BudgetSvg
                className={styles.icon}
                onClick={() => router.push("/benefits")}
              />
              <h3>Practice profitable Investing & multiply their money </h3>
            </div>
          </div>
          <div className={styles.lowSection}>
            <div className={styles.holder}>
              <EntrepreneurSvg
                className={styles.icon}
                onClick={() => router.push("/benefits")}
              />
              <h3>{`Develop an entrepreneurial & growth mindset `}</h3>
            </div>
            <div className={styles.holder}>
              <BusinessSvg
                className={styles.icon}
                onClick={() => router.push("/benefits")}
              />
              <h3>{`Understand, evaluate & start businesses`}</h3>
            </div>
          </div>
        </>
      )}
      <div style={{ width: "100%" }}>
        <TryUpsurge
          content={"Get upsurge free"}
          setauthmode={setauthmode1}
          setshowauth={setshowauth1}
        />
      </div>
    </div>
  );
}
