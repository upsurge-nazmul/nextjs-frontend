import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import CalculatorRouter from "../../components/Calculators/CalculatorRouter";
import Header from "../../components/Header/Header";
import LeftPanel from "../../components/LeftPanel";
import styles from "../../styles/Calculators/calculatorpage.module.scss";

function CalculatorsPage() {
  const router = useRouter();
  const { calculatorName } = router.query;
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [paths, setpaths] = useState(["home", "calculators"]);
  useEffect(() => {
    if (!data[calculatorName]) {
      router.push("/calculators/main");
    } else {
      if (calculatorName !== "main") {
        setpaths(["home", "calculators", calculatorName]);
      } else {
        setpaths(["home", "calculators"]);
      }

      setHeading(data[calculatorName].heading);
      setSubheading(data[calculatorName].subheading);
    }
  }, [calculatorName]);

  const data = {
    main: {
      name: "main",
      heading: "Calculators",
      subheading: `Upsurge provides a range of calculators from Loans to Deposits. From
      calculating your Personal Loan EMI, to checking your Home Loan
      affordability, Upsurge gives you a whole set of calculators to help
      you make your informed decision. As you embark on a journey to
      fulfil your dreams with a new bike/car or a new home, the calculator
      helps you with a better understanding of expenses. Also, before you
      invest in a Fixed Deposit or Recurring Deposit to save and grow your
      money, you can calculate the interest you will earn`,
    },
    education: {
      heading: "Education",
      subheading: `Map the realisation of your goals/dreams with an EMI Calculator – be it buying a dream home, a car, a vacation, etc. A loan provides the financial resource, and with an EMI facility, repayments become comfortable.`,
      icon: "https://i.ibb.co/Lzc7Hv6/education.png",
    },
    vacation: {
      heading: "Vacation Calculator",
      subheading: `Use this calculator to find the future value of Vacation cost and monthly SIP needed to achieve this goal.`,
      icon: "https://i.ibb.co/VMd438H/icons8-beach-100.png",
    },
    sip: {
      heading: "SIP Calculator",
      subheading: `Prospective investors can think that SIPs and mutual funds are the same. However, SIPs are merely a method of investing in mutual funds, the other method being a lump sum. A SIP calculator is a tool that helps you determine the returns you can avail when parking your funds in such investment tools. Systematic Investment Plan or SIP is a process of investing a fixed sum of money in mutual funds at regular intervals. SIPs usually allow you to invest weekly, quarterly, or monthly.`,
      icon: "data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjMDAwMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHg9IjBweCIgeT0iMHB4Ij48cGF0aCBkPSJNMjM4Ljc5LDI5My4yM2E1LjQ5LDUuNDksMCwwLDAtNS40OCw1LjQ4VjQxMy4xMmE1LjQ4LDUuNDgsMCwwLDAsNS40OCw1LjQ4SDQ0Ni43YTUuNDgsNS40OCwwLDAsMCw1LjQ5LTUuNDhWMjk4LjcxYTUuNDksNS40OSwwLDAsMC01LjQ5LTUuNDhabTIwMi40MywxMTQuNEgyNDQuMjhWMzA0LjJINDQxLjIyWiI+PC9wYXRoPjxwYXRoIGQ9Ik00NzAuNiwyNjkuNjVoLTQ5VjIxNC44NGE1LjY5LDUuNjksMCwwLDAtLjA3LS44M2MwLS40My4wNy0uODguMDctMS4zM1YxODUuNTNhNS40Nyw1LjQ3LDAsMCwwLS4xLTEsMTMuMzMsMTMuMzMsMCwwLDAsLjEtMS41NlYxNTUuODJhNS4xNyw1LjE3LDAsMCwwLDAtLjU3Yy0uNjMtMTUtMjUuODItMjIuNzktNTAuNzItMjIuNzktMTQuOTQsMC0zMCwyLjgyLTM5Ljc4LDguM1YxMjUuNTdhNS40Nyw1LjQ3LDAsMCwwLS4wOS0xLDEzLjM0LDEzLjM0LDAsMCwwLC4wOS0xLjU2Vjk0YzAtLjE0LDAtLjI4LDAtLjQyczAtLjI4LDAtLjQyYzAtMTUuMzItMjUuNTMtMjMuMzUtNTAuNzQtMjMuMzVzLTUwLjc2LDgtNTAuNzYsMjMuMzVjMCwuMTQsMCwuMjgsMCwuNDJzMCwuMjgsMCwuNDJ2MjlhMTMuMzMsMTMuMzMsMCwwLDAsLjEsMS41Niw1LjQ3LDUuNDcsMCwwLDAtLjEsMXYzNi4wOGEzNTIuNzMsMzUyLjczLDAsMCwwLTY2LjE3LDYuMThDMTM5LDEzNSw5Ni43NiwxMzUuNjcsOTQuODksMTM1Ljc2YTUuNDgsNS40OCwwLDAsMC01LjE0LDdsMTMuNDMsNDcuMmMtOS44MSw3LjMyLTM3Ljc5LDMwLjkyLTQwLjc1LDYzLjY1bC0xNSw0Ljg5QTE2LjcyLDE2LjcyLDAsMCwwLDM1LjkyLDI3NC40djM3LjIyYTE2LjcxLDE2LjcxLDAsMCwwLDExLjU1LDE1LjkybDE2LjI2LDUuMzFjMy43OSw3LjYzLDE3LjYsMzIuMzksNDUuOTQsNTIuMjNhMTIuNTgsMTIuNTgsMCwwLDEsNS4xNiw4LjYybDUuODcsNDMuNzNhNS40OCw1LjQ4LDAsMCwwLDUuNDMsNC43NmgzNy41NGE1LjUsNS41LDAsMCwwLDUuNDYtNWwyLjQ5LTI1LjQ5YzcuNDksMi42OCwxOS43OSw1LjcsMzcuNzksNi4yM1Y0MzYuN2E1LjQ5LDUuNDksMCwwLDAsNS40OSw1LjQ5SDQ3MC42YTUuNDksNS40OSwwLDAsMCw1LjQ4LTUuNDlWMjc1LjEzQTUuNDksNS40OSwwLDAsMCw0NzAuNiwyNjkuNjVabS04NS42OCwwYy0uMjQtMS43LS40OS0zLjM5LS43OC01LDEwLTEuMTYsMTkuNTItMy42OCwyNi40OS03LjU4djEyLjYzWk0zMjAuMSwxMjNjMCw0LjM3LTE1LjEsMTIuMzktMzkuNzcsMTIuMzlzLTM5Ljc5LTgtMzkuNzktMTIuMzl2LTE0LjhjOS43OSw1LjQ5LDI0Ljg0LDguMzEsMzkuNzksOC4zMXMzMC0yLjgyLDM5Ljc3LTguM1ptLTM5Ljc3LDIzLjM2YzE0Ljk0LDAsMzAtMi44MiwzOS43Ny04LjN2MTQuNjZjMCw0LjM3LTE1LjEsMTIuMzgtMzkuNzcsMTIuMzgtMy42NywwLTcuMTItLjE4LTEwLjM1LS40OS0yLjQtLjM3LTQuODEtLjctNy4yLTEtMTQuMDktMi41My0yMi4yNC03LjctMjIuMjQtMTAuOVYxMzguMDZDMjUwLjMzLDE0My41NSwyNjUuMzgsMTQ2LjM3LDI4MC4zMywxNDYuMzdaTTQxMC42MywxODNjMCw0LjM3LTE1LjEsMTIuMzgtMzkuNzgsMTIuMzgtMTMuOTIsMC0yNy4yNC0yLjcyLTM0Ljc3LTcuMTItMy42OS0yLjE2LTUtNC4xMy01LTUuMjZWMTcwLjg2YzkuNzksNS40OSwyNC44NCw4LjMxLDM5Ljc4LDguMzFzMzAtMi44MiwzOS43OC04LjMxWk0zMjAuMSwxNjcuNzh2MTEuNTlhMTUwLjQ1LDE1MC40NSwwLDAsMC0xNC43NS02LjA5QTU4LjcyLDU4LjcyLDAsMCwwLDMyMC4xLDE2Ny43OFptNTAuNzUsMzguNTRjMTQuOTQsMCwzMC0yLjgxLDM5Ljc4LTguM3YxNC42NmMwLDQuMzctMTUuMSwxMi4zOS0zOS43OCwxMi4zOWgtLjM5YTEwNSwxMDUsMCwwLDAtMTQuMzMtMTkuNjdBMTE1LjE1LDExNS4xNSwwLDAsMCwzNzAuODUsMjA2LjMyWm0zOS43OCwyMS40MlYyNDJjMCwzLjMxLTkuODcsOS44Ni0yOC43OSwxMS44MmExMjEuMiwxMjEuMiwwLDAsMC02LTE3Ljg5QzM4OS4wNywyMzUuMzgsNDAxLjkzLDIzMi42MSw0MTAuNjMsMjI3Ljc0Wm0tMzkuNzgtODQuMzFjMjQuNjgsMCwzOS43OCw4LDM5Ljc4LDEyLjM5cy0xNS4xLDEyLjM4LTM5Ljc4LDEyLjM4LTM5Ljc4LTgtMzkuNzgtMTIuMzhTMzQ2LjE3LDE0My40MywzNzAuODUsMTQzLjQzWk0yODAuMzMsODAuNzhjMjQuNjcsMCwzOS43Nyw4LDM5Ljc3LDEyLjM4cy0xNS4xLDEyLjM5LTM5Ljc3LDEyLjM5LTM5Ljc5LTgtMzkuNzktMTIuMzlTMjU1LjY1LDgwLjc4LDI4MC4zMyw4MC43OFpNMTc0LjYsNDAxLjE2YTEwLjEzLDEwLjEzLDAsMCwwLTksLjkyLDEwLjI0LDEwLjI0LDAsMCwwLTQuOCw3Ljc3bC0yLjA4LDIxLjM3SDEzMC45M2wtNS4yNC0zOUEyMy41MiwyMy41MiwwLDAsMCwxMTYsMzc2LjA5Yy0zMC41NS0yMS4zOC00My4xMi00OS42Mi00My4yNC00OS45YTUuNTEsNS41MSwwLDAsMC0zLjMzLTNsLTE4LjUxLTZhNS43Nyw1Ljc3LDAsMCwxLTQtNS41VjI3NC40YTUuNzcsNS43NywwLDAsMSw0LTUuNWwxOC41LTZhNS40OSw1LjQ5LDAsMCwwLDMuNzgtNS4wNmMxLTM1LjMsMzktNjAuODEsMzkuMzctNjEuMDZhNS40OSw1LjQ5LDAsMCwwLDIuMjUtNi4wOGwtMTIuMzctNDMuNWMxMi42NCwxLjM2LDM4Ljc5LDcsNTQsMjkuODFhNS41LDUuNSwwLDAsMCw1Ljc2LDIuMzFjMS4wOC0uMjUsMTA5LjQ4LTIzLjc2LDE3MSwyMC40NCwyMi40OSwxNi4xNiwzNi4xNCwzOS42Niw0MC42NSw2OS45M2gtMTU5YTUuNDksNS40OSwwLDAsMC01LjQ5LDUuNDhWNDA3QzE5MS40Myw0MDYuNDIsMTgwLDQwMy4xOCwxNzQuNiw0MDEuMTZabTI5MC41MSwzMC4wNkgyMjAuMzhWMjgwLjYySDM3OS41YTUuNTcsNS41NywwLDAsMCwxLDBoODQuNjFaIj48L3BhdGg+PHBhdGggZD0iTTI2OC40MSwyMDMuODhhNS40OCw1LjQ4LDAsMSwwLDIuODktMTAuNTdjLTQwLjMzLTExLjA1LTcxLjY2LS4zNS03MywuMTFBNS40OCw1LjQ4LDAsMSwwLDIwMiwyMDMuNzdDMjAyLjI0LDIwMy42NywyMzEuMzUsMTkzLjczLDI2OC40MSwyMDMuODhaIj48L3BhdGg+PHBhdGggZD0iTTM0Mi44OCwzODUuNTJjLTEwLjU4LS4yOS0xMi42NC02LjE5LTEyLjgxLTYuNzdhNC43Nyw0Ljc3LDAsMCwwLTkuMjYsMi4yOWMuMTMuNSwzLDExLjI1LDE3LjE3LDEzLjU4djcuNzlhNC43Nyw0Ljc3LDAsMSwwLDkuNTQsMHYtNy44N2M4LjE3LTEuODUsMTUuMy04LjYyLDE3LTE2Ljg1LDEtNS4xNywxLjE1LTE4LjA3LTIwLTI2LjIzLTEwLjEzLTMuOS0xNS4yNi05LjUzLTE0LjA4LTE1LjQ1LDEuMDYtNS4zMiw3LTEwLDEyLjIzLTkuNywxMC41MS4yOSwxMi42MSw2LjExLDEyLjg0LDYuODZhNC43Nyw0Ljc3LDAsMCwwLDkuMjMtMi4zOGMtLjEyLS41LTMtMTEuMjUtMTcuMTYtMTMuNTh2LTcuOGE0Ljc3LDQuNzcsMCwwLDAtOS41NCwwdjcuODhjLTguMTgsMS44NC0xNS4zLDguNjItMTcsMTYuODYtMSw1LjE3LTEuMTUsMTguMDYsMjAsMjYuMjIsMTAuMTMsMy45LDE1LjI3LDkuNTMsMTQuMDksMTUuNDRDMzU0LjA1LDM4MS4xMywzNDguNDksMzg1LjgxLDM0Mi44OCwzODUuNTJaIj48L3BhdGg+PHBhdGggZD0iTTEwNi42MiwyMzEuNzdhNS40OSw1LjQ5LDAsMCwwLTUuNDgsNS40OHY5Ljg5YTUuNDksNS40OSwwLDAsMCwxMSwwdi05Ljg5QTUuNDksNS40OSwwLDAsMCwxMDYuNjIsMjMxLjc3WiI+PC9wYXRoPjwvc3ZnPg==",
    },
    homeLoan: {
      heading: "Home Loan",
      subheading: `Map the realisation of your goals/dreams with an EMI Calculator – be it buying a dream home, a car, a vacation, etc. A loan provides the financial resource, and with an EMI facility, repayments become comfortable.`,
      icon: "https://i.ibb.co/jkwLmjK/423483-200.png",
    },
    carLoan: {
      heading: "Car Loan",
      subheading: `Map the realisation of your goals/dreams with an EMI Calculator – be it buying a dream home, a car, a vacation, etc. A loan provides the financial resource, and with an EMI facility, repayments become comfortable.`,
      icon: "https://i.ibb.co/Tk1CxYT/free-car-icon-1057-thumb.png",
    },
    retirement: {
      heading: "Retirement Calculator",
      subheading:
        "The calculator uses rules of compound interest to determine the total corpus you will be able to accumulate as per the investments made post-maturity.",
      icon: "https://i.ibb.co/w7sHnzB/retirement-12-449213.webp",
    },
  };

  return (
    <div className={styles.calculatorsPage}>
      <Header
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        setshowauth={setshowauth}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <div className={styles.contentWrapper}>
        <div className={styles.pathSection}>
          {paths.map((item, index) => {
            return (
              <>
                <div
                  className={`${styles.path} ${
                    index === paths.length - 1 ? styles.active : ""
                  }
                  }`}
                  onClick={() => {
                    if (item === "home") {
                      router.push("/");
                    } else if (item === "calculators") {
                      router.push("/calculators/main");
                    } else {
                      router.push(`/calculators/${item}`);
                    }
                  }}
                >
                  {item}
                </div>
                {index !== paths.length - 1 ? (
                  <div className={styles.arrow}>{">"}</div>
                ) : null}
              </>
            );
          })}
        </div>
        <div className={styles.headingSection}>
          <h2 className={styles.heading}>{heading}</h2>
          <h3 className={styles.subheading}>{subheading}</h3>
        </div>
        {calculatorName === "main" ? (
          <div className={styles.calculatorsList}>
            {Object.keys(data).map((item) => {
              if (item === "main") {
                return null;
              } else {
                return (
                  <div
                    className={styles.calcCard}
                    onClick={() => router.push(`/calculators/${item}`)}
                  >
                    <img src={data[item].icon} alt="calcicon" />
                    <p className={styles.calccardtitle}>{data[item].heading}</p>
                  </div>
                );
              }
            })}
          </div>
        ) : (
          <CalculatorRouter name={calculatorName} />
        )}
      </div>
    </div>
  );
}

export default CalculatorsPage;
