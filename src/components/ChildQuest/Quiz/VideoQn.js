import styles from "../../../styles/knowledgeQuest/Quiz.module.scss";

export default function VideoQn({ data, value, setValue }) {
  return (
    <div className={styles.videoQn}>
      <iframe
        src={data.videoUrl}
        title="Video For YouTube API"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={styles.video}
      ></iframe>
      <div className={styles.question}>{data.question}</div>
      {data.options && data.options.length && (
        <div className={styles.options}>
          {data.options.map((option, i) => {
            return (
              <div
                key={"videoQn" + i}
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
