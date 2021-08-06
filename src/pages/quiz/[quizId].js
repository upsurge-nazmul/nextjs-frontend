import React, { useEffect, useLayoutEffect, useState } from "react";
import Header from "../../components/Header/Header";
import LeftPanel from "../../components/LeftPanel";
import QuizComponent from "../../components/Quiz/QuizComponent";
import { Doughnut } from "react-chartjs-2";
import PopUp from "../../components/PopUp";
import FullAnswersheet from "../../components/Quiz/FullAnswersheet";
import QuizApis from "../../actions/apis/QuizApis";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/Quiz/quiz.module.scss";
import Toast from "../../components/Toast";

function Quiz({ data, quizcards, wrongPath }) {
  const router = useRouter();
  const { quizId } = router.query;
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [paths, setpaths] = useState(["home", "quiz"]);
  const [showQuiz, setshowQuiz] = useState(data?.showQuiz);
  const [quiz, setquiz] = useState([]);
  const [quizdata, setquizdata] = useState(data);
  const [currentquiz, setcurrentquiz] = useState(data?.currentquiz);
  const [currentquestionindex, setcurrentquestionindex] = useState(
    data.currentquestionindex
  );
  const [timer, settimer] = useState(1000 * 60 * 5);
  const [task, settask] = useState("");
  const [quizfinished, setquizfinished] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [chartData, setChartData] = useState({
    labels: ["Correct Answers", "Wrong Answers"],
    datasets: [
      {
        label: "# of Votes",
        data: [5, 5],
        backgroundColor: ["rgba(23, 209, 188, 1)", "rgba(255, 98, 99, 1)"],
        borderWidth: 1,
      },
    ],
  });
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [correctAnswers, setcorrectAnswers] = useState(0);
  const [email, setemail] = useState("");
  const [widthHeight, setwidthHeight] = useState({
    width: 0,
    height: 0,
  });
  const [answersheet, setanswersheet] = useState([]);
  const [openFull, setopenFull] = useState(false);

  useEffect(() => {
    setquizfinished(false);
  }, [quizId]);

  useEffect(() => {
    setshowQuiz(data.showQuiz);
    setcurrentquiz(data.currentquiz);
    setcurrentquestionindex(data.currentquestionindex);
  }, [data]);
  useEffect(() => {
    if (wrongPath) {
      router.push("/quiz/main");
    }
  }, [wrongPath]);

  useEffect(() => {
    function updateSize() {
      let w = window.innerWidth;
      let h = window.innerHeight;
      setwidthHeight({
        width: w,
        height: h,
      });
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  useEffect(() => {
    if (!currentquiz) return;
    let arr = [
      {
        label: "# of Votes",
        data: [correctAnswers, currentquiz.questions.length - correctAnswers],
        backgroundColor: ["rgba(23, 209, 188, 1)", "rgba(255, 98, 99, 1)"],
        borderWidth: 1,
      },
    ];
    setChartData((prev) => ({
      ...prev,
      datasets: arr,
    }));
  }, [correctAnswers, currentquestionindex]);
  useEffect(() => {
    if (currentquiz) setpaths(["home", "quiz", currentquiz?.name]);
  }, [data]);

  useEffect(() => {
    if (showQuiz) {
      settask(setInterval(() => settimer((prev) => prev - 1000), 1000));
    }
  }, [showQuiz]);
  useEffect(() => {
    if (timer <= 0) {
      alert("Time over,try again");
      setcurrentquestionindex(0);
      setquizfinished(false);
      settimer(1000 * 60 * 5);
      setcorrectAnswers(0);
      clearInterval(task);
      setshowQuiz(false);
    } else if (quizfinished || !showQuiz) {
      clearInterval(task);
    }
  }, [timer, quizfinished, showQuiz]);

  function secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);
    return (
      (hours !== 0 ? hours + "hr : " : "") +
      (minutes !== 0 ? minutes + "min : " : "") +
      seconds +
      "s"
    );
  }

  return (
    <div
      className={`${styles.quizPage} ${openFull ? styles.hideOverFlow : ""}`}
    >
      <Header
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        setshowauth={setshowauth}
      />
      <Toast data={toastdata} />
      {quizId !== "main" && !email ? (
        <PopUp
          heading="Enter your email"
          saveinput={setemail}
          settoastdata={settoastdata}
        />
      ) : null}
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />

      <FullAnswersheet
        openFull={openFull}
        setOpenFull={setopenFull}
        answersheet={answersheet}
      />

      <div className={styles.contentWrapper}>
        {quizId === "main" ? (
          <div className={styles.quizCardsHolder}>
            <p className={styles.heading}>Available Quizzes</p>
            {quizcards.map((item, index) => (
              <div className={styles.quizCard}>
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.6666 16.0007H5.33325V53.334C5.33325 56.2673 7.73325 58.6673 10.6666 58.6673H47.9999V53.334H10.6666V16.0007ZM53.3333 5.33398H21.3333C18.3999 5.33398 15.9999 7.73398 15.9999 10.6673V42.6673C15.9999 45.6007 18.3999 48.0007 21.3333 48.0007H53.3333C56.2666 48.0007 58.6666 45.6007 58.6666 42.6673V10.6673C58.6666 7.73398 56.2666 5.33398 53.3333 5.33398ZM53.3333 42.6673H21.3333V10.6673H53.3333V42.6673ZM36.0266 27.094C37.1199 25.1473 39.1733 24.0007 40.3733 22.294C41.6533 20.4807 40.9333 17.1207 37.3333 17.1207C34.9866 17.1207 33.8133 18.9073 33.3333 20.4007L29.6799 18.8807C30.6933 15.894 33.3866 13.334 37.3066 13.334C40.5866 13.334 42.8533 14.8273 43.9999 16.694C44.9866 18.294 45.5466 21.3073 44.0266 23.5473C42.3466 26.0273 40.7466 26.774 39.8666 28.374C39.5199 29.014 39.3866 29.4407 39.3866 31.5207H35.3333C35.3599 30.4273 35.1733 28.6407 36.0266 27.094ZM34.5333 37.2007C34.5333 35.6273 35.7866 34.4273 37.3333 34.4273C38.9066 34.4273 40.1066 35.6273 40.1066 37.2007C40.1066 38.7473 38.9333 40.0007 37.3333 40.0007C35.7866 40.0007 34.5333 38.7473 34.5333 37.2007Z"
                    fill="#4166EB"
                  />
                </svg>
                <div className={styles.text}>
                  <p className={styles.name}>{item.name}</p>
                  <p className={styles.description}>{item.description}</p>
                </div>
                <div
                  className={styles.button}
                  onClick={() => {
                    router.push(`/quiz/${item.id}`);
                  }}
                >
                  Start Quiz
                </div>
              </div>
            ))}
          </div>
        ) : null}
        {quizId !== "main" ? (
          <div className={styles.quizContainer}>
            <div className={styles.leftSection}>
              <p className={styles.heading}>{currentquiz?.name}</p>
              <p className={styles.details}>{currentquiz?.details}</p>
              {!showQuiz ? (
                <div
                  className={styles.startButton}
                  onClick={() => {
                    setcurrentquestionindex(0);
                    setquizfinished(false);
                    settimer(1000 * 60 * 5);
                    setcorrectAnswers(0);
                    setshowQuiz(true);
                    setanswersheet([]);
                  }}
                >
                  Start
                </div>
              ) : (
                <div className={styles.buttonwrapper}>
                  <div
                    className={styles.closeButton}
                    onClick={() => {
                      setshowQuiz(false);
                    }}
                  >
                    Abort
                  </div>
                  <div
                    className={styles.finishButton}
                    onClick={() => {
                      setquizfinished(true);
                      setshowQuiz(false);
                    }}
                  >
                    Finish
                  </div>
                </div>
              )}
            </div>
            {showQuiz && !quizfinished ? (
              <div className={styles.rightSection}>
                <div className={styles.timerSection}>
                  <p className={styles.timeleft}>Time Left</p>
                  <p className={styles.timer}>{secondsToTime(timer / 1000)}</p>
                </div>
                <div className={styles.questionsleft}>
                  <p className={styles.current}>
                    {`${currentquestionindex + 1} / ${
                      currentquiz?.questions.length
                    }`}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
        {showQuiz && currentquiz?.questions.length > 0 && !quizfinished ? (
          <div className={styles.quizWrapper}>
            <QuizComponent
              widthHeight={widthHeight}
              setcorrectAnswers={setcorrectAnswers}
              quiz={currentquiz.questions[currentquestionindex]}
              setcurrentquestionindex={setcurrentquestionindex}
              totalQuestions={currentquiz.questions.length}
              currentquestionindex={currentquestionindex}
              setquizfinished={setquizfinished}
              setshowQuiz={setshowQuiz}
              setanswersheet={setanswersheet}
            />
          </div>
        ) : null}
        {quizfinished ? (
          <div
            className={`${styles.resultSection}  ${
              openFull ? styles.hideOverFlow : ""
            }`}
          >
            <div className={styles.heading}>Quiz Completed</div>
            <div className={styles.points}>+250</div>
            <div className={styles.pointsdes}>XP Points</div>
            <div className={styles.button} onClick={() => router.push("quiz")}>
              {" "}
              Checkout more quizzes
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export async function getServerSideProps({ params, req }) {
  console.log("called");
  let quizData = {};
  let quizcards = [];
  let wrongPath = false;
  let token = req.cookies.accesstoken || "";
  if (!params.quizId) {
    router.push("/quiz/main");
  } else if (params.quizId === "main") {
    let response = await QuizApis.getallquiz("", token);
    if (response.data) quizcards = response.data.data;
    else console.log("error");
  } else {
    quizData = {
      showQuiz: false,
      currentquestionindex: 0,
      quizfinished: false,
      timer: 1000 * 60 * 5,
      correctAnswers: 0,
      answersheet: [],
      currentquiz: "",
    };
    let response = await QuizApis.getquizwithid({ id: params.quizId }, token);
    if (response.data.success) {
      quizData.currentquiz = response.data.data;
      let questions = await QuizApis.getquestionswithids(
        {
          questions_ids: response.data.data.questions,
        },
        token
      );
      if (questions.data) {
        quizData.currentquiz.questions = questions.data.data;
      }
    } else {
      wrongPath = true;
      console.log("err");
    }
  }

  // Pass data to the page via props
  return { props: { data: quizData, quizcards, wrongPath } };
}

export default Quiz;
