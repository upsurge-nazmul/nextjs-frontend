import { useRouter } from "next/dist/client/router";
import React, { useContext } from "react";
import { MainContext } from "../../context/Main";
import styles from "../../styles/Chores/choretemplateselection.module.scss";
import BackArrow from "../SVGcomponents/BackArrow";
function ChoreTemplateSelection({ category, setmode }) {
  const router = useRouter();
  const { setcurrentChoreTemplate } = useContext(MainContext);

  return (
    <div className={styles.choreTemplateSelection}>
      <div className={styles.header}>
        <BackArrow onClick={() => setmode("category")} />
        <div className={styles.text}>
          <p className={styles.heading}>Create chore from template</p>
          <p className={styles.category}>{category}</p>
        </div>
      </div>
      <div className={styles.wrapper}>
        {temps.map((item, index) => {
          return (
            <div className={styles.card} key={"templatecardselection" + index}>
              <img src={item.image} alt="" />
              <div className={styles.text}>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.time}>{item.time}</p>
              </div>
              <div
                className={styles.button}
                onClick={() => {
                  setcurrentChoreTemplate({ ...item, category });
                  router.push("/dashboard/p/managechore/new");
                }}
              >
                Use Template
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChoreTemplateSelection;
