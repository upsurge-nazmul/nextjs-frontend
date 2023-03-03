import React,{useState, useEffect} from "react";
import LoginApis from "../../actions/apis/LoginApis";
import Header from "../../components/Header/Header";
import ModernInputBox from "../../components/ModernInputBox";
import styles from "../../styles/resetpassword/resetpassword.module.scss";
import validator from "validator";
import CircleTick from "../../components/SVGcomponents/CircleTick";
import CircleWarning from "../../components/SVGcomponents/CircleWarning";
import { Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import { useRouter } from "next/router";
import BallsSvg from "../../components/SVGcomponents/BallsSvg";
import Footer from "../../components/Home/Footer";
export default function ResetPassword({ resetPassEmailVerified, msg, email,token }) {
    const router = useRouter();
    const [openLeftPanel,setOpenLeftPanel] = useState(false);
    const [showauth, setshowauth] = useState(false);
    const [password, setpassword] = useState("");
    const [confirmPassword, setconfirmpassword] = useState("");
    const [passhidden, setpasshidden] = useState(true);
    const [confirmpasshidden, setconfirmpasshidden] = useState(true);
    const [passisweak, setpassisweak] = useState(false);
    const [showdetailpass, setshowdetailpass] = useState(false);
    const [success,setSuccess] = useState(false);
    const [error, seterror] = useState("");
    const [passerror, setpasserror] = useState("");
    useEffect(() => {
        seterror("");
        if(password === "")
        {
            setshowdetailpass(false);
        }
        if (!validator.isStrongPassword(password)) setpassisweak(true);
        else setpassisweak(false);
      }, [password]);
      function validatePassword(e) {
        let pass = e.target.value.trim();
        setpassword(pass);
        let res = {
          length: checkLength(pass),
          lower: checkLower(pass),
          upper: checkUpper(pass),
          special: checkSpecial(pass),
          number: checkNumber(pass),
        };
        setshowdetailpass(true);
        setpasserror(res);

      }
      function checkLength(pass) {
        return pass.length >= 8;
      }
      function checkLower(pass) {
        return !(pass.search(/[a-z]/) < 0);
      }
      function checkUpper(pass) {
        // password.search(/.*[A-Z].*/) > 0)
        return !(pass.search(/[A-Z]/) < 0);
      }
      function checkNumber(pass) {
        return !(pass.search(/[0-9]/) < 0);
      }
      function checkSpecial(pass) {
        return !(pass.search(/[!@#$%^&*]/) < 0);
      }
 async function matchPassword(){
    if(password === confirmPassword){
       const result = await LoginApis.changepassword({email,password,token});
      if(result){
        if(result.data.success){
          setSuccess(true);
        }
        else{
          resetPassEmailVerified = false;
        }
      }
      }
    else{
        seterror("Passwords do not match");
    }
  }
  return (
    <div className={styles.mainPage}>
      <Header
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        setshowauth={setshowauth}
      />
      <div className={styles.curve}>
         <svg
      viewBox="0 0 365 190"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M254.744 152.744C298.087 111.729 299.974 43.343 258.959 -0.000106646L102 148.529C143.015 191.872 211.401 193.759 254.744 152.744Z"
        fill="#17D1BC"
        />
      </svg>
        </div>
      <div className={styles.circle}>
         <svg
      viewBox="0 0 365 190"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
              <circle cx="20.5" cy="162.5" r="20.5" fill="#FF6263" />
      </svg>
        </div>
      <div className={styles.circle2}>
         <svg
      viewBox="0 0 365 190"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="308.5" cy="73.5" r="20.5" fill="#FDCC03" />
      </svg>
        </div>
      <div className={styles.circle3}>
         <svg
      viewBox="0 0 365 190"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
              <circle cx="308.5" cy="73.5" r="20.5" fill="#FFF" />
      </svg>
        </div>
      {!success ?
        (<div className={styles.wrapper}>
        {resetPassEmailVerified ? (
          <>
            <p className={styles.heading}>
                Reset password
            </p>
            <div className={styles.resetpasswordContainer}>
                <div className={styles.resetpass}>
                <input 
             placeholder="Password"
             value={password}
             setvalue={setpassword}
             type={passhidden ? "password" : "text"}
             onChange={validatePassword}
             />
                <div className={styles.show} onClick={()=>{setpasshidden(!passhidden)}}>
                Show
                </div>
                {showdetailpass && (
                <div className={styles.detailPass}>
              <div className={styles.arrow}></div>
              <div className={styles.tab}>
                {passerror.length ? <CircleTick /> : <CircleWarning />}
                <p className={styles.text}>8 Characters long</p>
              </div>
              <div className={styles.tab}>
                {passerror.upper ? <CircleTick /> : <CircleWarning />}
                <p className={styles.text}>Uppercase letter</p>
              </div>
              <div className={styles.tab}>
                {passerror.lower ? <CircleTick /> : <CircleWarning />}
                <p className={styles.text}>Lowercase letter</p>
              </div>
              <div className={styles.tab}>
                {passerror.special ? <CircleTick /> : <CircleWarning />}
                <p className={styles.text}>Special Character </p>
              </div>
              <div className={styles.tab}>
                {passerror.number ? <CircleTick /> : <CircleWarning />}
                <p className={styles.text}>Number</p>
              </div>
            </div>
          )}
                </div>
             <div className={styles.resetpass}>
                <input 
             placeholder="Confirm Password"
             value={confirmPassword}
             type={confirmpasshidden ? "password" : "text"}
             onChange={(e)=>setconfirmpassword(e.target.value)}
             />
             <div className={styles.show} onClick={()=>{setconfirmpasshidden(!confirmpasshidden)}}>
                Show
             </div>
             </div>
             </div>
             <div className={styles.resetContainer}>
             <div className={styles.resetPassword} onClick={()=>{matchPassword()}}>
                Reset
             {error && <p className={styles.error}>{error}</p>}
             </div>
             </div>
             <div className={styles.uptoDate}>
            To stay up to date all the time, Follow us on.
            <div className={styles.brandtext}>
          <div className={styles.socials}>
            <a
              onClick={() => {
                mixpanel.track("Social", { event: `Visited Facebook` });
              }}
              href="https://www.facebook.com/upsurgeindia/"
              target="_blank"
              rel="noreferrer"
            >
              <Facebook className={styles.social} />
            </a>
            <a
              onClick={() => {
                mixpanel.track("Social", { event: `Visited Instagram` });
              }}
              href="https://www.instagram.com/upsurge.in/"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram className={styles.social} />
            </a>
            <a
              onClick={() => {
                  mixpanel.track("Social", { event: `Visited Linkedin` });
                }}
              href="https://www.linkedin.com/company/upsurgeindia/"
              target="_blank"
              rel="noreferrer"
              >
              <LinkedIn className={styles.social} />
            </a>
                </div>
        </div>
        </div>
        </>
        ) : (
          <>
            <img
              className={styles.image}
              src="https://imgcdn.upsurge.in/images/images.png"
              alt=""
            />
            <p style={{fontSize:"3rem",zIndex:2}} className={styles.heading}>{msg}</p>
            <p className={styles.subheading}>
              You can close this tab and try to resend the reset password email.
            </p>
          </>
        )}
        </div>
        ):
            (
            <div className={styles.wrapper}>
             <p className={styles.heading}>
                Thank You!
            </p>
            <p className={styles.subheading}>
                Your login credentials have been updated, please login.
            </p>
            <div className={styles.uptoDate}>
            To stay up to date all the time, Follow us on.
            <div className={styles.brandtext}>
          <div className={styles.socials}>
            <a
              onClick={() => {
                mixpanel.track("Social", { event: `Visited Facebook` });
              }}
              href="https://www.facebook.com/upsurgeindia/"
              target="_blank"
              rel="noreferrer"
            >
              <Facebook className={styles.social} />
            </a>
            <a
              onClick={() => {
                mixpanel.track("Social", { event: `Visited Instagram` });
              }}
              href="https://www.instagram.com/upsurge.in/"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram className={styles.social} />
            </a>
            <a
              onClick={() => {
                  mixpanel.track("Social", { event: `Visited Linkedin` });
                }}
              href="https://www.linkedin.com/company/upsurgeindia/"
              target="_blank"
              rel="noreferrer"
              >
              <LinkedIn className={styles.social} />
            </a>
                </div>
        </div>
        </div>
        <div className={styles.resetPassword} onClick={()=>{router.push("/")}}>
                Go Back
        </div>
            </div>
            
        )
        }
       <Footer />
      </div>
  );
}

 export async function getServerSideProps({ params, req }) {
   let response = await LoginApis.verifyresetpasstoken({
    token: params.token,
   });
   if (response && response.data && response.data.success) {
    console.log(response.data.data); 
    return {
       props: {
        resetPassEmailVerified: true,
         msg: response.data.message,
         email: response.data.data,
         token: params.token,
       },
     };
   } else
     return {
       props: {
        resetPassEmailVerified: false,
         msg: response?.data?.message || "Cannot reach server",
         email: "",
       },
     };
 }
