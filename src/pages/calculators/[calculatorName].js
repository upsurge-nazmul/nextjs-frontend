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
  const [error, seterror] = useState("");
  useEffect(() => {
    if (!data[calculatorName]) {
      return;
    } else {
      setHeading(data[calculatorName].heading);
      setSubheading(data[calculatorName].subheading);
    }
  }, [calculatorName]);

  const data = {
    homeLoan: {
      heading: "Home Loan",
      subheading: `User will get to know the EMI amount they'll have to pay for various different types of homes`,
      relative: ["carLoan", "restaurant", "education"],
      icon: "https://i.ibb.co/BT5h1vf/Untitled-design-10.png",
    },
    carLoan: {
      heading: "Car Loan",
      subheading: `User will get to know the EMI amount they'll have to pay for various different types of cars`,
      relative: ["homeLoan", "restaurant", "education"],
      icon: "https://i.ibb.co/znVZd67/sven-d-a4-S6-KUu-Leo-M-unsplash.jpg",
    },
    education: {
      heading: "Education",
      subheading: `This calculator gives user a fair estimate of the EMI they'll have to pay for pursuing various degrees`,
      relative: ["costofraising", "educationinvestments", "college"],
      icon: "https://i.ibb.co/w4p94JJ/md-duran-1-Vq-HRwxc-CCw-unsplash.jpg",
    },
    // vacation: {
    //   heading: "Vacation Calculator",
    //   subheading: `Use this calculator to find the future value of Vacation cost and monthly SIP needed to achieve this goal.`,
    //   icon: "https://i.ibb.co/6rgnFFS/Untitled-design-8.png",
    // },
    sip: {
      heading: "Financing",
      subheading: `It tells how much money you need to invest monthly in various different assets to reach a target saving amount`,
      relative: ["investmentcomparison", "retirement", "costofraising"],
      icon: "https://i.ibb.co/b1Dxh2v/Untitled-design-9.png",
    },
    educationinvestments: {
      heading: "Education investment",
      subheading: `This calculator gives an estimate of how much money you need to save monthly to afford different education programs`,
      relative: ["college", "costofraising", "education"],
      icon: "https://i.ibb.co/8BdyXNb/Untitled-design-66.png",
    },
    retirement: {
      heading: "Retirement",
      subheading:
        "It calculates how much user needs to save in order to get the monthly amount that user desires after retirement",
      icon: "https://i.ibb.co/dtLHTYJ/Untitled-design-11.png",
      relative: ["sip", "investmentcomparison", "homeLoan"],
    },
    restaurant: {
      heading: "Start My Restaurant",
      subheading:
        "This calculator tells you the lump sum amount you need in order to start your restaurant. Apart from that, it also gives you the break even analysis for your restaurant.",
      relative: ["currency", "angel", "unicorn"],
      icon: "https://i.ibb.co/zFrz17r/Untitled-design-12.png",
    },
    investmentcomparison: {
      heading: "Investment Comparison Tool",
      relative: ["sip", "currency", "angel"],
      subheading: "It compares the various different investment opportunities",
      icon: "https://i.ibb.co/Rh3FZW9/Untitled-design-13.png",
    },
    // Insurance: {
    //   heading: "Insurance?",
    //   subheading:
    //     "The calculator uses rules of compound interest to determine the total corpus you will be able to accumulate as per the investments made post-maturity.",
    //   icon: "https://i.ibb.co/N1P7BR7/Untitled-design-14.png",
    // },
    currency: {
      heading: "Big mac index Currency Converter",
      relative: ["educationinvestments", "angel", "restaurant"],
      subheading:
        "This calculator converts rupees in terms of much it's actually worth in different countries",
      icon: "https://i.ibb.co/PFXFVWp/Untitled-design-15.png",
    },
    college: {
      relative: ["education", "unicorn", "restaurant"],
      heading: "College Life",
      subheading: `This calculator gives you expected monthly expense of your college life based on various different parameters.`,
      icon: "https://i.ibb.co/9p2mMZW/Untitled-design-16.png",
    },
    costofraising: {
      relative: ["education", "educationinvestments", "standardofliving"],
      heading: "Cost of Raising a Child",
      subheading:
        "This tells the expected amount user will have to spend throughout life for raising single child",
      icon: "https://i.ibb.co/6bkxKJK/Untitled-design-18.png",
    },
    unicorn: {
      relative: ["restaurant", "currency", "angel"],
      heading: "Unicorn Builder",
      subheading: `This Calculator tells you how much revenue your startup needs to generate in order to reach a billion dollar valuation`,
      icon: "https://i.ibb.co/s9vbfqQ/Untitled-design-19.png",
    },
    angel: {
      heading: "Angel Investment",
      subheading: `This calculator tells you the valuation of your startup at which you can raise funding from angel investors`,
      relative: ["restaurant", "standardofliving", "unicorn"],
      icon: "https://i.ibb.co/wSzwgHT/Untitled-design-20.png",
    },
    standardofliving: {
      heading: "Standard of Living",
      subheading:
        "This calculator gives you the expected expense of your lifestyle in various different cities based on various different factors.",
      icon: "https://i.ibb.co/02Mxj02/Untitled-design-17.png",
      relative: ["college", "carLoan", "homeLoan"],
    },
  };

  useEffect(() => {
    if (calculatorName && !data[calculatorName]) {
      router.push("/calculators");
    }
  }, [calculatorName]);
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
          <h3 className={styles.subheading} style={{ color: "red" }}>
            {error}
          </h3>
        </div>

        <CalculatorRouter
          seterror={seterror}
          name={calculatorName}
          calcdata={data}
        />
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
