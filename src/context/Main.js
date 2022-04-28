import React, { createContext, useEffect, useState } from "react";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import "../firebase";
import NotificationApis from "../actions/apis/NotificationApis";
import { isMobile } from "react-device-detect";

export const MainContext = createContext();

export const MainContextProider = ({ children }) => {
  const [authmode, setauthmode] = useState("selection");
  const [dashboardmode, setdashboardmode] = useState("home");
  const [accesstoken, setaccesstoken] = useState(null);
  const [user, setuser] = useState(null);
  const [userdata, setuserdata] = useState(null);
  const [userSignupMethod, setuserSignupMethod] = useState("email");
  const [email, setemail] = useState("");
  const [showmenu, setshowmenu] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [currentChoreTemplate, setcurrentChoreTemplate] = useState("");
  const [show, setShow] = useState(false);
  const [mobileMode, setmobileMode] = useState(false);
  const [notification, setNotification] = useState({
    title: "Test",
    body: "This is body",
  });
  const [widthHeight, setwidthHeight] = useState({
    width: 1280,
    height: 720,
  });
  const [theme, setTheme] = useState("light");
  // useEffect(() => {
  //   setTheme(
  //     window.matchMedia &&
  //       window.matchMedia("(prefers-color-scheme: dark)").matches
  //       ? "dark"
  //       : "light"
  //   );
  // }, []);
  // useEffect(() => {
  //   const modeMe = (e) => {
  //     console.log("theme", e);
  //     setTheme(e.matches ? "dark" : "light");
  //   };

  //   window
  //     .matchMedia("(prefers-color-scheme: dark)")
  //     .addEventListener("change", modeMe);
  //   return window
  //     .matchMedia("(prefers-color-scheme: dark)")
  //     .removeListener(modeMe);
  // }, []);
  // useEffect(() => {
  //   if (theme === "dark") {
  //     document.body.style.background = "#111111";
  //   } else {
  //     document.body.style.background = "#ffffff";
  //   }
  // }, [theme]);

  useEffect(() => {
    setmobileMode(isMobile);
  }, [isMobile]);
  useEffect(() => {
    try {
      let messaging = getMessaging();
      onMessage(messaging, (payload) => {
        setShow(true);
        setNotification({
          title: payload.data?.title,
          body: payload.data?.body,
          data: payload.data,
          show: true,
        });
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    saveNotificationToken();
    async function saveNotificationToken() {
      let token = "";
      try {
        let messaging = getMessaging();
        token = await getToken(messaging);
        await NotificationApis.addToken({ type: "web", token });
      } catch (err) {
        console.log("notifications blocked");
      }
    }
  }, []);
  useEffect(() => {
    function updateSize() {
      let w = window.innerWidth;
      let h = window.innerHeight;
      setwidthHeight({
        width: w,
        height: h,
      });
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return (
    <MainContext.Provider
      value={{
        mobileMode,
        notification,
        setNotification,
        user,
        setuser,
        authmode,
        setauthmode,
        dashboardmode,
        setdashboardmode,
        accesstoken,
        setaccesstoken,
        userSignupMethod,
        setuserSignupMethod,
        email,
        setemail,
        userdata,
        setuserdata,
        showmenu,
        setshowmenu,
        firstName,
        setfirstName,
        lastName,
        setlastName,
        currentChoreTemplate,
        setcurrentChoreTemplate,
        widthHeight,
        setwidthHeight,
        theme,
        setTheme,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
