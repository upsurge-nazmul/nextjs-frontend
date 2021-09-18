import React from "react";
import JobComponent from "../../components/Careers/JobComponent";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import styles from "../../styles/Careers/careers.module.scss";
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
      <div className={styles.container}>
        <p className={styles.heading}>WHY UPSURGE ?</p>
        <p className={styles.des}>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like).
        </p>
        <p className={styles.heading}>CURRENT REQUIREMENTS</p>
        <div className={styles.wrapper}>
          {data.map((section) => {
            return (
              <div className={styles.section}>
                <p className={styles.sectionName}>{section.section}</p>
                {section.jobs.map((item) => {
                  return <JobComponent data={item} />;
                })}
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Careers;
