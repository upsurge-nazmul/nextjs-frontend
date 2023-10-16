import styles from "../../styles/Quiz/quizForm.module.scss";

export default function QuizForm({ 
  error,
  name,
  setname,
  email,
  setEmail,
  phone,
  setphone, 
  startgame
 }) {
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
        <img src="https://imgcdn.upsurge.in/images/Artboard-1-1.png" alt="" />
      </div>
    </div>
  );
}