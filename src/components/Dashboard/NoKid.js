import React from "react";
import DashboardApis from "../../actions/apis/DashboardApis";
import noKidSvg from "../../assets/nokid.png";
import styles from "../../styles/Dashboard/nokid.module.scss";

function NoKid({ setkids }) {
  async function addChild() {
    let data = {
      name: "Tushar Kushwaha",
      image:
        "https://images.unsplash.com/photo-1552873816-636e43209957?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1489&q=80",
    };
    let response = await DashboardApis.addkids(data);
    setkids((prev) => [...prev, response.data.data]);
  }
  return (
    <div className={styles.noKidComponent}>
      <div className={styles.noKidtextContent}>
        <p className={styles.noKidheading}>Ready to add your kid?</p>
        <p className={styles.noKidsubheading}>
          Click “Add a child” to create a new account for your child or connect
          to an existing account.
        </p>
        <p className={styles.noKidsubheading}>
          <span className={styles.link}>Learn more</span> about how to get your
          child set up
        </p>
        <div className={styles.noKidbutton} onClick={addChild}>
          Add a child
        </div>
      </div>
      <img src={noKidSvg.src} alt="" />
    </div>
  );
}

export default NoKid;
