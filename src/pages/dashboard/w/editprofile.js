import React, { useContext, useEffect, useState } from "react";
import DashboardApis from "../../../actions/apis/DashboardApis";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import Toast from "../../../components/Toast";
import { useRouter } from "next/dist/client/router";
import styles from "../../../styles/EditProfile/editprofile.module.scss";
import DropDown from "../../../components/DropDown";
import ChangesOtpComponent from "../../../components/ChangesOtpComponent";
import LoginApis from "../../../actions/apis/LoginApis";
import ModernInputBox from "../../../components/ModernInputBox";
import { MainContext } from "../../../context/Main";
import ChangePassPopUp from "../../../components/ChangePassPopUp";
import validator from "validator";
import ChangePhonePopUp from "../../../components/ChangePhonePopup";
import DashboardFooter from "../../../components/Dashboard/DashboardFooter";
import AvatarSelector from "../../../components/Dashboard/AvatarSelector";
export default function EditProfile({ data }) {
  const router = useRouter();
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
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
  const { userdata, setuserdata } = useContext(MainContext);
  const [showavatarmodal, setshowavatarmodal] = useState(false);
  const boy_avatars = ["3", "2", "11", "10", "1", "9", "8", "5", "4", "6", "7"];
  const girl_avatars = [
    "14",
    "24",
    "21",
    "15",
    "17",
    "22",
    "23",
    "13",
    "12",
    "20",
    "19",
    "18",
    "16",
  ];
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
    if (gender === "male") {
      setavatars(boy_avatars);
    } else if (gender === "female") {
      setavatars(girl_avatars);
    } else {
      setavatars([...boy_avatars, ...girl_avatars]);
    }
  }, [gender]);
  async function saveprofile() {
    if (
      data &&
      data.phone &&
      (!changephone || changephone === data.phone) &&
      !password
    ) {
      handleSave();
    } else {
      if (password) {
        if (password !== confirmpassword) {
          seterror("Passwords do not match");
          return;
        }
        if (!validatePassword(password)) {
          seterror(
            "Password must be of length 8 and also must contain minimum 1 number,1 symbol,1 uppercase,1 lowercase"
          );
          return;
        }
      }
      if (changephone && changephone !== confirmphone) {
        seterror("Phone does not match");
        return;
      }
      if (changephone && !validator.isMobilePhone(changephone, "en-IN")) {
        seterror("Invalid Phone");
        return;
      }
      if (changephone) {
        let checkphone = await LoginApis.checkphone({
          phone: changephone,
        });
        if (checkphone && checkphone.data && checkphone.data.success) {
          console.log("phone ok");
        } else {
          seterror(checkphone?.data.message || "Error connecting to server");
          return;
        }
      }
      LoginApis.genotp({ phone: changephone ? changephone : phone }).then(
        (response) => {
          if (response && response.data && response.data.success) {
            if (changephone) {
              setshowphoneotp(true);
            }
            if (password) {
              setshowpassotp(true);
            }
            settoastdata({
              msg: "Otp sent",
              show: true,
              type: "success",
            });
          } else {
            settoastdata({
              msg: response?.data.message || "Error",
              show: true,
              type: "error",
            });
          }
        }
      );
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
    if (password && password !== data?.password) {
      updated_data.password = password;
      updated_data.phone = phone;
    }
    if (changephone && changephone !== data?.phone) {
      updated_data.phone = changephone;
    }
    if (img && img !== data?.user_img_url) {
      updated_data.user_img_url = img;
    }
    if (
      JSON.stringify(updated_data) === JSON.stringify({ email: data.email })
    ) {
      settoastdata({ msg: "No changes were made", show: true, type: "error" });
      return;
    }
    let response = await DashboardApis.updateprofile(updated_data);
    if (response && response.data && response.data.success) {
      setshowpopup(false);
      setshowphonepopup(false);
      if (img && img !== data?.user_img_url) {
        setuserdata((prev) => ({ ...prev, user_img_url: img }));
      }
      if (changephone) {
        setphone(changephone);
        setchangephone("");
        setconfirmphone("");
      }
      settoastdata({ msg: "Saved Successfully", show: true, type: "success" });
    } else {
      seterror(response.data.message || "Cannot reach server");
      settoastdata({
        msg: response.data.message || "Error",
        show: true,
        type: "error",
      });
    }
  }

  return (
    <div className={styles.manageChore}>
      <DashboardLeftPanel type="waitlist" />
      <Toast data={toastdata} />
      <div className={styles.contentWrapper}>
        <DashboardHeader
          mode={mode}
          setmode={setmode}
          showback={true}
          gobackto={type === "waitlist" ? "dashboard/w" : "dashboard"}
        />
        <div className={styles.mainContent}>
          {showavatarmodal && (
            <AvatarSelector
              avatars={avatars}
              setshow={setshowavatarmodal}
              value={img}
              setvalue={setimg}
            />
          )}
          <div
            className={styles.imagesection}
            onMouseEnter={() => setshowimgsetter(true)}
            onMouseLeave={() => setshowimgsetter(false)}
            onClick={() => setshowavatarmodal(true)}
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
                textOnly
                disabled
              />
              <ModernInputBox
                maxLength={10}
                value={lastname || ""}
                setvalue={setlastname}
                placeholder="Last Name"
                textOnly
                disabled
              />
            </div>
            <div className={styles.row}>
              <ModernInputBox
                maxLength={10}
                value={phone}
                setvalue={setphone}
                disabled
                placeholder="Phone"
                numOnly
              />
              <DropDown
                value={gender}
                options={["male", "female", "other", "Don't want to disclose"]}
                setvalue={setgender}
                placeholder="Gender"
                margin="10px 0"
              />
              <ModernInputBox
                type="date"
                placeholder="Date of birth"
                value={dob}
                onChange={(e) => {
                  if (e.getTime() >= new Date().getTime()) {
                    settoastdata({
                      msg: "Invaild date of birth",
                      show: true,
                      type: "error",
                    });
                  } else {
                    setdob(e);
                  }
                }}
              />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.row}>
              <div
                className={styles.button}
                style={{ marginRight: "10px" }}
                onClick={saveprofile}
              >
                Save Changes
              </div>
              <p
                className={styles.changepass}
                onClick={() => setshowphonepopup(true)}
              >
                Change phone
              </p>
              {showphonepopup && (
                <ChangePhonePopUp
                  setchangephone={setchangephone}
                  changephone={changephone}
                  confirmphone={confirmphone}
                  setconfirmphone={setconfirmphone}
                  setshowpopup={setshowphonepopup}
                  handleSave={handleSave}
                  saveprofile={saveprofile}
                  settoastdata={settoastdata}
                  showphoneotp={showphoneotp}
                  setshowphoneotp={setshowphoneotp}
                  error={error}
                  seterror={seterror}
                />
              )}
              <p
                className={styles.changepass}
                onClick={() => setshowpopup(true)}
              >
                Change password
              </p>
              {showpopup && (
                <ChangePassPopUp
                  setpassword={setpassword}
                  password={password}
                  confirmpassword={confirmpassword}
                  setconfirmpassword={setconfirmpassword}
                  setshowpopup={setshowpopup}
                  handleSave={handleSave}
                  saveprofile={saveprofile}
                  settoastdata={settoastdata}
                  showpassotp={showpassotp}
                  setshowpassotp={setshowpassotp}
                  phone={phone}
                  error={error}
                  seterror={seterror}
                />
              )}
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
      return {
        props: {
          data: response.data.data,
        },
      };
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
