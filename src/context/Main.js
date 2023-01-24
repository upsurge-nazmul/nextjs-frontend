import React, { createContext, useEffect, useState } from "react";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import "../firebase";
import NotificationApis from "../actions/apis/NotificationApis";
import { isMobile } from "react-device-detect";
import LoginApis from "../actions/apis/LoginApis";
import { useRouter } from "next/router";
import { setCookie } from "../actions/cookieUtils";

export const MainContext = createContext();

export const MainContextProider = ({ children }) => {
  const [authmode, setauthmode] = useState("selection");
  const [dashboardmode, setdashboardmode] = useState("home");
  const [savedUsers, setSavedUsers] = useState([]);
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
    title: "Notification",
    body: "Notification Body",
  });
  const [widthHeight, setwidthHeight] = useState({
    width: 1280,
    height: 720,
  });
  const [theme, setTheme] = useState("light");
  const [skipActive,setskipActive] = useState(true);
  const router = useRouter();
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
    let data = localStorage.getItem("savedUsers");
    if (!data) return;
    console.log("saved", data);

    data = JSON.parse(data);
    // if (!userdata && data.length > 0) {
    //   changeUser(data);
    // }
    setSavedUsers(data);
  }, []);
  async function changeUser(data) {
    let response = await LoginApis.checktoken({
      token: data.token,
    });
    if (response && !response?.data?.success) {
      let savedUsersData = localStorage.getItem("savedUsers");
      if (savedUsersData) {
        savedUsersData = JSON.parse(savedUsersData);
        const index = savedUsersData.findIndex((item) => item.id === data.id);
        if (index !== -1) {
          savedUsersData.splice(index, 1);
        }
        localStorage.setItem("savedUsers", JSON.stringify(savedUsersData));
        setSavedUsers(savedUsersData);
        if (savedUsersData.length > 0) {
          return changeUser(data[0]);
        }
      }
    } else {
      setuserdata(response.data.data);
      setCookie("accesstoken", data.token);
      setuser(response.data.data.id);
      // router.reload();
    }
  }
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
        savedUsers,
        setSavedUsers,
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
        skipActive,
        setskipActive,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
