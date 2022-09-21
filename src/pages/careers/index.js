import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import styles from "../../styles/Careers/careers.module.scss";
import Curve1 from "../../components/SVGcomponents/Curve1";
import Curve2 from "../../components/SVGcomponents/Curve2";
import Banner from "../../assets/careers/banner.png";
import PositionsCard from "../../components/Careers/PositionsCard";
import JD from "../../components/Careers/JD";
import Modal from "../../components/Modal";
import { PositionData } from "../../components/Careers/staticData";
import LeftPanel from "../../components/LeftPanel";
import PageTitle from "../../components/PageTitle";

function Careers() {
  const router = useRouter();
  const [openJd, setOpenJd] = useState();
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

  const handleApplyClick = (position) => {
    router.push(`/careers/${position}`);
  };

  const handlePositionClick = (position) => {
    setOpenJd(position);
  };

  return (
    <div className={styles.careerPage}>
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
          <div className={styles.header}>
            <div className={styles.title}>Work with us</div>
            <div className={styles.description}>
              upsurge is building one of the first educational gaming platform
              for Indian students to learn about entrepreneurship and financial
              literacy, and develop critical modern life-skills through
              educational games, gamified learning & real rewards!. <br />
              We are an experiential education company working on novel products
              to promote development among India&apos;s youth.
            </div>
          </div>
          <div className={styles.banner}>
            <img src={Banner.src} className={styles.bannerImg} alt="Banner" />
          </div>
          <div className={styles.positionArea}>
            <div className={styles.positionTitle}>Open Positions</div>
            <div className={styles.positions}>
              {PositionData.map((position, i) => {
                return (
                  <PositionsCard
                    data={position}
                    key={i}
                    handleApplyClick={handleApplyClick}
                    handlePositionClick={handlePositionClick}
                  />
                );
              })}
            </div>
          </div>
          {openJd && (
            <Modal
              actions={{
                isCancel: true,
                cancelText: "Cancel",
                handleCancel: () => setOpenJd(),
                proceedText: "Apply",
                isProceed: true,
                handleProceed: () => handleApplyClick(openJd),
              }}
              onOutsideClick={() => setOpenJd()}
            >
              <JD position={openJd} />
            </Modal>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Careers;
