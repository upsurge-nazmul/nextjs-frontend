import { useEffect, useState } from "react";
import styles from "../../styles/schools/testimonials.module.scss";

const teacherData = [
  {
    name: "Veena Gaur",
    video:
      "https://upsurge-assets-cdn.s3.ap-south-1.amazonaws.com/video/testimonial-princi.mp4",
    image: "https://imgcdn.upsurge.in/images/schools/new/school-teacher-4.png",
  },
  {
    name: "Veena Gaur",
    video:
      "https://upsurge-assets-cdn.s3.ap-south-1.amazonaws.com/video/testimonial-princi.mp4",
    image: "https://imgcdn.upsurge.in/images/schools/new/school-teacher-1.png",
  },
  {
    name: "Veena Gaur",
    video:
      "https://upsurge-assets-cdn.s3.ap-south-1.amazonaws.com/video/testimonial-princi.mp4",
    image: "https://imgcdn.upsurge.in/images/schools/new/school-teacher-2.png",
  },
  {
    name: "Veena Gaur",
    video:
      "https://upsurge-assets-cdn.s3.ap-south-1.amazonaws.com/video/testimonial-princi.mp4",
    image: "https://imgcdn.upsurge.in/images/schools/new/school-teacher-3.png",
  },
];

const studentData = [
  {
    name: "Random Name",
    video:
      "https://upsurge-assets-cdn.s3.ap-south-1.amazonaws.com/video/testimonial-princi.mp4",
    image: "https://imgcdn.upsurge.in/images/schools/new/school-student-1.png",
  },
  {
    name: "Random Name",
    video:
      "https://upsurge-assets-cdn.s3.ap-south-1.amazonaws.com/video/testimonial-princi.mp4",
    image: "https://imgcdn.upsurge.in/images/schools/new/school-student-2.png",
  },
  {
    name: "Random Name",
    video:
      "https://upsurge-assets-cdn.s3.ap-south-1.amazonaws.com/video/testimonial-princi.mp4",
    image: "https://imgcdn.upsurge.in/images/schools/new/school-student-3.png",
  },
  {
    name: "Random Name",
    video:
      "https://upsurge-assets-cdn.s3.ap-south-1.amazonaws.com/video/testimonial-princi.mp4",
    image: "https://imgcdn.upsurge.in/images/schools/new/school-student-4.png",
  },
  {
    name: "Random Name",
    video:
      "https://upsurge-assets-cdn.s3.ap-south-1.amazonaws.com/video/testimonial-princi.mp4",
    image: "https://imgcdn.upsurge.in/images/schools/new/school-student-5.png",
  },
];

const studentImages = [
  "https://imgcdn.upsurge.in/images/schools/student-1.png",
  "https://imgcdn.upsurge.in/images/schools/student-2.png",
  "https://imgcdn.upsurge.in/images/schools/student-3.png",
  "https://imgcdn.upsurge.in/images/schools/student-1.png",
  "https://imgcdn.upsurge.in/images/schools/student-2.png",
];

const TestimonialsSection = () => {
  const [eventData, setEventData] = useState();
  const [eventStudentData, setStudentData] = useState();

  function handleMoveTeacher(direction) {
    let teacherCarousal = document.getElementById("teacherCarousal");
    let teacherCard = document.querySelector(".teacherCard");
    if (direction === "right") {
      teacherCarousal.scrollLeft += teacherCard.offsetWidth;
      setEventData({
        left: (teacherCarousal.scrollLeft += teacherCard.offsetWidth),
      });
    } else {
      teacherCarousal.scrollLeft -= teacherCard.offsetWidth;
      setEventData({
        left: (teacherCarousal.scrollLeft -= teacherCard.offsetWidth),
      });
    }
  }

  function handleMoveStudent(direction) {
    let studentCarousal = document.getElementById("studentCarousal");
    let studentCard = document.querySelector(".studentCard");
    if (direction === "right") {
      studentCarousal.scrollLeft += studentCard.offsetWidth;
      setStudentData({
        left: (studentCarousal.scrollLeft += studentCard.offsetWidth),
      });
    } else {
      studentCarousal.scrollLeft -= studentCard.offsetWidth;
      setStudentData({
        left: (studentCarousal.scrollLeft -= studentCard.offsetWidth),
      });
    }
  }

  useEffect(() => {
    let leftTeacherButton = document.getElementById("left");
    let leftStudentButton = document.getElementById("leftStudent");

    if (leftTeacherButton) {
      if (eventData) {
        if (eventData.left > 0) {
          leftTeacherButton.style.display = "block";
        } else {
          leftTeacherButton.style.display = "none";
        }
      }
    }
    if (leftStudentButton) {
      if (eventStudentData) {
        if (eventStudentData.left > 0) {
          leftStudentButton.style.display = "block";
        } else {
          leftStudentButton.style.display = "none";
        }
      }
    }
  }, [eventData, eventStudentData]);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Testimonials</h2>
      <div className={styles.contentWrapper}>
        <div className={`${styles.doodle} ${styles.dl1}`} />
        <div className={`${styles.doodle} ${styles.dl2}`} />
        <div className={`${styles.doodle} ${styles.dl3}`} />
        <div className={`${styles.doodle} ${styles.dl4}`} />
        <div className={styles.teacherWrapper}>
          <h3 className={styles.subHeading}>Principals & Teachers</h3>
          <div className={styles.carouselContainer}>
            <div id="teacherCarousal" className={styles.carousel}>
              {teacherData.map((teacher, i) => {
                let itself;
                return (
                  <div
                    key={"teacher-" + i}
                    className={`${styles.videoWrapper} teacherCard`}
                  >
                    <div
                      onClick={(e) => {
                        if (itself) {
                          if (e.target.pause) {
                            e.target.pause();
                          }
                          itself.style.display = "flex";
                        }
                      }}
                      className={`${styles.videoContainer} videoContainer`}
                    >
                      <video
                        id="video"
                        preload="metadata"
                        poster={teacher.image}
                      >
                        <source src={teacher.video} type="video/mp4" />
                      </video>

                      <div className={styles.playButtonWrapper}>
                        <span className={styles.name}>-{teacher.name}</span>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            if (e.target.id === "svgContainer") {
                              e.target.parentNode.parentNode.children[0].play();
                              e.target.parentNode.parentNode.children[1].style.display =
                                "none";
                              itself =
                                e.target.parentNode.parentNode.children[1];
                            } else if (e.target.id === "svg") {
                              e.target.parentNode.parentNode.parentNode.children[0].play();
                              e.target.parentNode.parentNode.parentNode.children[1].style.display =
                                "none";
                              itself =
                                e.target.parentNode.parentNode.parentNode
                                  .children[1];
                              console.log(
                                e.target.parentNode.parentNode.parentNode
                                  .children[0]
                              );
                            }
                          }}
                          id="svgContainer"
                          title="Play video"
                          className={`${styles.playGif} circle-play-b`}
                        >
                          <svg
                            id="svg"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 80 80"
                          >
                            <path d="M40 0a40 40 0 1040 40A40 40 0 0040 0zM26 61.56V18.44L64 40z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              id="right"
              onClick={() => {
                handleMoveTeacher("right");
              }}
              className={`${styles.button} ${styles.rightButton}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
            <button
              id="left"
              onClick={() => {
                handleMoveTeacher("left");
              }}
              className={`${styles.button} ${styles.leftButton}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className={styles.studentWrapper}>
          <h3 className={styles.subHeading}>Students & Parents</h3>
          <div className={styles.carouselContainer}>
            <div id="studentCarousal" className={styles.carousel}>
              {studentData.map((student, i) => {
                let itself;
                return (
                  <div
                    key={"teacher-" + i}
                    className={`${styles.videoWrapper} studentCard`}
                  >
                    <div
                      onClick={(e) => {
                        if (itself) {
                          if (e.target.pause) {
                            e.target.pause();
                          }
                          itself.style.display = "flex";
                        }
                      }}
                      className={`${styles.videoContainer} videoContainer`}
                    >
                      <video
                        id="video"
                        preload="metadata"
                        poster={student.image}
                      >
                        <source src={student.video} type="video/mp4" />
                      </video>

                      <div
                        id="svgContainer"
                        className={styles.playButtonWrapper}
                      >
                        <span className={styles.name}>-{student.name}</span>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            if (e.target.id === "svgContainer") {
                              e.target.parentNode.parentNode.children[0].play();
                              e.target.parentNode.parentNode.children[1].style.display =
                                "none";
                              itself =
                                e.target.parentNode.parentNode.children[1];
                            } else if (e.target.id === "svg") {
                              e.target.parentNode.parentNode.parentNode.children[0].play();
                              e.target.parentNode.parentNode.parentNode.children[1].style.display =
                                "none";
                              itself =
                                e.target.parentNode.parentNode.parentNode
                                  .children[1];
                              console.log(
                                e.target.parentNode.parentNode.parentNode
                                  .children[0]
                              );
                            }
                          }}
                          title="Play video"
                          className={`${styles.playGif} circle-play-b`}
                        >
                          <svg
                            id="svg"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 80 80"
                          >
                            <path d="M40 0a40 40 0 1040 40A40 40 0 0040 0zM26 61.56V18.44L64 40z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              id="right"
              onClick={() => {
                handleMoveStudent("right");
              }}
              className={`${styles.button} ${styles.rightButton}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
            <button
              id="leftStudent"
              onClick={() => {
                handleMoveStudent("left");
              }}
              className={`${styles.button} ${styles.leftButton}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
