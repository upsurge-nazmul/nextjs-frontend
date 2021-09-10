import React from "react";
import styles from "../../styles/LiveClasses/liveclasscomponent.module.scss";
import ReactStars from "react-rating-stars-component";
import HeartSvg from "../SVGcomponents/HeartSvg";
import ProjectSvg from "../SVGcomponents/ProjectSvg";
import TimeHollow from "../SVGcomponents/TimeHollow";
import SessionSvg from "../SVGcomponents/SessionSvg";
import PeopleSvg from "../SVGcomponents/PeopleSvg";
import CartSvg from "../SVGcomponents/CartSvg";
function LiveClassComponent() {
  return (
    <div className={styles.availableCourse}>
      <HeartSvg className={styles.likeicon} />
      <img
        src={
          "https://images.unsplash.com/photo-1551739440-5dd934d3a94a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
        }
        alt=""
      ></img>
      <div className={styles.right}>
        <div className={styles.top}>
          <div className={styles.text}>
            <div className={styles.heading}>Learn Investment Basics</div>
            <div className={styles.subheading}>50 Students Enrolled</div>
            <div className={styles.details}>
              This Investments for beginners course teaches you the basics fast.
              It includes quizzes and assignments too..
            </div>
          </div>
          <div className={styles.priceandreview}>
            <p className={styles.price}>₹3,500</p>
            <ReactStars
              isHalf={true}
              count={5}
              value={3.5}
              size={24}
              edit={false}
              activeColor="#ffd700"
            />
            <p className={styles.reviewcount}>1.2K Reviews</p>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.keyPoints}>
            <TimeHollow /> 3 weeks
          </div>
          <div className={styles.keyPoints}>
            <ProjectSvg /> 4 projects
          </div>
          <div className={styles.keyPoints}>
            <SessionSvg /> 8 sessions
          </div>
          <div className={styles.keyPoints}>
            <PeopleSvg />
            14-16 years
          </div>
          <div className={styles.previewButton}>
            <CartSvg /> Register for class
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveClassComponent;
