import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import CalculatorRouter from "../../../../components/Calculators/CalculatorRouter";
import Header from "../../../../components/Header/Header";
import LeftPanel from "../../../../components/LeftPanel";
import styles from "../../../../styles/WaitlistDashboard/calcmain.module.scss";
import CalcFaq from "../../../../components/Calculators/CalcFaq";
import Footer from "../../../../components/Home/Footer";
import WaitingListCta from "../../../../components/WaitingListCta";
import JoinUs from "../../../../components/Home/JoinUs";
import { Calc_Data } from "../../../../static_data/Calc_Data";
import DashboardLeftPanel from "../../../../components/Dashboard/DashboardLeftPanel";
import Toast from "../../../../components/Toast";
import DashboardHeader from "../../../../components/Dashboard/DashboardHeader";

function CalculatorsPage() {
  const router = useRouter();
  const { calculatorName } = router.query;
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [mode, setmode] = useState("Calculators");
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [paths, setpaths] = useState(["home", "calculators"]);
  const [error, seterror] = useState("");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
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
    <div className={styles.calcs} id="calc-page">
      <DashboardLeftPanel type="waitlist" />
      <Toast data={toastdata} />

      <div className={styles.contentWrapper}>
        <DashboardHeader
          mode={mode}
          setmode={setmode}
          settoastdata={settoastdata}
        />
        <div className={styles.mainContent}>
          <div className={styles.headingSection}>
            <h1 className={styles.mainheading}>{heading}</h1>
            <h2 className={styles.heading}>How it works</h2>
            <h3 className={styles.subheading}>{subheading}</h3>
            <h3 className={styles.subheading} style={{ color: "red" }}>
              {error}
            </h3>
          </div>

          <CalculatorRouter
            seterror={seterror}
            error={error}
            name={calculatorName}
            calcCalc_Data={Calc_Data}
          />
          <CalcFaq name={calculatorName} />
          {/* <RelativeSection
          Calc_Data={Calc_Data}
          cards={Calc_Data[calculatorName]?.relative ?? []}
        /> */}
        </div>
      </div>
    </div>
  );
}

export default CalculatorsPage;
