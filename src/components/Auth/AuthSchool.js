import React, { useContext, useEffect, useState } from "react";
import LoginApis from "../../actions/apis/LoginApis";
import { setCookie } from "../../actions/cookieUtils";
import styles from "../../styles/Auth/authschool.module.scss";
import ReactTooltip from "react-tooltip";
import validator from "validator";
import { MainContext } from "../../context/Main";
import CircleTick from "../SVGcomponents/CircleTick";
import CircleWarning from "../SVGcomponents/CircleWarning";
import { useRouter } from "next/dist/client/router";
import Spinner from "../Spinner";
import { onlyText } from "../../helpers/validationHelpers";
import ChoreApis from "../../actions/apis/ChoreApis";
import localforage from "localforage";

function AuthSchool({
  setphone,
  setpassword,
  phone,
  password,
  settoastdata,
  mode,
  setmode,
  email,
  setemail,
  signupmethod,
  usertype,
  username,
  setusername,
  seterror,
  error,
  premiumprice,
  setpremiumrice,
  setChildAge,
  childAge,
  gameOpened,
  kqOpened,
}) {
  const fetchfamilyid = async (id) => {
    let response = await ChoreApis.getfamilyid({ userId: id });
    console.log(response);
    assignChores(id, response.data.data.family_id);
  };
  const assignChores = (id, familyide) => {
    console.log("assigning Chores");
    {
      presetchores.map((data, key) => {
        return ChoreApis.addchore({
          message: data.msg,
          title: data.choretitle,
          category: data.cat,
          assigned_to: userName,
          family_id: familyide,
          child_id: id,
          due_date: duedate,
          img_url: data.img_url,
          is_reoccurring: false,
          completion: "pending",
        });
      });
    }
  };
  const {
    firstName,
    setfirstName,
    lastName,
    setlastName,
    setuserdata,
    setTimesPlayed,
  } = useContext(MainContext);
  const [passisweak, setpassisweak] = useState(false);
  const [showdetailpass, setshowdetailpass] = useState(false);
  const [passhidden, setpasshidden] = useState(true);
  const [loading, setloading] = useState(false);
  //adding coupon code input field
  const [coupon, setCoupon] = useState("");
  const [unicoins, setUnicoins] = useState(null);
  const [choseToPremium, setChoseToPremium] = useState(false);
  const school = "Venkateshwara Global School";
  const [passerror, setpasserror] = useState({
    length: false,
    special: false,
    lower: false,
    upper: false,
    number: false,
  });
  let couponInput;
  const router = useRouter();
  const { utm_source, utm_campaign, utm_medium } = router.query;

  const isValidUsername = (val) => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    return usernameRegex.test(val);
  };

  useEffect(() => {
    seterror("");
    if (!validator.isStrongPassword(password)) setpassisweak(true);
    else setpassisweak(false);
  }, [password]);

  useEffect(() => {
    seterror("");
  }, [password, username, firstName, phone, mode]);

  useEffect(() => {
    couponInput = document.getElementById("coupon");

    couponInput.addEventListener("focus", () => {
      couponInput.removeAttribute("readonly");
    });
  }, []);

  async function handleUpdateData() {
    setloading(true);

    if (!validator.isMobilePhone(phone, "en-IN")) {
      seterror("Invalid Phone");
      setloading(false);
      return;
    }
    // let checkphone = await LoginApis.checkphone({ phone });
    // if (checkphone && checkphone.data && checkphone.data.success) {
    //   console.log("phone ok");
    // } else {
    //   seterror(checkphone?.data.message || "Error connecting to server");
    //   setloading(false);
    //   return;
    // }
    if (passisweak) {
      seterror(
        "Password must be of length 8 and also must contain minimum 1 number,1 symbol,1 uppercase,1 lowercase"
      );
      setloading(false);
      return;
    }
    if (!firstName || !password) {
      seterror("FirstName is required");
      setloading(false);
      return;
    }
    let utm_params = "organic";
    if (utm_source && utm_campaign && utm_medium) {
      utm_params =
        "us:" +
        utm_source +
        "-" +
        "uc:" +
        utm_campaign +
        "-" +
        "um:" +
        utm_medium;
    } else if (utm_source && utm_campaign) {
      utm_params = "us:" + utm_source + "-" + "uc:" + utm_campaign;
    } else if (utm_source && utm_medium) {
      utm_params = "us:" + utm_source + "-" + "um:" + utm_medium;
    } else if (utm_campaign && utm_medium) {
      utm_params = "uc:" + utm_campaign + "-" + "um:" + utm_medium;
    } else if (utm_source) {
      utm_params = "us:" + utm_source;
    } else if (utm_campaign) {
      utm_params = "uc:" + utm_campaign;
    } else if (utm_medium) {
      utm_params = "um:" + utm_medium;
    }

    let response = await LoginApis.signup({
      email: email,
      signup_method: utm_params,
      user_type: usertype,
      phone,
      password,
      coupon,
      username: username,
      first_name: firstName,
      last_name: lastName,
      num_unicoins: unicoins ? unicoins : 0,
      age: childAge,
      game_opened: gameOpened ? gameOpened : null,
      knowledge_quest_opened: kqOpened ? kqOpened : null,
      school: school,
    });

    if (!response || !response.data.success) {
      setloading(false);
      seterror(response.data.message || "Error connecting to server");
    } else {
      if (signupmethod === "organic" || signupmethod) {
        let payload = {
          email: email
        };
        LoginApis.sendverificationemail(payload);
      }
      settoastdata({
        show: true,
        msg: response.data.message,
        type: "success",
      });
      // await fetchfamilyid(response.data.data.id);
      dataLayer.push({ event: "signup-successful" });
      setuserdata(response.data.data.profile);
      setCookie("accesstoken", response.data.data.token);
      localforage.removeItem("playedGame");
      router.push("dashboard/k");
      setTimesPlayed(0);
    }
  }
  async function genotp() {
    setloading(true);
    if (!validator.isEmail(email)) {
      seterror("Invalid Email");
      setloading(false);
      return;
    }
    if (!username) {
      seterror("Username is required");
      setloading(false);
      return;
    }
    if (username.length > 40) {
      seterror("Username cannot contain more than 40 characters");
      setloading(false);
      return;
    }
    if (username.length < 4) {
      seterror("Username cannot contain less than 4 characters");
      setloading(false);
      return;
    }
    if (!validator.isMobilePhone(phone, "en-IN")) {
      seterror("Invalid Phone");
      setloading(false);
      return;
    }
    // let checkphone = await LoginApis.checkphone({ phone });
    // if (checkphone && checkphone.data && checkphone.data.success) {
    //   console.log("phone ok");
    // } else {
    //   seterror(checkphone?.data.message || "Error connecting to server");
    //   setloading(false);
    //   return;
    // }
    if (!firstName) {
      seterror("First name is required");
      setloading(false);
      return;
    }
    if (!lastName) {
      seterror("Last name is required");
      setloading(false);
      return;
    }
    if (validator.isEmail(username)) {
      seterror("username shouldn't be email");
      setloading(false);
      return;
    }
    if (!isValidUsername(username)) {
      seterror("username can't contained special characters and space");
      setloading(false);
      return;
    }

    let response = await LoginApis.signup({
      email: email,
      signup_method: signupmethod,
      user_type: usertype,
      phone,
      password,
      username: username.toLowerCase(),
      coupon,
      first_name: firstName,
      last_name: lastName,
      num_unicoins: 0,
      age: childAge,
      game_opened: gameOpened ? gameOpened : null,
      knowledge_quest_opened: kqOpened ? kqOpened : null,
      school: school,
    });

    if (!response || !response.data.success) {
      seterror(response.data.message || "Error connecting to server");
    } else {
      mixpanel.add_group("user_group", "early_access");
      mixpanel.track("Sign-Up", {
        event: `SignUp of ${email} Successful`,
        "user-email": email,
        phone: phone,
      });
      mixpanel.identify(`${email}`);
      mixpanel.people.set({
        $name: firstName + " " + lastName,
        $email: email,
        $phone: phone,
      });
      setTimesPlayed(0);
      function getQueryParam(url, param) {
        // Expects a raw URL
        param = param.replace(/[[]/, "[").replace(/[]]/, "]");
        var regexS = "[?&]" + param + "=([^&#]*)",
          regex = new RegExp(regexS),
          results = regex.exec(url);
        if (
          results === null ||
          (results && typeof results[1] !== "string" && results[1].length)
        ) {
          return "";
        } else {
          return decodeURIComponent(results[1]).replace(/\W/gi, " ");
        }
      }
      function campaignParams() {
        var campaign_keywords =
            "utm_source utm_medium utm_campaign utm_content utm_term".split(
              " "
            ),
          kw = "",
          params = {},
          first_params = {};
        var index;
        for (index = 0; index < campaign_keywords.length; ++index) {
          kw = getQueryParam(document.URL, campaign_keywords[index]);
          if (kw.length) {
            params[campaign_keywords[index] + " [last touch]"] = kw;
          }
        }
        for (index = 0; index < campaign_keywords.length; ++index) {
          kw = getQueryParam(document.URL, campaign_keywords[index]);
          if (kw.length) {
            first_params[campaign_keywords[index] + " [first touch]"] = kw;
          }
        }
        mixpanel.people.set(params);
        mixpanel.people.set_once(first_params);
        mixpanel.register(params);
      }
      campaignParams();
      dataLayer.push({ event: "signup-successful" });
      if (mode === "otp") {
        settoastdata({ type: "success", msg: "OTP sent", show: true });
      }
      setCookie("accesstoken", response.data.data.token);
      if (premiumprice === null) {
        router.push("dashboard/k");
      } else if (premiumprice === undefined) {
        setmode("premiumSub");
      } else if (premiumprice !== null && premiumprice !== 0) {
        router.push(`/payments/phonepe?plan_id=${premiumprice}`);
      }
      localforage.removeItem("playedGame");
      router.push("dashboard/k");
      //await fetchfamilyid(response.data.data.profile.id);
    }
    setloading(false);
  }
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

  useEffect(() => {
    localforage.getItem("playedGame", function (err, value) {
      if (value) {
        setUnicoins(JSON.parse(value).unicoins);
      }
    });
  }, []);
  return (
    <div className={styles.parentChildAuth}>
      <h1>Sign Up</h1>
      <div
        className={styles.mainContent}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleUpdateData();
          }
        }}
      >
        <input
          className={styles.inputSchool}
          type="text"
          value={school}
          disabled
        />
        <input
          type="text"
          placeholder="Parent's email address"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />

        <div className={styles.phoneWrapper}>
          <p>+91</p>{" "}
          <input
            type="tel"
            placeholder="Your Phone"
            value={phone}
            maxLength={10}
            onChange={(e) => {
              if (!isNaN(e.target.value)) setphone(e.target.value);
            }}
          />
        </div>
        <div className={styles.nameWrapper}>
          <input
            type="text"
            placeholder="Child First Name"
            minLength={2}
            maxLength={50}
            value={firstName}
            onChange={(e) => {
              setfirstName(onlyText(e.target.value));
            }}
          />
          <input
            maxLength={50}
            minLength={2}
            type="text"
            placeholder="Child Last Name"
            value={lastName}
            onChange={(e) => {
              setlastName(onlyText(e.target.value));
            }}
          />
        </div>
        <div className={styles.usernameWrapper}>
          <input
            type="text"
            placeholder="Child Username"
            minLength={4}
            maxLength={100} //
            value={username}
            pattern="^[a-zA-Z0-9_]*$" //only letters, numbers and underscore
            onChange={(e) => setusername(e.target.value)}
          />
          <input
            className={styles.age}
            type="integer"
            placeholder="Age"
            value={childAge}
            maxLength={2}
            onChange={(e) => {
              if (!isNaN(e.target.value)) setChildAge(e.target.value);
            }}
          />
          <input
            type="hidden"
            name="coupon"
            id="coupon"
            placeholder="Coupon Code"
            value={coupon}
            pattern="^[a-zA-Z0-9_]*$" //only letters, numbers and underscore
            onChange={(e) => setCoupon(e.target.value)}
          />
        </div>
        {password !== "" && passisweak && (
          <>
            <p data-tip data-for="weak-pass" className={styles.weakpasstext}>
              Weak password
            </p>
            <ReactTooltip id="weak-pass" type="dark" effect="solid">
              <p>A strong pass is :</p>
              <p>- At least 8 characters</p>
              <p>- A mixture of letters and numbers</p>
              <p>- A mixture of both uppercase and lowercase letters</p>
              <p>- Inclusion of at least one special character</p>
            </ReactTooltip>
          </>
        )}
        <div className={styles.passwordBox}>
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
          <input
            type={passhidden ? "password" : "text"}
            onFocus={() => setshowdetailpass(true)}
            onBlur={() => setshowdetailpass(false)}
            placeholder="New Password"
            value={password}
            className={password !== "" && passisweak ? styles.weakpass : ""}
            onChange={validatePassword}
            required
          />
          <p className={styles.show} onClick={() => setpasshidden(!passhidden)}>
            {passhidden ? "Show" : "Hide"}
          </p>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        {!loading ? (
          <div
            className={`${styles.button}`}
            onClick={async () => {
              await genotp();
            }}
          >
            Sign Up
          </div>
        ) : (
          <div className={`${styles.button} ${styles.spinner_btn}`}>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthSchool;
