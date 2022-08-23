import React, { useState } from "react";
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

const positionData = [
  {
    id: "gameProgrammer",
    position: "Game Programmer",
    location: "Delhi, India",
  },
  {
    id: "gameArtist2D",
    position: "Game Artist - 2D",
    location: "Delhi, India",
  },
  {
    id: "reactJsIntern",
    position: "Reactjs Intern",
    location: "Delhi, India",
  },
  {
    id: "reactNativeIntern",
    position: "React Native Intern",
    location: "Delhi, India",
  },
  {
    id: "uiUxDesigner",
    position: "UI/UX designer",
    location: "Delhi, India",
  },
];

function Careers() {
  const router = useRouter();
  const [openJd, setOpenJd] = useState();

  const handleApplyClick = (position) => {
    router.push(`/careers/${position}`);
  };

  const handlePositionClick = (position) => {
    setOpenJd(position);
  };

  console.log("*******", openJd);

  return (
    <div className={styles.careerPage}>
      <Header />
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
              to promote development among India's youth.
            </div>
          </div>
          <div className={styles.banner}>
            <img src={Banner.src} className={styles.bannerImg} />
          </div>
          <div className={styles.positionArea}>
            <div className={styles.positionTitle}>Open Positions</div>
            <div className={styles.positions}>
              {positionData.map((position, i) => {
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
