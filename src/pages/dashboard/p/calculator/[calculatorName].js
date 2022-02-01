import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
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
import { MainContext } from "../../../../context/Main";
import LoginApis from "../../../../actions/apis/LoginApis";
import Curve1 from "../../../../components/SVGcomponents/Curve1";
import Curve2 from "../../../../components/SVGcomponents/Curve2";
import DashboardFooter from "../../../../components/Dashboard/DashboardFooter";

export default function CalculatorsPage({ userdatafromserver }) {
  const router = useRouter();
  const { calculatorName } = router.query;
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [mode, setmode] = useState("Calculators");
  const { setuserdata } = useContext(MainContext);
  const [error, seterror] = useState("");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  useEffect(() => {
    setuserdata(userdatafromserver);
  }, []);
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
      <DashboardLeftPanel />
      <Toast data={toastdata} />
      <Curve1 className={styles.curve1} />
      <Curve2 className={styles.curve2} />
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
          <DashboardFooter />

          {/* <RelativeSection
          Calc_Data={Calc_Data}
          cards={Calc_Data[calculatorName]?.relative ?? []}
        /> */}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params, req }) {
  let token = req.cookies.accesstoken;
  let msg = "";
  if (token) {
    let response = await LoginApis.checktoken({
      token: token,
    });
    if (response && !response.data.success) {
      msg = response.data.msg;
      return {
        props: { msg },
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    } else {
      return {
        props: {
          userdatafromserver: response.data.data,
        },
      };
    }
  } else {
    return {
      props: { msg: "cannot get token" },
      redirect: {
        permanent: false,
        destination: "/?err=01",
      },
    };
  }
}
