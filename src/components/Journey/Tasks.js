import styles from "../../styles/Journey/tasks.module.scss";
import UniCoinSvg from "../SVGcomponents/UniCoinSvg";
import RewardTask from "./RewardTask";

const TASK_TYPE_COLORS = [
  { id: "Knowledge Quest", color: "#17d1bc" },
  { id: "Game", color: "#ffcd00" },
  { id: "Chore", color: "#4066eb" },
  { id: "Activity", color: "#ff6163" },
];

export default function Tasks({ highlight, handleTaskClick }) {
  const taskCompleted = 0;

  return (
    <div className={styles.tasks}>
      <div className={styles.subheading}>{highlight.description}</div>
      <>
        {highlight.pathwayId === "reward" ? (
          <RewardTask />
        ) : (
          <div className={styles.content}>
            {highlight.tasks.map((task) => {
              return (
                <div className={styles.taskArea} key={task.id}>
                  <div
                    className={
                      task.taskNo <= taskCompleted
                        ? styles.completedBall
                        : styles.emptyBall
                    }
                  />
                  <div
                    className={
                      task.taskNo <= taskCompleted + 1
                        ? styles.completedLine
                        : styles.connectingLine
                    }
                  />
                  <div className={styles.task}>
                    <div className={styles.taskBody}>
                      <div className={styles.iconArea}>
                        <img src={`${task.taskImage}`} />
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
                        <div className={styles.taskName}>{task.taskTitle}</div>
                        <div className={styles.taskDesc}>
                          {task.taskDescription}
                        </div>
                      </div>
                      <div className={styles.actionArea}>
                        <button
                          // className={
                          //   task.taskNo <= taskCompleted + 1
                          //     ? styles.actionButton
                          //     : styles.disabledButton
                          // }
                          className={styles.actionButton}
                          onClick={() => handleTaskClick(task)}
                        >
                          {/* {task.taskNo < taskCompleted + 1
                        ? "REPLAY"
                        : task.taskNo === taskCompleted + 1
                        ? "BEGIN"
                        : "LOCKED"} */}
                          BEGIN
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className={styles.tasksFooter}>
              <img
                src={"/images/journey/taskEnd.svg"}
                className={styles.taskEnd}
              />
              {highlight.reward && (
                <div className={styles.footerReward}>
                  <div className={styles.reward}>
                    <UniCoinSvg className={styles.svg} />
                    <span>{highlight.reward}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </>
    </div>
  );
}
