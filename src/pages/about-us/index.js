import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import LeftPanel from "../../components/LeftPanel";
import styles from "../../styles/about/about.module.scss";
import { MainContext } from "../../context/Main";
import PageTitle from "../../components/PageTitle";
import Image from "next/image";

const cards = [
  {
    img: "https://imgcdn.upsurge.in/images/games/integrity.png",
    title: "Integrity",
  },
  {
    img: "https://imgcdn.upsurge.in/images/games/excellence.png",
    title: "Excellence",
  },
  {
    img: "https://imgcdn.upsurge.in/images/games/fun.png",
    title: "Fun",
  },
  {
    img: "https://imgcdn.upsurge.in/images/games/passion.png",
    title: "Passion",
  },
];

export default function About({ userdata }) {
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [showpopup, setshowpopup] = useState(false);
  const [stickyheader, setstickyheader] = useState(false);
  const { theme } = useContext(MainContext);

  useEffect(() => {
    const handlescroll = () => {
      if (window.scrollY > 0) {
        setstickyheader(true);
      } else {
        setstickyheader(false);
      }
    };
    window.addEventListener("scroll", handlescroll);
    return () => window.removeEventListener("scroll", handlescroll);
  }, []);

  return (
    <div
      className={`${styles.aboutPage} ${
        theme === "dark" && styles.darkaboutPage
      }`}
    >
      <PageTitle />
      <Header
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        setshowauth={setshowauth}
        stickyheader={stickyheader}
        showpopup={showpopup}
        setshowpopup={setshowpopup}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <div className={styles.container}>
        <div className={styles.head}>
          <p className={styles.heading}>About us</p>
          <p className={styles.subheading}>
            We are a family-focused financial platform that offers{" "}
            <b>financial education</b> for children through interactive
            educational content, games, and gamified real-life responsibility
            management.
          </p>
        </div>

        <div className={styles.visionSection}>
          <div className={styles.left}>
            <p className={styles.heading}>Our goal= Financial Freedom</p>
            <p className={styles.des}>
              Financial Freedom is not being very rich or having 5 cars.
              Financial Freedom put simply is when you do not HAVE to work to
              pay your bills. You achieve this freedom when you have enough
              saved up to cover your living expenses for the rest of your life!
            </p>
          </div>
          <div className={styles.right}>
            <div className={styles.imgwrapper}>
              <Image
                src="https://imgcdn.upsurge.in/images/games/about-us-vision.png"
                layout="fill"
                objectFit="contain"
                alt="About Us"
              />
            </div>
          </div>
        </div>

        <div className={styles.missionSection}>
          <div className={styles.left}>
            <div className={styles.imgwrapper}>
              <Image
                src="https://imgcdn.upsurge.in/images/games/about-us-mission.png"
                alt="About Us"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
          <div className={styles.right}>
            <p className={styles.heading}>Mission upsurge</p>

            <p className={styles.des}>
              We aim to help raise a financially capable generation by
              developing financial literacy and entrepreneurship skills amongst
              children and young adults, to make them capable of making prudent
              financial decisions and achieving their financial freedom.
            </p>
            <div className={styles.lineSpace} />
            <p className={styles.des}>
              We believe that understanding personal finance, career
              development, investing and entrepreneurship are critical life
              skills that have been ignored for far too long, and we are
              committed to promoting financial and entrepreneurial literacy in
              an experiential, fun and effective way. So, working with
              developmental, financial and experiential experts, we have
              prepared a gamified curriculum and exclusive games to encourage
              learning.
            </p>
          </div>
        </div>

        <div className={styles.thirdSection}>
          <p className={styles.heading}>Values</p>
          <div className={styles.cardsContainer}>
            {cards.map((item, i) => (
              <div key={"card-" + i} className={styles.card}>
                <div className={styles.cardImage}>
                  <Image
                    src={item.img}
                    layout="fill"
                    objectFit="contain"
                    alt={item.title}
                  />
                </div>
                <h3 className={styles.title}>{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
