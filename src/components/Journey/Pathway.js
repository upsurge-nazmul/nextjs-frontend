import styles from "../../styles/Journey/pathway.module.scss";
import UniCoinSvg from "../SVGcomponents/UniCoinSvg";

export default function Pathway({ PATH, handleClick }) {
  return (
    <div className={styles.pathway}>
      <div className={styles.content}>
        {PATH.map((item, i) => {
          return (
            <div className={styles.path} key={i}>
              <div
                className={styles.pathItem}
                onClick={() => handleClick(item)}
              >
                <div className={styles.icon}>
                  <img src={`/images/journey/${item.id}.svg`} />
                </div>
                <div className={styles.title}>{item.name}</div>
                {item.reward && (
                  <div className={styles.rewardArea}>
                    <div className={styles.reward}>
                      <UniCoinSvg className={styles.svg} />
                      <span>{item.reward}</span>
                    </div>
                  </div>
                )}
              </div>
              {i === PATH.length - 1 ? "" : <div className={styles.dash} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
