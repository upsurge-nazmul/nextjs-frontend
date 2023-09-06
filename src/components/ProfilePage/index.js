import { useState, useEffect, useContext } from "react";
import styles from "../../styles/EditProfile/profilePage.module.scss";
import { MainContext } from "../../context/Main";
import Info from "./Info";
import Bio from "./Bio";

export default function ProfilePage({ data, childavatars }) {
  const { userdata, setuserdata } = useContext(MainContext);

  useEffect(() => {
    setuserdata(data);
  }, []);

  return (
    <div className={styles.mainContent}>
      <Info {...{ data, childavatars }} />
      <Bio {...{ data, childavatars }} />
    </div>
  );
}
