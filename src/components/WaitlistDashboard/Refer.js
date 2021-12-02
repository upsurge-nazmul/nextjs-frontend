import React, { useEffect, useState } from "react";
import LoginApis from "../../actions/apis/LoginApis";
import styles from "../../styles/WaitlistDashboard/refer.module.scss";
export default function Refer({ settoastdata }) {
  const [email, setemail] = useState("");
  const [err, seterr] = useState("");
  useEffect(() => {
    seterr("");
  }, [email]);
  async function sendinvite() {
    let res = await LoginApis.refer({ email: email });
    if (res && res.data && res.data.success) {
      settoastdata({ show: true, msg: "Invite sent", type: "success" });
      setemail("");
    } else {
      seterr(res.data.message || "Cannot connect to server");
    }
  }
  return (
    <div className={styles.refer}>
      <p className={styles.heading}>Invite your friends</p>
      {err && <p className={styles.err}>{err}</p>}
      <div className={styles.bottom}>
        <input
          type="text"
          placeholder="yourfriend@gmail.com"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <div className={styles.button} onClick={sendinvite}>
          Send Invite
        </div>
      </div>
    </div>
  );
}
