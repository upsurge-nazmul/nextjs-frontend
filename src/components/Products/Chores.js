import React, { useState } from "react";
import styles from "../../styles/Products/chores.module.scss";
import Image from "next/image";
export default function Chores({ id, email, setEmail, check, error }) {
  const [showinput, setshowinput] = useState(false);

  return (
    <div className={styles.chores} id={id}>
      <div className={styles.top}>
        <div className={styles.heading}>Chores</div>
        <div className={styles.subheading}>
          A fun and engaging way for parents to develop prudent financial
          behaviors in children by assigning them jobs and rewarding them with
          UniCoins – this helps them understand that they have to work to
          fulfill their tasks to earn money.
        </div>
        <div className={styles.signupBox}>
          {showinput && (
            <form onSubmit={check}>
              <input
                className={styles.input}
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </form>
          )}
          {!showinput ? (
            <div
              className={styles.joinButton}
              onClick={() => setshowinput(true)}
            >
              Join the waitlist
            </div>
          ) : (
            <div className={styles.button} onClick={check}>
              Join
            </div>
          )}
        </div>
        <div className={styles.mobileimage}>
          <Image
            objectFit="contain"
            layout="fill"
            src="https://i.ibb.co/RCDhkjY/mobilechore.png"
            alt=""
          />
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <div className={styles.first}>
            <div className={styles.heading}>Importance of Earning</div>
            <div className={styles.description}>
              upsurge teaches that money needs to be earned. It is not simply
              given. This learning helps children learn discipline, become
              responsible and develop time-management skills
            </div>
            <div className={styles.connectorl}>
              <div className={styles.ball}></div>
              <div className={styles.line}></div>
            </div>
          </div>
          <div className={styles.second}>
            <div className={styles.heading}>Time Management</div>
            <div className={styles.description}>
              Tasks can be assigned to them with a deadline and their
              performance can be evaluated and rated on successful and timely
              completion of such assigned tasks.
            </div>
            <div className={styles.connectorl}>
              <div className={styles.ball}></div>
              <div className={styles.line}></div>
            </div>
          </div>
        </div>
        <div className={styles.mid}>
          <div className={styles.image}>
            <Image
              objectFit="contain"
              layout="fill"
              src="https://i.ibb.co/RCDhkjY/mobilechore.png"
              alt=""
            />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.first}>
            <div className={styles.heading}>Support long-term goals</div>
            <div className={styles.description}>
              upsurge teaches children to fulfill their long-term goals by
              dividing them into shorter goals and achieving them gradually.
            </div>
            <div className={styles.connectorr}>
              <div className={styles.ball}></div>
              <div className={styles.line}></div>
            </div>
          </div>
          <div className={styles.second}>
            <div className={styles.heading}>
              Teaches real life financial skills
            </div>
            <div className={styles.description}>
              Incentivize and reward them for completing their tasks on time.
              Conversely, impose small penalties for unfinished tasks. This will
              go a long way in inculcating good habits and a sense of
              discipline.
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
