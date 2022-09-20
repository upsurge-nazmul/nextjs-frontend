import styles from "../../styles/Journey/pathway.module.scss";
import UniCoinSvg from "../SVGcomponents/UniCoinSvg";
import { PathwayData } from "../../static_data/Pathways_Data";

export default function Pathway({ highlight = null, handleClick }) {
  return (
    <div className={styles.pathway}>
      <div className={styles.content}>
        {PathwayData.map((item, i) => {
          return (
            <div className={styles.path} key={i}>
              <div
                className={
                  highlight && highlight.pathwayId === item.pathwayId
                    ? styles.selectedPathItem
                    : styles.pathItem
                }
                onClick={() => handleClick(item)}
              >
                <div className={styles.icon}>
                  <img
                    src={`/images/journey/${item.pathwayId}.svg`}
                    className={styles.iconImage}
                    alt=""
                  />
                </div>
                <div className={styles.title}>{item.title}</div>
                {item.pathwayreward && (
                  <div className={styles.rewardArea}>
                    <div className={styles.reward}>
                      <UniCoinSvg className={styles.svg} />
                      <span>{item.pathwayreward}</span>
                    </div>
                  </div>
                )}
              </div>
              {i === PathwayData.length - 1 ? (
                ""
              ) : (
                <div className={styles.dash} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
