import React, { useState } from "react";
import styles from "../../styles/Dashboard/kidcomponent.module.scss";
import ClockSvg from "../SVGcomponents/ClockSvg";
import MenuSvg from "../SVGcomponents/MenuSvg";
import KidComponentMenu from "./KidComponentMenu";

function KidComponent({ data, setkids, settoastdata }) {
  const [showmenu, setshowmenu] = useState(false);
  return (
    <div className={styles.kidComponent}>
      <img src={data?.img_url} alt="" className={styles.kidimg} />
      <div className={styles.nameandpoints}>
        <p className={styles.name}>{data?.display_name}</p>
        <p className={styles.points}>
          {data?.points > 1000
            ? Math.floor(data?.points / 1000) + "k"
            : data?.points}
          {" points"}
        </p>
      </div>
      <p className={styles.chore}>{data?.pending_chores}</p>

      <div className={styles.courseProgression}>
        <p className={styles.name}>{data?.current_course || "No course"}</p>
        <div className={styles.progressBar}>
          <div
            className={styles.completion}
            style={{ width: `${data?.course_progress}%` }}
          ></div>
        </div>
        <div className={styles.progressText}>
          <ClockSvg />
          <p>{100 - data?.course_progress + "% Left"}</p>
        </div>
      </div>
      <div
        className={styles.more}
        id={data.id + "menu-button"}
        onClick={() => setshowmenu(!showmenu)}
      >
        <MenuSvg />
        {showmenu && (
          <KidComponentMenu
            setkids={setkids}
            data={data}
            settoastdata={settoastdata}
            setshowmenu={setshowmenu}
          />
        )}
      </div>
    </div>
  );
}

export default KidComponent;
