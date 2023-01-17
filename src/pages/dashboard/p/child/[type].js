import React, { useEffect, useState, useContext } from "react";
import { MainContext } from "../../../../context/Main";
import DashboardApis from "../../../../actions/apis/DashboardApis";
import LoginApis from "../../../../actions/apis/LoginApis";
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
import ModernInputBox from "../../../../components/ModernInputBox";
import CitySearch from "../../../../components/CitySearch";
import { getCookie } from "../../../../actions/cookieUtils";
import { Cities_Data } from "../../../../static_data/Cities_Data";
import AvatarSelector from "../../../../components/Dashboard/AvatarSelector";
import Tour from "../../../../components/Tour/Tour";
import AddChildSuccess from "../../../../components/Dashboard/AddChildSuccess";
import PageTitle from "../../../../components/PageTitle";
import ChoreApis from "../../../../actions/apis/ChoreApis";


function AddKid({ childdata, userdatafromserver }) {

  const presetchores = [
    {
      choretitle:"Complete Origins and Barter System Course",
      msg:"Complete the origins and barter system course to unlock games and activities. You will also earn Unicoins upon completion of this task.",
      cat:"Upsurge money matters",
      value:"unicoins",
      img_url:"https://imgcdn.upsurge.in/images/Group-4946.png",
      rewardAmount:200
    },
    {
      choretitle:"Update your Avatar",
      msg:"To complete this task, buy one avatar from the store. You will then be able to update your profile picture by going to profile.",
      cat:"Upsurge money matters",
      value:"unicoins",
      img_url:"https://imgcdn.upsurge.in/images/Group-4946.png",
      rewardAmount:200
    },
    {
      choretitle:"Complete the course Introduction to Banking",
      msg:"Complete this course to unlock more games and activities. You will also earn Unicoins upon completion of this task.",
      cat:"Upsurge money matters",
      value:"unicoins",
      img_url:"https://imgcdn.upsurge.in/images/Group-4946.png",
      rewardAmount:200
    },
    {
      choretitle:"Invite your friends",
      msg:"Invite your friends to earn unicoins.",
      cat:"Upsurge money matters",
      value:"unicoins",
      img_url:"https://imgcdn.upsurge.in/images/Group-4946.png",
      rewardAmount:200
    }
  ]

  const router = useRouter();
  const { type, backTo = "/dashboard/p" } = router.query;
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const { setuserdata,userdata } = useContext(MainContext);
  
  const [mode, setmode] = useState(
    type === "add" ? "Add Child Details" : "Edit Child Details"
  );
  const [dob, setdob] = useState(
    childdata?.dob ? new Date(Number(childdata?.dob)) : ""
  );
  const [gender, setgender] = useState(childdata?.gender);
  const [email, setemail] = useState(childdata?.email || "");
  const [password, setpassword] = useState("");
  const [img, setimg] = useState(childdata?.user_img_url || "");
  const [passerror, setpasserror] = useState({
    length: false,
    special: false,
    lower: false,
    upper: false,
    number: false,
  });
  const [confirmPasserror, setConfirmPasserror] = useState({
    length: false,
    special: false,
    lower: false,
    upper: false,
    number: false,
  });
  const [error, seterror] = useState(null);
  const [showdetailpass, setshowdetailpass] = useState(false);
  const [showConfirmDetailPass, setShowConfirmDetailPass] = useState(false);
  const [passhidden, setpasshidden] = useState(true);
  const [confirmPassHidden, setConfirmPassHidden] = useState(true);
  const [firstName, setfirstName] = useState(childdata?.first_name || "");
  const [userName, setuserName] = useState(childdata?.user_name || "");
  const [lastName, setlastName] = useState(childdata?.last_name || "");
  const [city, setcity] = useState(childdata?.city || "");
  const [state, setstate] = useState(childdata?.state || "");
  const [school, setschool] = useState(childdata?.school || "");
  const [passisweak, setpassisweak] = useState(false);
  const [schoolresults, setschoolresults] = useState([]);
  const [showavatarmodal, setshowavatarmodal] = useState(false);
  const [showimgsetter, setshowimgsetter] = useState(false);
  const [confirmpassword, setconfirmpassword] = useState("");
  const boy_avatars = ["1", "2", "3", "4", "5"];
  const girl_avatars = ["6", "7", "8", "9", "10", "11", "12", "13", "14"];
  const [avatars, setavatars] = useState([...boy_avatars, ...girl_avatars]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [duedate, setduedate] = useState(new Date(new Date(new Date().setHours(new Date().getHours() + 720))).getTime());
  const fetchfamilyid = async(id) =>{
    let response = await ChoreApis.getfamilyid()
    assignChores(id,response.data.data.family_id);
  }
  const assignChores = (id , familyide) =>{
   {presetchores.map((data ,key)=>{
      return(
         ChoreApis.addchore({
          message: data.msg,
          title: data.choretitle,
          category: data.cat,
          assigned_to: userName,
          family_id: familyide,
          child_id: id,
          due_date: duedate,
          img_url: data.img_url,
          is_reoccurring:false,
          completion: "pending",
  }))})}
}
  useEffect(() => {
    if (gender === "male") {
      setavatars(boy_avatars);
    } else if (gender === "female") {
      setavatars(girl_avatars);
    } else {
      setavatars([...boy_avatars, ...girl_avatars]);
    }
  }, [gender]);
  useEffect(() => {
    seterror("");
    if (!validator.isStrongPassword(password)) setpassisweak(true);
    else setpassisweak(false);
  }, [password]);
  useEffect(() => {
    seterror("");
  }, [password, confirmpassword, firstName, lastName, gender, email, dob]);
  useEffect(() => {
    setuserdata(userdatafromserver);
  }, [userdatafromserver]);
  async function addChild() {
    if (!firstName) {
      seterror("First name is required");
      return;
    }
    if (!userName) {
      seterror("User name is required");
      return;
    }
    if (firstName.length < 2) {
      seterror("First name should be more than 1 character");
      return;
    }
    if (userName.length < 2) {
      seterror("Username should be more than 1 character");
      return;
    }
    if (!dob) {
      seterror("Please enter date of birth");
      return;
    }
    if (!gender) {
      seterror("Please select gender");
      return;
    }
    if (!city) {
      seterror("City is required");
      return;
    }
    if (!school) {
      seterror("School is required");
      return;
    }
    if (email && !validator.isEmail(email)) {
      seterror("Please enter valid email");
      return;
    }
    if (!password) {
      seterror("Password is required");
      return;
    }
    if (passisweak) {
      seterror("Weak password");
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
    if (validator.isEmail(userName)) {
      seterror("Username shouldn't be email");
      return;
    }
    let data = {
      firstName,
      lastName,
      gender,
      state,
      username: userName,
      dob: new Date(dob).getTime(),
      image: img || "https://imgcdn.upsurge.in/images/default-avatar.png",
      email: email,
      password,
      city,
      school,
    };
    let response = await DashboardApis.addkids(data);
    if (response && response.data && response.data.success) {
      // if (router.query.showTour) {
      //   router.push("/dashboard/p?storyIndex=4");
      // } else {
      //   router.push("/dashboard/p");
      // }
       await fetchfamilyid(response.data.data.id);
       mixpanel.track('Add Child',{'event':`${firstName} ${lastName} Successfully Added By ${userdata.email}`, 'user-first-name': firstName, 'user-last-name': lastName, 'parent-email': userdata.email, 'gender': gender, 'dob': dob, 'city': city, 'school': school, 'email': email, 'username': userName, 'image': img || "https://imgcdn.upsurge.in/images/default-avatar.png"});
      setShowSuccess(true);
      settoastdata({
        type: "success",
        msg: response.data.message,
        show: true,
      });
    } else {
      console.log(response.data);
      seterror(response.data.message || "error");
    }
  }
  async function updateChild() {
    if (!firstName) {
      seterror("First name is required");
      return;
    }
    if (!userName) {
      seterror("User name is required");
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
    if (userName && userName !== childdata.user_name) {
      data.user_name = userName;
    }
    if (gender && gender !== childdata.gender) {
      data.gender = gender;
    }
    if (dob && dob !== childdata.dob) {
      data.dob = dob.getTime();
    }
    if (img && img !== childdata.image) {
      data.user_img_url = img;
    }
    if (city && city !== childdata.city) {
      data.city = city;
      data.state = state;
    }
    if (password && password !== childdata.password) {
      data.password = password;
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
  function validatePassword(e, type = "normal") {
    if (type === "confirm") {
      let pass = e.target.value.trim();
      setconfirmpassword(pass);
      let res = {
        length: checkLength(pass),
        lower: checkLower(pass),
        upper: checkUpper(pass),
        special: checkSpecial(pass),
        number: checkNumber(pass),
      };
      console.log(res);
      setConfirmPasserror(res);
    } else {
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
    if (school) searchSchool();
    else setschoolresults([]);
  }, [school]);
  async function searchSchool() {
    let res = await DashboardApis.getschools(
      { query: school },
      getCookie("accesstoken")
    );
    if (res?.data.success) {
      setschoolresults(res.data.data);
    } else {
      setschoolresults([]);
    }
  }
  function afterChildAccCreated() {
    setShowSuccess(false);
    if (router.query.showTour) {
      router.push("/dashboard/p?storyIndex=4");
    } else {
      router.push("/dashboard/p");
    }
  }
  return (
    <div className={styles.manageChore}>
      <PageTitle
        title={`upsurge | ${
          type ? (type === "edit" ? "Edit" : "Add") : ""
        } Child`}
      />
      <DashboardLeftPanel disableClicks={router.query.showTour} />
      <Toast data={toastdata} />
      {showavatarmodal && (
        <AvatarSelector
          avatars={avatars}
          setshow={setshowavatarmodal}
          value={img}
          setvalue={setimg}
          dirlink={"/images/free-child-avatars/"}
        />
      )}
      {showSuccess ? (
        <AddChildSuccess
          name={firstName + " " + lastName}
          userName={userName}
          password={password}
          clickHandler={afterChildAccCreated}
        />
      ) : (
        <></>
      )}
      <div className={styles.contentWrapper}>
        <DashboardHeader
          disableClicks={router.query.showTour}
          mode={mode}
          setmode={setmode}
          showback={true}
          gobackto={backTo}
        />
        <div className={styles.mainContent}>
          <div
            className={styles.imagesection}
            onMouseEnter={() => setshowimgsetter(true)}
            onMouseLeave={() => setshowimgsetter(false)}
          >
            {showimgsetter && (
              <div
                className={styles.imagesetter}
                onClick={() => setshowavatarmodal(true)}
              >
                Choose avatar
              </div>
            )}
            <img
              src={img || "https://imgcdn.upsurge.in/images/default-avatar.png"}
              alt=""
            />
          </div>
          <div className={styles.details}>
            <div className={styles.nameWrapper}>
              <ModernInputBox
                value={firstName}
                maxLength={100}
                setvalue={setfirstName}
                textOnly={true}
                placeholder="Child's First name *"
                extraclass={styles.margin}
              />
              <ModernInputBox
                value={lastName}
                textOnly={true}
                maxLength={100}
                setvalue={setlastName}
                placeholder="Child's Last name"
              />
            </div>
            <ModernInputBox
              value={userName}
              maxLength={100}
              setvalue={setuserName}
              placeholder="Child's Username *"
              extraclass={styles.margin}
            />
            <div className={styles.commonWrapper}>
              <ModernInputBox
                type="date"
                placeholder="Child's Date of birth *"
                disabled={true}
                value={dob}
                onChange={(e) => {
                  console.log(e);
                  if (!e) {
                    return;
                  }
                  if (
                    e.getTime() >= new Date().setDate(new Date().getDate() - 1)
                  ) {
                    settoastdata({
                      msg: "Invaild date of birth",
                      show: true,
                      type: "error",
                    });
                  } else {
                    setdob(e);
                  }
                }}
                extrastyle={{
                  marginBottom: 0,
                }}
                maxDate={new Date(new Date().setDate(new Date().getDate() - 1))}
              />
              <DropDown
                placeholder="Gender *"
                options={["male", "female", "other", "Don't want to disclose"]}
                value={gender}
                setvalue={setgender}
                className={styles.gender}
              />
            </div>
            <CitySearch
              placeholder="City *"
              textOnly={true}
              options={Cities_Data}
              value={city}
              extrastyle={{ marginTop: "20px" }}
              setvalue={setcity}
              setstate={setstate}
            />
            <ModernInputBox
              value={state}
              setvalue={setstate}
              placeholder="State"
              disabled={true}
            />
            <ModernInputBox
              value={school}
              setvalue={setschool}
              onChange={(e) => setschool(e.target.value)}
              placeholder="School *"
              extrastyle={type !== "add" ? { marginBottom: 0 } : null}
              tooltipid={"school-tooltip"}
              tooltip={
                "School is required to put your child in related circles."
              }
              suggestions={schoolresults}
            />

            {type === "add" && (
              <ModernInputBox
                value={email}
                setvalue={setemail}
                placeholder="Child's Email (optional)"
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
                onFocus={() => {
                  setShowConfirmDetailPass(false);
                  setshowdetailpass(true);
                }}
                placeholder="Password *"
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

            <div
              className={`${styles.passwordBox} ${
                type !== "add" && styles.editpassbox
              }`}
            >
              {showConfirmDetailPass && (
                <div className={styles.detailPass}>
                  <div className={styles.arrow}></div>
                  <div className={styles.tab}>
                    {confirmPasserror.length ? (
                      <CircleTick />
                    ) : (
                      <CircleWarning />
                    )}
                    <p className={styles.text}>8 Characters long</p>
                  </div>
                  <div className={styles.tab}>
                    {confirmPasserror.upper ? (
                      <CircleTick />
                    ) : (
                      <CircleWarning />
                    )}
                    <p className={styles.text}>Uppercase letter</p>
                  </div>
                  <div className={styles.tab}>
                    {confirmPasserror.lower ? (
                      <CircleTick />
                    ) : (
                      <CircleWarning />
                    )}
                    <p className={styles.text}>Lowercase letter</p>
                  </div>
                  <div className={styles.tab}>
                    {confirmPasserror.special ? (
                      <CircleTick />
                    ) : (
                      <CircleWarning />
                    )}
                    <p className={styles.text}>Special Character </p>
                  </div>
                  <div className={styles.tab}>
                    {confirmPasserror.number ? (
                      <CircleTick />
                    ) : (
                      <CircleWarning />
                    )}
                    <p className={styles.text}>Number</p>
                  </div>
                </div>
              )}
              <ModernInputBox
                value={confirmpassword}
                onBlur={() => setShowConfirmDetailPass(false)}
                onChange={(e) => validatePassword(e, "confirm")}
                onFocus={() => {
                  setshowdetailpass(false);
                  setShowConfirmDetailPass(true);
                }}
                placeholder="Confirm Password *"
                secure={confirmPassHidden}
                extrastyle={{ marginBottom: "0px" }}
                extraclass={
                  confirmpassword !== "" && passisweak ? styles.weakpass : ""
                }
              />
              <p
                className={styles.show}
                onClick={() => setConfirmPassHidden(!confirmPassHidden)}
              >
                {confirmPassHidden ? "Show" : "Hide"}
              </p>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <div
              className={styles.button}
              id="add-btn"
              onClick={type === "add" ? addChild : updateChild}
            >
              {type === "add" ? "Add Child" : "Save Changes"}
            </div>
          </div>
        </div>
      </div>
      {router.query.showTour && (
        <Tour
          story={[
            {
              superimpose: true,
              ref: "#add-btn",
              content: "Click here after filling all details",
              position: "bottom",
              required: true,
              disableBg: true,
            },
          ]}
          current={0}
          showtour={false}
        />
      )}
    </div>
  );
}

export default AddKid;

export async function getServerSideProps({ params, req }) {
  let token = req.cookies.accesstoken;
  if (token) {
    let childdata = null;
    let response = await LoginApis.checktoken({
      token: token,
    });
    if (params.type !== "add") {
      childdata = await getChildData({ id: params.type }, token);
    }
    return {
      props: {
        childdata,
        userdatafromserver:
          response && response.data && response.data.data
            ? response.data.data
            : [],
      },
    };
  } else return { props: { childdata: {}, userdatafromserver: null } };
}

async function getChildData(id, token) {
  let response = await DashboardApis.getChildDetails(id, token);
  if (response && response.data && response.data.data)
    return response.data.data;
}
