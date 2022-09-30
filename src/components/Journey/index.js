import styles from "../../styles/Journey/journey.module.scss";
import Banner from "./Banner";
import Pathway from "./Pathway";
import HeadingArrow from "../SVGcomponents/HeadingArrow";
import { useState } from "react";
import Tasks from "./Tasks";
import { PathwayData } from "../../static_data/Pathways_Data";
import TaskDisplay from "./TaskDisplay";

export default function Journey() {
  const [selectedPath, setSelectedPath] = useState();
  const [activeTask, setActiveTask] = useState();

  return (
    <div className={styles.journey}>
      
      <h2 id="milestone" className={styles.mainheading} onClick={() => { }}>
        Journey
        <HeadingArrow />
      </h2>
      <Pathway highlight={selectedPath} handleClick={setSelectedPath} />
      
      {selectedPath ? <Banner highlight={selectedPath} pointer={true} /> : ""}
      {activeTask ? (
        <TaskDisplay task={activeTask} handleCancelClick={setActiveTask} />
      ) : (
        ""
      )}
      {selectedPath ? (
        <Tasks highlight={selectedPath} handleTaskClick={setActiveTask} />
      ) : (
        ""
      )}
    </div>
  );
}
