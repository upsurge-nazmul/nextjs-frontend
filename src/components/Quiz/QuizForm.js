import { useState, useEffect } from "react";
import styles from "../../styles/Quiz/quizForm.module.scss";
import { specialCharactersAndNumbers, specialCharacters } from "../../helpers/string";
import validator from "validator";
import ReactTooltip from "react-tooltip";
import CircleTick from "../SVGcomponents/CircleTick";
import CircleWarning from "../SVGcomponents/CircleWarning";
import DoneIcon from '@mui/icons-material/Done';
import { QUIZ_CATAGORIES } from "../../pages/quiz/[school]/[class]";

export default function QuizForm({ 
  error,
  seterror,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  username,
  setusername,
  email,
  setEmail,
  phone,
  setphone,
  password,
  setpassword,
  quizCat,
  setQuizCat,
  startgame
 }) {
  const [passerror, setpasserror] = useState({
    length: false,
    special: false,
    lower: false,
    upper: false,
    number: false,
  });  
  const [passisweak, setpassisweak] = useState(false);
  const [showdetailpass, setshowdetailpass] = useState(false);

  function checkLength(pass) {
    return pass.length >= 8;
  }
  function checkLower(pass) {
    return !(pass.search(/[a-z]/) < 0);
  }
  function checkUpper(pass) {
    // password.search(/.*[A-Z].*/) > 0)
    return !(pass.search(/[A-Z]/) < 0);
  }
  function checkNumber(pass) {
    return !(pass.search(/[0-9]/) < 0);
  }
  function checkSpecial(pass) {
    return !(pass.search(/[!@#$%^&*]/) < 0);
  }
  function validatePassword(e) {
    let pass = e.target.value.trim();
    setpassword(pass);
    let res = {
      length: checkLength(pass),
      lower: checkLower(pass),
      upper: checkUpper(pass),
      special: checkSpecial(pass),
      number: checkNumber(pass),
    };
    setpasserror(res);
  }
  function handleNameChange(e, setter) {
    if (
      e.target.value.length > 1 &&
      e.target.value[e.target.value.length - 1] === " "
    ) {
      setter(e.target.value);
    }
    if (!e.target.value[e.target.value.length - 1]) {
      setter("");
      return;
    }
    if (e.target.value[e.target.value.length - 1] && 
      specialCharactersAndNumbers.includes(
        e.target.value[e.target.value.length - 1].toString()
      )
    ) {
      return;
    }
    if (isNaN(e.target.value[e.target.value.length - 1]))
    setter(e.target.value);
  }

  useEffect(() => {
    seterror("");
    if (!validator.isStrongPassword(password)) setpassisweak(true);
    else setpassisweak(false);
  }, [password]);

  return (
    <div className={styles.formSection}>
      <div className={styles.left}>
        <p className={styles.headingmain}>We need a few more details</p>
        <p className={styles.error}>{error}</p>
        <form
          onKeyPress={(e) => {
            if (e.key === "Enter") startgame(e);
          }}
          className={styles.inputForm}
        >
          <div className={styles.nameArea}>
            <input
              type="text"
              className={styles.input}
              value={firstName}
              onChange={(e) => handleNameChange(e, setFirstName)}
              placeholder="Child First Name*"
              required
            />
            <input
              type="text"
              className={styles.input}
              value={lastName}
              onChange={(e) => handleNameChange(e, setLastName)}
              placeholder="Child Last Name*"
              required
            />
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              if (e.target.value[e.target.value.length -1] && specialCharacters.includes(
                e.target.value[e.target.value.length -1].toString()
              )) {
                return;
              } else {
                setusername(e.target.value);
              }
            }}
            className={styles.input}
            placeholder="Child Username*"
            required
          />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            placeholder="Parent Email*"
            required
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
            placeholder="Parent Phone*"
          />
          <div className={styles.passwordBox}>
            {showdetailpass && (
              <div className={styles.detailPass}>
                <div className={styles.arrow}></div>
                <div className={styles.tab}>
                  {passerror.length ? <CircleTick /> : <CircleWarning />}
                  <p className={styles.text}>8 Characters long</p>
                </div>
                <div className={styles.tab}>
                  {passerror.upper ? <CircleTick /> : <CircleWarning />}
                  <p className={styles.text}>Uppercase letter</p>
                </div>
                <div className={styles.tab}>
                  {passerror.lower ? <CircleTick /> : <CircleWarning />}
                  <p className={styles.text}>Lowercase letter</p>
                </div>
                <div className={styles.tab}>
                  {passerror.special ? <CircleTick /> : <CircleWarning />}
                  <p className={styles.text}>Special Character </p>
                </div>
                <div className={styles.tab}>
                  {passerror.number ? <CircleTick /> : <CircleWarning />}
                  <p className={styles.text}>Number</p>
                </div>
              </div>
            )}
            <input
              type={"password"}
              onFocus={() => setshowdetailpass(true)}
              onBlur={() => setshowdetailpass(false)}
              placeholder="New Password*"
              value={password}
              className={styles.input}
              onChange={validatePassword}
              required
            />
          </div>
          {password !== "" && passisweak && (
            <>
              <p data-tip data-for="weak-pass" className={styles.weakpasstext}>
                Weak password
              </p>
              <ReactTooltip id="weak-pass" type="dark" effect="solid">
                <p>A strong pass is :</p>
                <p>- At least 8 characters</p>
                <p>- A mixture of letters and numbers</p>
                <p>- A mixture of both uppercase and lowercase letters</p>
                <p>- Inclusion of at least one special character</p>
              </ReactTooltip>
            </>
          )}
          <div className={styles.categories}>
            <label className={styles.catLabel}>Quiz For</label>
            <div className={styles.catOptions}>
              {QUIZ_CATAGORIES.map((cat) => {
                return (
                  <div 
                    key={cat.id} 
                    className={quizCat === cat.type ? styles.selectedCat: styles.singleCat} 
                    // onClick={() => setQuizCat(cat.type)}
                  >
                    <div className={styles.catName}>{cat.name}</div>
                    <div className={styles.selectedIcon}>
                      <DoneIcon />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </form>
        <div className={styles.buttons}>
          <div className={styles.startbutton} onClick={startgame}>
            Start Playing
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <img src="https://imgcdn.upsurge.in/images/Artboard-1-1.png" alt="" />
      </div>
    </div>
  );
}