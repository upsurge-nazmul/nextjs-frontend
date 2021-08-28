import React, { useEffect, useState } from "react";
import DashboardApis from "../../actions/apis/DashboardApis";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../components/Dashboard/DashboardLeftPanel";
import Toast from "../../components/Toast";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/AddKid/addkid.module.scss";
import DropDown from "../../components/DropDown";

function AddKid({ type }) {
  const router = useRouter();

  let state;
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [mode, setmode] = useState("Add Kid");
  const [name, setname] = useState("");
  const [dob, setdob] = useState("");
  const [gender, setgender] = useState("male");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  async function addChild() {
    let data = {
      fullname: name,
      gender,
      dob: new Date(dob).getTime(),
      image:
        "https://images.unsplash.com/photo-1552873816-636e43209957?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1489&q=80",
      email: username,
      password,
    };
    let response = await DashboardApis.addkids(data);
    if (response && response.data && response.data.success) {
      router.push("/dashboard");
    } else {
      console.log(response.data);
    }
  }
  function getreadabledate(date) {
    let fdate = new Date(Number(date));
    let month = fdate.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let day = fdate.getDate();
    day = day < 10 ? "0" + day : day;

    return fdate.getFullYear() + "-" + month + "-" + day;
  }
  async function handleSave() {
    if (state.isineditmode) {
      let response = await DashboardApis.editchore({
        id: state.data.id,
        message: msg,
        title: choretitle,
        category: state?.data.category,
        assigned_to: "tushar",
        child_id: "test1234",
        due_date: duedate ? new Date(duedate).getTime() : "",
        completion: "pending",
      });
      if (response && response.data && response.data.success) {
        settoastdata({
          show: true,
          message: response.data.message,
          type: "success",
        });
        router.push("/chores");
      } else {
        settoastdata({
          show: true,
          message: response.data.message,
          type: "error",
        });
      }
    } else {
      let response = await DashboardApis.addchore({
        message: msg,
        title: choretitle,
        category: state?.category || state?.category,
        assigned_to: "tushar",
        child_id: "test1234",
        due_date: duedate ? new Date(duedate).getTime() : "",
        completion: "pending",
      });
      if (response && response.data && response.data.success) {
        settoastdata({
          show: true,
          message: response.data.message,
          type: "success",
        });
        router.push("/chores");
      } else {
        settoastdata({
          show: true,
          message: response.data.message,
          type: "error",
        });
      }
    }
  }
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
            <input
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder="Full Name"
            />
            <input
              type="date"
              value={dob}
              onChange={(e) => {
                setdob(e.target.value);
              }}
              placeholder="dob"
            />
            <DropDown
              placeholder="Gender"
              options={["male", "female", "other"]}
              value={gender}
              setvalue={setgender}
            />
            <input
              className={styles.usernameinput}
              type="text"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              placeholder="Email"
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
            <div className={styles.button} onClick={addChild}>
              Add Child
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddKid;
