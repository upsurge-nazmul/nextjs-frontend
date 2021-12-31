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
import CustomDatePicker from "../../../components/CustomDatePicker";
import { MainContext } from "../../../context/Main";
import ChangePassPopUp from "../../../components/ChangePassPopUp";

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
    data?.img_url || "https://i.ibb.co/v3vVV8r/default-avatar.png"
  );
  const [firstname, setfirstname] = useState(data?.first_name || "");
  const [lastname, setlastname] = useState(data?.last_name || "");
  const [dob, setdob] = useState(data?.dob ? new Date(Number(data.dob)) : "");
  const [gender, setgender] = useState(data?.gender || "");
  const [phone, setphone] = useState(data?.phone || "");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [showotp, setshowotp] = useState(false);
  const [showpopup, setshowpopup] = useState(false);
  const { userdata, setuserdata } = useContext(MainContext);

  useEffect(() => {
    setuserdata(data);
  }, []);
  async function saveprofile() {
    if (data && data.phone && phone === data.phone && !password) {
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
      LoginApis.genotp({ phone }).then((response) => {
        if (response && response.data && response.data.success) {
          settoastdata({
            msg: "Otp sent",
            show: true,
            type: "success",
          });
          setshowotp(!showotp);
        } else {
          settoastdata({
            msg: response?.data.message || "Error",
            show: true,
            type: "error",
          });
        }
      });
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
  async function handleSave() {
    let updated_data = {
      email: data.email,
    };
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
    }
    if (phone && phone !== data?.phone) {
      updated_data.phone = phone;
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
      settoastdata({ msg: "Saved Successfully", show: true, type: "success" });
    } else {
      settoastdata({ msg: "Error", show: true, type: "error" });
    }
  }
  const avatars = [
    "girl1",
    "girl2",
    "girl3",
    "girl4",
    "girl5",
    "girl6",
    "girl7",
    "girl8",
    "girl9",
    "girl10",
    "girl11",
    "girl12",
    "girl13",
    "boy1",
    "boy2",
    "boy3",
    "boy4",
    "boy5",
    "boy6",
    "boy7",
    "boy8",
    "boy10",
    "boy11",
    "boy12",
  ];
  return (
    <div className={styles.manageChore}>
      <DashboardLeftPanel type="waitlist" />
      <Toast data={toastdata} />
      {showotp && (
        <ChangesOtpComponent
          phone={phone}
          onBack={() => setshowotp(false)}
          settoastdata={settoastdata}
          handleSave={handleSave}
        />
      )}
      <div className={styles.contentWrapper}>
        <DashboardHeader
          mode={mode}
          setmode={setmode}
          showback={true}
          gobackto={type === "waitlist" ? "dashboard/w" : "dashboard"}
        />
        <div className={styles.mainContent}>
          <div className={styles.imagesection}>
            <img src={img} alt="" />
          </div>
          <div className={styles.details}>
            <div className={styles.row}>
              <ModernInputBox
                value={firstname}
                maxLength={10}
                setvalue={setfirstname}
                placeholder="First name"
                disabled
              />
              <ModernInputBox
                maxLength={10}
                value={lastname}
                setvalue={setlastname}
                placeholder="Last Name"
              />
            </div>
            <div className={styles.row}>
              <DropDown
                value={gender}
                options={["male", "female", "other"]}
                setvalue={setgender}
                placeholder="Gender"
              />
              <ModernInputBox
                maxLength={10}
                value={phone}
                setvalue={setphone}
                placeholder="Phone"
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
            <div className={styles.row}>
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
                  phone={phone}
                  error={error}
                  seterror={seterror}
                />
              )}

              <div className={styles.button} onClick={saveprofile}>
                Save Changes
              </div>
            </div>
          </div>
        </div>
        <div className={styles.avatars}>
          <p className={styles.heading}>Select your avatar</p>
          <div className={styles.wrapper}>
            {avatars.map((item) => {
              return (
                <img
                  onClick={() => setimg("/images/avatars/" + item + ".png")}
                  key={"avatar" + item}
                  src={"/images/avatars/" + item + ".png"}
                  alt=""
                />
              );
            })}
          </div>
        </div>
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
