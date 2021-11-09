import React, { createContext, useEffect, useState } from "react";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import "../firebase";

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
  const [notification, setNotification] = useState({ title: "", body: "" });
  useEffect(() => {
    let messaging = getMessaging();
    getToken(messaging);
    onMessage(messaging, (payload) => {
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      console.log(payload);
    });
  }, []);

  return (
    <MainContext.Provider
      value={{
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
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
