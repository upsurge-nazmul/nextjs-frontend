import React, { useState } from "react";
import styles from "../../styles/Chores/rejectchore.module.scss";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ChoreApis from "../../actions/apis/ChoreApis";
import CustomDatePicker from "../CustomDatePicker";
import { getCookie } from "../../actions/cookieUtils";
export default function RejectChore({
  id,
  setid,
  settoastdata,
  setchores,
  setallchores,
}) {
  const [showtime, setshowtime] = useState(false);
  const [error, seterror] = useState("");
  const [duedate, setduedate] = useState(
    new Date(new Date().setHours(new Date().getHours() + 1))
  );
  async function handlereject(reschedule) {
    if (reschedule) {
      if (new Date().getTime() >= new Date(duedate).getTime()) {
        seterror("Invalid date or time");
        return;
      }
    }
    let res = await ChoreApis.rejectchore(
      { id, newTime: new Date(duedate).getTime(), removeChore: !reschedule },
      getCookie("accesstoken")
    );
    if (res && res.data && res.data.success) {
      settoastdata({ show: true, type: "success", msg: "Done" });
      setchores((prev) => prev.filter((item) => item.id !== id));
      setallchores((prev) => prev.filter((item) => item.id !== id));
      setid("");
    } else {
      seterror(res?.data?.message || "Error connecting to server");
    }
  }
  return (
    <div className={styles.reject}>
      <div className={styles.background} onClick={() => setid("")}></div>
      <div className={styles.cross} onClick={() => setid("")}>
        <CancelOutlinedIcon className={styles.icon} />
      </div>
      <div className={styles.main}>
        <p className={styles.heading}>Reject chore</p>
        <p className={styles.subheading}>
          You can reject chore using one of the following options.
        </p>
        {<p className={styles.err}>{error}</p>}
        {!showtime ? (
          <div className={styles.flexTop}>
            <div className={styles.delete} onClick={() => handlereject()}>
              Delete chore
            </div>
            <div
              className={styles.reschedule}
              onClick={() => setshowtime(true)}
            >
              Reschedule chore
            </div>
          </div>
        ) : (
          <div className={styles.flexBottom}>
            <div className={styles.top}>
              <p className={styles.title}>Select date :</p>
              <CustomDatePicker
                value={duedate}
                setvalue={setduedate}
                maxdate={"today"}
              />
            </div>
            <div className={styles.btn} onClick={() => handlereject(true)}>
              Reschedule
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
