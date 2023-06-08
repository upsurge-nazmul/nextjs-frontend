import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import LeftPanel from "../../components/LeftPanel";
import PageTitle from "../../components/PageTitle";
import { MainContext } from "../../context/Main";
import styles from "../../styles/Pricing/pricing.module.scss";
import PaymentsApi from "../../actions/apis/PaymentsApi";
import HighlightsCounter from "../../components/Home/HighlightsCounter";
import TestiMonial from "../../components/Home/TestiMonial";
import PRCoverage from "../../components/Home/PRCoverage";

const PREMIUM_PRICE = 1799;

export default function Pricing() {
  const router = useRouter();
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [stickyheader, setstickyheader] = useState(false);
  const [showpopup, setshowpopup] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [authMode, setAuthMode] = useState("");
  const [premiumPrice, setPremiumPrice] = useState();

  const { theme } = useContext(MainContext);
  const [plans, setPlans] = useState();

  async function fetchPlans() {
    const res = await PaymentsApi.getPlans();
    if (res && res.data && res.data.success) {
      console.log(res.data.data);
      setPlans(res.data.data);
    }
  }

  useEffect(() => {
    fetchPlans();
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

  // const handleBuyPremium = () => {
  //   console.log("buy premium");
  //   setPremiumPrice(PREMIUM_PRICE);
  // };

  useEffect(() => {
    const mobileAndTabletCheck = () => {
      let check = false;
      (function (a) {
        if (
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
            a
          ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            a.substr(0, 4)
          )
        )
          check = true;
      })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    };
    const video = document.getElementById("video");
    const jasperImage = document.getElementById("jasperVideo");

    function togglePlay() {
      if (video.paused || video.ended) {
        video.play();
      } else {
        video.pause();
      }
    }

    video.addEventListener("pause", () => {
      jasperImage.animate(
        {
          left: mobileAndTabletCheck() ? "-30%" : "0",
          rotate: mobileAndTabletCheck() ? "30deg" : "0deg",
        },
        {
          duration: 800,
          fill: "forwards",
        }
      );
    });

    video.addEventListener("playing", () => {
      jasperImage.animate(
        {
          left: mobileAndTabletCheck() ? "-100%" : "-50%",
          rotate: mobileAndTabletCheck() ? "0deg" : "-45deg",
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
        <u className={styles.heading_underline}>Premium.</u>
      </h1>
      <div className={styles.mainContent}>
        <div className={styles.contentLeft}>
          <div className={styles.videoContainer}>
            <video
              id="video"
              className={styles.video}
              controls
              autoPlay
              muted
              loop
            >
              <source
                src="https://upsurge-assets-cdn.s3.ap-south-1.amazonaws.com/video/upsurge-CompanyIntro.mkv"
                type="video/mp4"
              ></source>
            </video>
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
                  <li className={styles.sectionItem}>Events and Challenges</li>
                  <li className={styles.sectionItem}>10,000 Bonus Unicoins</li>
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
          {/* <div className={styles.subToPremium}>
            <div className={styles.block}>
            <p
            className={styles.clickable}
            onClick={() => {
              setPremiumPrice(null);
              setAuthMode("parentChild");
              setshowauth(true);
            }}
            >
            <u>Try free version</u>
            </p>
            </div>
          </div> */}
          <div className={styles.pricing}>
            <div className={styles.pricingLeft}>
              <h3>&#8377;208/ Month</h3>
              <p>&#8377;2499/ billed annually</p>
            </div>
            <div className={styles.pricingRight}>
              <button
                className={styles.button}
                onClick={() => {
                  console.log(plans[1].id);
                  setPremiumPrice(plans[1].id);
                  setAuthMode("parentChild");
                  setshowauth(true);
                  //router.push(`/payments/stripe?plan_id=${plans[1].id}`);
                }}
              >
                {`Buy now`}
              </button>
              <p className={styles.try}>Try free Version</p>
            </div>
          </div>
        </div>
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
