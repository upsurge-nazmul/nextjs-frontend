import React, { useContext, useState, useEffect } from "react";
import styles from "../../styles/Home/values.module.scss";
import Money from "../../components/SVGcomponents/ValuesPage/Money";
import ManageMoney from "../../components/SVGcomponents/ValuesPage/ManageMoneySvg";
import BudgetSvg from "../../components/SVGcomponents/ValuesPage/BudgetSvg";
import BusinessSvg from "../../components/SVGcomponents/ValuesPage/BusinessSvg";
import EntrepreneurSvg from "../../components/SVGcomponents/ValuesPage/EntrepreneurSvg";
import { useRouter } from "next/dist/client/router";
import { MainContext } from "../../context/Main";

export default function Values({ insidebenefits }) {
  const router = useRouter();
  const { widthHeight } = useContext(MainContext);
  const [current, setcurrent] = useState(1);
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
      <div className={styles.heading}>
        Through upsurge, we wish to create a money-wise generation by helping
        children{" "}
      </div>
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
        </div>
      ) : (
        <>
          <div className={styles.midSection}>
            <div className={styles.holder}>
              <Money
                className={styles.icon}
                onClick={() => router.push("/benefits")}
              />
              <p>Understand how ‘money’ works in the 21st century</p>
            </div>
            <div className={styles.holder}>
              <ManageMoney
                className={styles.icon}
                onClick={() => router.push("/benefits")}
              />
              <p>Learn to wisely manage money & be fiscally responsible </p>
            </div>
            <div className={styles.holder}>
              <BudgetSvg
                className={styles.icon}
                onClick={() => router.push("/benefits")}
              />
              <p>Practice profitable Investing & multiply their money </p>
            </div>
          </div>
          <div className={styles.lowSection}>
            <div className={styles.holder}>
              <EntrepreneurSvg
                className={styles.icon}
                onClick={() => router.push("/benefits")}
              />
              <p>{`Develop an entrepreneurial & growth mindset `}</p>
            </div>
            <div className={styles.holder}>
              <BusinessSvg
                className={styles.icon}
                onClick={() => router.push("/benefits")}
              />
              <p>{`Understand, evaluate & start businesses`}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
