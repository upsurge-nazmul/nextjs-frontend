import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import LeftPanel from "../../components/LeftPanel";
import styles from "../../styles/Calculators/calculatormainpage.module.scss";
import Footer from "../../components/Home/Footer";
import Image from "next/image";
import JoinUs from "../../components/Home/JoinUs";

function CalculatorsPage() {
  const router = useRouter();
  const { calculatorName } = router.query;
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  useEffect(() => {
    if (calculatorName && !data[calculatorName]) {
      router.push("/calculators/main");
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
      subheading: `Users will get to know the EMI amount they'll have to pay for various types of homes.`,
      relative: ["carLoan", "restaurant", "education"],
      icon: "https://i.ibb.co/BT5h1vf/Untitled-design-10.png",
    },
    carLoan: {
      heading: "Car Loan",
      subheading: `Users will get to know the EMI amount they'll have to pay for various types of cars.`,
      icon: "https://i.ibb.co/znVZd67/sven-d-a4-S6-KUu-Leo-M-unsplash.jpg",
    },
    education: {
      heading: "Education Loan",
      subheading: `This calculator gives user a fair estimate of the EMI they'll have to pay for pursuing various degrees`,
      icon: "https://i.ibb.co/w4p94JJ/md-duran-1-Vq-HRwxc-CCw-unsplash.jpg",
    },
    // vacation: {
    //   heading: "Vacation Calculator",
    //   subheading: `Use this calculator to find the future value of Vacation cost and monthly SIP needed to achieve this goal.`,
    //   icon: "https://i.ibb.co/6rgnFFS/Untitled-design-8.png",
    // },
    sip: {
      heading: "Financing Calculator",
      subheading: `It tells how much money you need to invest monthly in various assets to reach a targeted saving amount.`,
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
      heading: "Retirement Calculator",
      subheading:
        "It calculates how much a user needs to save in order to get a desired monthly amount after retirement.",
      icon: "https://i.ibb.co/dtLHTYJ/Untitled-design-11.png",
      relative: ["sip", "investmentcomparison", "homeLoan"],
    },
    restaurant: {
      heading: "Start My Cloud Kitchen Calculator",
      subheading:
        "This calculator tells you the lump sum amount you need in order to start your restaurant. Apart from that, it also gives you the break even analysis for your restaurant.",
      relative: ["currency", "angel", "unicorn"],
      icon: "https://i.ibb.co/zFrz17r/Untitled-design-12.png",
    },
    investmentcomparison: {
      heading: "Investment Comparison Tool",
      relative: ["sip", "currency", "angel"],
      subheading: "It compares the various investment opportunities.",
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
        "This calculator converts rupees in terms of how much it's actually worth in different countries.",
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
      heading: "Unicorn Builder",
      subheading: `This Calculator tells you how much revenue your startup needs to generate in order to reach a billion dollar valuation.`,
      icon: "https://i.ibb.co/s9vbfqQ/Untitled-design-19.png",
    },
    angel: {
      heading: "Angel Investment Calculator",
      subheading: `This calculator tells you the valuation of your startup at which you can raise funding from angel investors  
       Standard of living of bachelor- This calculator gives you the expected expense of your lifestyle in various different cities based on various different factors.`,
      relative: ["restaurant", "standardofliving", "unicorn"],
      icon: "https://i.ibb.co/wSzwgHT/Untitled-design-20.png",
    },
    standardofliving: {
      heading: "Standard of Living calculator",
      subheading:
        "This calculator gives you the expected expense of your lifestyle in different cities based on various factors.",
      icon: "https://i.ibb.co/02Mxj02/Untitled-design-17.png",
      relative: ["college", "carLoan", "homeLoan"],
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
        <div
          className={styles.icon}
          style={{ position: "relative", height: "150px" }}
        >
          <Image
            src="https://i.ibb.co/KwbW1s2/calcicon.png"
            alt=""
            priority
            layout="fill"
            objectFit="contain"
            quality="100"
          />
        </div>

        <div className={styles.headingSection}>
          <h2 className={styles.heading}>Calculators</h2>
          <h3 className={styles.subheading}>
            Upsurge provides a range of calculators from Loans to Deposits. From
            calculating your Personal Loan EMI, to checking your Home Loan
            affordability, Upsurge gives you a whole set of calculators to help
            you make your informed decision. As you embark on a journey to
            fulfil your dreams with a new bike/car or a new home, the calculator
            helps you with a better understanding of expenses. Also, before you
            invest in a Fixed Deposit or Recurring Deposit to save and grow your
            money, you can calculate the interest you will earn
          </h3>
        </div>

        <div className={styles.calculatorsList}>
          {Object.keys(data).map((item, index) => {
            if (item === "main") {
              return null;
            } else {
              return (
                <div
                  key={"calccalrd" + index}
                  className={styles.calcCard}
                  onClick={() => router.push(`/calculators/${item}`)}
                >
                  <div className={styles.cardimg}>
                    <Image
                      src={data[item].icon}
                      alt=""
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <p className={styles.calccardtitle}>{data[item].heading}</p>
                  <p className={styles.calccardsubtitle}>
                    {data[item].subheading}
                  </p>
                  <p className={styles.date}>By Upsurge Team, 5th Aug, 2021</p>
                </div>
              );
            }
          })}
        </div>
      </div>
      <JoinUs />
      <Footer />
    </div>
  );
}

export default CalculatorsPage;
