import { useEffect, useState } from "react";
import styles from "../../../styles/knowledgeQuest/Quiz.module.scss";
import { modifiedImageURL } from "../../../utils/utils";

const ImageSelection = ({ data, setValue }) => {
  const [selected, setSelected] = useState([]);

  const handleSelect = (value) => {
    if (selected.includes(value)) {
      setSelected((prev) => prev.filter((item) => item !== value));
    } else {
      setSelected((prev) => [...prev, value]);
    }
  };

  useEffect(() => {
    if (selected.length >= data.minimumSelection) {
      setValue(selected);
    } else {
      setValue();
    }
  }, [selected]);

  return (
    <div className={styles.imageSelection}>
      <div className={styles.questionText}>{data.question}</div>
      <div className={styles.optoinsArea}>
        {data.options &&
          data.options.length &&
          data.options.map((option, i) => {
            return (
              <div
                key={"option" + i}
                className={
                  selected.includes(option.value)
                    ? styles.selectedOption
                    : styles.option
                }
                onClick={() => handleSelect(option.value)}
              >
                <img
                  src={modifiedImageURL(
                    option.imageUrl,
                    "https://upsurge-assets-cdn.s3.ap-south-1.amazonaws.com"
                  )}
                  alt={option.value}
                  className={styles.optionImage}
                />
                <div className={styles.optionText}>{option.value}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ImageSelection;
