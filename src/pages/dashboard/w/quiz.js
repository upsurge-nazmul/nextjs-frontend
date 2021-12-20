import React, { useContext, useEffect, useState } from "react";
import QuizComponent from "../../../components/Quiz/QuizComponent";
import QuizApis from "../../../actions/apis/QuizApis";
import { useRouter } from "next/dist/client/router";
import Toast from "../../../components/Toast";
import Jasper from "../../../components/SVGcomponents/Jasper";
import LoginApis from "../../../actions/apis/LoginApis";
import validator from "validator";
import Curve1 from "../../../components/SVGcomponents/Curve1";
import Curve2 from "../../../components/SVGcomponents/Curve2";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import { MainContext } from "../../../context/Main";
import styles from "../../../styles/WaitlistDashboard/quiz.module.scss";
import PopUp from "../../../components/PopUp";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
export default function TestQuiz({ first_name, userdatafromserver }) {
  const router = useRouter();
  const [showQuiz, setshowQuiz] = useState(false);
  const [data, setdata] = useState(null);
  const [currentquiz, setcurrentquiz] = useState(data);
  const [currentquestion, setcurrentquestion] = useState(data?.next_question);
  const [timer, settimer] = useState(1000 * 60 * 15);
  const [task, settask] = useState("");
  const [lastplayed, setlastplayed] = useState("");
  const [stickyheader, setstickyheader] = useState(false);
  const [quizfinished, setquizfinished] = useState(false);
  const [score, setscore] = useState(0);
  const [currentcolor, setcurrentcolor] = useState(0);
  const [name, setname] = useState(first_name);
  const [nickname, setnickname] = useState("");
  const [mode, setmode] = useState("home");
  const [phone, setphone] = useState("");
  const [error, seterror] = useState("");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [correctAnswers, setcorrectAnswers] = useState(0);
  const [email, setEmail] = useState("");
  const [widthHeight, setwidthHeight] = useState({
    width: 0,
    height: 0,
  });
  const [answersheet, setanswersheet] = useState([]);
  const [openFull, setopenFull] = useState(false);
  const [currentquestionindex, setcurrentquestionindex] = useState(0);
  const colorarray = ["#FDCC03", "#17D1BC", "#FF6263", "#4166EB"];
  const [started, setstarted] = useState(false);
  const { setuserdata } = useContext(MainContext);
  const [showmain, setshowmain] = useState(false);
  useEffect(() => {
    setuserdata(userdatafromserver);
  }, []);

  useEffect(() => {
    setshowQuiz(data ? true : false);
    if (!data) return;
    setcurrentquestion(data.next_question);
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
    if (showQuiz && started) {
      settask(setInterval(() => settimer((prev) => prev - 1000), 1000));
    }
  }, [showQuiz, started]);
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

  useEffect(() => {
    seterror("");
  }, [phone, email, name, nickname]);
  async function startgame() {
    if (!name) {
      settoastdata({ type: "error", show: true, msg: "Name is required" });
      return;
    }
    let response = await QuizApis.startwaitlistquiz({
      name: name,
    });
    if (response && response.data && response.data.success) {
      setshowmain(true);
      setdata(response.data.data);
      setstarted(true);
    } else {
      if (response?.data?.data?.playedonce) {
        setlastplayed(response.data.data.lastplayed);
        seterror(response.data.data.nexttime);
        return;
      }
      seterror(response.data?.message || "Error connecting to server");
    }
  }

  useEffect(() => {
    const handlescroll = () => {
      if (window.scrollY > 0) {
        setstickyheader(true);
      } else {
        setstickyheader(false);
      }
    };
    window.addEventListener("scroll", handlescroll);
    return () => window.removeEventListener("scroll", handlescroll);
  }, []);
  return (
    <div
      className={styles.quizPage}
      style={{
        backgroundColor: !showmain ? "White" : colorarray[currentcolor],
      }}
    >
      <Curve1 className={styles.curve1} />
      <Curve2 className={styles.curve2} />
      <Toast data={toastdata} />
      {!showmain && (
        <div className={styles.startscreen}>
          <div className={styles.right}>
            <Jasper className={styles.jasper} />

            <div className={styles.heading}>
              How to calculate your Money Quotient
            </div>
            <ul>
              <li className={styles.text} style={{ paddingTop: "40px" }}>
                You will be asked 15 questions and have to choose the option
                which you think is correct.
              </li>
              <li className={styles.text}>
                The aim of this quiz is to help you see where you stand when it
                comes to understanding your personal finances, banking, saving,
                investments, and money!{" "}
              </li>
              <li className={styles.text}>
                This is a dynamic quiz that adapts the difficulty level
                according to your answers. The tougher questions you get right,
                the more points you will get.{" "}
              </li>
              <li className={styles.text}>
                {`Let's start and see how you do on our Money Quotient Don't forget
              to enjoy and learn ;)`}
              </li>
              <li className={styles.text}>
                {` Alright, let's see what your money quotient is. Good luck!`}
              </li>
            </ul>
            {lastplayed && (
              <p
                className={styles.text}
                style={{ textAlign: "center", color: "#ff7575" }}
              >
                {lastplayed}
              </p>
            )}
            {error && (
              <p
                className={styles.text}
                style={{ textAlign: "center", color: "#ff7575" }}
              >
                {error}
              </p>
            )}
            <div className={styles.buttons}>
              {!error && (
                <div className={styles.startbutton} onClick={startgame}>
                  Start
                </div>
              )}
              <div
                className={`${styles.skipbutton}`}
                style={error ? { margin: 0, backgroundColor: "#4166EB" } : {}}
                onClick={() => router.push("/dashboard/w")}
              >
                Go Back
              </div>
            </div>
          </div>
        </div>
      )}
      {!first_name && (
        <PopUp
          heading={"Enter your name"}
          saveinput={setname}
          settoastdata={settoastdata}
        />
      )}
      <div className={styles.container}>
        <DashboardLeftPanel type="waitlist" />
        <div className={styles.contentWrapper}>
          <DashboardHeader
            mode={mode}
            setmode={setmode}
            settoastdata={settoastdata}
          />
          <div className={styles.maincontent}>
            <div
              className={styles.prop1}
              style={{
                backgroundColor:
                  colorarray[currentcolor] === "#17D1BC"
                    ? "#FDCC03"
                    : "#17D1BC",
              }}
            />
            <div
              className={styles.prop2}
              style={{
                backgroundColor:
                  colorarray[currentcolor] === "#FF6263"
                    ? "#FDCC03"
                    : "#FF6263",
              }}
            />
            <div
              className={styles.prop3}
              style={{
                backgroundColor:
                  colorarray[currentcolor] === "#4166EB"
                    ? "#FDCC03"
                    : "#4166EB",
              }}
            />
            <div className={styles.prop4} />
            <div className={styles.quizContainer}>
              <div className={styles.leftSection}>
                {!quizfinished && (
                  <>
                    <p
                      className={styles.heading}
                      style={{
                        color:
                          colorarray[currentcolor] === "#4166EB"
                            ? "#ffffff"
                            : "#000000",
                      }}
                    >
                      Money Quotient Quiz
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
                      You will be asked 15 questions and have to choose the
                      option which you think is correct.This is a dynamic quiz
                      that adapts the difficulty level according to your
                      answers. The tougher questions you get right, the more
                      points you will get.
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
                  </>
                )}
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
                  quizfinished={quizfinished}
                  setshowQuiz={setshowQuiz}
                  setanswersheet={setanswersheet}
                  setscore={setscore}
                  currentcolor={currentcolor}
                  setcurrentcolor={setcurrentcolor}
                  colorarray={colorarray}
                  userlogged={true}
                />
              </div>
            ) : null}
            {quizfinished ? (
              <div
                className={`${styles.resultSection}  ${
                  openFull ? styles.hideOverFlow : ""
                }`}
              >
                <Jasper className={styles.jasper} />
                <div className={styles.background}>
                  <div className={styles.curvecontainer}>
                    <Curve1 className={styles.curve1} />
                    <Curve2 className={styles.curve2} />
                  </div>
                </div>

                <p
                  className={styles.heading}
                  style={{
                    color:
                      score < 50
                        ? "#4166EB"
                        : score < 80
                        ? "#FDCC03"
                        : "#17D1BC",
                  }}
                >
                  {score < 50
                    ? "Money Rookie"
                    : score < 80
                    ? "Money Ninja"
                    : "Money Master"}
                </p>
                <p className={styles.subheading}>
                  {score < 50
                    ? "Looks like you are a Money Rookie! Don’t worry, that’s what we’re here for! Join upsurge’s waiting list and subscribe to our newsletter to start your journey towards financial freedom today."
                    : score < 80
                    ? "You have substantial knowledge of Financial Literacy but there is a lot of scope of improvement. Join upsurge’s waiting list and subscribe to our newsletter. "
                    : "You have substantial Personal Finance knowledge. But there is no end to learning. Join upsurge’s waiting list and subscribe to our newsletter."}
                </p>
                <div className={styles.points}>You scored : {score}%</div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps({ req }) {
  let token = req.cookies.accesstoken;
  let msg = "";
  if (token) {
    let response = await LoginApis.checktoken({
      token: token,
    });
    if (response && response.data.success) {
      return {
        props: {
          first_name: response.data.data.first_name,
          userdatafromserver: response.data.data,
        },
      };
    } else {
      return {
        props: {
          first_name: "",
        },
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/?err=01",
      },
    };
  }
  //   let res = await QuizApis.leaderboard();
  //   if (res && res.data && res.data.success) {
  //     return { props: { leaderboard: res.data.data } };
  //   } else {
  //     return { props: { leaderboard: [] } };
  //   }
}
