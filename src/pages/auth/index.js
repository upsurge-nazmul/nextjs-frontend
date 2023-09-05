import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState, useContext } from "react";
import { MainContext } from "../../context/Main";
import LoginApis from "../../actions/apis/LoginApis";
import { setUserInLocalStorage } from "../../helpers/localStorage";
import { getfullname } from "../../helpers/generalfunctions";

import { setCookie, eraseCookie, getCookie } from "../../actions/cookieUtils";
import ReactTooltip from "react-tooltip";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import LeftPanel from "../../components/LeftPanel";
import PageTitle from "../../components/PageTitle";
import Curve1 from "../../components/SVGcomponents/Curve1";
import Curve2 from "../../components/SVGcomponents/Curve2";
import styles from "../../styles/privacy/privacy.module.scss";

function MagicAuthPage() {
  const router = useRouter();
  const { setSavedUsers, setuserdata, setuser } = useContext(MainContext);
  const [endreached, setendreached] = useState(true);
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [showpopup, setshowpopup] = useState(false);
  const [stickyheader, setstickyheader] = useState(false);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  
  

  async function handleSignin() {
    setloading(true); 
    seterror("");
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${"accesstoken"}=`);
    let token;
    if (parts.length === 2) token = parts.pop().split(";").shift();
   
    let response = await LoginApis.magicauth(
      { org_id: router.query.o, hash: router.query.q, user_id: router.query.i },
      token
    );
    if (response && response.data && response.data.success) {
      mixpanel.track("Login", { event: `${response.data.data.userProfile.user_name} logged in` });
      mixpanel.identify(`${response.data.data.userProfile.parent_email}`);
      mixpanel.people.set({
        $name: getfullname(
            response.data.data.userProfile.first_name,
            response.data.data.userProfile.last_name
          ),
        $email: response.data.data.userProfile.parent_email,
        "$user-id": response.data.data.userProfile.id,
      });
      setSavedUsers(
        setUserInLocalStorage({
          token: response.data.data.token,
          email: response.data.data.userProfile.email,
          phone: response.data.data.userProfile.phone,
          parent_email: response.data.data.userProfile.parent_email,
          parent_phone: response.data.data.userProfile.parent_phone,
          parent_first_login: response.data.data.userProfile.parent_first_login,
          username: response.data.data.userProfile.user_name,
          image: response.data.data.userProfile.user_img_url,
          name: getfullname(
            response.data.data.userProfile.first_name,
            response.data.data.userProfile.last_name
          ),
          timestamp: new Date().getTime(),
          type: response.data.data.userProfile.user_type,
          id: response.data.data.userProfile.id,
        })
      );
      setCookie("accesstoken", response.data.data.token);
      setuserdata(response.data.data.userProfile);
      setuser(response.data.data.userProfile.id);
   
      if (router.query.next) {
        router.push(router.query.next);
      } else if (response.data.data.userProfile.is_waiting_active) {
        router.push("/dashboard/w");
      } else if (response.data.data.userProfile.user_type === "parent")
        router.push("/dashboard/p");
      else router.push("/dashboard/k");
      
        setshowauth(false);

      
    } else if (getCookie("accesstoken")) {
      eraseCookie("accesstoken");
      handleSignin();
    } else {
      seterror(response?.data.message || "Cannot reach server");
      setloading(false);
    }
  }

  useEffect(() => {
    
    handleSignin();
  }, [router.isReady]);

  return (
    <div className={styles.privacyPage} onLoad={handleSignin}>
      <PageTitle />
      <Header
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        setshowauth={setshowauth}
        stickyheader={stickyheader}
        showpopup={showpopup}
        setshowpopup={setshowpopup}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <div className={styles.container}>
        <Curve1 />
        <div className={styles.content}>
          <PageTitle title="Magic Authentication" />
          {loading && <div className={styles.loader}></div>} 
          {error && <div className={styles.loader}></div>}
        </div>
        
        <Curve2 />
      </div>
      <Footer />
         
    </div>
  );
}
export default MagicAuthPage;
