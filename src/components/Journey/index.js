import styles from "../../styles/Journey/journey.module.scss";
import Banner from "./Banner";
import Pathway from "./Pathway";
import HeadingArrow from "../SVGcomponents/HeadingArrow";
import { useState } from "react";
import Tasks from "./Tasks";
import { PathwayData } from "../../static_data/Pathways_Data";

export default function Journey() {
  const [selectedPath, setSelectedPath] = useState();

  return (
    <div className={styles.journey}>
      {selectedPath ? "" : <Banner highlight={PathwayData[0]} />}
      <h2 id="milestone" className={styles.mainheading} onClick={() => {}}>
        Journey
        <HeadingArrow />
      </h2>
      <Pathway PATH={PathwayData} handleClick={setSelectedPath} />
      {selectedPath ? <Banner highlight={selectedPath} pointer={true} /> : ""}
      {selectedPath ? <Tasks highlight={selectedPath} /> : ""}
    </div>
  );
}
