import React, { useEffect, useState } from "react";
import DashboardApis from "../../../../actions/apis/DashboardApis";
import DashboardHeader from "../../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../../components/Dashboard/DashboardLeftPanel";
import Toast from "../../../../components/Toast";
import { useRouter } from "next/dist/client/router";
import styles from "../../../../styles/AddKid/addkid.module.scss";
import DropDown from "../../../../components/DropDown";
import CircleTick from "../../../../components/SVGcomponents/CircleTick";
import CircleWarning from "../../../../components/SVGcomponents/CircleWarning";
import validator from "validator";
import DatePicker from "react-datepicker";
import { getMonth, getYear } from "date-fns";
import range from "lodash/range";

import CustomDatePicker from "../../../../components/CustomDatePicker";
import ModernInputBox from "../../../../components/ModernInputBox";
function AddKid({ childdata }) {
  const router = useRouter();
  console.log(childdata?.dob);
  const type = router.query.type;
  let state;
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [mode, setmode] = useState(type === "add" ? "Add Child" : "Edit Child");
  const [dob, setdob] = useState(
    childdata?.dob ? new Date(Number(childdata?.dob)) : new Date()
  );
  const [gender, setgender] = useState(childdata?.gender || "Male");
  const [email, setemail] = useState(childdata?.email || "");
  const [password, setpassword] = useState("");
  const [image, setimage] = useState("");
  const [passerror, setpasserror] = useState({
    length: false,
    special: false,
    lower: false,
    upper: false,
    number: false,
  });
  const [error, seterror] = useState(null);
  const [showdetailpass, setshowdetailpass] = useState(false);
  const [passhidden, setpasshidden] = useState(true);
  const [firstName, setfirstName] = useState(childdata?.first_name || "");
  const [lastName, setlastName] = useState(childdata?.last_name || "");
  const [city, setcity] = useState(childdata?.city || "");
  const [school, setschool] = useState(childdata?.school || "");
  const [passisweak, setpassisweak] = useState(false);
  const [confirmpassword, setconfirmpassword] = useState("");
  useEffect(() => {
    seterror("");
    if (!validator.isStrongPassword(password)) setpassisweak(true);
    else setpassisweak(false);
  }, [password]);
  useEffect(() => {
    seterror("");
  }, [password, confirmpassword, firstName, lastName, gender, email, dob]);
  async function addChild() {
    if (!firstName) {
      seterror("First name is required");
      return;
    }
    if (!dob) {
      seterror("Please enter date of birth");
      return;
    }
    if (new Date(dob).getTime() > new Date().getTime()) {
      seterror("Date cannot be set to less than current date");
      return;
    }
    if (!gender) {
      seterror("Please select gender");
      return;
    }
    if (!validator.isEmail(email)) {
      seterror("Please enter valid email");
      return;
    }
    if (passisweak) {
      seterror("Weak password");
      return;
    }
    if (!password) {
      seterror("Password is required");
      return;
    }
    if (!confirmpassword) {
      seterror("Password re-enter password");
      return;
    }
    if (password !== confirmpassword) {
      seterror("Passwords do not match.");
      return;
    }
    let data = {
      firstName,
      lastName,
      gender,
      dob: new Date(dob).getTime(),
      image:
        "https://images.unsplash.com/photo-1552873816-636e43209957?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1489&q=80",
      email: email,
      password,
      city,
      school,
    };
    let response = await DashboardApis.addkids(data);
    if (response && response.data && response.data.success) {
      router.push("/dashboard/p");
      settoastdata({
        type: "success",
        msg: response.data.message,
        show: true,
      });
    } else {
      seterror(response.data.message || "error");
    }
  }
  async function updateChild() {
    if (!firstName) {
      seterror("First name is required");
      return;
    }
    if (password && passisweak) {
      seterror("Weak password");
      return;
    }
    if (password && !confirmpassword) {
      seterror("Password re-enter password");
      return;
    }
    if (password && password !== confirmpassword) {
      seterror("Passwords do not match.");
      return;
    }
    let data = {
      id: type,
      email,
    };
    if (firstName && firstName !== childdata.first_name) {
      data.first_name = firstName;
    }
    if (lastName && lastName !== childdata.last_name) {
      data.last_name = lastName;
    }
    if (gender && gender !== childdata.gender) {
      data.gender = gender;
    }
    if (dob && dob !== childdata.dob) {
      data.dob = dob;
    }
    if (image && image !== childdata.image) {
      data.image = image;
    }
    if (password && password !== childdata.password) {
      data.password = password;
    }
    if (city && city !== childdata.city) {
      data.city = city;
    }
    if (school && school !== childdata.school) {
      data.school = school;
    }
    if (JSON.stringify(data) === JSON.stringify({ id: type, email })) {
      seterror("No changes done");
      return;
    }
    let response = await DashboardApis.editkids(data);
    if (response && response.data && response.data.success) {
      settoastdata({
        type: "success",
        msg: response.data.message,
        show: true,
      });
    } else {
      seterror(response.data.message || "error");
    }
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
    console.log(res);
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
  const years = range(1990, getYear(new Date()) + 5, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className={styles.manageChore}>
      <DashboardLeftPanel />
      <Toast data={toastdata} />
      <div className={styles.contentWrapper}>
        <DashboardHeader
          mode={mode}
          setmode={setmode}
          showback={true}
          gobackto={"dashboard"}
        />
        <div className={styles.mainContent}>
          <div className={styles.imagesection}>
            <img
              src={
                state?.image ||
                "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQTFWtjP3S55GF9SiB8xsodk5w2QO5MichphEj4JcYRpo-Eewh5WdqGZH6G1OtIgoB-PmyPDWcx-9ieyysbz5g"
              }
              alt=""
            />
          </div>
          <div className={styles.details}>
            <div className={styles.nameWrapper}>
              <ModernInputBox
                value={firstName}
                maxLength={10}
                setvalue={setfirstName}
                placeholder="First name"
                extraclass={styles.margin}
              />
              <ModernInputBox
                value={lastName}
                maxLength={10}
                setvalue={setlastName}
                placeholder="Last name"
              />
            </div>
            <ModernInputBox
              value={dob}
              setvalue={setdob}
              type="date"
              placeholder="Date of birth"
            />

            <DropDown
              placeholder="Gender"
              options={["male", "female", "i prefer not to say"]}
              value={gender}
              setvalue={setgender}
            />
            <ModernInputBox
              value={city}
              setvalue={setcity}
              placeholder="City"
              extrastyle={{ marginTop: "20px" }}
            />
            <ModernInputBox
              value={school}
              setvalue={setschool}
              placeholder="School"
              extrastyle={type !== "add" ? { marginBottom: 0 } : null}
            />

            {type === "add" && (
              <ModernInputBox
                value={email}
                setvalue={setemail}
                placeholder="Email"
              />
            )}
            <div
              className={`${styles.passwordBox} ${
                type !== "add" && styles.editpassbox
              }`}
            >
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
              <ModernInputBox
                value={password}
                onBlur={() => setshowdetailpass(false)}
                onChange={(e) => validatePassword(e)}
                onFocus={() => setshowdetailpass(true)}
                placeholder="Password"
                secure={passhidden}
                extrastyle={{ marginBottom: "0px" }}
                extraclass={
                  password !== "" && passisweak ? styles.weakpass : ""
                }
              />
              <p
                className={styles.show}
                onClick={() => setpasshidden(!passhidden)}
              >
                {passhidden ? "Show" : "Hide"}
              </p>
            </div>

            <ModernInputBox
              value={confirmpassword}
              setvalue={setconfirmpassword}
              placeholder="Confirm Password"
            />
            {error && <p className={styles.error}>{error}</p>}

            <div
              className={styles.button}
              onClick={type === "add" ? addChild : updateChild}
            >
              {type === "add" ? "Add Child" : "Save Changes"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddKid;

export async function getServerSideProps({ params, req }) {
  let token = req.cookies.accesstoken;
  if (token && params.type !== "add") {
    let childdata = await getChildData({ id: params.type }, token);
    return { props: { childdata } };
  } else return { props: { childdata: {} } };
}

async function getChildData(id, token) {
  let response = await DashboardApis.getChildDetails(id, token);
  if (response && response.data && response.data.data)
    return response.data.data;
}
