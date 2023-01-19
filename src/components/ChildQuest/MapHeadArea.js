import react,{useState,useEffect,useContext} from 'react';
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/knowledgeQuest/mapheadarea.module.scss";
import { positions } from "./positions";
import { UniCoinValue } from "../../../config";
import UniCoinSvg from "../SVGcomponents/UniCoinSvg";
import BrokenGameConroller from "../../components/SVGcomponents/BrokenGameConroller";
import KnowledgeQuestApi from "../../actions/apis/KnowledgeQuestApi";
import { MainContext } from "../../context/Main";
import QuestMap from "../../components/ChildQuest/QuestMap";
import RecordingView from "../../components/ChildQuest/RecordingView";
import ActivityView from "../../components/ChildQuest/ActivityView";
import QuizView from "../../components/ChildQuest/QuizView";
import GameView from "../../components/Games/GameView";
import { getCookie } from "../../actions/cookieUtils";
const LESSON_TYPES = ["recording", "activity", "quiz", "game"];

const democoncepts = [
  "Money",
  "Currency",
  "Banking",
  "Payments",
  "Money Management",
  "Quiz",
  "Activity",
];

export default function MapHeadArea({
  data,
  handleCardClick
}) {
  console.log(data);
  const router = useRouter();
  const { userdata, setuserdata, widthHeight } = useContext(MainContext);
  const [mapZoom,setMapZoom] = useState("");
  const [mapQuestdisplay,setMapQuestDisplay] = useState("");
  const [currentQuest, setCurrentQuest] = useState(data[0]);
  const [view, setView] = useState();
  const [currentChapter, setCurrentChapter] = useState();
  const [activeChNo, setActiveChNo] = useState(0);
  const [userLevel, setUserLevel] = useState(0);
  const [questId,setQuestId] = useState();
  useEffect(() => {
    if (data && questId) {
      let curr = data.find((q) => q.questId === questId);
      setCurrentQuest(curr);
    }
  }, [questId, data]);
  console.log("mapZoom",mapZoom)
  useEffect(() => {
    async function fetchQuestLevel() {
      let level = await KnowledgeQuestApi.initiate(
        { quest_id: questId },
        getCookie("accesstoken")
        );
        if (level && level.data && level.data.success) {
          setUserLevel(level.data.data.level);
        }
      }
      fetchQuestLevel();
    }, [questId]);
    
    const handleBack = () => {
      setView();
      setCurrentChapter();
      setActiveChNo(0);
    };
    
    const handleDone = () => {
      KnowledgeQuestApi.update({
        level: activeChNo,
        quest_id: currentQuest.questId,
      });
      setUserLevel((prev) => (prev > activeChNo ? prev : activeChNo));
    setView();
    setCurrentChapter();
    setActiveChNo(0);
  };
  return (
    <>
      {data && (
        <div className={styles.mapContent} id="quest-main">
          <div className={`
          ${mapZoom == "banking" ? styles.Banking : ""}
          ${mapZoom == "personalFinance1" ? styles.PF1 : ""}
          ${mapZoom == "whatIsMoney" ? styles.money : ""}
          ${mapZoom == "digitalPaymentsUpi" ? styles.upi : ""}
          ${mapZoom == "personalFinance2" ? styles.PF2 : ""}
          ${mapZoom == "whatIsEntrepreneurship" ? styles.wie : ""}
          ${mapZoom == "yourBusiness" ? styles.yourBusiness : ""}
          ${mapZoom == "superZoomwhatIsMoney" ? styles.superZoomMoney : ""}
          ${mapZoom == "superZoombanking" ? styles.superZoomBanking : ""}
          ${mapZoom == "superZoomdigitalPaymentsUpi" ? styles.superZoomUPI : ""}
          ${mapZoom == "superZoompersonalFinance1" ? styles.superZoomPF1 : ""}
          ${mapZoom == "superZoompersonalFinance2" ? styles.superZoomPF2 : ""}
          ${mapZoom == "superZoomwhatIsEntrepreneurship" ? styles.superZoomwie : ""}
          ${mapZoom == "superZoomyourBusiness" ? styles.superZoomyourBusiness : ""}
          ${mapZoom == "" ? styles.overview : ""}
          ${mapZoom == "zoomOut" ? styles.zoomOut : ""}
          ${mapZoom == "questStarted" ? "" : ""}
          ${styles.map}
          `}
          >
          { mapQuestdisplay !== "superZoombanking" && mapQuestdisplay !== "superZoomdigitalPaymentsUpi" && mapQuestdisplay !== "superZoomwhatIsMoney" && mapQuestdisplay !=="superZoompersonalFinance1" && mapQuestdisplay !=="superZoompersonalFinance2" && mapQuestdisplay !=="superZoomwhatIsEntrepreneurship" && mapQuestdisplay !=="superZoomyourBusiness" && mapQuestdisplay !== "questStarted" ?
<>
            {data.map((item) => {
              return (
                <div key={item.questNo} className={styles.increasedArea} style={positions[`overWorld`][item.questNo-1]}  onMouseEnter={()=> {
                  if(mapZoom !== "superZoombanking" && mapZoom !== "superZoomdigitalPaymentsUpi" && mapZoom !== "superZoomwhatIsMoney" && mapZoom !=="superZoompersonalFinance1" && mapZoom !=="superZoompersonalFinance2" && mapQuestdisplay !=="superZoomwhatIsEntrepreneurship" && mapQuestdisplay !=="superZoomyourBusiness")   
                  {setMapZoom(item.questId)
                }
              }}
                onMouseLeave={()=> {
                  if(mapZoom !== "superZoombanking" && mapZoom !== "superZoomdigitalPaymentsUpi" && mapZoom !== "superZoomwhatIsMoney" && mapZoom !=="superZoompersonalFinance1" && mapZoom !=="superZoompersonalFinance2" && mapQuestdisplay !=="superZoomwhatIsEntrepreneurship" && mapQuestdisplay !=="superZoomyourBusiness")   
                  {setMapZoom("")
                }}} >
                       <div 
                       key={item.questNo} 
                       onClick={() => { //handleCardClick(item.questId); 
                        console.log("superZoom"+item.questId)
                        setQuestId(item.questId)
                        setMapZoom("superZoom"+item.questId)
                        setTimeout(()=>{
                          setMapQuestDisplay("superZoom"+item.questId);
                        },0)
                      }}
                      className={styles.heading} >
        <span>
          <div className={styles.chapterlengthBlock}>{item.chapters.length}</div>
          {item.title}
        <div className={styles.rewardBlock}>
            <UniCoinSvg className={styles.svg} clr="#fff" />
            <p className={styles.number}>
              {item.totalUnicoins
                ? item.totalUnicoins > UniCoinValue
                ? (item.totalUnicoins / UniCoinValue).toFixed(2) + "K"
                : item.totalUnicoins
                : 0}
            </p>
          </div>
        </span>
        </div>
         </div>
        );
      })
    }
      </>
      :
      <>
       {mapZoom !== "questStarted" ?
      <div className={styles.cancel} onClick={()=>{
        setMapZoom("zoomOut")
        setTimeout(()=>{
          setMapQuestDisplay("zoomOut");
        },0)
        }}>
        X
        </div> : null }
      {widthHeight.width < 900 &&
            widthHeight.height > widthHeight.width ? (
              <div className={styles.mobileerr}>
                <div className={styles.box}>
                  <BrokenGameConroller className={styles.jasper} />
                  <p className={styles.heading}>
                    Please switch to landscape mode
                  </p>
                  <p>{`We recommend changing your display to landscape mode to best enjoy the quest`}</p>
                  <div
                    className={styles.button}
                    onClick={() => router.push("/dashboard/k")}
                  >
                    Go back
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {view && currentQuest ? (
                  <div className={styles.views}>
                    {view === LESSON_TYPES[0] ? (
                      <RecordingView
                        {...{
                          chapterId: currentChapter,
                          handleBack,
                          handleDone,
                          questId: currentQuest.questId,
                          setMapZoom,
                        }}
                        />
                        ) : view === LESSON_TYPES[1] ? (
                          <ActivityView
                          {...{
                            chapterId: currentChapter,
                            handleBack,
                            handleDone,
                            questId: currentQuest.questId,
                            setMapZoom,
                          }}
                          />
                          ) : view === LESSON_TYPES[2] ? (
                            <QuizView
                            {...{
                              chapterId: currentChapter,
                              questId: currentQuest.questId,
                              handleDone,
                              setuserdata,
                              setMapZoom,
                            }}
                            />
                            ) : view === LESSON_TYPES[3] ? (
                              <GameView
                              chapterId = {currentChapter}
                              game={currentChapter}
                              setGame={handleBack}
                              handleDone={handleDone}
                              questId={currentQuest.questId}
                              setMapZoom={setMapZoom}
                              />
                              ) : (
                                ""
                    )}
                      <div className={styles.actionArea}>
                      <button
                        className={styles.backButton}
                        onClick={()=>{
                          handleBack()
                          setMapZoom("superZoom"+currentQuest.questId)
                        }}
                      >
                        Go Back
                      </button>
                    </div>
                  </div>
                    ):(<>
                      {currentQuest.chapters
                        ? currentQuest.chapters.length
                          ? currentQuest.chapters.map((chapter) => {
                              return (
                                <div
                                  key={chapter.chapterNo}
                                  className={
                                    userLevel >= chapter.chapterNo
                                      ? styles.completedChapter
                                      : userLevel + 1 === chapter.chapterNo
                                      ? styles.chapter
                                      : styles.disabledChapter
                                  }
                                  style={
                                    positions[`quest${currentQuest.questNo}`][
                                      chapter.chapterNo - 1
                                    ]
                                  }
                                  onClick={() => {
                                    if (
                                      userLevel >= chapter.chapterNo ||
                                      userLevel + 1 === chapter.chapterNo
                                    ) {
                                      mixpanel.track('Knowledge Quest started',{'event':`Quest Started ${chapter.id}`, 'chapterId':`${chapter.id}`});
                                      setMapZoom("questStarted")
                                      setView(chapter.type);
                                      setCurrentChapter(chapter.id);
                                      setActiveChNo(chapter.chapterNo);
                                    }
                                  }}
                                >
                                  <span>{chapter.title}</span>
                                </div>
                              );
                            })
                          : ""
                          : ""}
                          </>
                    )}
              </div>)}
      </>
      }
      </div>
        </div>
      )}
    </>
  );
}
