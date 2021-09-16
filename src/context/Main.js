import React, { createContext, useEffect, useState } from "react";
import LoginApis from "../actions/apis/LoginApis";
import { getCookie, getTokenCookie } from "../actions/cookieUtils";

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
  useEffect(() => {
    init();
    async function init() {
      let token = getCookie("accesstoken");
      if (token) {
        setaccesstoken(token);
        let response = await LoginApis.checktoken({
          token,
        });
        if (response && response.data.success) {
          setuser(response.data.data.user_id);
          setuserdata(response.data.data);
          console.log(response.data.data);
        } else {
          console.log("error setting userdata");
        }
      }
    }
  }, []);

  return (
    <MainContext.Provider
      value={{
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
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
