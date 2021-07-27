import React from "react";
import styles from "../../styles/Help/fab.module.scss";

function Fab() {
  return (
    <div className={styles.helpFab}>
      <svg
        width="23"
        height="21"
        viewBox="0 0 23 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.5 17.5C17.271 17.5 19.157 17.5 20.328 16.328C21.5 15.157 21.5 13.271 21.5 9.5C21.5 5.729 21.5 3.843 20.328 2.672C19.157 1.5 17.271 1.5 13.5 1.5H9.5C5.729 1.5 3.843 1.5 2.672 2.672C1.5 3.843 1.5 5.729 1.5 9.5C1.5 13.271 1.5 15.157 2.672 16.328C3.325 16.982 4.2 17.271 5.5 17.398"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.5 9.5V9.51"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
        />
        <path
          d="M6.5 9.5V9.51"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
        />
        <path
          d="M16.5 9.5V9.51"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
        />
        <path
          d="M13.5 17.5C12.264 17.5 10.902 18 9.659 18.645C7.661 19.682 6.662 20.201 6.17 19.87C5.678 19.54 5.771 18.515 5.958 16.466L6 16"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
      <p>Get Support</p>
    </div>
  );
}

export default Fab;
