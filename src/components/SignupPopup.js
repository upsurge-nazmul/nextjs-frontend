import React from "react";
import { useEffect } from "react";
import styles from "../styles/SignupPopup/signup-popup.module.scss";
import GiftBox from "../assets/signup-popup/gift-box.svg";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const SignupPopup = ({
  showauth,
  setshowauth,
  authmode,
  mailfromhome,
  setshowpopup,
  refId,
  setauthmode,
  showSignupPopup,
  setShowSignupPopup,
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };
  const item = {
    hidden: { y: 800, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };
  const innerItem = {
    hidden: { y: 800, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };
  function handlerClick() {
    setshowauth(true);
    setauthmode("parentChild");
    setShowSignupPopup(false);
  }
  useEffect(() => {
    let body = document.querySelector("body");
    // console.log("overflow", body.style);
    if (showSignupPopup) {
      body.style.overflowY = "hidden";
    } else {
      body.style.overflowY = "scroll";
    }
  }, [showSignupPopup]);

  useEffect(() => {
    if (showauth) setShowSignupPopup(false);
  }, [showauth]);
  return (
    <>
      <AnimatePresence>
        {showSignupPopup ? (
          <motion.div
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={container}
            onClick={() => {
              setShowSignupPopup((prev) => !prev);
            }}
            className={styles.container}
          >
            <motion.div variants={item} className={styles.contentWrapper}>
              <motion.div variants={innerItem} className={styles.giftBox}>
                <Image src={GiftBox} width={160} height={160} />
              </motion.div>
              <div className={styles.contentContainer}>
                <h3 className={styles.heading}>3000 Unicoins earned!</h3>
                <p className={styles.subheading}>Sign up to claim!</p>
                <button onClick={handlerClick} className={styles.button}>
                  Sign up
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <></>
        )}
      </AnimatePresence>
    </>
  );
};

export default SignupPopup;
