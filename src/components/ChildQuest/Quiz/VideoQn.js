import styles from "../../../styles/knowledgeQuest/Quiz.module.scss";

export default function VideoQn({ data, value, setValue }) {
  return (
    <div className={styles.videoQn}>
      <iframe
        src="https://www.youtube.com/embed/9xwazD5SyVg"
        title="Dummy Video For YouTube API Test"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        className={styles.video}
      ></iframe>
      <div className={styles.question}>{data.question}</div>
      <div className={styles.answer}>
        <input value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
    </div>
  );
}
