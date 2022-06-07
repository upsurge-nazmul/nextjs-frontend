import React, { useEffect, useState } from "react";
import {
  onlyText,
  removenonnumber,
  vaildateEmail,
  vaildatePhone,
} from "../../helpers/validationHelpers";
import { getAge } from "../../helpers/timehelpers";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ModernInputBox from "../ModernInputBox";
import styles from "../../styles/ubl/ublform.module.scss";
import TickSvg from "../SVGcomponents/TickSvg";
import SummerCampApis from "../../actions/apis/SummerCampApis";
import Spinner from "../Spinner";
import UblCampApis from "../../actions/apis/UblCampApis";
import OTPCustomComponent from "../OTPCustomComponent";
export default function UblForm({
  done,
  setdone,
  settoastdata,
  setshowform,
  setshowterm,
  showterm,
}) {
  const [loading, setloading] = useState(false);
  const [termsAccepted, settermsAccepted] = useState(false);
  const [showotp, setshowotp] = useState(false);
  const [error, seterror] = useState("");
  const [OTP, setOTP] = useState("");
  const [resetotp, setresetotp] = useState(0);
  const [membersTOShow, setMembersToShow] = useState(3);
  const [formdata, setformdata] = useState({
    team_name: "",
    school: "",
    logo_url: "",
    primary_email: "",
    primary_phone: "",
    member_1: {
      name: "",
      dob: "",
      school_id: "",
      phone: "",
      email: "",
    },
    member_2: {
      name: "",
      dob: "",
      school_id: "",
      phone: "",
      email: "",
    },
    member_3: {
      name: "",
      dob: "",
      school_id: "",
      phone: "",
      email: "",
    },
  });

  useEffect(() => {
    seterror("");
  }, [formdata]);
  async function register() {
    setloading(true);
    setOTP("");
    if (!termsAccepted) {
      setloading(false);
      seterror("Please accept terms before submitting data.");
      return settoastdata({
        show: true,
        type: "error",
        msg: "Please accept terms before submitting data.",
      });
    }
    if (!formdata.team_name) {
      setloading(false);
      seterror("Team name is required");
      return settoastdata({
        show: true,
        type: "error",
        msg: "Team name is required",
      });
    }
    if (!formdata.primary_email) {
      setloading(false);
      seterror("Primary email is required");

      return settoastdata({
        show: true,
        type: "error",
        msg: "Primary email is required",
      });
    }
    if (!vaildateEmail(formdata.primary_email)) {
      setloading(false);
      seterror("Enter valid primary email");

      return settoastdata({
        show: true,
        type: "error",
        msg: "Enter valid primary email",
      });
    }
    if (!formdata.primary_phone) {
      setloading(false);
      seterror("Primary phone is required");

      return settoastdata({
        show: true,
        type: "error",
        msg: "Primary phone is required",
      });
    }
    if (!vaildatePhone(formdata.primary_phone)) {
      setloading(false);
      seterror("Enter valid primary phone number");

      return settoastdata({
        show: true,
        type: "error",
        msg: "Enter valid primary phone number",
      });
    }
    if (!formdata.school) {
      setloading(false);
      seterror("School name is required");

      return settoastdata({
        show: true,
        type: "error",
        msg: "School name is required",
      });
    }
    if (!formdata.logo_url) {
      setloading(false);
      seterror("Please select one team logo");

      return settoastdata({
        show: true,
        type: "error",
        msg: "Please select one team logo",
      });
    }
    let emails = [formdata.primary_email];
    for (let i = 1; i <= membersTOShow; i++) {
      const element = formdata[`member_${i}`];

      if (!element.name) {
        setloading(false);
        seterror("Name is required for member " + i);

        return settoastdata({
          show: true,
          type: "error",
          msg: "Name is required for member " + i,
        });
      }

      if ((element.dob.match(/\//g) || []).length !== 2) {
        setloading(false);
        seterror("Invalid Dob set for member " + i);

        return settoastdata({
          show: true,
          type: "error",
          msg: "Invalid Dob set for member " + i,
        });
      }
      if (
        element.dob.split("/")[0].length !== 2 ||
        element.dob.split("/")[1].length !== 2 ||
        element.dob.split("/")[2].length !== 4
      ) {
        setloading(false);
        seterror("Invalid Dob set for member " + i);

        return settoastdata({
          show: true,
          type: "error",
          msg: "Invalid Dob set for member " + i,
        });
      }
      if (element.dob.split("/")[0] > 31) {
        setloading(false);
        seterror("Invalid Dob set for member " + i);

        return settoastdata({
          show: true,
          type: "error",
          msg: "Invalid Dob set for member " + i,
        });
      }
      if (element.dob.split("/")[1] > 12) {
        setloading(false);
        seterror("Invalid Dob set for member " + i);

        return settoastdata({
          show: true,
          type: "error",
          msg: "Invalid Dob set for member " + i,
        });
      }
      if (element.dob.split("/")[2] > 2022) {
        setloading(false);
        seterror("Invalid Dob set for member " + i);

        return settoastdata({
          show: true,
          type: "error",
          msg: "Invalid Dob set for member " + i,
        });
      }
      if (element.dob.split("/")[2] == new Date().getFullYear()) {
        if (element.dob.split("/")[1] > new Date().getMonth() + 1) {
          console.log(element.dob.split("/")[2]);
          seterror("Invalid Dob set for member " + i);
          setloading(false);
          return settoastdata({
            show: true,
            type: "error",
            msg: "Invalid Dob set for member " + i,
          });
        }

        if (Number(element.dob.split("/")[1]) == new Date().getMonth() + 1) {
          if (element.dob.split("/")[0] > new Date().getDate()) {
            seterror("Invalid Dob set for member " + i);
            setloading(false);
            return settoastdata({
              show: true,
              type: "error",
              msg: "Invalid Dob set for member " + i,
            });
          }
        }
      }
      if (getAge(element.dob) < 12) {
        seterror("Age of member " + i + " is less than 12");
        setloading(false);
        return settoastdata({
          show: true,
          type: "error",
          msg: "Age of member " + i + " is less than 12",
        });
      }
      if (getAge(element.dob) > 18) {
        seterror("Age of member " + i + " is more than 18");
        setloading(false);
        return settoastdata({
          show: true,
          type: "error",
          msg: "Age of member " + i + " is more than 12",
        });
      }
      if (!vaildatePhone(element.phone)) {
        seterror("Enter valid phone number of member " + i);
        setloading(false);
        return settoastdata({
          show: true,
          type: "error",
          msg: "Enter valid phone number of member " + i,
        });
      }
      if (!element.dob) {
        seterror("DOB is required for member " + i);
        setloading(false);
        return settoastdata({
          show: true,
          type: "error",
          msg: "DOB is required for member " + i,
        });
      }
      if (!element.school_id) {
        setloading(false);
        seterror("School id/ admission number is required for member " + i);
        return settoastdata({
          show: true,
          type: "error",
          msg: "School id/ admission number is required for member " + i,
        });
      }
      if (!element.email) {
        setloading(false);
        seterror("Email is required for member " + i);

        return settoastdata({
          show: true,
          type: "error",
          msg: "Email is required for member " + i,
        });
      }
      if (!vaildateEmail(element.email)) {
        setloading(false);
        seterror("Enter valid email of member " + i);

        return settoastdata({
          show: true,
          type: "error",
          msg: "Enter valid email of member " + i,
        });
      }
      if (!emails.includes(element.email)) {
        emails.push(element.email);
      } else {
        if (i > 1) {
          setloading(false);
          seterror("Email should be unique for member " + i);
          return settoastdata({
            show: true,
            type: "error",
            msg: "Email should be unique for member " + i,
          });
        }
      }
    }
    let res = await UblCampApis.createotp({
      phone: formdata.primary_phone,
      email: formdata.primary_email,
    });
    if (res?.data?.success) {
      seterror("");
      settoastdata({
        show: true,
        type: "success",
        msg: res?.data?.message || "Error connecting to server",
      });
      setshowotp(true);
    } else {
      seterror(res?.data?.message || "Error connecting to server");
      settoastdata({
        show: true,
        type: "error",
        msg: res?.data?.message || "Error connecting to server",
      });
    }
    setloading(false);
  }
  async function afterOtp() {
    let res = await UblCampApis.register({ data: formdata, otp: OTP });
    if (res?.data?.success) {
      seterror("");
      settoastdata({
        show: true,
        type: "success",
        msg: res?.data?.message || "Error connecting to server",
      });
      setdone(true);
    } else {
      seterror(res?.data?.message || "Error connecting to server");
      settoastdata({
        show: true,
        type: "error",
        msg: res?.data?.message || "Error connecting to server",
      });
    }
  }
  const logos = [
    "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/ublavatars/tiger.png",
    "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/ublavatars/laughing.png",
    "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/ublavatars/demon.png",
    "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/ublavatars/happy.png",
    "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/ublavatars/sloth.png",
    "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/ublavatars/cool(1).png",
    "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/ublavatars/cool.png",
    "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/ublavatars/deer.png",
  ];
  useEffect(() => {
    const scrollContainer = document.querySelector("#logowrapper");
    if (!scrollContainer) return;

    scrollContainer.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer.scrollLeft += evt.deltaY * 5;
    });
  }, []);
  return (
    <div className={`${styles.formmain} ${showterm && styles.goBack}`}>
      <div className={styles.bg}></div>
      {!done ? (
        <div className={styles.signup} id="signup">
          {!showterm && (
            <div className={styles.cross} onClick={() => setshowform(false)}>
              <CancelOutlinedIcon className={styles.icon} />
            </div>
          )}
          <p className={styles.heading} style={{ userSelect: "none" }}>
            Register
          </p>
          {!showotp ? (
            <div className={styles.form}>
              <ModernInputBox
                value={formdata.team_name}
                extraclass={formdata.team_name && styles.input}
                placeholderClass={formdata.team_name && styles.placehholder}
                placeholder={"Team Name"}
                onChange={(e) =>
                  setformdata((prev) => ({
                    ...prev,
                    team_name: onlyText(e.target.value, true),
                  }))
                }
              />
              <ModernInputBox
                value={formdata.primary_email}
                extraclass={formdata.primary_email && styles.input}
                placeholderClass={formdata.primary_email && styles.placehholder}
                placeholder={"Primary email"}
                onChange={(e) =>
                  setformdata((prev) => ({
                    ...prev,
                    primary_email: e.target.value.trim(),
                  }))
                }
              />
              <ModernInputBox
                value={formdata.primary_phone}
                extraclass={formdata.primary_phone && styles.input}
                placeholderClass={formdata.primary_phone && styles.placehholder}
                placeholder={"Primary phone"}
                maxLength={10}
                onChange={(e) =>
                  setformdata((prev) => ({
                    ...prev,
                    primary_phone: removenonnumber(e.target.value),
                  }))
                }
              />
              <ModernInputBox
                value={formdata.school}
                extraclass={formdata.school && styles.input}
                placeholderClass={formdata.school && styles.placehholder}
                placeholder={"School"}
                onChange={(e) => {
                  setformdata((prev) => ({
                    ...prev,
                    school: e.target.value,
                  }));
                }}
              />
              <div className={styles.logoWrapper}>
                <p className={styles.head}>Select team logo</p>
                <div className={styles.imgwrapper} id="logowrapper">
                  {logos.map((item) => {
                    return (
                      <img
                        key={item}
                        onClick={() =>
                          setformdata((prev) => ({
                            ...prev,
                            logo_url: item,
                          }))
                        }
                        className={
                          formdata.logo_url === item && styles.selected
                        }
                        src={item}
                        alt=""
                      />
                    );
                  })}
                </div>
              </div>
              {Array(membersTOShow)
                .fill("x")
                .map((item, index) => {
                  return (
                    <div
                      className={styles.memberDetails}
                      key={"member" + index}
                    >
                      <p className={styles.head}>Member {index + 1} details</p>
                      <ModernInputBox
                        value={formdata[`member_${index + 1}`]?.name}
                        extraclass={
                          formdata[`member_${index + 1}`]?.name && styles.input
                        }
                        placeholderClass={
                          formdata[`member_${index + 1}`]?.name &&
                          styles.placehholder
                        }
                        placeholder={"Name"}
                        onChange={(e) => {
                          setformdata((prev) => ({
                            ...prev,
                            [`member_${index + 1}`]: {
                              ...prev[`member_${index + 1}`],
                              name: onlyText(e.target.value, true),
                            },
                          }));
                        }}
                      />
                      <ModernInputBox
                        maxLength={10}
                        value={formdata[`member_${index + 1}`]?.dob}
                        extraclass={
                          formdata[`member_${index + 1}`]?.dob && styles.input
                        }
                        placeholderClass={
                          formdata[`member_${index + 1}`]?.dob &&
                          styles.placehholder
                        }
                        placeholder={
                          formdata[`member_${index + 1}`]?.dob
                            ? "Date Of Birth (DD/MM/YYYY)"
                            : "Date Of Birth (DD/MM/YYYY)"
                        }
                        onChange={(e) => {
                          let res = e.target.value
                            .trim()
                            .replace(/[^0-9./]/g, "");
                          setformdata((prev) => ({
                            ...prev,
                            [`member_${index + 1}`]: {
                              ...prev[`member_${index + 1}`],
                              dob: res,
                            },
                          }));
                        }}
                      />
                      <ModernInputBox
                        value={formdata[`member_${index + 1}`]?.school_id}
                        extraclass={
                          formdata[`member_${index + 1}`]?.school_id &&
                          styles.input
                        }
                        placeholderClass={
                          formdata[`member_${index + 1}`]?.school_id &&
                          styles.placehholder
                        }
                        placeholder={"School ID/Admission no."}
                        onChange={(e) => {
                          setformdata((prev) => ({
                            ...prev,
                            [`member_${index + 1}`]: {
                              ...prev[`member_${index + 1}`],
                              school_id: e.target.value.trim(),
                            },
                          }));
                        }}
                      />
                      <ModernInputBox
                        maxLength={10}
                        value={formdata[`member_${index + 1}`]?.phone}
                        extraclass={
                          formdata[`member_${index + 1}`]?.phone && styles.input
                        }
                        placeholderClass={
                          formdata[`member_${index + 1}`]?.phone &&
                          styles.placehholder
                        }
                        placeholder={"Phone"}
                        onChange={(e) => {
                          setformdata((prev) => ({
                            ...prev,
                            [`member_${index + 1}`]: {
                              ...prev[`member_${index + 1}`],
                              phone: removenonnumber(e.target.value.trim()),
                            },
                          }));
                        }}
                      />
                      <ModernInputBox
                        value={formdata[`member_${index + 1}`]?.email}
                        extraclass={
                          formdata[`member_${index + 1}`]?.email && styles.input
                        }
                        placeholderClass={
                          formdata[`member_${index + 1}`]?.email &&
                          styles.placehholder
                        }
                        placeholder={"Email"}
                        onChange={(e) => {
                          setformdata((prev) => ({
                            ...prev,
                            [`member_${index + 1}`]: {
                              ...prev[`member_${index + 1}`],
                              email: e.target.value.trim(),
                            },
                          }));
                        }}
                      />
                    </div>
                  );
                })}
              {membersTOShow < 5 && (
                <div
                  className={styles.addmore}
                  onClick={() => {
                    setMembersToShow(membersTOShow + 1);
                  }}
                >
                  Add more member
                </div>
              )}
              <div className={styles.customCheckbox}>
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => {
                    settermsAccepted(!termsAccepted);
                  }}
                />
                <p>
                  I accept the{" "}
                  <span
                    onClick={() => {
                      settermsAccepted(true);
                      setshowterm(true);
                    }}
                  >
                    Terms and Conditions
                  </span>
                </p>
              </div>
              {error && <p className={styles.error}>{error}</p>}
              {!loading ? (
                <div className={`${styles.button}`} onClick={register}>
                  Submit
                </div>
              ) : (
                <div className={`${styles.button} ${styles.spinner_btn}`}>
                  <Spinner />
                </div>
              )}
            </div>
          ) : (
            <div
              className={styles.otp}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  afterOtp();
                }
              }}
            >
              <div className={styles.otpHeadWrapper}>
                <p className={styles.text}>
                  Enter the 6-digit code sent to you at
                </p>
                <p className={styles.phone}>
                  {"+91 " + formdata.primary_phone}
                </p>
              </div>
              <OTPCustomComponent setotp={setOTP} size={6} />
              {error && <p className={styles.error}>{error}</p>}
              <div
                className={styles.resendButton}
                onClick={() => {
                  setresetotp((prev) => prev + 1);
                  register();
                }}
              >
                Resend OTP
              </div>
              {!loading ? (
                <div className={`${styles.button}`} onClick={afterOtp}>
                  Continue
                </div>
              ) : (
                <div className={`${styles.button} ${styles.spinner_btn}`}>
                  <Spinner />
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className={`${styles.signup} ${done && styles.flexheight}`}>
          <div className={styles.cross} onClick={() => setshowform(false)}>
            <CancelOutlinedIcon className={styles.icon} />
          </div>
          <p className={styles.heading} style={{ userSelect: "none" }}>
            Your response has been recorded.
          </p>
          <div className={styles.wrapper}>
            <p className={`${styles.summary} ${styles.boldsummary}`}>
              Thank you for showing interest in upsurge business league.
            </p>
            <p className={styles.summary}>
              You will soon get an email with the next steps & more details on
              the upsurge business league.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
