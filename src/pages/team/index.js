import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import styles from "../../styles/Team/teamspage.module.scss";
import LinkedIN from "../../components/SVGcomponents/LinkedInSvg";
import LeftPanel from "../../components/LeftPanel";
import PageTitle from "../../components/PageTitle";
import { TEAM_DATA } from "../../static_data/Team_Data";

const POSITIONS = [
  { id: "productAndGrowth", name: "Product & Growth" },
  { id: "gaming", name: "Gaming" },
  { id: "learning", name: "Learning" },
  { id: "engineering", name: "Engineering" },
  { id: "design", name: "Art & Design" },
  { id: "boardOfAdvisors", name: "Board of Advisors" },
  { id: "mentors", name: "Mentors" },
];

function TeamsPage() {
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [stickyheader, setstickyheader] = useState(false);
  const [showpopup, setshowpopup] = useState(false);
  const [showauth, setshowauth] = useState(false);

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
    <div className={styles.teamPage}>
      <PageTitle />
      <Header
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        stickyheader={stickyheader}
        setshowauth={setshowauth}
        setshowpopup={setshowpopup}
        showpopup={showpopup}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <div className={styles.container}>
        <div className={styles.heading}>Meet Us</div>
        <div className={styles.quote}>
          If your actions inspire others to dream more, learn more, do more and
          become more, you are a leader.
        </div>
        <div className={styles.mainContent}>
          {Object.keys(TEAM_DATA).map((item, ind) => {
            return (
              <div className={styles.team} key={ind}>
                <div className={styles.teamTitle}>
                  {POSITIONS.find((pos) => pos.id === item).name}
                </div>
                <div className={styles.teamMembers}>
                  {Object.values(TEAM_DATA[item]).map((elem, index) => {
                    return (
                      <div
                        className={
                          elem.link ? styles.memberWithLink : styles.member
                        }
                        key={"teammeber" + index}
                        onClick={
                          elem.link
                            ? () => window.open(elem.link, "_blank")
                            : () => {}
                        }
                      >
                        <div className={styles.imageArea}>
                          <img
                            src={elem.img_url}
                            alt="member image"
                            className={styles.img}
                          />
                          <div className={styles.iconArea}>
                            <LinkedIN className={styles.linkedin} />
                          </div>
                        </div>
                        <div className={styles.name}>{elem.name}</div>
                        <div className={styles.position}>{elem.position}</div>
                      </div>
                    );
                  })}
                </div>
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
