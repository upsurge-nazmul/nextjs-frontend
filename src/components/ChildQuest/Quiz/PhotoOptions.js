import { useState, useEffect } from "react";
import styles from "../../../styles/knowledgeQuest/Quiz.module.scss";
import { modifiedImageURL } from "../../../utils/utils";

const ImageOption = ({ src, alt = "" }) => {
  return (
    <img
      src={modifiedImageURL(
        src,
        "https://upsurge-assets-cdn.s3.ap-south-1.amazonaws.com"
      )}
      alt={alt}
      className={styles.optionImage}
    />
  );
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
                    <>
                      {selected && (
                        <ImageOption
                          src={selected.image}
                          alt={"selected-image"}
                        />
                      )}
                    </>
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
                <ImageOption src={option.image} alt={option.name} />
                <div>{option.name}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
