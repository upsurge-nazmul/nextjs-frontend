import react,{useState,useEffect} from 'react';
import styles from "../../styles/knowledgeQuest/mapheadarea.module.scss";
import { positions } from "./positions";

export default function MapHeadArea({
  data,
  handleCardClick
}) {
    const [mapZoom,setMapZoom] = useState("");
    console.log(mapZoom)
  return (
    <>
      {data && (
        <div className={styles.mapContent} id="quest-main">
          <div className={`
          ${mapZoom == "Banking" ? styles.Banking : ""}
          ${mapZoom == "superZoom" ? styles.superzoom : ""}
          ${mapZoom == "Personal Finance 1" ? styles.finance : ""}
          ${mapZoom == "What is Money?" ? styles.money : ""}
          ${mapZoom == "Digital Payments & UPI" ? styles.upi : ""}
          ${mapZoom == "" ? styles.overview : ""}
          ${styles.map}
          `}
          >
               {data.map((item) => {
                   return (
                       <div 
                       key={item.questNo} 
                       onClick={() => { //handleCardClick(item.questId); 
                        setMapZoom("superZoom")}}
                        onMouseEnter={()=> setMapZoom(item.title)}
                        onMouseLeave={()=> setMapZoom("")}
                        className={styles.heading} style={positions[`overWorld`][item.questNo-1]}>
        <span>{item.title}</span>
        </div>
        );
    })}
          </div>
        </div>
      )}
    </>
  );
}
