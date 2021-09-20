import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import styles from "../../styles/Team/teamspage.module.scss";

function TeamsPage() {
  const data = [
    {
      name: "Bill Gates",
      img_url:
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT12cP23udqvCqHW_2oAvK257g3oVQkv23tOumxtpfFOhHi8a5B",
      position: "Advisor",
    },
    {
      name: "Bill Gates",
      img_url:
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT12cP23udqvCqHW_2oAvK257g3oVQkv23tOumxtpfFOhHi8a5B",
      position: "Advisor",
    },
    {
      name: "Bill Gates",
      img_url:
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT12cP23udqvCqHW_2oAvK257g3oVQkv23tOumxtpfFOhHi8a5B",
      position: "Advisor",
    },
    {
      name: "Bill Gates",
      img_url:
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT12cP23udqvCqHW_2oAvK257g3oVQkv23tOumxtpfFOhHi8a5B",
      position: "Advisor",
    },
    {
      name: "Bill Gates",
      img_url:
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT12cP23udqvCqHW_2oAvK257g3oVQkv23tOumxtpfFOhHi8a5B",
      position: "Advisor",
    },
    {
      name: "Bill Gates",
      img_url:
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT12cP23udqvCqHW_2oAvK257g3oVQkv23tOumxtpfFOhHi8a5B",
      position: "Advisor",
    },
  ];
  return (
    <div className={styles.teamPage}>
      <Header />
      <div className={styles.container}>
        <div className={styles.heading}>Meet Us</div>
        <div className={styles.quote}>
          If your actions inspire others to dream more, learn more, do more and
          become more, you are a leader.
        </div>
        <div className={styles.wrapper}>
          {data.map((item, index) => {
            return (
              <div className={styles.member} key={"teammeber" + index}>
                <img src={item.img_url} alt="" />
                <div className={styles.name}>{item.name}</div>
                <div className={styles.position}>{item.position}</div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default TeamsPage;
