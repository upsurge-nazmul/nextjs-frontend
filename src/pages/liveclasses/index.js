import React, { useState } from "react";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../components/Dashboard/DashboardLeftPanel";
import LiveClassComponent from "../../components/LiveClasses/LiveClassComponent";
import ApproveModal from "../../components/ParentStore/ApproveModal";
import styles from "../../styles/LiveClasses/liveclasses.module.scss";
function LiveClassesPage() {
  const [selection, setselection] = useState("available");
  const [showmodal, setshowmodal] = useState(false);
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [buydata, setbuydata] = useState({
    price: 10,
    type: "rs",
    name: "",
    description: "",
  });
  const data = [
    {
      name: "Learn Investment Basics",
      description:
        "This Investments for beginners course teaches you the basics fast. It includes quizzes and assignments too..",
      amount: 3500,
    },
    {
      name: "Learn Investment Basics",
      description:
        "This Investments for beginners course teaches you the basics fast. It includes quizzes and assignments too..",
      amount: 3500,
    },
    {
      name: "Learn Investment Basics",
      description:
        "This Investments for beginners course teaches you the basics fast. It includes quizzes and assignments too..",
      amount: 3500,
    },
  ];
  return (
    <div className={styles.liveclasses}>
      <DashboardLeftPanel />
      <ApproveModal
        showmodal={showmodal}
        setshowmodal={setshowmodal}
        buydata={buydata}
      />
      <div className={styles.mainContent}>
        <DashboardHeader mode="Live Classes" />
        <div className={styles.switch}>
          <p
            onClick={() => setselection("available")}
            className={`${styles.tabs} ${
              selection === "available" ? styles.selected : ""
            }`}
          >
            Available
          </p>
          <p
            onClick={() => setselection("Enrolled")}
            className={`${styles.tabs} ${
              selection !== "available" ? styles.selected : ""
            }`}
          >
            Enrolled
          </p>
        </div>
        <div className={styles.wrapper}>
          {data.map((item) => {
            return (
              <LiveClassComponent
                data={item}
                setbuydata={setbuydata}
                setshowmodal={setshowmodal}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LiveClassesPage;
