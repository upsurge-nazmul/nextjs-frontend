import styles from "../../styles/knowledgeQuest/Views.module.scss";

export default function RecordingView({ chapterId }) {
  return (
    <div className={styles.view}>
      <iframe
        id="iframe"
        className={styles.iframe}
        src={`/KnowledgeQuest/${chapterId}/story.html`}
      ></iframe>
    </div>
  );
}
