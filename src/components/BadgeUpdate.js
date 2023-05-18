import React,{useContext,useEffect,useRef,useState} from 'react'
import KidApis from "../actions/apis/KidApis";
import { getCookie } from "../actions/cookieUtils";
import { MainContext } from "../context/Main";
import Animation from './Buttons/Animation';
import styles from "../styles/animations/badgeupdate.module.scss";
function BadgeUpdate({setshowpopup}) {
const [kidLevel, setKidLevel] = useState();
const { userdata } = useContext(MainContext);
const [activeAnimation, setActiveAnimation] = useState(false);
  console.log(kidLevel);
  const colors = [
    { front: "#a864fd", back: "#345dd1" },
    { front: "#29cdff", back: "#a864fd" },
    { front: "#78ff44", back: "#ff718d" },
    { front: "#5c86ff", back: "#78ff44" },
    { front: "#ff718d", back: "#fdff6a" },
    { front: "#fdff6a", back: "#fdff6a" },
  ];
  const confettiCount = 100;
  const sequinCount = 150;
useEffect(() => {
  async function fetchKidLevel() {
    let res = await KidApis.getlevel(
      {
          id: userdata.user_id,
        },
        getCookie("accesstoken")
      );
      if (res && res.data && res.data.success) {
        setKidLevel(res.data.data);
      } else setKidLevel(1);
    }
    if (userdata) {
      if (userdata.user_id) {
        fetchKidLevel();
        setActiveAnimation(true);
      } else {
        setKidLevel(userdata.level);
      }
    }
  }, [userdata]);
return (
    <div className={styles.badgeupdate}>
    <div
      className={styles.background}
      onClick={() => {
        setshowpopup(false);
      }}
    ></div>
    <div className={styles.content}>
        <img
          src={"/images/badges/badge_" + kidLevel + ".svg"}
          alt="Badge"
          className={styles.prevBadge}
          />
        <img
        id="img"
        src={"/images/badges/badge_" + kidLevel + ".svg"}
        alt="Badge"
        className={styles.newBadge}
        />
          <div className={styles.confettiContainer}>
        <Animation activate={activeAnimation} setActivate={setActiveAnimation} colors={colors} classActive={false} confettiCount={confettiCount} sequinCount={sequinCount} />
          </div>
          <div className={styles.congratulations}>Congratulations!!!</div>
          <div className={styles.listHeading}> Unlocked Perks</div>
          {/* {LEVEL_DATA.perks.map((item, i) => (
            <div className={styles.listItem} key={i}>
              - {item}
            </div>
          ))} */}
    </div>
  </div>
)
}

export default BadgeUpdate