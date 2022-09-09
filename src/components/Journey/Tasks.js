import styles from "../../styles/Journey/tasks.module.scss";

const TASKS = [
  {
    id: 1,
    type: "Knowledge Quest",
    name: "Intro to money",
    description: "Did you know how money came to be?",
  },
  {
    id: 2,
    type: "Game",
    name: "Balance Builder",
    description: "Did you know how money came to be?",
  },
  {
    id: 3,
    type: "Knowledge Quest",
    name: "Money around the world",
    description: "Did you know how money came to be?",
  },
  {
    id: 4,
    type: "Game",
    name: "Money slide",
    description: "Did you know how money came to be?",
  },
  {
    id: 5,
    type: "Chore",
    name: "How many countries use the dollar as  currency?",
    description: "Did you know how money came to be?",
  },
];

const TASK_TYPE_COLORS = [
  { id: "Knowledge Quest", color: "#17d1bc" },
  { id: "Game", color: "#ffcd00" },
  { id: "Chore", color: "#4066eb" },
  { id: "Activity", color: "#ff6163" },
];

export default function Tasks({ highlight }) {
  const taskCompleted = 0;

  return (
    <div className={styles.tasks}>
      <div className={styles.subheading}>{highlight.description}</div>
      <div className={styles.content}>
        {TASKS.map((task, i) => {
          return (
            <div className={styles.taskArea} key={i}>
              <div className={styles.ball} />
              <div className={styles.verticalLine} />
              <div className={styles.task}>
                <div className={styles.taskBody}>
                  <div className={styles.iconArea}>
                    <img src={"/images/journey/task.svg"} />
                  </div>
                  <div className={styles.infoArea}>
                    <div
                      className={styles.taskType}
                      style={{
                        backgroundColor: TASK_TYPE_COLORS.find(
                          (item) => item.id === task.type
                        ).color,
                      }}
                    >
                      {task.type}
                    </div>
                    <div className={styles.taskName}>{task.name}</div>
                    <div className={styles.taskDesc}>{task.description}</div>
                  </div>
                  <div className={styles.actionArea}>
                    <button
                      className={
                        task.id <= taskCompleted + 1
                          ? styles.actionButton
                          : styles.disabledButton
                      }
                    >
                      {task.id <= taskCompleted + 1 ? "BEGIN" : "LOCKED"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
