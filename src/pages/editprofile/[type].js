import React, { useEffect, useState } from "react";
import DashboardApis from "../../actions/apis/DashboardApis";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../components/Dashboard/DashboardLeftPanel";
import Toast from "../../components/Toast";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/EditProfile/editprofile.module.scss";
import DropDown from "../../components/DropDown";
import ChangesOtpComponent from "../../components/ChangesOtpComponent";
import LoginApis from "../../actions/apis/LoginApis";

export default function EditProfile({ data }) {
  console.log(data);
  const router = useRouter();
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [userdata, setuserdata] = useState(null);
  const [type, settype] = useState(
    data.is_waiting_active ? "waitlist" : router.query.type || "parent"
  );
  const [mode, setmode] = useState("Edit Profile");
  const [firstname, setfirstname] = useState(data?.first_name || "");
  const [lastname, setlastname] = useState(data?.last_name || "");
  const [dob, setdob] = useState(data?.dob || "");
  const [gender, setgender] = useState(data?.gender || "male");
  const [phone, setphone] = useState(data?.phone || "");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [showotp, setshowotp] = useState(false);
  const [otpverified, setotpverified] = useState(false);
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
    if (dob && dob !== data?.dob) {
      updated_data.dob = dob;
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
      <DashboardLeftPanel />
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
                userdata?.image ||
                "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQTFWtjP3S55GF9SiB8xsodk5w2QO5MichphEj4JcYRpo-Eewh5WdqGZH6G1OtIgoB-PmyPDWcx-9ieyysbz5g"
              }
              alt=""
            />
          </div>
          <div className={styles.details}>
            <input
              type="text"
              value={firstname}
              maxLength={10}
              onChange={(e) => setfirstname(e.target.value)}
              placeholder="First Name"
            />
            <input
              type="text"
              maxLength={10}
              value={lastname}
              onChange={(e) => setlastname(e.target.value)}
              placeholder="Last Name"
            />
            <input
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
            />
            <DropDown
              value={gender}
              options={["male", "female", "other"]}
              setvalue={setgender}
            />
            <input
              className={styles.usernameinput}
              type="text"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
              placeholder="Phone"
            />
            <input
              type="text"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Password"
            />
            <input
              type="text"
              value={confirmpassword}
              onChange={(e) => setconfirmpassword(e.target.value)}
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
  if (token) {
    let response = await DashboardApis.getuserdata(null, token);
    if (response && response.data.success) {
      return { props: { data: response.data.data } };
    } else {
      return { props: { data: null } };
    }
  } else {
    return { props: { data: null } };
  }
}
