import React, { useContext, useEffect, useState } from "react";
import QuoteSvg from "../SVGcomponents/QuoteSvg";
import Image from "next/image";
import styles from "../../styles/Home/testimonial.module.scss";
import { MainContext } from "../../context/Main";
import { AnimatePresence, motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "I am so glad someone is trying to teach our kids money management. Being a mother of 2 daughters, I want them to be much more financially independent and savvy than I am. Kudos upsurge for taking up this cause!",
    name: "Divya",
    img: "https://imgcdn.upsurge.in/images/Untitled-design-73.png",
  },
  {
    video:
      "https://upsurge-assets-cdn.s3.ap-south-1.amazonaws.com/video/testimonial-princi.mp4",
    picture: "https://imgcdn.upsurge.in/images/teacher-testimonial.png",
    name: "Veema Gaur",
    img: "https://imgcdn.upsurge.in/images/teacher-testimonial.png",
    des: "Principal, VIBGYOR High School Gurugram",
  },
  {
    video:
      "https://upsurge-assets-cdn.s3.ap-south-1.amazonaws.com/video/testimonial-child.mov",
    picture: "https://imgcdn.upsurge.in/images/student-testimonial.png",
    name: "Upsurge Intern",
    img: "https://imgcdn.upsurge.in/images/student-testimonial.png",
    // des: "Principal at Vibgyor High School Gurugram",
  },
  {
    quote:
      "We were fortunate enough to get access to upsurge for testing, and both my children absolutely loved it. The chore management feature has them competing against each other to finish their chores first and earn more unicoins, and the games have them competing against each other! And of course, they are learning very important money skills that were never taught to us.",
    name: "Sophia",
    img: "https://imgcdn.upsurge.in/images/Untitled-design-70.png",
  },
  {
    quote:
      "When I heard that there’s someone teaching personal finance to children, I got in touch with upsurge to get access. While they were under testing, they gave us access and my son has been loving the courses and the games. In fact, some of the games and activities that are meant for the family to play together are currently a favorite in our home.",
    name: "Sonam",
    img: "https://imgcdn.upsurge.in/images/Untitled-design-76.png",
  },
  {
    quote:
      "My 17-year-old daughter, after going through the knowledge quests and playing the investment games has started investing Rs. 2,500 a month in mutual funds! I couldn’t have imagined this a few months ago!",
    name: "Radha",
    img: "https://imgcdn.upsurge.in/images/Untitled-design-69.png",
  },
  {
    quote:
      "Within a month of starting upsurge, my son has become so involved with household budgets and money in general! He discusses business news with us, and wants to become a electric vehicle entrepreneur in the long term (just like his hero Mr. Musk)",
    name: "Pradeep",
    img: "https://imgcdn.upsurge.in/images/Untitled-design-74.png",
  },
  {
    quote:
      "The Knowledge Quests are designed really well - easy to understand concepts, real examples and fun activities make sure that my daughter is learning and having fun.",
    name: "Mayur",
    img: "https://imgcdn.upsurge.in/images/Untitled-design-75.png",
  },
];

export default function TestiMonial() {
  const [currenttestimonial, setcurrenttestimonial] = useState(1);
  const [timeout, settimeout] = useState(null);
  const { theme } = useContext(MainContext);
  const [intervalID, setIntervalID] = useState();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const child = document.getElementById("testimonialChild");
    setHeight(child.clientHeight);
  }, [currenttestimonial]);

  useEffect(() => {
    const id = setInterval(() => {
      if (currenttestimonial === testimonials.length - 1) {
        setcurrenttestimonial(0);
      } else {
        setcurrenttestimonial(currenttestimonial + 1);
      }
    }, 3000);
    setIntervalID(id);
    return () => clearInterval(id);
  }, [currenttestimonial]);

  useEffect(() => {
    const video = document.getElementById("video");
    const circlePlayButton = document.getElementById("circle-play-b");

    if (video && circlePlayButton) {
      function togglePlay() {
        if (video.paused || video.ended) {
          video.play();
        } else {
          video.pause();
        }
      }

      video.addEventListener("pause", function () {
        circlePlayButton.style.opacity = 1;
      });

      circlePlayButton.addEventListener("click", togglePlay);

      video.addEventListener("playing", function () {
        circlePlayButton.style.opacity = 0;
        clearInterval(intervalID);
      });
    }

    return () => {};
  }, [currenttestimonial]);

  return (
    <div
      className={`${styles.testimonial} ${
        theme === "dark" && styles.darktestimonial
      }`}
    >
      <h2 className={styles.heading}>
        We are getting lots of love and we’re loving it!
      </h2>
      <div className={styles.mainContain} style={{ height: height + 20 }}>
        <AnimatePresence>
          <motion.div
            key={currenttestimonial}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={`${styles.wrapper}`}
            id="testimonialChild"
          >
            <div className={styles.left}>
              <div className={styles.container}>
                <div className={styles.contentContainer}>
                  {testimonials[currenttestimonial].quote ? (
                    <p className={styles.quote}>
                      {testimonials[currenttestimonial].quote}
                    </p>
                  ) : (
                    <div className={styles.videoWrapper}>
                      <div
                        className={styles.videoContainer}
                        id="video-container"
                      >
                        <video
                          controls
                          id="video"
                          preload="metadata"
                          poster={testimonials[currenttestimonial].picture}
                        >
                          <source
                            src={testimonials[currenttestimonial].video}
                            type="video/mp4"
                          />
                        </video>

                        <div className={styles.playButtonWrapper}>
                          <div
                            title="Play video"
                            className={styles.playGif}
                            id="circle-play-b"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 80 80"
                            >
                              <path d="M40 0a40 40 0 1040 40A40 40 0 0040 0zM26 61.56V18.44L64 40z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className={styles.arrow}></div>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.profileContainer}>
                <div className={styles.image}>
                  <Image
                    src={testimonials[currenttestimonial].img}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    loading="lazy"
                  />
                </div>
                <h4 className={styles.name}>
                  - {testimonials[currenttestimonial].name}
                </h4>
                <p className={styles.des}>
                  {testimonials[currenttestimonial].des}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className={styles.navbar}>
        {testimonials.map((item, index) => {
          return (
            <div
              className={`${styles.ball} ${
                index === currenttestimonial ? styles.active : null
              }`}
              onClick={() => {
                setcurrenttestimonial(index);
              }}
              key={"testimonial" + index}
            />
          );
        })}
      </div>
    </div>
  );
}
