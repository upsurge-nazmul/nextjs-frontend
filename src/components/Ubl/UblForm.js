import React, { useEffect, useState } from "react";
import {
  onlyText,
  removenonnumber,
  vaildateEmail,
  vaildatePhone,
} from "../../helpers/validationHelpers";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ModernInputBox from "../ModernInputBox";
import styles from "../../styles/ubl/ublform.module.scss";
import TickSvg from "../SVGcomponents/TickSvg";
import SummerCampApis from "../../actions/apis/SummerCampApis";
import Spinner from "../Spinner";
import UblCampApis from "../../actions/apis/UblCampApis";
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
  const [membersTOShow, setMembersToShow] = useState(3);
  const [formdata, setformdata] = useState({
    team_name: "",
    school: "",
    logo_url: "",
    member_1: {
      name: "",
      school: "",
      dob: "",
      school_id: "",
      phone: "",
      email: "",
    },
    member_2: {
      name: "",
      school: "",
      dob: "",
      school_id: "",
      phone: "",
      email: "",
    },
    member_3: {
      name: "",
      school: "",
      dob: "",
      school_id: "",
      phone: "",
      email: "",
    },
  });

  async function register() {
    setloading(true);
    if (!termsAccepted) {
      setloading(false);
      return settoastdata({
        show: true,
        type: "error",
        msg: "Please accept terms before submitting data.",
      });
    }
    if (!formdata.team_name) {
      setloading(false);
      return settoastdata({
        show: true,
        type: "error",
        msg: "Team name is required",
      });
    }
    if (!formdata.school) {
      setloading(false);
      return settoastdata({
        show: true,
        type: "error",
        msg: "School name is required",
      });
    }
    if (!formdata.logo_url) {
      setloading(false);
      return settoastdata({
        show: true,
        type: "error",
        msg: "Please select one team logo",
      });
    }
    for (let i = 1; i <= membersTOShow; i++) {
      const element = formdata[`member_${i}`];

      if (!element.name) {
        setloading(false);
        return settoastdata({
          show: true,
          type: "error",
          msg: "Name is required for member " + i,
        });
      }

      if (!element.school) {
        setloading(false);
        return settoastdata({
          show: true,
          type: "error",
          msg: "School is required for member " + i,
        });
      }
      if ((element.dob.match(/\//g) || []).length !== 2) {
        setloading(false);
        return settoastdata({
          show: true,
          type: "error",
          msg: "Invalid Dob set for member " + i,
        });
      }
      console.log(element.dob.split("/"));
      if (
        element.dob.split("/")[0].length !== 2 ||
        element.dob.split("/")[1].length !== 2 ||
        element.dob.split("/")[2].length !== 4
      ) {
        setloading(false);
        return settoastdata({
          show: true,
          type: "error",
          msg: "Invalid Dob set for member " + i,
        });
      }
      if (!vaildatePhone(element.phone)) {
        setloading(false);
        return settoastdata({
          show: true,
          type: "error",
          msg: "Enter valid phone number of member " + i,
        });
      }
      if (!element.dob) {
        setloading(false);

        return settoastdata({
          show: true,
          type: "error",
          msg: "DOB is required for member " + i,
        });
      }
      if (!element.school_id) {
        setloading(false);

        return settoastdata({
          show: true,
          type: "error",
          msg: "School id/ admission number is required for member " + i,
        });
      }
      if (!element.email) {
        setloading(false);

        return settoastdata({
          show: true,
          type: "error",
          msg: "Email is required for member " + i,
        });
      }
      if (!vaildateEmail(element.email)) {
        setloading(false);

        return settoastdata({
          show: true,
          type: "error",
          msg: "Enter valid email of member " + i,
        });
      }
    }

    let res = await UblCampApis.register({ data: formdata });
    if (res?.data?.success) {
      settoastdata({
        show: true,
        type: "success",
        msg: res?.data?.message || "Error connecting to server",
      });
      setdone(true);
    } else {
      settoastdata({
        show: true,
        type: "error",
        msg: res?.data?.message || "Error connecting to server",
      });
    }
    setloading(false);
  }

  const logos = [
    "https://i.ibb.co/LtJRkV4/tiger.png",
    "https://i.ibb.co/71D8L28/laughing.png",
    "https://i.ibb.co/ChKvfmM/demon.png",
    "https://i.ibb.co/cTRKfpf/happy.png",
    "https://i.ibb.co/kJFcB0P/sloth.png",
    "https://i.ibb.co/rxsFTMk/cool-1.png",
    "https://i.ibb.co/bWjKnSH/cool.png",
    "https://i.ibb.co/dW3YkPh/deer.png",
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
      <div className={styles.bg} onClick={() => setshowform(false)}></div>
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
                      className={formdata.logo_url === item && styles.selected}
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
                  <div className={styles.memberDetails} key={"member" + index}>
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
                      value={formdata[`member_${index + 1}`]?.school}
                      extraclass={
                        formdata[`member_${index + 1}`]?.school && styles.input
                      }
                      placeholderClass={
                        formdata[`member_${index + 1}`]?.school &&
                        styles.placehholder
                      }
                      placeholder={"School"}
                      onChange={(e) => {
                        setformdata((prev) => ({
                          ...prev,
                          [`member_${index + 1}`]: {
                            ...prev[`member_${index + 1}`],
                            school: e.target.value,
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
        </div>
      ) : (
        <div className={`${styles.signup} ${done && styles.flexheight}`}>
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
