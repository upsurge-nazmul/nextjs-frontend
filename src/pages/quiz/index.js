import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
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
import JoinUs from "../../components/Home/JoinUs";
import { MainContext } from "../../context/Main";
import PageTitle from "../../components/PageTitle";
import QuizManual from "../../components/Quiz/QuizManual";
import QuizForm from "../../components/Quiz/QuizForm";
import { setCookie } from "../../actions/cookieUtils";
import QuizFinished from "../../components/Quiz/QuizFinished";

function Quiz({ userdata }) {
  const router = useRouter();
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showQuiz, setshowQuiz] = useState(false);
  const [data, setdata] = useState(null);
  const [currentquiz, setcurrentquiz] = useState(data);
  const [currentquestion, setcurrentquestion] = useState(data?.next_question);
  const [timer, settimer] = useState(1000 * 60 * 15);
  const [task, settask] = useState("");
  const [showpopup, setshowpopup] = useState(false);
  const [stickyheader, setstickyheader] = useState(false);
  const [quizfinished, setquizfinished] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [score, setscore] = useState(0);
  const [currentcolor, setcurrentcolor] = useState(0);
  const [name, setname] = useState(router.query.name || "");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setusername] = useState("");
  const [phone, setphone] = useState("");
  const [email, setEmail] = useState(router.query.email || "");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [correctAnswers, setcorrectAnswers] = useState(0);
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
  const { setuserdata, theme } = useContext(MainContext);
  useEffect(() => {
    if (userdata) {
      setuserdata(userdata);
    }
  }, [userdata]);

  useEffect(() => {
    router.beforePopState(({ as }) => {
      if (as !== router.asPath) {
        router.push("/quiz");
        setcurrentquestionindex(0);
        setquizfinished(false);
        settimer(1000 * 60 * 5);
        setcorrectAnswers(0);
        clearInterval(task);
        setshowQuiz(false);
        setshowmain(false);
        return false;

        // Will run when leaving the current page; on back/forward actions
        // Add your logic here, like toggling the modal state
      }
      return true;
    });

    return () => {
      router.beforePopState(() => true);
    };
  }, [router]);
  function reload() {
    router.push("/quiz?email=" + email + "&name=" + firstName + " " + lastName);
  }
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

  useEffect(async () => {
    if (router.query.name && router.query.email) {
      const [fName, lName] = router.query.name.split(" ");
      setFirstName(fName);
      setLastName(lName);
      let response = await QuizApis.startquiz({
        name: router.query.name,
        phone: phone,
        email: router.query.email,
      });
      if (response && response.data && response.data.success) {
        setdata(response.data.data);
        setcurrentquestionindex(0);
        setquizfinished(false);
        settimer(1000 * 60 * 5);
        setcorrectAnswers(0);
        clearInterval(task);
        setshowQuiz(true);
        setshowmain(true);
        setstarted(true);
        settask(setInterval(() => settimer((prev) => prev - 1000), 1000));
      } else {
        seterror(response.data?.message || "Error connecting to server");
      }
    }
  }, [router]);

  useEffect(() => {
    if (showQuiz && started) {
      settask(setInterval(() => settimer((prev) => prev - 1000), 1000));
    }
  }, [showQuiz, started]);

  useEffect(() => {
    seterror("");
  }, [phone, email, name]);

  const isValidUsername = (val) => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    return usernameRegex.test(val);
  };

  function validate(name, email, username, phone) {
    if (!name) {
      seterror("Name is required");
      return;
    }
    if (name.length <= 2) {
      seterror("Name should contain atleast 3 characters");
      return;
    }
    if (name.search(/[!@#$%^&*]/) > 0) {
      seterror("Name should not contain any special characters");
      return;
    }
    if (name.search(/[0-9]/) > 0) {
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
    if (!username) {
      seterror("Username is required");
      return;
    }
    if (username.length > 40) {
      seterror("Username cannot contain more than 40 characters");
      return;
    }
    if (username.length < 4) {
      seterror("Username cannot contain less than 4 characters");
      return;
    }
    if (!isValidUsername(username)) {
      seterror("username can't contained special characters and space");
      return;
    }
    if (!phone) {
      seterror("Phone is required");
      return;
    }
    if (!validator.isMobilePhone(phone, "en-IN")) {
      seterror("Please enter valid phone number");
      return;
    }
    return true;
  }

  async function startQuiz(profile) {
    let response = await QuizApis.startquiz({
      name: profile.first_name + " " + profile.last_name,
      phone: profile.parent_phone,
      email: profile.parent_email,
    });
    if (response && response.data && response.data.success) {
      // console.log("@@@@@@@@@ start response: ", response.data.data);
      setshowmain(true);
      setdata(response.data.data);
    } else {
      seterror(response.data?.message || "Error connecting to server");
    }
  }
  
  async function startgame(e) {
    e?.preventDefault();
    let validated = validate(firstName + " " + lastName, email, username, phone);

    if (validated) {
      let signupResponse = await LoginApis.signup({
        email: email,
        signup_method: "email",
        user_type: "child",
        phone,
        password,
        username: username.toLowerCase(),
        first_name: firstName,
        last_name: lastName,
        num_unicoins: 0,
      });
      if (signupResponse && signupResponse.data && signupResponse.data.success) {
        const profile = signupResponse.data.data.profile;
        setCookie("accesstoken", signupResponse.data.data.token);
        settoastdata({ type: "success", msg: "New Account Created", show: true });
        // console.log("@@@@@@@@@ signup response: ", signupResponse.data.data);
        startQuiz(profile);
      } else if (signupResponse && signupResponse.data && signupResponse && signupResponse.data.message === "Username already taken") {
        let loginResponse = await LoginApis.login({ 
          email: username.toLowerCase(), 
          password, 
          type: "child",
        });
        if (loginResponse && loginResponse.data && loginResponse.data.success) {
          const profile = loginResponse.data.data.userProfile;
          setCookie("accesstoken", loginResponse.data.data.token);
          setuserdata(profile);
          settoastdata({ type: "success", msg: "Child Account Found", show: true });
          // console.log("@@@@@@@@@ login response: ", loginResponse.data.data);
          startQuiz(profile);
        }
      } else {
        seterror(signupResponse.data?.message || "Error connecting to server");
      }
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

  // console.log('!!!!!!!!!!', name, username, email, phone, password)
  
  return (
    <div
      className={`${styles.quizPage} ${openFull ? styles.hideOverFlow : ""} ${
        theme === "dark" && styles.darkquizPage
      }`}
      style={{
        backgroundColor: !showmain
          ? theme === "dark"
            ? "#111111"
            : "White"
          : colorarray[currentcolor],
      }}
    >
      <PageTitle />
      {!showmain && (
        <Header
          setOpenLeftPanel={setOpenLeftPanel}
          showauth={showauth}
          stickyheader={stickyheader}
          setshowpopup={setshowpopup}
          showpopup={showpopup}
          setshowauth={setshowauth}
          mailfromhome={email}
        />
      )}
      <Toast data={toastdata} />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />

      <FullAnswersheet
        openFull={openFull}
        setOpenFull={setopenFull}
        answersheet={answersheet}
      />
      {showmain && !started && (
        <QuizManual setstarted={setstarted} />
      )}

      {!showmain ? (
        <QuizForm {...{
          error,
          firstName,
          setFirstName,
          lastName,
          setLastName,
          setname,
          username,
          setusername,
          email,
          setEmail,
          phone,
          setphone,
          password,
          setpassword,
          startgame
        }} />
      ) : (
        <div className={styles.contentWrapper}>
          <div className={styles.quizContainer}>
            {!quizfinished && (
              <div
                className={styles.heading}
                style={{
                  color:
                    colorarray[currentcolor] === "#4166EB"
                      ? "#ffffff"
                      : "#000000",
                }}
              >
                Money Quotient Quiz
              </div>
            )}
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
                timer={timer}
              />
            </div>
          ) : null}
          {quizfinished ? (
            <QuizFinished {...{
              openFull,
              score,
              reload,
              router
            }} />
          ) : null}
        </div>
      )}
      <JoinUs />
      <Footer />
    </div>
  );
}

export default Quiz;

export async function getServerSideProps({ params, req }) {
  let token = req.cookies.accesstoken;
  let msg = "";
  if (token) {
    let response = await LoginApis.checktoken({
      token: token,
    });
    if (response && !response.data.success) {
      msg = response.data.msg || "";
      return { props: {} };
    } else {
      return {
        props: {
          isLogged: true,
          userdata: response?.data?.data || null,
        },
      };
    }
  } else {
    return {
      props: { isLogged: false, msg: "cannot get token", userdata: null },
    };
  }
}
