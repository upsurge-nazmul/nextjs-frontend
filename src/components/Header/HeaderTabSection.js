import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import styles from "../../styles/GeneralComponents/headerTabSections.module.scss";
import HeaderExpandSvg from "../SVGcomponents/HeaderExpandSvg";
function HeaderTabSection({ title, tabs }) {
  const [showtabs, setshowtabs] = useState(false);
  const [timeout, settimeout] = useState(null);
  const router = useRouter();
  return (
    <div
      className={styles.headerTabSection}
      onMouseEnter={() => {
        if (timeout) {
          clearTimeout(timeout);
        }
        setshowtabs(true);
      }}
      onMouseLeave={() => {
        if (timeout) {
          clearTimeout(timeout);
        }
        settimeout(setTimeout(() => setshowtabs(false), 200));
      }}
    >
      <div className={styles.expander}>
        {title}
        <HeaderExpandSvg className={styles.expandicon} />
      </div>
      {showtabs && (
        <div className={styles.tabHolder}>
          {tabs.map((item) => {
            return (
              <p
                key={title + "-" + item.name}
                className={styles.tabs}
                onClick={() => router.push(item.pushTo)}
              >
                {item.name}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default HeaderTabSection;
