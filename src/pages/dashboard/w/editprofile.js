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

export default function EditProfile({ data }) {
  const router = useRouter();
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [type, settype] = useState(
    data.is_waiting_active ? "waitlist" : router.query.type || "parent"
  );
  const [mode, setmode] = useState("Edit Profile");
  const [firstname, setfirstname] = useState(data?.first_name || "");
  const [lastname, setlastname] = useState(data?.last_name || "");
  const [dob, setdob] = useState(data?.dob ? new Date(Number(data.dob)) : "");
  const [gender, setgender] = useState(data?.gender || "male");
  const [phone, setphone] = useState(data?.phone || "");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [showotp, setshowotp] = useState(false);
  const [otpverified, setotpverified] = useState(false);
  const { userdata, setuserdata } = useContext(MainContext);

  useEffect(() => {
    setuserdata(data);
  }, []);
  async function saveprofile() {
    if (
      (data && data.phone && phone === data.phone) ||
      (type === "waitlist" && !phone)
    ) {
      handleSave();
    } else {
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
    if (dob && new Date(dob).getTime() !== data?.dob) {
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
      settoastdata({ msg: "Saved Successfully", show: true, type: "success" });
    } else {
      settoastdata({ msg: "Error", show: true, type: "error" });
    }
  }
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
            <img
              src={
                data?.img_url || "https://i.ibb.co/v3vVV8r/default-avatar.png"
              }
              alt=""
            />
          </div>
          <div className={styles.details}>
            <ModernInputBox
              value={firstname}
              maxLength={10}
              setvalue={setfirstname}
              placeholder="First name"
            />
            <ModernInputBox
              maxLength={10}
              value={lastname}
              setvalue={setlastname}
              placeholder="Last Name"
            />

            {/* <input
              type="date"
              value={
                dob
                  ? new Date(parseInt(dob))?.toISOString().substr(0, 10) || ""
                  : ""
              }
              onChange={(e) => {
                if (
                  new Date(e.target.value).getDate() >= new Date().getDate()
                ) {
                  settoastdata({
                    msg: "Invaild date of birth",
                    show: true,
                    type: "error",
                  });
                } else {
                  setdob(new Date(e.target.value).getTime());
                }
              }}
              min="1997-01-01"
              max="2030-12-31"
              placeholder="dd-mm-yyyy"
            /> */}
            <DropDown
              value={gender}
              options={["male", "female", "other"]}
              setvalue={setgender}
              placeholder="Gender"
            />
            <ModernInputBox
              maxLength={10}
              value={phone}
              extrastyle={{ marginTop: "20px" }}
              setvalue={setphone}
              placeholder="Phone"
            />
            <ModernInputBox
              type="date"
              placeholder="Date of birth"
              value={dob}
              setvalue={setdob}
            />
            <ModernInputBox
              value={password}
              setvalue={setpassword}
              placeholder="Password"
              secure={true}
            />

            <ModernInputBox
              value={confirmpassword}
              setvalue={setconfirmpassword}
              placeholder="Confirm Password"
            />
            <div className={styles.button} onClick={saveprofile}>
              Save Changes
            </div>
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
