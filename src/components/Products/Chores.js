import React from "react";
import styles from "../../styles/Products/chores.module.scss";
export default function Chores({ id }) {
  return (
    <div className={styles.chores} id={id}>
      <div className={styles.top}>
        <div className={styles.heading}>Chores</div>
        <div className={styles.subheading}>
          Upsurge enables you to set responsibilities and paid jobs for each
          kid, and manage their privileges, rewards and allowance.
        </div>
        <div className={styles.button}>Join the waitlist</div>
        <img
          className={styles.mobileimage}
          src="/images/mobilechore.png"
          alt=""
        />
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <div className={styles.first}>
            <div className={styles.heading}>
              Shows Kids How Money Is Earned.
            </div>
            <div className={styles.description}>
              Connecting Chores with Allowance teaches kids that money is earned
              and not simply given.
            </div>
            <div className={styles.connectorl}>
              <div className={styles.ball}></div>
              <div className={styles.line}></div>
            </div>
          </div>
          <div className={styles.second}>
            <div className={styles.heading}>Supports Long Term Goals.</div>
            <div className={styles.description}>
              Mastering delayed gratification is one of the biggest predictors
              of future financial success! Teach kids financial responsibility
              by providing them with incentives that differ in value.
            </div>
            <div className={styles.connectorl}>
              <div className={styles.ball}></div>
              <div className={styles.line}></div>
            </div>
          </div>
        </div>
        <div className={styles.mid}>
          <img src="/images/mobilechore.png" alt="" />
        </div>
        <div className={styles.right}>
          <div className={styles.first}>
            <div className={styles.heading}>
              Teaches Real Life Financial Skills.
            </div>
            <div className={styles.description}>
              Upsurge enables you to transfer allowance and extra money kids
              earn directly to their savings or checking account.
            </div>
            <div className={styles.connectorr}>
              <div className={styles.ball}></div>
              <div className={styles.line}></div>
            </div>
          </div>
          <div className={styles.second}>
            <div className={styles.heading}>Connects The Whole Family.</div>
            <div className={styles.description}>
              Upsurge lets you manage chores, allowance and rewards for the
              whole family. Everyone get notifications when their chores are due
              or completed and everything is connected by a family chat.
            </div>
            <div className={styles.connectorr}>
              <div className={styles.ball}></div>
              <div className={styles.line}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
