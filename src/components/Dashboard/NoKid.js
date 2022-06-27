import { useRouter } from "next/dist/client/router";
import React, { useContext } from "react";
import DashboardApis from "../../actions/apis/DashboardApis";
import noKidSvg from "../../assets/nokid.png";
import { MainContext } from "../../context/Main";
import styles from "../../styles/Dashboard/nokid.module.scss";

function NoKid({ setkids }) {
  const router = useRouter();
  const { userdata } = useContext(MainContext);
  return (
    <div className={styles.noKidComponent}>
      <div className={styles.noKidtextContent}>
        <p className={styles.noKidheading}>Add a Kid to explore upsurge.</p>
        <p className={styles.noKidsubheading}>
          Click “Add a child” to create a new account for your child or connect
          to an existing account.
        </p>
        <div
          className={styles.noKidbutton}
          id="add-child-btn"
          onClick={() => {
            if (!userdata.intro_guide_completed) {
              router.push(
                "/dashboard/p/child/add?showTour=true?pushTo=/dashboard/p?storyIndex=4"
              );
            } else {
              router.push("/dashboard/p/child/add");
            }
          }}
        >
          Add a child
        </div>
      </div>
      <img src={noKidSvg.src} alt="" />
    </div>
  );
}

export default NoKid;
