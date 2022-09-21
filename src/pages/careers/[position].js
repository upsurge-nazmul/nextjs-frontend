import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import Curve1 from "../../components/SVGcomponents/Curve1";
import Curve2 from "../../components/SVGcomponents/Curve2";
import { useRouter } from "next/router";
import styles from "../../styles/Careers/position.module.scss";
import ApplicationForm from "../../components/Careers/ApplicationForm";
import { PositionData } from "../../components/Careers/staticData";
import Success from "../../components/Careers/Success";
import LeftPanel from "../../components/LeftPanel";
import PageTitle from "../../components/PageTitle";

export default function Position() {
  const router = useRouter();
  const { position } = router.query;
  const [applicationView, setApplicationView] = useState(true);
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [stickyheader, setstickyheader] = useState(false);
  const [showpopup, setshowpopup] = useState(false);

  useEffect(() => {
    const handlescroll = () => {
      if (window.scrollY > 1) {
        setstickyheader(true);
      } else {
        setstickyheader(false);
      }
    };
    window.addEventListener("scroll", handlescroll);
    return () => window.removeEventListener("scroll", handlescroll);
  }, []);

  return (
    <div className={styles.position}>
      <PageTitle />
      <Header
        showauth={showauth}
        setshowauth={setshowauth}
        stickyheader={stickyheader}
        setshowpopup={setshowpopup}
        showpopup={showpopup}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <div className={styles.mainContent}>
        <Curve1 className={styles.curve1} />
        <Curve2 className={styles.curve2} />
        <div className={styles.content}>
          {position && (
            <>
              {applicationView ? (
                <ApplicationForm
                  positionData={PositionData}
                  selectedPosition={position}
                  setApplicationView={setApplicationView}
                />
              ) : (
                <Success />
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
