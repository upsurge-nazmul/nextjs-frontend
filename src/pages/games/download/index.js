import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import FreeGameApis from "../../../actions/apis/FreeGameApis";
import AvailableGames from "../../../components/DownloadGames/AvailableGames";
import FeaturedGameBanner from "../../../components/DownloadGames/FeaturedGameBanner";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Home/Footer";
import JoinUs from "../../../components/Home/JoinUs";
import LeftPanel from "../../../components/LeftPanel";
import PageTitle from "../../../components/PageTitle";
import Curve1 from "../../../components/SVGcomponents/Curve1";
import Curve2 from "../../../components/SVGcomponents/Curve2";
import { MainContext } from "../../../context/Main";
import styles from "../../../styles/GamePage/gamelist.module.scss";

const DownloadGamePage = () => {
  const router = useRouter();
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [stickyheader, setstickyheader] = useState(false);
  const [showpopup, setshowpopup] = useState(false);
  const comingsoongames = ["Ludo", "HighAndLow", "MoneyMath"];
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
  return (
    <div
      className={`${styles.gamelist} ${
        theme === "dark" && styles.darkgamelist
      }`}
    >
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
        <FeaturedGameBanner />
        <AvailableGames />
      </div>
      <JoinUs />
      <Footer />
    </div>
  );
};

export default DownloadGamePage;
