import React, { useEffect, useState } from "react";
import LoginApis from "../../actions/apis/LoginApis";
import Image from "next/image";
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
      <p className={styles.subheading} style={{ marginBottom: "3px" }}>
        Earn 10 unicoins for each friend joining our platform.
      </p>
      <p className={styles.subheading} style={{ marginTop: "0px" }}>
        {`For every 5th successful refferal you'll get additional 25 unicoins.`}
      </p>
      <div className={styles.img}>
        <Image
          objectFit="cover"
          layout="fill"
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
          alt=""
        />
      </div>
      {err && <p className={styles.err}>{err}</p>}

      <div className={styles.bottom}>
        <input
          type="text"
          placeholder="email@example.com"
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
