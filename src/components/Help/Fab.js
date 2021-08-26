import React from "react";
import styles from "../../styles/Help/fab.module.scss";
import ChatSvg from "../SVGcomponents/ChatSvg";

function Fab() {
  return (
    <div className={styles.helpFab}>
      <ChatSvg />
      <p>Get Support</p>
    </div>
  );
}

export default Fab;
