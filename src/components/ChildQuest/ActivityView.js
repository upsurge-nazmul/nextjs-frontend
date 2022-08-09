import React from "react";
import styles from "../../styles/knowledgeQuest/Views.module.scss";

export default function ActivityView({ chapterId }) {
  return (
    <div className={styles.view}>
      <div className={styles.activityView}>
        {/* <div className={styles.commingSoon}>Coming Soon</div> */}
        <iframe
          id="iframe"
          className={styles.iframe}
          src={`/KnowledgeQuest/${chapterId}/story.html`}
        ></iframe>
      </div>
    </div>
  );
}
