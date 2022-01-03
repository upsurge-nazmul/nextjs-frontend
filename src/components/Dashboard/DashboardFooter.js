import React, { useState } from "react";
import styles from "../../styles/Dashboard/dashboardfooter.module.scss";
import { useRouter } from "next/dist/client/router";
import Terms from "../Home/Terms";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Curve1 from "../SVGcomponents/Curve1";
import Curve2 from "../SVGcomponents/Curve2";
export default function DashboardFooter() {
  const [showterm, setshowterm] = useState(false);
  const [termmode, settermmode] = useState("terms");
  const router = useRouter();
  return (
    <div className={styles.footerSection}>
      {showterm && <Terms setshowterm={setshowterm} termmode={termmode} />}
      <div className={styles.background}>
        <div className={styles.curvecontainer}>
          <Curve1 className={styles.curve1} />
          <Curve2 className={styles.curve2} />
        </div>
      </div>
      <div className={styles.top}>
        <div className={styles.left}>
          <div className={styles.brandtext}>
            <a
              className={styles.whatsapp}
              href="https://wa.me/918287433304"
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon className={styles.icon} />
              Connect on whatsapp
            </a>
            <div className={styles.bottom}>
              <p
                onClick={() => {
                  settermmode("terms");
                  setshowterm(true);
                }}
              >
                Terms & Conditions
              </p>
              <p
                onClick={() => {
                  settermmode("privacy");
                  setshowterm(true);
                }}
              >
                Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mobiletop}>
        <div className={styles.bottom}>
          <a
            className={styles.whatsapp}
            href="https://wa.me/918287433304"
            target="_blank"
            rel="noreferrer"
          >
            <WhatsAppIcon className={styles.icon} />
            Connect on whatsapp
          </a>
          <div className={styles.wrap}>
            <p
              className={styles.terms}
              onClick={() => {
                settermmode("terms");
                setshowterm(true);
              }}
            >
              Terms & Conditions
            </p>
            <p
              onClick={() => {
                settermmode("privacy");
                setshowterm(true);
              }}
            >
              Privacy Policy
            </p>
          </div>
        </div>
      </div>
      <div className={styles.bottombar}>
        © Surgeup Technologies Private Limited. {new Date().getFullYear()}
      </div>
    </div>
  );
}
