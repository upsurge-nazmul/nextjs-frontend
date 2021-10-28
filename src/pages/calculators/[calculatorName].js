import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import CalculatorRouter from "../../components/Calculators/CalculatorRouter";
import Header from "../../components/Header/Header";
import LeftPanel from "../../components/LeftPanel";
import styles from "../../styles/Calculators/calculatorpage.module.scss";
import homeloansvg from "../../assets/calculators/home.svg";
import carloansvg from "../../assets/calculators/car.svg";
import CalcFaq from "../../components/Calculators/CalcFaq";
import Footer from "../../components/Home/Footer";
import BigCalcInput from "../../components/Calculators/BigCalcInput";
import BigCalcDropdown from "../../components/Calculators/BigCalcDropdown";
import RelativeSection from "../../components/Calculators/RelativeSection";
function CalculatorsPage() {
  const router = useRouter();
  const { calculatorName } = router.query;
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [paths, setpaths] = useState(["home", "calculators"]);
  useEffect(() => {
    console.log(calculatorName);
    if (!data[calculatorName]) {
      return;
    } else {
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
    homeLoan: {
      heading: "Home Loan",
      subheading: `Map the realisation of your goals/dreams with an EMI Calculator – be it buying a dream home, a car, a vacation, etc. A loan provides the financial resource, and with an EMI facility, repayments become comfortable.`,
      icon: "https://i.ibb.co/BT5h1vf/Untitled-design-10.png",
      relative: ["carLoan", "restaurant", "education"],
    },
    carLoan: {
      heading: "Car Loan",
      subheading: `Map the realisation of your goals/dreams with an EMI Calculator – be it buying a dream home, a car, a vacation, etc. A loan provides the financial resource, and with an EMI facility, repayments become comfortable.`,
      icon: "https://i.ibb.co/znVZd67/sven-d-a4-S6-KUu-Leo-M-unsplash.jpg",
      relative: ["homeLoan", "restaurant", "education"],
    },
    education: {
      heading: "Education Loan",
      subheading: `Map the realisation of your goals/dreams with an EMI Calculator – be it buying a dream home, a car, a vacation, etc. A loan provides the financial resource, and with an EMI facility, repayments become comfortable.`,
      relative: ["costofraising", "educationinvestments", "college"],
      icon: "https://i.ibb.co/w4p94JJ/md-duran-1-Vq-HRwxc-CCw-unsplash.jpg",
    },
    educationinvestments: {
      heading: "Education investment",
      subheading: `Map the realisation of your goals/dreams with an EMI Calculator – be it buying a dream home, a car, a vacation, etc. A loan provides the financial resource, and with an EMI facility, repayments become comfortable.`,
      relative: ["college", "costofraising", "education"],
      icon: "https://i.ibb.co/8BdyXNb/Untitled-design-66.png",
    },
    vacation: {
      heading: "Vacation Calculator",
      subheading: `Use this calculator to find the future value of Vacation cost and monthly SIP needed to achieve this goal.`,
      icon: "https://i.ibb.co/6rgnFFS/Untitled-design-8.png",
    },
    sip: {
      heading: "Financing Calculator",
      subheading: `Prospective investors can think that SIPs and mutual funds are the same. However, SIPs are merely a method of investing in mutual funds, the other method being a lump sum. A SIP calculator is a tool that helps you determine the returns you can avail when parking your funds in such investment tools. Systematic Investment Plan or SIP is a process of investing a fixed sum of money in mutual funds at regular intervals. SIPs usually allow you to invest weekly, quarterly, or monthly.`,
      relative: ["investmentcomparison", "retirement", "costofraising"],
      icon: "https://i.ibb.co/b1Dxh2v/Untitled-design-9.png",
    },
    retirement: {
      heading: "Retirement Calculator",
      subheading:
        "The calculator uses rules of compound interest to determine the total corpus you will be able to accumulate as per the investments made post-maturity.",
      icon: "https://i.ibb.co/dtLHTYJ/Untitled-design-11.png",
      relative: ["investmentcomparison", "education", "sip"],
    },
    restaurant: {
      heading: "Start My Restaurant Calculator",
      relative: ["currency", "angel", "unicorn"],
      subheading:
        "The calculator uses rules of compound interest to determine the total corpus you will be able to accumulate as per the investments made post-maturity.",
      icon: "https://i.ibb.co/zFrz17r/Untitled-design-12.png",
    },
    investmentcomparison: {
      relative: ["sip", "currency", "angel"],
      heading: "Investment Comparison Tool",
      subheading:
        "The calculator uses rules of compound interest to determine the total corpus you will be able to accumulate as per the investments made post-maturity.",
      icon: "https://i.ibb.co/Rh3FZW9/Untitled-design-13.png",
    },
    Insurance: {
      heading: "Insurance?",
      subheading:
        "The calculator uses rules of compound interest to determine the total corpus you will be able to accumulate as per the investments made post-maturity.",
      icon: "https://i.ibb.co/N1P7BR7/Untitled-design-14.png",
    },
    currency: {
      relative: ["educationinvestments", "angel", "restaurant"],
      heading: "Currency Converter",
      subheading:
        "The calculator uses rules of compound interest to determine the total corpus you will be able to accumulate as per the investments made post-maturity.",
      icon: "https://i.ibb.co/PFXFVWp/Untitled-design-15.png",
    },
    college: {
      relative: ["education", "unicorn", "restaurant"],
      heading: "College Life Calculator",
      subheading:
        "The calculator uses rules of compound interest to determine the total corpus you will be able to accumulate as per the investments made post-maturity.",
      icon: "https://i.ibb.co/9p2mMZW/Untitled-design-16.png",
    },
    standardofliving: {
      relative: ["college", "carLoan", "homeLoan"],
      heading: "Standard of Living calculator",
      subheading:
        "The calculator uses rules of compound interest to determine the total corpus you will be able to accumulate as per the investments made post-maturity.",
      icon: "https://i.ibb.co/02Mxj02/Untitled-design-17.png",
    },
    costofraising: {
      relative: ["education", "educationinvestments", "standardofliving"],
      heading: "Cost of Raising a Child",
      subheading:
        "The calculator uses rules of compound interest to determine the total corpus you will be able to accumulate as per the investments made post-maturity.",
      icon: "https://i.ibb.co/6bkxKJK/Untitled-design-18.png",
    },
    unicorn: {
      heading: "Unicorn Builder",
      subheading:
        "The calculator uses rules of compound interest to determine the total corpus you will be able to accumulate as per the investments made post-maturity.",
      icon: "https://i.ibb.co/s9vbfqQ/Untitled-design-19.png",
    },
    angel: {
      relative: ["restaurant", "standardofliving", "unicorn"],
      heading: "Angel Investment Calculator",
      subheading:
        "The calculator uses rules of compound interest to determine the total corpus you will be able to accumulate as per the investments made post-maturity.",
      icon: "https://i.ibb.co/wSzwgHT/Untitled-design-20.png",
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
        <div className={styles.waitinglist}>
          <div className={styles.left}>
            <img
              src="https://i.ibb.co/rstCXKx/rupixen-com-5lw6-CLBZl-Cg-unsplash.png"
              alt=""
            />
          </div>

          <div className={styles.midflex}>
            <p>Want your kids to be financially independent?</p>
            <p>Join the Upsurge platform today.</p>
          </div>
          <div className={styles.right}>
            <img
              className={styles.background}
              src="https://i.ibb.co/94m1jJg/unsplash-ROQz-KIAd-Y78.png"
              alt=""
            ></img>
            <div className={styles.text}>
              <p>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => router.push("/")}
                >
                  Click here
                </span>{" "}
                to join the
              </p>
              <p>Upsurge waiting list.</p>
            </div>
          </div>
        </div>
        <div className={styles.headingSection}>
          <h1 className={styles.mainheading}>{heading} Calculator</h1>
          <h2 className={styles.heading}>How it works</h2>
          <h3 className={styles.subheading}>{subheading}</h3>
        </div>

        <CalculatorRouter name={calculatorName} calcdata={data} />
        <CalcFaq name={calculatorName} />
        <RelativeSection
          data={data}
          cards={data[calculatorName]?.relative ?? []}
        />
      </div>
      <Footer />
    </div>
  );
}

export default CalculatorsPage;
