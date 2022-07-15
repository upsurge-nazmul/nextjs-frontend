import { useEffect, useState } from "react";
import styles from "../../../styles/knowledgeQuest/Quiz.module.scss";
import Image from "next/image";
import rupee from "../../../assets/currencies/rupee.png";
import dollar from "../../../assets/currencies/dollar.png";
import euro from "../../../assets/currencies/euro.png";
import franc from "../../../assets/currencies/franc.png";
import pound from "../../../assets/currencies/pound.png";

export default function Matching({ data, value, setValue }) {
  const [matches, setMatches] = useState([]);

  const allowDrop = (ev) => {
    ev.preventDefault();
  };

  const drag = (ev) => {
    ev.dataTransfer.setData("text", ev.target.id);
  };

  const drop = (ev) => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    setMatches((prev) => [...prev, { qn: ev.target.id, ans: data }]);
  };

  useEffect(() => {
    if (data.optins.length === matches.length) {
      let arr = [];
      matches.map((match) => arr.push(match.ans));
      setValue(arr);
    }
  }, [matches]);

  return (
    <div className={styles.matching}>
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
      <div className={styles.right}>
        {data.optins.map((option, i) => {
          return (
            <div
              key={"matching" + i}
              className={styles.option}
              id={option}
              draggable={true}
              onDragStart={(e) => drag(e)}
            >
              {data.imageOption ? (
                <Image
                  src={
                    option === "rupee"
                      ? rupee
                      : option === "dollar"
                      ? dollar
                      : option === "euro"
                      ? euro
                      : option === "pound"
                      ? pound
                      : option === "franc"
                      ? franc
                      : ""
                  }
                  className={styles.optionImage}
                  alt={option}
                  width={60}
                  height={60}
                  draggable={false}
                />
              ) : (
                <div className={styles.textOption}>{option}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
