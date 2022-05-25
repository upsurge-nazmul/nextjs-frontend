import React, { useState } from "react";
import {
  onlyText,
  removenonnumber,
  vaildateEmail,
  vaildatePhone,
} from "../../helpers/validationHelpers";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ModernInputBox from "../ModernInputBox";
import styles from "../../styles/summercamp/form.module.scss";
import TickSvg from "../SVGcomponents/TickSvg";
import SummerCampApis from "../../actions/apis/SummerCampApis";
import Spinner from "../Spinner";
export default function BootCampForm({
  done,
  setdone,
  settoastdata,
  setshowpopup,
}) {
  const [loading, setloading] = useState(false);
  const [formdata, setformdata] = useState({
    child_name: "",
    age: "",
    class: "",
    school: "",
    parent_name: "",
    phone_number: "",
    selected_quests: 2,
    email: "",
    city: "",
    timing: "",
  });
  async function register() {
    setloading(true);
    if (!formdata.child_name) {
      setloading(false);
      return settoastdata({
        show: true,
        type: "error",
        msg: "Child name is required",
      });
    }
    if (!formdata.parent_name) {
      setloading(false);

      return settoastdata({
        show: true,
        type: "error",
        msg: "Parent name is required",
      });
    }
    if (!formdata.school) {
      setloading(false);

      return settoastdata({
        show: true,
        type: "error",
        msg: "School is required",
      });
    }
    if (!formdata.city) {
      setloading(false);

      return settoastdata({
        show: true,
        type: "error",
        msg: "City is required",
      });
    }
    if (!formdata.timing) {
      setloading(false);

      return settoastdata({
        show: true,
        type: "error",
        msg: "Timing is required",
      });
    }
    if (formdata.selected_quests === 0) {
      setloading(false);

      return settoastdata({
        show: true,
        type: "error",
        msg: "Minimum 1 quest is required",
      });
    }
    if (!formdata.age) {
      setloading(false);

      return settoastdata({
        show: true,
        type: "error",
        msg: "Age is required",
      });
    }
    if (formdata.age < 10) {
      setloading(false);

      return settoastdata({
        show: true,
        type: "error",
        msg: "Minimum age is 10",
      });
    }
    if (!formdata.class) {
      setloading(false);

      return settoastdata({
        show: true,
        type: "error",
        msg: "Class is required",
      });
    }
    if (!formdata.phone_number) {
      setloading(false);

      return settoastdata({
        show: true,
        type: "error",
        msg: "Phone number is required",
      });
    }
    if (!vaildatePhone(formdata.phone_number)) {
      setloading(false);

      return settoastdata({
        show: true,
        type: "error",
        msg: "Enter valid phone number",
      });
    }
    if (!formdata.email) {
      setloading(false);

      return settoastdata({
        show: true,
        type: "error",
        msg: "Email is required",
      });
    }
    if (!vaildateEmail(formdata.email)) {
      setloading(false);

      return settoastdata({
        show: true,
        type: "error",
        msg: "Enter valid email",
      });
    }
    let res = await SummerCampApis.register({ data: formdata });
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
  const timings = [
    "Thursday, May 26, 11am to 12:30pm",
    "Thursday, May 26, 5pm to 6:30pm ",
    "Friday, May 27, 11am to 12:30pm",
    "Friday, May 27, 5pm to 6:30pm ",
    "Monday, May 30, 11am to 12:30pm",
    "Monday, May 30, 5pm to 6:30pm",
    "Tuesday, May 31, 11am to 12:30pm",
    "Tuesday, May 31, 5pm to 6:30pm",
  ];
  return (
    <div className={styles.formmain}>
      <div className={styles.bg} onClick={() => setshowpopup(false)}></div>
      {!done ? (
        <div className={styles.signup} id="signup">
          <div className={styles.cross} onClick={() => setshowpopup(false)}>
            <CancelOutlinedIcon className={styles.icon} />
          </div>
          <p className={styles.heading} style={{ userSelect: "none" }}>
            Sign Up!
          </p>
          <div className={styles.form}>
            <ModernInputBox
              value={formdata.child_name}
              extraclass={formdata.child_name && styles.input}
              placeholderClass={formdata.child_name && styles.placehholder}
              placeholder={"Name of Child"}
              onChange={(e) =>
                setformdata((prev) => ({
                  ...prev,
                  child_name: onlyText(e.target.value).trim(),
                }))
              }
            />
            <ModernInputBox
              value={formdata.age}
              extraclass={formdata.age && styles.input}
              placeholderClass={formdata.age && styles.placehholder}
              placeholder={"Age of Child"}
              onChange={(e) => {
                if (e.target.value > 30) {
                  return;
                }
                setformdata((prev) => ({
                  ...prev,
                  age: removenonnumber(e.target.value).trim(),
                }));
              }}
            />
            <ModernInputBox
              value={formdata.class}
              extraclass={formdata.class && styles.input}
              placeholderClass={formdata.class && styles.placehholder}
              placeholder={"Class/Grade"}
              onChange={(e) =>
                setformdata((prev) => ({
                  ...prev,
                  class: e.target.value.trim(),
                }))
              }
            />
            <ModernInputBox
              value={formdata.school}
              placeholder={"School Name"}
              extraclass={formdata.school && styles.input}
              placeholderClass={formdata.school && styles.placehholder}
              onChange={(e) =>
                setformdata((prev) => ({
                  ...prev,
                  school: onlyText(e.target.value).trim(),
                }))
              }
            />
            <ModernInputBox
              value={formdata.parent_name}
              placeholder={"Parent's Name"}
              extraclass={formdata.parent_name && styles.input}
              placeholderClass={formdata.parent_name && styles.placehholder}
              onChange={(e) =>
                setformdata((prev) => ({
                  ...prev,
                  parent_name: onlyText(e.target.value).trim(),
                }))
              }
            />
            <ModernInputBox
              value={formdata.phone_number}
              placeholder={"Phone Number"}
              maxLength={10}
              extraclass={formdata.phone_number && styles.input}
              placeholderClass={formdata.phone_number && styles.placehholder}
              onChange={(e) =>
                setformdata((prev) => ({
                  ...prev,
                  phone_number: removenonnumber(e.target.value).trim(),
                }))
              }
            />
            <ModernInputBox
              value={formdata.email}
              extraclass={formdata.email && styles.input}
              placeholderClass={formdata.email && styles.placehholder}
              placeholder={"Email"}
              onChange={(e) =>
                setformdata((prev) => ({
                  ...prev,
                  email: e.target.value.trim(),
                }))
              }
            />
            <ModernInputBox
              value={formdata.city}
              placeholder={"City"}
              extraclass={formdata.city && styles.input}
              placeholderClass={formdata.city && styles.placehholder}
              onChange={(e) =>
                setformdata((prev) => ({
                  ...prev,
                  city: onlyText(e.target.value).trim(),
                }))
              }
            />
            <div className={styles.selector}>
              <p className={styles.head}>
                What journey would you like to embark upon?
              </p>
              <div className={styles.wrapper}>
                <div
                  className={`${styles.option} ${
                    (formdata.selected_quests === 1 ||
                      formdata.selected_quests === 3) &&
                    styles.selectedoption
                  }`}
                  onClick={() => {
                    if (formdata.selected_quests === 0) {
                      setformdata((prev) => ({
                        ...prev,
                        selected_quests: 1,
                      }));
                    } else if (formdata.selected_quests === 1) {
                      setformdata((prev) => ({
                        ...prev,
                        selected_quests: 0,
                      }));
                    } else if (formdata.selected_quests === 3) {
                      setformdata((prev) => ({
                        ...prev,
                        selected_quests: 2,
                      }));
                    } else {
                      setformdata((prev) => ({
                        ...prev,
                        selected_quests: 3,
                      }));
                    }
                  }}
                >
                  {(formdata.selected_quests === 1 ||
                    formdata.selected_quests === 3) && (
                    <TickSvg className={styles.tick} />
                  )}
                  From 0 to 1 - Entrepreneurship Quest
                </div>
                <div
                  className={`${styles.option} ${
                    (formdata.selected_quests === 2 ||
                      formdata.selected_quests === 3) &&
                    styles.selectedoption
                  }`}
                  onClick={() => {
                    if (formdata.selected_quests === 0) {
                      setformdata((prev) => ({
                        ...prev,
                        selected_quests: 2,
                      }));
                    } else if (formdata.selected_quests === 2) {
                      setformdata((prev) => ({
                        ...prev,
                        selected_quests: 0,
                      }));
                    } else if (formdata.selected_quests === 3) {
                      setformdata((prev) => ({
                        ...prev,
                        selected_quests: 1,
                      }));
                    } else {
                      setformdata((prev) => ({
                        ...prev,
                        selected_quests: 3,
                      }));
                    }
                  }}
                >
                  {(formdata.selected_quests === 2 ||
                    formdata.selected_quests === 3) && (
                    <TickSvg className={styles.tick} />
                  )}
                  Money Matters - Financial Literacy & Investment Quest
                </div>
                <div className={styles.price}>
                  {formdata.selected_quests === 0
                    ? "Please select atleast one quest"
                    : formdata.selected_quests === 1
                    ? "Total price will be ₹2,999"
                    : formdata.selected_quests === 2
                    ? "Total price will be ₹2,999"
                    : "Total price will be ₹5,000"}
                </div>
              </div>
            </div>
            <div className={styles.selector}>
              <p className={styles.head}>
                Please chose the preferred slot for a demo class
              </p>
              <div className={styles.wrapper}>
                {timings.map((time) => {
                  return (
                    <div
                      className={`${styles.option} ${
                        formdata.timing === time && styles.selectedoption
                      }`}
                      key={time}
                      onClick={() => {
                        setformdata((prev) => ({
                          ...prev,
                          timing: time,
                        }));
                      }}
                    >
                      {formdata.timing === time && (
                        <TickSvg className={styles.tick} />
                      )}
                      {time}
                    </div>
                  );
                })}
              </div>
            </div>

            {!loading ? (
              <div className={`${styles.button}`} onClick={register}>
                Sign Up
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
              Thank you for showing interest in kickstarting your child’s
              journey toward their financial freedom!
            </p>
            <p className={styles.summary}>
              You will soon get an email with the next steps & more details on
              the upsurge Summer Bootcamp
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
