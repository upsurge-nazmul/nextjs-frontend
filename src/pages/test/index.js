import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import LeftPanel from "../../components/LeftPanel";
import styles from "../../styles/test/test.module.scss";
export default function Test() {
  const [openLeftPanel, setOpenLeftPanel] = useState(false);

  return (
    <div className={styles.test}>
      <Header
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <iframe src="https://scriptjs.in/client-showcase/Module1/story.html" />
      <Footer />
    </div>
  );
}
