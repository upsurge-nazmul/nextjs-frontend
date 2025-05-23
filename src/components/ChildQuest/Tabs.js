import styles from "../../styles/knowledgeQuest/Tabs.module.scss";

export default function Tabs({ list, current, setCurrent }) {
  return (
    <div className={styles.tabs}>
      {list.map((item, i) => {
        return (
          <div
            key={i}
            className={
              item.title === current.title ? styles.selectedTab : styles.tab
            }
            onClick={() => setCurrent(item)}
          >
            {item.title}
          </div>
        );
      })}
    </div>
  );
}
