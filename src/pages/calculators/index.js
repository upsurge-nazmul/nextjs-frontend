import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import LeftPanel from "../../components/LeftPanel";
import styles from "../../styles/Calculators/calculatormainpage.module.scss";
import Footer from "../../components/Home/Footer";
import Image from "next/image";
import JoinUs from "../../components/Home/JoinUs";
import { Calc_Data } from "../../static_data/Calc_Data";
import Curve1 from "../../components/SVGcomponents/Curve1";
import Curve2 from "../../components/SVGcomponents/Curve2";
import LoginApis from "../../actions/apis/LoginApis";
import { MainContext } from "../../context/Main";
import PageTitle from "../../components/PageTitle";

function CalculatorsPage() {
  const router = useRouter();
  const { calculatorName } = router.query;
  const [showpopup, setshowpopup] = useState(false);
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const { theme } = useContext(MainContext);

  useEffect(() => {
    if (calculatorName && !Calc_Data[calculatorName]) {
      router.push("/calculators/main");
    }
  }, [calculatorName]);

  return (
    <div
      className={`${styles.calculatorsPage} ${
        theme === "dark" && styles.darkcalculatorsPage
      }`}
    >
      <PageTitle />
      <Header
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        setshowauth={setshowauth}
        setshowpopup={setshowpopup}
        showpopup={showpopup}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <div className={styles.contentWrapper}>
        <Curve1 className={styles.curve1} />
        <Curve2 className={styles.curve2} />
        <div
          className={styles.icon}
          style={{ position: "relative", height: "150px" }}
        >
          <Image
            src="https://imgcdn.upsurge.in/images/calcicon.png"
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
            upsurge provides a range of calculators from Loans to Deposits. From
            calculating your Personal Loan EMI, to checking your Home Loan
            affordability, upsurge gives you a whole set of calculators to help
            you make your informed decision. As you embark on a journey to
            fulfill your dreams with a new bike/car or a new home, the calculator
            helps you with a better understanding of expenses. Also, before you
            invest in a Fixed Deposit or Recurring Deposit to save and grow your
            money, you can calculate the interest you will earn
          </h3>
        </div>

        <div className={styles.calculatorsList}>
          {Object.keys(Calc_Data).map((item, index) => {
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
                      src={Calc_Data[item].icon}
                      alt=""
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <p className={styles.calccardtitle}>
                    {Calc_Data[item].heading}
                  </p>
                  <p className={styles.calccardsubtitle}>
                    {Calc_Data[item].subheading}
                  </p>
                  <p className={styles.date}>By upsurge Team, 5th Aug, 2021</p>
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
