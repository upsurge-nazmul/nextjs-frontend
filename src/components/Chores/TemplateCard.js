import React from "react";
import styles from "../../styles/Chores/choretemplatecard.module.scss";

function TemplateCard({ name, image, selected, setselected }) {
  return (
    <div className={styles.templateCard} onClick={() => setselected(name)}>
      <div className={styles.circle}>
        {selected === name ? (
          <div className={styles.selectedcircle}>
            <svg
              width="39"
              height="31"
              viewBox="0 0 39 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.5987 21.6114L34.4671 0L39 4.69429L13.5987 31L0 16.9171L4.53289 12.2229L13.5987 21.6114Z"
                fill="white"
              />
            </svg>
          </div>
        ) : null}
        <img src={image.src} alt="" />
      </div>
      <p className={styles.name}>{name}</p>
    </div>
  );
}

export default TemplateCard;
