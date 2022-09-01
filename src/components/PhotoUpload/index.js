import { useState } from "react";
import styles from "../../styles/PhotoUpload/index.module.scss";

export default function PhotoUpload({
  setShowModal,
  title = "",
  defaultImage = null,
  actionButtonTitle = "Proceed",
  actionHandler = () => {},
}) {
  const [img, setImg] = useState(defaultImage);

  console.log("%%%%%%%%%%", img, typeof img);

  return (
    <div className={styles.modal}>
      <div className={styles.modalWrapper}>
        <div
          className={styles.background}
          onClick={() => setShowModal(false)}
        />
        <div className={styles.modalcontainer}>
          <div className={styles.header}>{title}</div>
          <div className={styles.imageSection}>
            <div className={styles.imageInputArea}>
              <label>
                <input
                  type={"file"}
                  accept={"image/*"}
                  onChange={(e) => setImg(e.target.files[0])}
                />
                {img ? (
                  <img
                    src={
                      img
                        ? typeof img === "string"
                          ? img
                          : URL.createObjectURL(img)
                        : null
                    }
                    className={styles.preview}
                    alt={"Upload"}
                  />
                ) : (
                  <div>Click here to select an image</div>
                )}
              </label>
            </div>
          </div>
          {/* <input type={"file"} accept={"image/*"} capture={"environment"} /> */}
          <div className={styles.actionArea}>
            <button className={styles.action} onClick={actionHandler}>
              {actionButtonTitle}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
