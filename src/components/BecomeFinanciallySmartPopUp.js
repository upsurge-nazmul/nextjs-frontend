import React, { useEffect, useState } from "react";
import styles from "../styles/GeneralComponents/trendingGames.module.scss";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import KidApis from "../actions/apis/KnowledgeQuestApi";
import { useRouter } from "next/router";

function BecomeFinanciallySmartPopUp({
  setShowBecomeFinanciallySmart,
  setCurrentChapter,
  setUnicoins,
  setKqOpened,
  userdata,
}) {
  const router = useRouter();
  const [questData, setQuestData] = useState();
  useEffect(async () => {
    let response = await KidApis.getQuestDataPreSignUp();
    if (response) {
      setQuestData(response.data.data);
    }
  }, []);
  const setData = async (selection) => {
    setCurrentChapter(questData[selection].chapters.id);
    setKqOpened(questData[selection].chapters.title);
    setUnicoins(3000);
  };
  return (
    <div className={styles.trendingGames}>
      <div
        className={styles.background}
        onClick={() => {
          setShowBecomeFinanciallySmart(false);
        }}
      ></div>
      <div className={styles.block}>
        <div
          className={styles.cross}
          onClick={() => {
            setShowBecomeFinanciallySmart(false);
          }}
        >
          <CancelOutlinedIcon className={styles.icon} />
        </div>
        <h2>Become Financially Smart!</h2>
        <div className={styles.images}>
          <div className={styles.image}>
            <img
              className={styles.KQImg}
              src="/knowyourmoneythumbnail.png"
              alt="Money 101"
            />
            <button onClick={() =>{
              if(!userdata){
                setData(0);
              }
              else{
                console.log(` questData[0].id`, questData[0].questId);
                router.push("/dashboard/k/quest/" + questData[0].questId);
              }
            }
            } className={styles.playButton}>
              Try Now
            </button>
          </div>
          <div className={styles.image}>
            <img
              className={styles.KQImg}
              src="/bankingthumbnail.png"
              alt="Introducing to Banking"
            />
            <button onClick={() => setData(1)} className={styles.playButton}>
              Try Now
            </button>
          </div>
          <div className={styles.image}>
            <img
              className={styles.KQImg}
              src="/digitalpaymentthumbnail.png"
              alt="Digital Payemnt"
            />
            <button onClick={() => setData(2)} className={styles.playButton}>
              Try Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BecomeFinanciallySmartPopUp;
