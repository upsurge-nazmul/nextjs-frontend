import React from "react";
import CheatCodeComponent from "../../components/CheatCode/CheatCodeComponent";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import styles from "../../styles/cheatcodes/cheatcodes.module.scss";
function CheatCodes() {
  const data = [
    {
      title: "Picking Stocks for Long term Investing in 2021",
      content:
        "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?",
      img_url: "https://i.ytimg.com/vi/cosjtcWyWlI/maxresdefault.jpg",
      link: "https://www.youtube.com/embed/cosjtcWyWlI",
    },
    {
      title: "WHAT IS COMPOUNDING?",
      content:
        "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?",
      img_url: "https://i.ytimg.com/vi/krwSDbuHWd4/maxresdefault.jpg",
      link: "https://www.youtube.com/embed/krwSDbuHWd4",
    },
    {
      title: "Should you Invest in Gold?",
      content:
        "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?",
      img_url: "https://i.ytimg.com/vi/WDypUuRJdJs/maxresdefault.jpg",
      link: "https://www.youtube.com/embed/WDypUuRJdJs",
    },
  ];
  return (
    <div className={styles.cheatCodes}>
      <Header />
      <div className={styles.container}>
        <p className={styles.heading}>Cheat Codes</p>
        <p className={styles.description}>
          A collection of some amazing videos to improve your financial
          wellness.
        </p>
        <div className={styles.line}></div>
        <div className={styles.wrapper}>
          {data.map((item, index) => {
            return <CheatCodeComponent data={item} index={index} />;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CheatCodes;
