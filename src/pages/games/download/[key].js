import { useRouter } from "next/router";
import React, { useEffect, useState, useContext, useRef } from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Home/Footer";
import JoinUs from "../../../components/Home/JoinUs";
import LeftPanel from "../../../components/LeftPanel";
import PageTitle from "../../../components/PageTitle";
import Curve1 from "../../../components/SVGcomponents/Curve1";
import Curve2 from "../../../components/SVGcomponents/Curve2";
import { MainContext } from "../../../context/Main";
import { Download_Games_Data } from "../../../static_data/Game_Data";
import styles from "../../../styles/DownloadGames/DownloadSignleGame.module.scss";

export const getStaticPaths = () => {
  let params = Object.keys(Download_Games_Data).map((item) => {
    return {
      params: {
        key: item,
      },
    };
  });
  return {
    paths: params,
    fallback: false,
  };
};

export const getStaticProps = (context) => {
  const {
    params: { key },
  } = context;
  let gameData = Download_Games_Data[key];
  return {
    props: {
      gameData,
    },
  };
};

const DownloadSingleGamePage = ({ gameData }) => {
  const router = useRouter();
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [stickyheader, setstickyheader] = useState(false);
  const [showpopup, setshowpopup] = useState(false);
  const { userdata, theme } = useContext(MainContext);

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
  async function handleclick(item) {
    if (!userdata) {
      setshowauth(true);
      return;
    }
    if (item === "Ludo" && isMobile) {
      let res = await FreeGameApis.presign({
        playername: "Anonymous",
        playeremail: "tempuser@upsurge.in",
        number: "",
        game: item,
      });
      if (res) {
        if (res.data.success) {
          router.push({
            pathname: "/games/Ludo",
            query: { id: res.data.data },
          });
        } else {
          console.log(res.data.message);
        }
      } else {
        console.log("error connecting server");
      }
    } else {
      if (Game_Data[item]?.pushto) {
        return router.push(Game_Data[item].pushto);
      }
      router.push("/games/" + item);
    }
  }

  let slideIndex = 0;
  let slides;

  function nextSlide() {
    slideIndex++;
    showSlides();
    timer = _timer;
  }

  function prevSlide() {
    slideIndex--;
    showSlides();
    timer = _timer;
  }

  function currentSlide(n) {
    slideIndex = n - 1;
    showSlides();
    timer = _timer;
  }

  useEffect(() => {
    slides = document.querySelectorAll("#allSlides");
    showSlides();
  });
  function showSlides() {
    if (slideIndex > slides.length - 1) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;
    slides.forEach((slide) => {
      slide.style.display = "none";
    });
    slides[slideIndex].style.display = "block";
  }

  let timer = 7; // sec
  const _timer = timer;

  useEffect(() => {
    const interval = setInterval(() => {
      timer--;
      if (timer < 1) {
        nextSlide();
        timer = _timer;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const downloadFile = (url, fileName) => {
    fetch(url, {
      method: "get",
      mode: "no-cors",
      referrerPolicy: "no-referrer",
    })
      .then((res) => res.blob())
      .then((res) => {
        const aElement = document.createElement("a");
        aElement.setAttribute("download", fileName);
        const href = URL.createObjectURL(res);
        aElement.href = href;
        aElement.setAttribute("target", "_blank");
        aElement.click();
        URL.revokeObjectURL(href);
      });
  };

  return (
    <div className={`${styles.mainContainer}`}>
      <PageTitle />
      <Header
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        stickyheader={stickyheader}
        setshowauth={setshowauth}
        showpopup={showpopup}
        setshowpopup={setshowpopup}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <div className={styles.contentWrapper}>
        <Curve1 className={styles.curve1} />
        <Curve2 className={styles.curve2} />
        <div className={styles.sectionWrapper}>
          <div className={styles.left}>
            <div className={styles.carouselContainer}>
              {gameData.images.map((item, index) => {
                return (
                  <div
                    key={index}
                    id="allSlides"
                    className={`${styles.mySlides} ${styles.animate}`}
                  >
                    <img src={item} alt="slide" />
                    {/* <div className="number">1 / 5</div>
              <div className="text">
                Lorem ipsum dolor sit amet consectetur
              </div> */}
                  </div>
                );
              })}
              <button className={styles.prev} onClick={prevSlide}>
                &#10094;
              </button>
              <button className={styles.next} onClick={nextSlide}>
                &#10095;
              </button>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.topWrapper}>
              <div className={styles.logo}>
                <img src={gameData?.logo} alt={gameData?.name} />
              </div>
              <h2 className={styles.heading}>{gameData?.name}</h2>
              <p className={styles.description}>{gameData.description}</p>
            </div>
            <div className={styles.bottomWrapper}>
              <span className={styles.subheading}>Download Options</span>
              <div className={styles.btnContainer}>
                <a href={gameData.playstore} target="_blank" rel="noreferrer">
                  <img
                    className={styles.badge}
                    src="/images/DownloadGames/google-play.png"
                    alt="PlayStore"
                  />
                </a>
                <a href={gameData.microsoft} target="_blank" rel="noreferrer">
                  <img
                    className={styles.badge}
                    src="/images/DownloadGames/ms_1.png"
                    alt="MicroSoft"
                  />
                </a>
              </div>
              <div className={styles.btnContainer}>
                <button
                  onClick={() =>
                    downloadFile(gameData.android_link, gameData.name)
                  }
                >
                  Download APK
                </button>
                <button onClick={() => downloadFile(gameData.windows_link)}>
                  Download EXE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <JoinUs />
      <Footer />
    </div>
  );
};

export default DownloadSingleGamePage;
