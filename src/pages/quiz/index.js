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
import QuizCardSvg from "../../components/SVGcomponents/QuizCardSvg";
import Footer from "../../components/Home/Footer";

function Quiz({ data }) {
  const router = useRouter();
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showQuiz, setshowQuiz] = useState(false);
  const [quizdata, setquizdata] = useState(data);
  const [currentquiz, setcurrentquiz] = useState(data);
  const [currentquestion, setcurrentquestion] = useState(data?.next_question);
  const [timer, settimer] = useState(1000 * 60 * 15);
  const [task, settask] = useState("");
  const [quizfinished, setquizfinished] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [score, setscore] = useState(0);
  const [currentcolor, setcurrentcolor] = useState(0);
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
  const [currentquestionindex, setcurrentquestionindex] = useState(0);
  const colorarray = ["#FDCC03", "#17D1BC", "#FF6263", "#4166EB"];

  useEffect(() => {
    setshowQuiz(data ? true : false);
    setcurrentquiz(data);
  }, [data]);

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
      (hours !== 0 ? hours + " hr : " : "") +
      (minutes !== 0 ? minutes + " min : " : "") +
      seconds +
      " s"
    );
  }

  return (
    <div
      className={`${styles.quizPage} ${openFull ? styles.hideOverFlow : ""}`}
      style={{ backgroundColor: colorarray[currentcolor] }}
    >
      <Header
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        setshowauth={setshowauth}
      />
      <Toast data={toastdata} />
      {/* {quizId !== "main" && !email ? (
        <PopUp
          heading="Enter your email"
          saveinput={setemail}
          settoastdata={settoastdata}
        />
      ) : null} */}
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
        <div
          className={styles.prop1}
          style={{
            backgroundColor:
              colorarray[currentcolor] === "#17D1BC" ? "#FDCC03" : "#17D1BC",
          }}
        />
        <div
          className={styles.prop2}
          style={{
            backgroundColor:
              colorarray[currentcolor] === "#FF6263" ? "#FDCC03" : "#FF6263",
          }}
        />
        <div
          className={styles.prop3}
          style={{
            backgroundColor:
              colorarray[currentcolor] === "#4166EB" ? "#FDCC03" : "#4166EB",
          }}
        />
        <div className={styles.prop4} />
        <div className={styles.quizContainer}>
          <div className={styles.leftSection}>
            <p
              className={styles.heading}
              style={{
                color:
                  colorarray[currentcolor] === "#4166EB"
                    ? "#ffffff"
                    : "#000000",
              }}
            >
              Adaptive Quiz
            </p>
            <p
              className={styles.details}
              style={{
                color:
                  colorarray[currentcolor] === "#4166EB"
                    ? "#ffffff"
                    : "#000000",
              }}
            >
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old.{" "}
            </p>
            <p
              className={styles.current}
              style={{
                backgroundColor:
                  colorarray[currentcolor] === "#4166EB"
                    ? "#ffffff"
                    : "#4166EB",
                color:
                  colorarray[currentcolor] === "#4166EB"
                    ? "#000000"
                    : "#ffffff",
              }}
            >
              {`${currentquestionindex + 1} / ${15}`}
            </p>
          </div>
          {showQuiz && !quizfinished ? (
            <div className={styles.rightSection}>
              <div className={styles.timerSection}>
                <p
                  className={styles.timeleft}
                  style={{
                    color:
                      colorarray[currentcolor] === "#4166EB"
                        ? "#ffffff"
                        : "#000000",
                  }}
                >
                  Time Left
                </p>
                <p
                  className={styles.timer}
                  style={{
                    color:
                      colorarray[currentcolor] === "#4166EB"
                        ? "#ffffff"
                        : "#000000",
                  }}
                >
                  {secondsToTime(timer / 1000)}
                </p>
              </div>
            </div>
          ) : null}
        </div>
        {showQuiz && !quizfinished ? (
          <div className={styles.quizWrapper}>
            <QuizComponent
              data={data}
              widthHeight={widthHeight}
              setcorrectAnswers={setcorrectAnswers}
              question={currentquestion}
              totalQuestions={15}
              currentquestionindex={currentquestionindex}
              setcurrentquestionindex={setcurrentquestionindex}
              setquizfinished={setquizfinished}
              setshowQuiz={setshowQuiz}
              setanswersheet={setanswersheet}
              setscore={setscore}
              currentcolor={currentcolor}
              setcurrentcolor={setcurrentcolor}
              colorarray={colorarray}
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
            <div className={styles.points}>+{score}</div>
            <div className={styles.pointsdes}>XP Points</div>
            <div
              className={styles.button}
              onClick={() => window.location.reload(false)}
            >
              Play Again
            </div>
          </div>
        ) : null}
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ params, req }) {
  let quizData = {};
  let response = await QuizApis.startquiz();
  if (response && response.data && response.data.success) {
    return { props: { data: response.data.data } };
  } else {
    return { props: { data: null } };
  }

  // Pass data to the page via props
}

export default Quiz;
