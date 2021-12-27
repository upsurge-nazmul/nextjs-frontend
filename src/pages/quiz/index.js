import React, { useEffect, useLayoutEffect, useState } from "react";
import Header from "../../components/Header/Header";
import LeftPanel from "../../components/LeftPanel";
import QuizComponent from "../../components/Quiz/QuizComponent";
import FullAnswersheet from "../../components/Quiz/FullAnswersheet";
import QuizApis from "../../actions/apis/QuizApis";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/Quiz/quiz.module.scss";
import Toast from "../../components/Toast";
import Jasper from "../../components/SVGcomponents/Jasper";
import Footer from "../../components/Home/Footer";
import LoginApis from "../../actions/apis/LoginApis";
import validator from "validator";
import Curve1 from "../../components/SVGcomponents/Curve1";
import Curve2 from "../../components/SVGcomponents/Curve2";
import FreeGameApis from "../../actions/apis/FreeGameApis";
import JoinUs from "../../components/Home/JoinUs";
import LeaderBoard from "../../components/LeaderBoard";
const specialchars = [
  "#",
  "$",
  "%",
  "*",
  "&",
  "(",
  "@",
  "_",
  ")",
  "+",
  "-",
  "&&",
  "||",
  "!",
  "(",
  ")",
  "{",
  "}",
  "[",
  "]",
  "^",
  "~",
  "*",
  "?",
  ":",
  "1",
  "0",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];
function Quiz({ leaderboard }) {
  const router = useRouter();
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showQuiz, setshowQuiz] = useState(false);
  const [data, setdata] = useState(null);
  const [currentquiz, setcurrentquiz] = useState(data);
  const [currentquestion, setcurrentquestion] = useState(data?.next_question);
  const [timer, settimer] = useState(1000 * 60 * 15);
  const [task, settask] = useState("");
  const [stickyheader, setstickyheader] = useState(false);
  const [quizfinished, setquizfinished] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [score, setscore] = useState(0);
  const [currentcolor, setcurrentcolor] = useState(0);
  const [showgame, setshowgame] = useState(false);
  const [name, setname] = useState("");
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
  const [showmain, setshowmain] = useState(false);
  const [quiztoken, setquiztoken] = useState("");
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
  async function handleSignup() {
    if (!validator.isEmail(email)) {
      seterror("Enter valid email address");
    } else {
      let response = await LoginApis.saveemail({ email: email });
      if (response) {
        if (response.data.success) {
          router.push("/waitlist/" + email);
        } else {
          seterror(response.data.message);
        }
      } else {
        seterror("Error connecting to server");
      }
      // setshowauth(true);
      // setauthmode("parent");
      // setmailfromhome(email);
    }
  }
  useEffect(() => {
    seterror("");
  }, [phone, email, name]);
  async function startgame(e) {
    e?.preventDefault();
    if (!name) {
      seterror("Name is required");
      return;
    }
    if (checkLength(name)) {
      seterror("Name should contain atleast 3 characters");
      return;
    }
    if (checkSpecial(name)) {
      seterror("Name should not contain any special characters");
      return;
    }
    if (checkNumber(name)) {
      seterror("Name should not contain any number");
      return;
    }
    if (!email) {
      seterror("Email is required");
      return;
    }
    if (!validator.isEmail(email)) {
      seterror("Please enter valid email address");
      return;
    }
    if (phone && !validator.isMobilePhone(phone)) {
      seterror("Please enter valid phone number");
      return;
    }
    let response = await QuizApis.startquiz({
      name: name,
      phone: phone,
      email: email,
    });
    if (response && response.data && response.data.success) {
      setshowmain(true);
      setdata(response.data.data);
    } else {
      seterror(response.data?.message || "Error connecting to server");
    }
  }

  function checkLength(name) {
    return name.length <= 2;
  }
  function checkNumber(name) {
    return name.search(/[0-9]/) > 0;
  }
  function checkSpecial(name) {
    return name.search(/[!@#$%^&*]/) > 0;
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
      className={`${styles.quizPage} ${openFull ? styles.hideOverFlow : ""}`}
      style={{
        backgroundColor: !showmain ? "White" : colorarray[currentcolor],
      }}
    >
      <Header
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        stickyheader={stickyheader}
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
      <Curve1 className={styles.curve1} />
      <Curve2 className={styles.curve2} />
      {showmain && !started && (
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

            <div className={styles.button} onClick={() => setstarted(true)}>
              Start
            </div>
          </div>
        </div>
      )}

      {!showmain ? (
        <div className={styles.gamedata}>
          <div className={styles.left}>
            <p className={styles.headingmain}>We need a few more details</p>
            <p className={styles.error}>{error}</p>
            <form
              onKeyPress={(e) => {
                if (e.key === "Enter") startgame(e);
              }}
            >
              <input
                type="text"
                className={styles.input}
                value={name}
                onChange={(e) => {
                  if (
                    e.target.value.length > 1 &&
                    e.target.value[e.target.value.length - 1] === " "
                  ) {
                    setname(e.target.value);
                  }
                  if (!e.target.value[e.target.value.length - 1]) {
                    setname("");
                    return;
                  }
                  if (
                    specialchars.includes(
                      e.target.value[e.target.value.length - 1].toString()
                    )
                  ) {
                    return;
                  }
                  if (isNaN(e.target.value[e.target.value.length - 1]))
                    setname(e.target.value);
                }}
                placeholder="Name*"
              />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                placeholder="Email*"
              />
              <input
                value={phone}
                type="text"
                maxLength={10}
                onChange={(e) => {
                  if (!e.target.value[e.target.value.length - 1]) {
                    setphone("");
                    return;
                  }
                  if (isNaN(e.target.value[e.target.value.length - 1])) {
                    return;
                  }
                  setphone(e.target.value);
                }}
                className={styles.input}
                placeholder="Phone (optional)"
              />
            </form>
            <div className={styles.buttons}>
              <div className={styles.startbutton} onClick={startgame}>
                Start Playing
              </div>
              {/* <div className={styles.skipbutton} onClick={skipgame}>
                Skip
              </div> */}
            </div>
          </div>
          <div className={styles.right}>
            <img src="https://i.ibb.co/yV2H2FY/Artboard-1-1.png" alt="" />
          </div>
        </div>
      ) : (
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
                    You will be asked 15 questions and have to choose the option
                    which you think is correct.This is a dynamic quiz that
                    adapts the difficulty level according to your answers. The
                    tougher questions you get right, the more points you will
                    get.
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
                    score <= 40
                      ? "#4166EB"
                      : score <= 80
                      ? "#FDCC03"
                      : "#17D1BC",
                }}
              >
                {score <= 40
                  ? "Money Rookie"
                  : score <= 80
                  ? "Money Ninja"
                  : "Money Master"}
              </p>
              <p className={styles.subheading}>
                {score <= 40
                  ? "Looks like you are a Money Rookie! Don’t worry, that’s what we’re here for! Join upsurge’s waiting list and subscribe to our newsletter to start your journey towards financial freedom today."
                  : score <= 80
                  ? "You have substantial knowledge of Financial Literacy but there is a lot of scope of improvement. Join upsurge’s waiting list and subscribe to our newsletter. "
                  : "You have substantial Personal Finance knowledge. But there is no end to learning. Join upsurge’s waiting list and subscribe to our newsletter."}
              </p>
              <div className={styles.points}>You scored : {score}%</div>
              {/* <div className={styles.pointsdes}>XP Points</div> */}
              <div className={styles.signupBox}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div className={styles.normalbutton} onClick={handleSignup}>
                  Join the waitlist
                </div>
              </div>
              <div
                className={styles.button}
                onClick={() => window.location.reload(false)}
              >
                Play Again
              </div>
            </div>
          ) : null}
        </div>
      )}
      {(!showmain || quizfinished) && (
        <LeaderBoard title="Money Quotient" data={leaderboard || []} />
      )}
      <JoinUs />
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  let res = await QuizApis.leaderboard();
  if (res && res.data && res.data.success) {
    return { props: { leaderboard: res.data.data } };
  } else {
    return { props: { leaderboard: [] } };
  }
}

export default Quiz;
