import { useRouter } from "next/dist/client/router";
import React, { useContext } from "react";
import { MainContext } from "../../context/Main";
import styles from "../../styles/Chores/choretemplate.module.scss";

function ChoreTemplate({ image, name, time, cat }) {
  const { setcurrentChoreTemplate } = useContext(MainContext);

  const router = useRouter();
  return (
    <div className={styles.choreTemplate}>
      <img src={image} alt="" className={styles.userimg} />
      <div className={styles.nameandpoints}>
        <p className={styles.name}>{name}</p>
        <p className={styles.points}>{time}</p>
      </div>
      <div
        className={styles.assignbutton}
        onClick={() => {
          router.push(
            "/managechore/new?template=" +
              name.replace(/ /g, "-") +
              "&templatecat=" +
              cat
          );
        }}
      >
        Assign
      </div>
    </div>
  );
}

export default ChoreTemplate;
