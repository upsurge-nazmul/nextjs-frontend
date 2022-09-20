import React, { useEffect, useLayoutEffect, useState } from "react";
import Header from "../../components/Header/Header";
import LeftPanel from "../../components/LeftPanel";
import QuizComponent from "../../components/Quiz/QuizComponent";
import PopUp from "../../components/PopUp";
import FullAnswersheet from "../../components/Quiz/FullAnswersheet";
import QuizApis from "../../actions/apis/QuizApis";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/Quiz/quiz.module.scss";
import Toast from "../../components/Toast";
import QuizCardSvg from "../../components/SVGcomponents/QuizCardSvg";
import PageTitle from "../../components/PageTitle";

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
      <PageTitle />
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
              <div className={styles.quizCard} key={"quizcard" + index}>
                <QuizCardSvg />
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
