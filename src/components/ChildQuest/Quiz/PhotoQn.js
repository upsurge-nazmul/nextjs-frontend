import Image from "next/image";
import styles from "../../../styles/knowledgeQuest/Quiz.module.scss";

export default function PhotoQn({ data, value, setValue }) {
  return (
    <div className={styles.photoQN}>
      <div className={styles.imageWraper}>
        <img
          src={data.photoUrl}
          alt="Picture of the question"
          width={600}
          height={300}
          className={styles.image}
        />
      </div>
      <div className={styles.question}>{data.question}</div>
      {data.options && data.options.length && (
        <div className={styles.options}>
          {data.options.map((option, i) => {
            return (
              <div
                key={"photoQn" + i}
                className={
                  option === value ? styles.selectedOption : styles.option
                }
                onClick={() => setValue(option)}
              >
                {option}
              </div>
            );
          })}
        </div>
      )}
      <div className={styles.answer}>
        <input
          value={value ? value : ""}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
}
