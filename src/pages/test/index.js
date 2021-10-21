import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import styles from "../../styles/test/test.module.scss";
export default function Test() {
  return (
    <div className={styles.test}>
      <Header />
      <iframe src="https://scriptjs.in/client-showcase/Module1/story.html" />
      <Footer />
    </div>
  );
}
