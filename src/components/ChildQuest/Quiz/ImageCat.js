import { useEffect, useState } from "react";
import styles from "../../../styles/knowledgeQuest/Quiz.module.scss";
import Image from "next/image";

export default function ImageCat({ data, value, setValue }) {
  const [checked, setChecked] = useState();

  useEffect(() => {
    if (data && data.images) {
      let obj = {};
      for (let i in data.images) {
        obj[i] = "";
      }
      setChecked(obj);
    }
  }, [data]);

  useEffect(() => {
    if (checked) setValue(checked);
  }, [checked]);

  const handleCheck = (e) => {
    setChecked((prev) => {
      let jasper = { ...prev };
      jasper[e.target.id] = e.target.value;
      return jasper;
    });
  };

  return (
    <div className={styles.imageCat}>
      <div className={styles.question}>{data.question}</div>
      <div className={styles.images}>
        {checked &&
          data.images.map((image, i) => {
            return (
              <div className={styles.imageWrap} key={"image-wrap" + i}>
                <Image
                  src={image}
                  alt={`Question Image ${i}`}
                  width={300}
                  height={200}
                  className={styles.image}
                />
                <div className={styles.options}>
                  {data.options.map((option, j) => {
                    return (
                      <div key={"data-opt" + j}>
                        <input
                          type={"checkbox"}
                          value={option}
                          id={i}
                          onChange={handleCheck}
                          checked={checked[i] === option}
                        />
                        <span>{option}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
