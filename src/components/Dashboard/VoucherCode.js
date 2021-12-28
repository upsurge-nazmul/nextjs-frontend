import React, { useState } from "react";
import { copyToClipboard } from "../../helpers/generalfunctions";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import styles from "../../styles/Dashboard/vouchercode.module.scss";
export default function VoucherCode({ data, setshowcode, settoastdata }) {
  const [pin, setpin] = useState(false);
  const [copied, setcopied] = useState(false);
  return (
    <div className={styles.vouchercode}>
      <div
        className={styles.background}
        onClick={() => setshowcode(false)}
      ></div>
      <div className={styles.main}>
        <div className={styles.code}>
          {data.voucherCode}
          <ContentCopyRoundedIcon
            className={styles.copy}
            onClick={() => {
              if (copyToClipboard(data.voucherCode)) {
                settoastdata({ show: true, type: "success", msg: "Copied" });
              }
            }}
          />
        </div>
        {data.pin &&
          (pin ? (
            <div className={styles.code} style={{ marginTop: "10px" }}>
              Pin: {data.pin}
            </div>
          ) : (
            <div className={styles.show} onClick={() => setpin(true)}>
              Show pin
            </div>
          ))}
        <p className={styles.detail}>Amount : ₹{data.amount}</p>
        <p className={styles.detail}>Valid till : {data.validity}</p>
      </div>
    </div>
  );
}
