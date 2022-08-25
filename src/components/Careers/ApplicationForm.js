import { useState } from "react";
import styles from "../../styles/Careers/application.module.scss";
import Selection from "../Selection";
import CareerApis from "../../actions/apis/CareerApis";

export default function ApplicationForm({ positionData, selectedPosition }) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState(selectedPosition);
  const [resume, setResume] = useState();
  const [portfolioLink, setPortfolioLink] = useState("");
  const [age, setAge] = useState("");
  const [lastCompany, setLastCompany] = useState("");
  const [lastDsn, setLastDsn] = useState("");
  const [lastCTC, setLastCTC] = useState("");
  const [whyUpsurge, setWhyUpsurge] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("resume", resume);
    let res = await CareerApis.submitApplication({
      data: {
        name,
        position: positionData.find((item) => item.id === position)["position"],
        portfolioLink,
        age,
        lastCompany,
        lastDsn,
        lastCTC,
        whyUpsurge,
      },
    });
    console.log("*********** submit ", res);
  };

  console.log("#######", resume);

  return (
    <div className={styles.application}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputArea}>
          <input
            className={styles.input}
            type={"text"}
            value={name}
            maxLength={1000}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            className={styles.input}
            type={"number"}
            value={age}
            maxLength={1000}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Age"
          />
        </div>
        <div className={styles.inputArea}>
          <Selection
            value={position}
            setvalue={setPosition}
            options={positionData}
            placeholder="Select Child"
            keyAccessor={"id"}
            valueAccessor={"position"}
          />
          <input
            className={styles.input}
            type={"text"}
            value={portfolioLink}
            maxLength={1000}
            onChange={(e) => setPortfolioLink(e.target.value)}
            placeholder="Portfolio or GitHub Link"
          />
        </div>
        <div className={styles.inputArea}>
          <label className={styles.fileInput}>
            <input
              type={"file"}
              onChange={(e) => setResume(e.target.files[0])}
              placeholder="Resume"
            />
            {resume ? resume.name : "Click here to select your resume"}
          </label>
        </div>
        <div className={styles.inputArea}>
          <input
            className={styles.input}
            type={"text"}
            value={lastCompany}
            maxLength={1000}
            onChange={(e) => setLastCompany(e.target.value)}
            placeholder="Last Company"
          />
          <input
            className={styles.input}
            type={"text"}
            value={lastDsn}
            maxLength={1000}
            onChange={(e) => setLastDsn(e.target.value)}
            placeholder="Last Designation"
          />
          <input
            className={styles.input}
            type={"text"}
            value={lastCTC}
            maxLength={1000}
            onChange={(e) => setLastCTC(e.target.value)}
            placeholder="Last CTC"
          />
        </div>
        <div className={styles.inputArea}>
          <textarea
            rows={"10"}
            name={"Why upsurge"}
            placeholder={"Why upsurge"}
            value={whyUpsurge}
            onChange={(e) => setWhyUpsurge(e.target.value)}
          />
        </div>
        <div className={styles.inputArea}>
          <button onClick={handleSubmit} className={styles.submitButton}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
