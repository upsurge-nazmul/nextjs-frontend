import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import CalculatorRouter from "../../components/Calculators/CalculatorRouter";
import Header from "../../components/Header/Header";
import LeftPanel from "../../components/LeftPanel";
import styles from "../../styles/Calculators/calculatorpage.module.scss";
import CalcFaq from "../../components/Calculators/CalcFaq";
import Footer from "../../components/Home/Footer";
import WaitingListCta from "../../components/WaitingListCta";
import JoinUs from "../../components/Home/JoinUs";
import { Calc_Data } from "../../static_data/Calc_Data";
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
      router.push("/calculators");
    }
  }, [calculatorName]);
  return (
    <div className={styles.calculatorsPage} id="calc-page">
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
        <WaitingListCta />
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
        <RelativeSection cards={Calc_Data[calculatorName]?.relative ?? []} />
      </div>
      <JoinUs />

      <Footer />
    </div>
  );
}

export default CalculatorsPage;
