import { useRouter } from "next/dist/client/router";
import React, { useContext } from "react";
import noKidSvg from "../../assets/nokid.png";
import { MainContext } from "../../context/Main";
import styles from "../../styles/Dashboard/nokid.module.scss";

function NoKid({ backTo = "/dashboard/p" }) {
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
              router.push({
                pathname:
                  "/dashboard/p/child/add?showTour=true?pushTo=/dashboard/p?storyIndex=4",
                query: { backTo },
              });
            } else {
              router.push({
                pathname: "/dashboard/p/child/add",
                query: { backTo },
              });
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
