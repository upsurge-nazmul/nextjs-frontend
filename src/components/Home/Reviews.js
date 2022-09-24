import React from "react";
import styles from "../../styles/Home/reviews.module.scss";
import LeftArrowRound from "../SVGcomponents/LeftArrowRound";
import PlaySvg from "../SVGcomponents/PlaySvg";
import RightArrowRound from "../SVGcomponents/RightArrowRound";

function Reviews() {
  return (
    <div className={styles.reviewSection}>
      <div className={styles.left}>
        <LeftArrowRound className={styles.leftIcon} />
        <RightArrowRound className={styles.rightIcon} />
        <div className={styles.bigcard}>
          <div className={styles.video}>
            <img
              className={styles.image}
              src="https://imgcdn.upsurge.in/images/unsp/omar-lopez-Za03n9MIt4s-unsplash.jpg"
              alt=""
            />
            <PlaySvg className={styles.playicon} />
          </div>
          <div className={styles.textsection}>
            <p className={styles.comment}>
              “Upsurge really is this magical place where students can go and
              everything they need is just one click away.”
            </p>
            <p className={styles.name}>Ashish Sharma</p>
            <p className={styles.type}>Parent</p>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.heading}>
          Listen to how parents are using Upsurge to supercharge their child’s
          financial literacy.
        </div>
        <div className={styles.subheading}>
          One little win, and one breakthrough moment at a time.
        </div>
        <div className={styles.wrapper}>
          <div className={styles.card}>
            <div className={styles.image}>
              <PlaySvg className={styles.playicon} />
              <img
                src="https://imgcdn.upsurge.in/images/unsp/photo-1566753323558-f4e0952af115.avif"
                alt=""
                className={styles.smallimg}
              />
            </div>
            <div className={styles.textsection}>
              <p className={styles.name}>Ashish Sharma</p>
              <p className={styles.type}>Parent</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.image}>
              <PlaySvg className={styles.playicon} />
              <img
                src="https://imgcdn.upsurge.in/images/unsp/photo-1570295999919-56ceb5ecca61.avif"
                alt=""
                className={styles.smallimg}
              />
            </div>
            <div className={styles.textsection}>
              <p className={styles.name}>Mehul Garg</p>
              <p className={styles.type}>Parent</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.image}>
              <PlaySvg className={styles.playicon} />
              <img
                src="https://imgcdn.upsurge.in/images/unsp/photo-1542190891-2093d38760f2.avif"
                alt=""
                className={styles.smallimg}
              />
            </div>
            <div className={styles.textsection}>
              <p className={styles.name}>Prakash Raina</p>
              <p className={styles.type}>Parent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
