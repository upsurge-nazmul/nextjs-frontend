import React from "react";
import JobComponent from "../../components/Careers/JobComponent";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import styles from "../../styles/Careers/careers.module.scss";
import Curve1 from "../../components/SVGcomponents/Curve1";
import Curve2 from "../../components/SVGcomponents/Curve2";

function Careers() {
  const data = [
    {
      section: "Brand & Marketing",
      jobs: [
        { title: "Content Specialist", location: "Delhi" },
        { title: "Creative Social Media Designer", location: "Delhi" },
        { title: "Growth Manager", location: "Delhi" },
      ],
    },
    {
      section: "Customer Success",
      jobs: [
        { title: "Customer Service", location: "Delhi" },
        { title: "Senior Manager - Customer Experience", location: "Delhi" },
        { title: "Team lead - Customer Service", location: "Delhi" },
      ],
    },
    {
      section: "Brand & Marketing",
      jobs: [
        { title: "Content Specialist", location: "Delhi" },
        { title: "Creative Social Media Designer", location: "Delhi" },
        { title: "Growth Manager", location: "Delhi" },
      ],
    },
    {
      section: "Customer Success",
      jobs: [
        { title: "Customer Service", location: "Delhi" },
        { title: "Senior Manager - Customer Experience", location: "Delhi" },
        { title: "Team lead - Customer Service", location: "Delhi" },
      ],
    },
  ];

  return (
    <div className={styles.careerPage}>
      <Header />
      <div className={styles.mainContent}>
        <Curve1 className={styles.curve1} />
        <Curve2 className={styles.curve2} />
        <div className={styles.content}></div>
      </div>
      <Footer />
    </div>
  );
}

export default Careers;
