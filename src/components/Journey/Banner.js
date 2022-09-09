import styles from "../../styles/Journey/banner.module.scss";
import UniCoinSvg from "../SVGcomponents/UniCoinSvg";
import Triangle from "../SVGcomponents/Journey/Triangle";

export default function Banner({ highlight }) {
  return (
    <div className={styles.banner} style={{ background: highlight.color }}>
      <Triangle
        className={styles.triangle}
        clr={highlight.color}
        style={{ ...highlight.pointer }}
      />
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.title}>{highlight.name}</div>
          <div className={styles.description}>{highlight.description}</div>
          <div className={styles.buttonArea}>
            <button className={styles.button}>BEGIN</button>
          </div>
        </div>
        <div className={styles.right}>
          {highlight.reward && (
            <div className={styles.reward}>
              Win <UniCoinSvg className={styles.svg} />
              {highlight.reward}
            </div>
          )}
          <div>
            <img src={`/images/journey/${highlight.id}.svg`} />
          </div>
        </div>
      </div>
    </div>
  );
}
