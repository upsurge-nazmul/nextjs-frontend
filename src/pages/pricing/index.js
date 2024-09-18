import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import LeftPanel from "../../components/LeftPanel";
import PageTitle from "../../components/PageTitle";
import { MainContext } from "../../context/Main";
import styles from "../../styles/Pricing/pricing.module.scss";
import HighlightsCounter from "../../components/Home/HighlightsCounter";
import TestiMonial from "../../components/Home/TestiMonial";
import PRCoverage from "../../components/Home/PRCoverage";
import { assetsCdn } from "../../utils/utils";
import Plans from "../../components/Plans";

export default function PricingPage() {
  const router = useRouter();
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [stickyheader, setstickyheader] = useState(false);
  const [showpopup, setshowpopup] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [authMode, setAuthMode] = useState("");
  const [premiumPrice, setPremiumPrice] = useState();
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  const videoOverlayRef = useRef(null);

  const { theme } = useContext(MainContext);
  const { scheme } = router.query;

  const getResponsiveSizeHide = () => {
    if (typeof window !== "undefined") {
      let mediaQuerySmall = window.matchMedia("(max-width: 500px)");
      let mediaQueryMedium = window.matchMedia(
        " (min-width: 501px) and (max-width: 990px)"
      );
      let mediaQueryLarge = window.matchMedia(
        "(min-width: 991px) and (max-width: 1300px)"
      );
      if (mediaQuerySmall.matches) {
        return {
          left: "-100%",
          rotate: "0deg",
        };
      } else if (mediaQueryMedium.matches) {
        return {
          left: "-100%",
          rotate: "0deg",
        };
      } else if (mediaQueryLarge.matches) {
        return {
          left: "-100%",
          rotate: "-45deg",
        };
      } else {
        return {
          left: "-50%",
          rotate: "-45deg",
        };
      }
    } else {
      return {
        left: "-50%",
        rotate: "-45deg",
      };
    }
  };

  const getResponsiveSizeShow = () => {
    if (typeof window !== "undefined") {
      let mediaQuerySmall = window.matchMedia("(max-width: 500px)");
      let mediaQueryMedium = window.matchMedia(
        " (min-width: 501px) and (max-width: 990px)"
      );
      let mediaQueryLarge = window.matchMedia(
        "(min-width: 991px) and (max-width: 1300px)"
      );
      if (mediaQuerySmall.matches) {
        return {
          left: "-30%",
          rotate: "30deg",
        };
      } else if (mediaQueryMedium.matches) {
        return {
          left: "-18%",
          rotate: "30deg",
        };
      } else if (mediaQueryLarge.matches) {
        return {
          left: "-14%",
          rotate: "0deg",
        };
      } else {
        return {
          left: "0%",
          rotate: "0deg",
        };
      }
    } else {
      return {
        left: "0%",
        rotate: "0deg",
      };
    }
  };

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

  useEffect(() => {
    const jasperImage = document.getElementById("jasperVideo");

    function togglePlay() {
      if (videoRef.current.paused || videoRef.current.ended) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }

    videoRef.current.addEventListener("pause", () => {
      jasperImage.animate(
        {
          left: getResponsiveSizeShow().left,
          rotate: getResponsiveSizeShow().rotate,
        },
        {
          duration: 800,
          fill: "forwards",
        }
      );
      videoOverlayRef.current.style.display = "flex";
      setVideoPlaying(false);
    });

    videoRef.current.addEventListener("playing", () => {
      videoOverlayRef.current.style.display = "none";
      setVideoPlaying(true);
      jasperImage.animate(
        {
          left: getResponsiveSizeHide().left,
          rotate: getResponsiveSizeHide().rotate,
        },
        {
          duration: 800,
          fill: "forwards",
        }
      );
    });

    jasperImage.addEventListener("click", () => {
      togglePlay();
    });

    return () => {};
  }, []);

  return (
    <div
      className={`${styles.pricingPage} ${
        theme === "dark" && styles.darkpricingPage
      }`}
    >
      <PageTitle
        title="Pricing for upsurge Financial Literacy Platform for Kids and School Students in India"
        content="Get cost-effective pricing plans of upsurge financial literacy platform for kids, financial literacy courses for kids and entrepreneurship courses with educational games for kids"
      />
      <Header
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        stickyheader={stickyheader}
        setshowauth={setshowauth}
        authmode={authMode}
        setshowpopup={setshowpopup}
        showpopup={showpopup}
        premiumPrice={premiumPrice}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <h1 className={styles.heading}>
        Power up your child&#39;s financial education with upsurge
        <span className={styles.heading_underline}>Premium.</span>
      </h1>
      <div className={styles.mainContent}>
        <div className={styles.topSection}>
          <div className={styles.contentLeft}>
            <div className={styles.videoContainer}>
              <video
                ref={videoRef}
                className={styles.video}
                loop
                controls={videoPlaying}
                poster="https://imgcdn.upsurge.in/images/pricing-video-picture.png"
              >
                <source
                  src={assetsCdn("video/upsurge-CompanyIntro.mkv")}
                  type="video/mp4"
                ></source>
              </video>
              <div ref={videoOverlayRef} className={styles.playButtonContainer}>
                <button
                  onClick={() => {
                    if (videoRef.current.paused || videoRef.current.ended) {
                      videoRef.current.play();
                    } else {
                      videoRef.current.pause();
                    }
                  }}
                  className={styles.playButton}
                >
                  <svg
                    id="svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 80 80"
                  >
                    <path d="M40 0a40 40 0 1040 40A40 40 0 0040 0zM26 61.56V18.44L64 40z" />
                  </svg>
                </button>
              </div>
            </div>
            <img
              src={require("../../assets/Jasper/10.png").default.src}
              alt={"jasper"}
              className={styles.jasper}
              id="jasperVideo"
            />
          </div>
          <div className={styles.contentRight}>
            <div className={styles.section}>
              <div className={styles.sectionContent}>
                <p className={styles.subheading}>
                  Get access to premium quests and games
                </p>
                <div className={styles.listContainer}>
                  <ul>
                    <li className={styles.sectionItem}>20 Knowledge Quests</li>
                    <li className={styles.sectionItem}>16 Educational Games</li>
                    <li className={styles.sectionItem}>
                      5 Flagship Games (1000 hours)
                    </li>
                    <li className={styles.sectionItem}>
                      Events and Challenges
                    </li>
                    <li className={styles.sectionItem}>
                      10,000 Bonus Unicoins
                    </li>
                    <li className={styles.sectionItem}>Redeem Vouchers</li>
                    <li className={styles.sectionItem}>
                      Win monthly rewards worth ₹25,000/-
                    </li>
                  </ul>
                </div>
              </div>
              <div className={styles.sectionBottomContent}>
                <p>New quests and games added every month!</p>
              </div>
            </div>
          </div>
        </div>
        <Plans
          scheme={scheme}
          handleOutsideUser={() => {
            setshowauth(true);
            setAuthMode("login");
          }}
        />
      </div>
      <div className={styles.sectionSpacing}>
        <HighlightsCounter />
      </div>
      <div className={styles.sectionSpacing}>
        <TestiMonial />
      </div>
      <div className={styles.sectionSpacing}>
        <PRCoverage />
        {/* <button
          onClick={() => {
            console.log(plans[1].id);
            setPremiumPrice(plans[1].id);
            setAuthMode("parentChild");
            setshowauth(true);
          }}
          className={styles.button}
        >
          Buy now
        </button> */}
      </div>
      <Footer />
    </div>
  );
}
