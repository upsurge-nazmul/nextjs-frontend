import { useState, useEffect } from "react";
import styles from "../../../styles/knowledgeQuest/Quiz.module.scss";

const ImageOption = ({ src }) => {
  return <img src={src} className={styles.optionImage} />;
};

export default function PhotoOptions({ data, value, setValue }) {
  const [selected, setSelected] = useState();

  useEffect(() => {
    if (value) {
      const selected = data.options.find((item) => item.name === value);
      setSelected(selected);
    }
  }, [value]);

  return (
    <div className={styles.photoOption}>
      <div className={styles.photoOptionQnArea}>
        {data.question.map((qn, i) => {
          return (
            <span className={styles.photoOptionQn} key={"photoOption" + i}>
              <span className={styles.qnText}>{qn}</span>
              {i < data.question.length - 1 && (
                <span className={styles.selectedOption}>
                  {value ? (
                    <>{selected && <ImageOption src={selected.image} />}</>
                  ) : (
                    <span className={styles.emptyInput}></span>
                  )}
                </span>
              )}
            </span>
          );
        })}
      </div>
      {data.options && data.options.length && (
        <div className={styles.options}>
          {data.options.map((option, i) => {
            return (
              <div
                key={"photoOption" + i}
                className={
                  option === value ? styles.selectedOption : styles.option
                }
                onClick={() => setValue(option.name)}
              >
                <ImageOption src={option.image} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
