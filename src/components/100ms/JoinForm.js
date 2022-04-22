import { useContext, useState } from "react";
import { useHMSActions } from "@100mslive/react-sdk";
import styles from "../../styles/classroom/form.module.scss";
import { MainContext } from "../../context/Main";
function JoinForm({ type }) {
  const hmsActions = useHMSActions();
  const { theme } = useContext(MainContext);
  const [inputValues, setInputValues] = useState({
    name: "",
    token:
      type === "teacher"
        ? "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2Nlc3Nfa2V5IjoiNjI1ZTQ1NDlhMjZkMmY4ZWMwNzBkM2Q4Iiwicm9vbV9pZCI6IjYyNWU3Mjg0YTI2ZDJmOGVjMDcwZDY5MSIsInVzZXJfaWQiOiJ3bHR5aW12bSIsInJvbGUiOiJ0ZWFjaGVyIiwianRpIjoiZTM3N2Q0MTktYTY1Zi00MWYxLTgwNjAtYTJlOTkwYjQxOTBlIiwidHlwZSI6ImFwcCIsInZlcnNpb24iOjIsImV4cCI6MTY1MDcyMDg0Mn0.XByhLULNJ4lBgzsB4521v7At3jPgTQgTD7jlCU9O26s"
        : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2Nlc3Nfa2V5IjoiNjI1ZTQ1NDlhMjZkMmY4ZWMwNzBkM2Q4Iiwicm9vbV9pZCI6IjYyNWU3Mjg0YTI2ZDJmOGVjMDcwZDY5MSIsInVzZXJfaWQiOiJzZ2lueXdmZCIsInJvbGUiOiJzdHVkZW50IiwianRpIjoiNzA5OWMwMmItMDBhOC00MDI0LWIzYWYtNmIzZDQ3ZDcyNDhmIiwidHlwZSI6ImFwcCIsInZlcnNpb24iOjIsImV4cCI6MTY1MDcyMDg0OX0.xkhFOLTsGqDwJlVgKHcWLbyUK8M7B5kTTQdyhpluloM",
  });

  const handleInputChange = (e) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    hmsActions.join({
      userName: inputValues.name,
      authToken: inputValues.token,
    });
  };

  return (
    <form
      className={`${styles.form} ${theme === "dark" && styles.darkform}`}
      onSubmit={handleSubmit}
    >
      <h2 className={styles.heading}>Join Room</h2>
      <div className="input-container">
        <input
          required
          value={inputValues.name}
          onChange={handleInputChange}
          id="name"
          type="text"
          name="name"
          placeholder="Your name"
        />
      </div>
      {/* <div className="input-container">
        <input
          required
          value={inputValues.token}
          onChange={handleInputChange}
          id="token"
          type="text"
          name="token"
          placeholder="Auth token"
        />
      </div> */}
      <div className={styles.btn} onClick={handleSubmit}>
        Join
      </div>
    </form>
  );
}

export default JoinForm;
