import styles from "../../styles/Quiz/quizForm.module.scss";
import { specialCharactersAndNumbers, specialCharacters } from "../../helpers/string";
import { useState } from "react";

export default function QuizForm({ 
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
 }) {
  const [passError, setPassError] = useState();

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
    setPassError(res);
  }

  // console.log("$$$$$$$$$$", passError)

  return (
    <div className={styles.formSection}>
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
            value={firstName}
            onChange={(e) => {
              if (
                e.target.value.length > 1 &&
                e.target.value[e.target.value.length - 1] === " "
              ) {
                setFirstName(e.target.value);
              }
              if (!e.target.value[e.target.value.length - 1]) {
                setFirstName("");
                return;
              }
              if (
                specialCharactersAndNumbers.includes(
                  e.target.value[e.target.value.length - 1].toString()
                )
              ) {
                return;
              }
              if (isNaN(e.target.value[e.target.value.length - 1]))
                setFirstName(e.target.value);
            }}
            placeholder="Child First Name*"
            required
          />
          <input
            type="text"
            className={styles.input}
            value={lastName}
            onChange={(e) => {
              if (
                e.target.value.length > 1 &&
                e.target.value[e.target.value.length - 1] === " "
              ) {
                setLastName(e.target.value);
              }
              if (!e.target.value[e.target.value.length - 1]) {
                setLastName("");
                return;
              }
              if (
                specialCharactersAndNumbers.includes(
                  e.target.value[e.target.value.length - 1].toString()
                )
              ) {
                return;
              }
              if (isNaN(e.target.value[e.target.value.length - 1]))
                setLastName(e.target.value);
            }}
            placeholder="Child Last Name*"
            required
          />
          <input
            type="text"
            value={username}
            onChange={(e) => {
              if (specialCharacters.includes(
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
          <input
            type={"password"}
            placeholder="New Password*"
            value={password}
            className={styles.input}
            onChange={validatePassword}
            required
          />
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