import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import styles from "../../styles/GeneralComponents/headerTabSections.module.scss";
import HeaderExpandSvg from "../SVGcomponents/HeaderExpandSvg";
function HeaderTabSection({
  mobile,
  title,
  tabs,
  pushTo,
  current,
  setcurrent,
}) {
  const [showtabs, setshowtabs] = useState(false);
  const [timeout, settimeout] = useState(null);
  const router = useRouter();
  return (
    <div
      className={`${styles.headerTabSection} ${
        mobile ? styles.mobileTabSection : ""
      }`}
      onClick={() => {
        if (mobile) {
          if (current === title) {
            setcurrent("");
          } else {
            setcurrent(title);
          }
        }
        setshowtabs(!showtabs);
        if (pushTo) {
          router.push(pushTo);
        }
      }}
      onMouseEnter={() => {
        if (!mobile) {
          if (timeout) {
            clearTimeout(timeout);
          }
          setshowtabs(true);
        }
      }}
      onMouseLeave={() => {
        if (!mobile) {
          if (timeout) {
            clearTimeout(timeout);
          }
          settimeout(setTimeout(() => setshowtabs(false), 200));
        }
      }}
    >
      <div className={styles.expander}>
        {title}
        {tabs.length > 0 && (
          <HeaderExpandSvg
            className={`${
              current === title || showtabs
                ? styles.reverseexpandicon
                : styles.expandicon
            }`}
          />
        )}
      </div>
      {mobile
        ? tabs.length > 0 &&
          current === title && (
            <div
              className={`${styles.tabHolder} ${mobile ? styles.mobile : ""}`}
            >
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
          )
        : tabs.length > 0 &&
          showtabs && (
            <div
              className={`${styles.tabHolder} ${mobile ? styles.mobile : ""}`}
            >
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
