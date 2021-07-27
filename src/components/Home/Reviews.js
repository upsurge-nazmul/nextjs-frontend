import React from "react";
import Play from "../../assets/reviews/play.svg";
import Left from "../../assets/reviews/left.svg";
import Right from "../../assets/reviews/right.svg";
import Image from "next/image";
import styles from "../../styles/Home/reviews.module.scss";

function Reviews() {
  return (
    <div className={styles.reviewSection}>
      <div className={styles.left}>
        <img src={Left.src} className={styles.leftIcon} />
        <img src={Right.src} t className={styles.rightIcon} />
        <div className={styles.bigcard}>
          <div className={styles.video}>
            <img
              className={styles.image}
              src="https://images.unsplash.com/photo-1609440082470-106df86c0f6c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=omar-lopez-Za03n9MIt4s-unsplash.jpg"
              alt=""
            />
            <img src={Play.src} className={styles.playicon} />
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
              <img src={Play.src} className={styles.playicon} />
              <img
                src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
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
              <img src={Play.src} className={styles.playicon} />
              <img
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
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
              <img src={Play.src} className={styles.playicon} />
              <img
                src="https://images.unsplash.com/photo-1542190891-2093d38760f2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
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
