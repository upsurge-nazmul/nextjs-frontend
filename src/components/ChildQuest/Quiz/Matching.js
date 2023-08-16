import { useEffect, useState } from "react";
import styles from "../../../styles/knowledgeQuest/Quiz.module.scss";

export default function Matching({ data, value, setValue }) {
  const [matches, setMatches] = useState([]);

  const allowDrop = (ev) => {
    ev.preventDefault();
    // if an element is already dropped in the area, don't allow another element to be dropped
    // check in the matches array if the element is already dropped
    if (matches.find((item) => item.qn === ev.target.id)) {
      ev.dataTransfer.dropEffect = "none";
      return;
    }
  };

  const drag = (ev) => {
    ev.dataTransfer.setData("text", ev.target.id);
  };

  const drop = (ev) => {
    ev.preventDefault();
    const transfered = ev.dataTransfer.getData("text");
    const transferedElement = document.getElementById(transfered);

    // set draggable to false before adding the transfer element
    transferedElement.draggable = false;

    // adding a cross button to remove the element
    const cross = document.createElement("div");
    cross.innerHTML = "X";
    cross.className = styles.cross;
    transferedElement.appendChild(cross);

    cross.onclick = () => {
      // set draggable to true again on clicking the cross
      transferedElement.draggable = true;

      // remove the cross button
      cross.remove();
      // get the element back to the options tray
      const option = document.getElementById("Options-Tray");
      option.appendChild(transferedElement);
      // remove the item from matches
      setMatches((prev) => prev.filter((item) => item.qn !== ev.target.id));
    };

    ev.target.appendChild(transferedElement);
    const selected = data.optins.find(
      (item) => item.id === parseInt(transfered)
    );
    setMatches((prev) => [...prev, { qn: ev.target.id, ans: selected.value }]);
  };

  useEffect(() => {
    if (data.question.length === matches.length) {
      let arr = [];
      matches.map((match) => arr.push(match.ans));
      setValue(arr);
    }
  }, [matches]);

  return (
    <div className={styles.matching}>
      <div className={styles.questionText}>{data.instruction}</div>
      <div className={styles.options}>
        <div className={styles.left}>
          {data.question.map((qn, i) => {
            return (
              <div
                key={"matchingg" + i}
                className={styles.question}
                id={qn}
                onDrop={(e) => drop(e)}
                onDragOver={(e) => allowDrop(e)}
              >
                {qn} <div className={styles.answerArea} />
              </div>
            );
          })}
        </div>
        <div className={styles.right} id={"Options-Tray"}>
          {data.options.map((option, i) => {
            return (
              <div
                key={"matching" + i}
                className={styles.option}
                id={option.id}
                draggable={true}
                onDragStart={(e) => drag(e)}
              >
                {data.imageOption ? (
                  <img
                    src={option.imageUrl}
                    className={styles.optionImage}
                    alt={option.id}
                    width={60}
                    height={60}
                    draggable={false}
                  />
                ) : (
                  <div className={styles.textOption}>{option.value}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
