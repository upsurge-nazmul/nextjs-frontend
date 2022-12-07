import React, { useEffect, useState } from "react";
import LoginApis from "../../actions/apis/LoginApis";
import Image from "next/image";
import styles from "../../styles/WaitlistDashboard/refer.module.scss";
export default function Refer({ settoastdata, parent, nomargin }) {
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
      seterr(res?.data?.message || "Cannot connect to server");
    }
  }
  return (
    <div
      className={styles.refer}
      id="refer-div"
      style={nomargin ? { margin: 0 } : {}}
    >
      <p className={styles.heading}>Invite your friends</p>
      <p className={styles.subheading}>
        Earn 10 UniCoins for each friend joining our platform.
      </p>
      {parent && (
        <p className={styles.subheading}>
          UniCoins earned will be equally divided in your children.
        </p>
      )}
      <p className={styles.subheading}>
        {`For every 5th successful referral you'll get additional 25 unicoins.`}
      </p>
      <div className={styles.img}>
        <Image
          objectFit="cover"
          layout="fill"
          src="https://imgcdn.upsurge.in/images/unsp/photo-1529156069898-49953e39b3ac.avif"
          alt=""
        />
      </div>
      {err && <p className={styles.err}>{err}</p>}

      <div className={styles.bottom}>
        <input
          type="text"
          placeholder="email1@example.com, email2@example.com, ...."
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
