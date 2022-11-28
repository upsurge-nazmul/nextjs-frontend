import React,{useState,useEffect} from 'react';
import validator from "validator";
import PageTitle from "../../../../components/PageTitle";
import DashboardLeftPanel from "../../../../components/Dashboard/DashboardLeftPanel";
import KidDashboardHeader from "../../../../components/KidDashboard/KidDashboardHeader";
import styles from "../../../../styles/WaitlistDashboard/parentlogin.module.scss";
import AuthAddParent from '../../../../components/Auth/AuthAddParent';
import AuthLogin from '../../../../components/Auth/AuthLogin';

function ParentLogin({
  //column to check if parent have an id
}) {
  const [mode, setmode] = useState("Parent Login");
  const [signUpStatus, setSignUpStatus] = useState(true);
  const [error, seterror] = useState("");
  useEffect(()=>{
//if(true){
//return null;
//}
//elseif(false){setSignUpStatus(false) setmode("Parent SignUp")}
//}
  },[])
  return (
    <div className={styles.parentlogin}>
    <PageTitle title={`upsurge | ${mode}`} />
    <DashboardLeftPanel type="kid" />
    <div className={styles.content}>
    <KidDashboardHeader mode={mode} setmode={setmode} />
    {signUpStatus ?
    (
      
      <AuthLogin seterror={seterror} />
      )
      :
      (
        <AuthAddParent />
    )}
    {error && (<>${error}</>)}
    </div>
    </div>
    )
}

export default ParentLogin