import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import Curve1 from "../../components/SVGcomponents/Curve1";
import Curve2 from "../../components/SVGcomponents/Curve2";
import { useRouter } from "next/router";
import styles from "../../styles/Careers/position.module.scss";
import ApplicationForm from "../../components/Careers/ApplicationForm";
import { PositionData } from "../../components/Careers/staticData";

export default function Position() {
  const router = useRouter();
  const { position } = router.query;

  return (
    <div className={styles.position}>
      <Header />
      <div className={styles.mainContent}>
        <Curve1 className={styles.curve1} />
        <Curve2 className={styles.curve2} />
        <div className={styles.content}>
          {position && (
            <ApplicationForm
              positionData={PositionData}
              selectedPosition={position}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
