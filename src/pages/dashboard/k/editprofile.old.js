import React, { useContext, useEffect, useState } from "react";
import DashboardApis from "../../../actions/apis/DashboardApis";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import Toast from "../../../components/Toast";
import { useRouter } from "next/dist/client/router";
import styles from "../../../styles/EditProfile/editprofile.old.module.scss";
import DropDown from "../../../components/DropDown";
import ChangesOtpComponent from "../../../components/ChangesOtpComponent";
import LoginApis from "../../../actions/apis/LoginApis";
import KidApis from "../../../actions/apis/KidApis";
import ModernInputBox from "../../../components/ModernInputBox";
import { MainContext } from "../../../context/Main";
import ChangePassPopUp from "../../../components/ChangePassPopUp";
import validator from "validator";
import ChangePhonePopUp from "../../../components/ChangePhonePopup";
import DashboardFooter from "../../../components/Dashboard/DashboardFooter";
import { STATES, STATES_ARR } from "../../../static_data/State_Data";
import KidDashboardHeader from "../../../components/KidDashboard/KidDashboardHeader";
import AvatarSelector from "../../../components/Dashboard/AvatarSelector";
import PageTitle from "../../../components/PageTitle";
import CitySearch from "../../../components/CitySearch";
import { Cities_Data } from "../../../static_data/Cities_Data";
import { getCookie } from "../../../actions/cookieUtils";
export default function EditProfile({ data, childavatars }) {
  const router = useRouter();
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [showToolTip, setShowToolTip] = useState({
    show: false,
    msg: "",
  });
  const [error, seterror] = useState("");
  const [type, settype] = useState(
    data.is_waiting_active ? "waitlist" : router.query.type || "parent"
  );
  const [mode, setmode] = useState("Edit Profile");
  const [img, setimg] = useState(
    data?.user_img_url || "https://imgcdn.upsurge.in/images/default-avatar.png"
  );
  const [firstname, setfirstname] = useState(data?.first_name || "");
  const [username, setusername] = useState(data?.user_name || "");
  const [city, setcity] = useState(data?.city || "");
  const [state, setstate] = useState(data?.state || "");
  const [school, setschool] = useState(data?.school || "");
  const [schoolresults, setschoolresults] = useState([]);
  const [lastname, setlastname] = useState(data?.last_name || "");
  const [dob, setdob] = useState(data?.dob ? new Date(Number(data.dob)) : "");
  const [gender, setgender] = useState(data?.gender || "");
  const [phone, setphone] = useState(data?.phone || "");
  const [changephone, setchangephone] = useState("");
  const [confirmphone, setconfirmphone] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [showpassotp, setshowpassotp] = useState(false);
  const [showphoneotp, setshowphoneotp] = useState(false);
  const [showpopup, setshowpopup] = useState(false);
  const [showphonepopup, setshowphonepopup] = useState(false);
  const [showimgsetter, setshowimgsetter] = useState(false);
  const [showavatarmodal, setshowavatarmodal] = useState(false);
  const { userdata, setuserdata } = useContext(MainContext);
  const boy_avatars = ["1", "2", "3", "4", "5"];
  const girl_avatars = ["6", "7", "8", "9", "10", "11", "12", "13", "14"];
  const [avatars, setavatars] = useState([...boy_avatars, ...girl_avatars]);
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
    setuserdata(data);
  }, []);
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

  function validatePassword(pass) {
    if (!checkLength(pass)) {
      return false;
    }
    if (!checkLower(pass)) {
      return false;
    }
    if (!checkUpper(pass)) {
      return false;
    }
    if (!checkSpecial(pass)) {
      return false;
    }
    if (!checkNumber(pass)) {
      return false;
    }
    return true;
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
  async function handleSave(OTP) {
    let updated_data = {
      email: data.email,
    };
    if (OTP) {
      updated_data.otp = OTP;
    }
    if (firstname && firstname !== data?.first_name) {
      updated_data.first_name = firstname;
    }
    if (lastname && lastname !== data?.last_name) {
      updated_data.last_name = lastname;
    }
    if ((gender && gender !== data?.gender) || !data?.gender) {
      updated_data.gender = gender;
    }
    if (dob && new Date(dob) !== data?.dob) {
      updated_data.dob = new Date(dob).getTime();
    }
    if (OTP) {
      if (password) {
        updated_data.password = password;
      }
    }
    if (city && city !== data?.city) {
      updated_data.city = city;
      updated_data.state = state;
    }
    if (school && school !== data?.school) {
      updated_data.school = school;
    }
    if (state && state !== data?.state) {
      updated_data.state = state;
    }
    if (changephone && changephone !== data?.phone) {
      updated_data.phone = changephone;
    }
    if (img && img !== data?.user_img_url) {
      updated_data.user_img_url = img;
    }
    console.log(updated_data);
    if (
      JSON.stringify(updated_data) === JSON.stringify({ email: data.email })
    ) {
      setShowToolTip({
        msg: "No changes were made",
        show: true,
        type: "error",
      });
      return;
    }
    let response = await DashboardApis.updatechildprofile(updated_data);
    if (response && response.data && response.data.success) {
      console.log(response.data.data);
      setshowpopup(false);
      setshowphonepopup(false);
      if (changephone) {
        setphone(changephone);
        setchangephone("");
        setconfirmphone("");
      }
      if (img) {
        setuserdata((prev) => ({ ...prev, user_img_url: img }));
      }
      setShowToolTip({
        msg: "Saved Successfully",
        show: true,
        type: "success",
      });
    } else {
      seterror(response.data.message || "Cannot reach server");
      setShowToolTip({
        msg: response.data.message || "Error",
        show: true,
        type: "error",
      });
    }
  }

  return (
    <div className={styles.manageChore}>
      <PageTitle title={`upsurge | Profile`} />
      <DashboardLeftPanel type="kid" />
      <Toast data={toastdata} />
      {showpopup && (
        <ChangePassPopUp
          type="child"
          setpassword={setpassword}
          password={password}
          confirmpassword={confirmpassword}
          setconfirmpassword={setconfirmpassword}
          setshowpopup={setshowpopup}
          handleSave={handleSave}
          settoastdata={settoastdata}
          showpassotp={showpassotp}
          setshowpassotp={setshowpassotp}
          phone={phone}
          error={error}
          email={data.email}
          seterror={seterror}
        />
      )}
      <div className={styles.contentWrapper}>
        <DashboardHeader
          mode={mode}
          setmode={setmode}
          showback={true}
          settoastdata={settoastdata}
          gobackto={`dashboard/k`}
          setShowToolTip={setShowToolTip}
          showToolTip={showToolTip}
        />
        <div className={styles.mainContent}>
          {showavatarmodal && (
            <AvatarSelector
              avatars={avatars}
              setshow={setshowavatarmodal}
              value={img}
              dirlink={"/images/free-child-avatars/"}
              purchasedAvatars={childavatars}
              setvalue={setimg}
            />
          )}
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
            <img src={img} alt="" />
          </div>
          <div className={styles.details}>
            <div className={`${styles.row}`}>
              <ModernInputBox
                value={firstname}
                maxLength={10}
                setvalue={setfirstname}
                placeholder="First name"
                disabled
                textOnly
              />
              <ModernInputBox
                maxLength={10}
                value={lastname}
                setvalue={setlastname}
                placeholder="Last Name"
                textOnly
                disabled
              />
            </div>
            <ModernInputBox
              value={school}
              setvalue={setschool}
              onChange={(e) => setschool(e.target.value)}
              placeholder="School *"
              tooltipid={"school-tooltip"}
              tooltip={
                "School is required to put your child in related circles."
              }
              suggestions={schoolresults}
            />
            <div className={styles.row}>
              <CitySearch
                placeholder="City *"
                textOnly={true}
                options={Cities_Data}
                wrapperclassname={"editprofilecity"}
                value={city}
                setvalue={setcity}
                setstate={setstate}
              />
              <div className={styles.states}>
                <DropDown
                  value={state}
                  options={STATES_ARR}
                  setvalue={setstate}
                  placeholder="State"
                  margin="0px 100px 0 0"
                />
              </div>
            </div>
            <div className={styles.row}>
              <ModernInputBox
                type="date"
                placeholder="Date of birth"
                value={dob}
                extrastyle={{
                  marginLeft: "0rem",
                }}
                onChange={(e) => {
                  if (e.getTime() >= new Date().getTime()) {
                    setShowToolTip({
                      msg: "Invaild date of birth",
                      show: true,
                      type: "error",
                    });
                  } else {
                    setdob(e);
                  }
                }}
              />
              <div className={styles.gender}>
                <DropDown
                  value={gender}
                  options={[
                    "male",
                    "female",
                    "other",
                    "Don't want to disclose",
                  ]}
                  setvalue={setgender}
                  placeholder="Gender"
                  margin="0 0.5rem 1.2rem 0"
                  className={"gender"}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div
                className={styles.button}
                style={{ marginRight: "10px" }}
                onClick={() => handleSave()}
              >
                Save Changes
              </div>

              <p
                className={styles.changepass}
                onClick={() => setshowpopup(true)}
              >
                Change password
              </p>
            </div>
          </div>
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
}

export async function getServerSideProps({ params, req }) {
  let token = req.cookies.accesstoken;
  let msg = "";
  if (token) {
    let response = await LoginApis.checktoken({
      token: token,
    });
    if (response && !response.data.success) {
      msg = response.data.msg;
      return {
        props: { msg },
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    } else {
      let childavatars = await KidApis.getavatars(null, token);
      if (childavatars && childavatars.data && childavatars.data.success) {
        return {
          props: {
            data: response.data.data,
            childavatars: childavatars.data.data,
          },
        };
      } else {
        return {
          props: {
            data: response.data.data,
            childavatars: [],
          },
        };
      }
    }
  } else {
    return {
      props: { msg: "cannot get token" },
      redirect: {
        permanent: false,
        destination: "/?err=01",
      },
    };
  }
}
