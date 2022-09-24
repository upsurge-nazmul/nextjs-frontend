import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
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
import { MainContext } from "../../context/Main";
import LoginApis from "../../actions/apis/LoginApis";
import PageTitle from "../../components/PageTitle";

function CalculatorsPage({ userdata }) {
  const router = useRouter();
  const { calculatorName } = router.query;
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [paths, setpaths] = useState(["home", "calculators"]);
  const [showpopup, setshowpopup] = useState(false);
  const [error, seterror] = useState("");
  const { setuserdata, theme } = useContext(MainContext);
  useEffect(() => {
    if (userdata) {
      setuserdata(userdata);
    }
  }, [userdata]);

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

export async function getServerSideProps({ params, req }) {
  let token = req.cookies.accesstoken;
  let msg = "";
  if (token) {
    let response = await LoginApis.checktoken({
      token: token,
    });
    if (response && !response.data.success) {
      msg = response.data.msg || "";
      return { props: {} };
    } else {
      return {
        props: {
          isLogged: true,
          userdata: response?.data?.data || null,
        },
      };
    }
  } else {
    return {
      props: { isLogged: false, msg: "cannot get token", userdata: null },
    };
  }
}
