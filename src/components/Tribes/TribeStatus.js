import React, { useState } from "react";
import { useEffect } from "react";
import TribeApis from "../../actions/apis/TribeApis";
import { getCookie } from "../../actions/cookieUtils";
import PriorityHighRoundedIcon from "@mui/icons-material/PriorityHighRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import styles from "../../styles/Tribes/tribestatus.module.scss";
import { capitalize } from "../../helpers/generalfunctions";
export default function TribeStatus({ id, setid }) {
  const [status, setstatus] = useState(null);
  const [error, seterror] = useState(null);
  useEffect(() => {
    x();
    async function x() {
      let res = await TribeApis.getTribeStatus(
        { id },
        getCookie("accesstoken")
      );
      console.log("data", res.data);
      if (res && res.data && res.data.success) {
        setstatus(res.data.data);
      } else {
        seterror(res.data.message || "Error connecting to server");
      }
    }
  }, [id]);
  return (
    <div className={styles.tribestatus}>
      <div className={styles.background} onClick={() => setid(null)} />
      <div className={styles.main}>
        <p className={styles.heading}>Tribe Status</p>
        <div className={styles.statuswrapper}>
          <div className={styles.status}>
            Tribe created.{" "}
            <DoneRoundedIcon className={`${styles.icon} ${styles.done}`} />
          </div>
          <div className={styles.status}>
            {`Add request approval for adding ${capitalize(
              status?.username.trim()
            )}.`}
            <div>
              {status?.add_approved ? (
                <DoneRoundedIcon className={`${styles.icon} ${styles.done}`} />
              ) : (
                <PriorityHighRoundedIcon className={styles.icon} />
              )}
            </div>
          </div>
          <div className={styles.status}>
            {`Parent approval for ${capitalize(
              status?.username
            )} to join your tribe.`}
            <div>
              <PriorityHighRoundedIcon className={styles.icon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
