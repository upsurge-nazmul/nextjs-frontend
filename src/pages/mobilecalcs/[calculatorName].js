import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import CalculatorRouter from "../../components/Calculators/CalculatorRouter";
import Header from "../../components/Header/Header";
import LeftPanel from "../../components/LeftPanel";
import styles from "../../styles/Calculators/calculatorpage.module.scss";
import CalcFaq from "../../components/Calculators/CalcFaq";
import Seo from "../../components/Seo";
import WaitingListCta from "../../components/WaitingListCta";
import JoinUs from "../../components/Home/JoinUs";
import { Calc_Data } from "../../static_data/Calc_Data";
import RelativeSection from "../../components/Calculators/RelativeSection";
import { MainContext } from "../../context/Main";
import LoginApis from "../../actions/apis/LoginApis";

function CalculatorsPage() {
  const router = useRouter();
  const { calculatorName } = router.query;
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [paths, setpaths] = useState(["home", "calculators"]);
  const [showpopup, setshowpopup] = useState(false);
  const [error, seterror] = useState("");
  const { theme } = useContext(MainContext);

  useEffect(() => {
    seterror("");
    if (!Calc_Data[calculatorName]) {
      return;
    } else {
      setHeading(Calc_Data[calculatorName].heading);
      setSubheading(Calc_Data[calculatorName].subheading);
    }
  }, [calculatorName]);

  useEffect(() => {
    if (calculatorName && !Calc_Data[calculatorName]) {
      router.push("/mobilecalcs");
    }
  }, [calculatorName]);
  useEffect(() => {
    let x = document.getElementById("calc-page");
    x.scrollTop = 0;
  }, [router]);
  return (
    <div
      className={`${styles.calculatorsPage} ${
        theme === "dark" && styles.darkstyles
      }`}
      id="calc-page"
    >
      <div className={styles.contentWrapper}>
        <div className={styles.headingSection}>
          <h1 className={styles.mainheading}>{heading}</h1>
          <h2 className={styles.heading}>How it works</h2>
          <h3 className={styles.subheading}>{subheading}</h3>
        </div>

        <CalculatorRouter
          seterror={seterror}
          error={error}
          name={calculatorName}
          calcCalc_Data={Calc_Data}
        />
        <CalcFaq name={calculatorName} />
        <RelativeSection
          cards={Calc_Data[calculatorName]?.relative ?? []}
          mobileApp={true}
        />
      </div>
    </div>
  );
}

export default CalculatorsPage;
