import { useState, useEffect, useContext } from "react";
import styles from "../../styles/EditProfile/profilePage.module.scss";
import ModernInputBox from "../ModernInputBox";
import CitySearch from "../CitySearch";
import { Cities_Data } from "../../static_data/Cities_Data";
import DropDown from "../DropDown";
import { STATES_ARR } from "../../static_data/State_Data";
import Input from "../Input";
import { onlyText } from "../../helpers/validationHelpers";

const DoubleItemArea = ({ children }) => {
  return (
    <div className={styles.doubleItemArea}>
      <div className={styles.firstItem}>{children[0]}</div>
      <div className={styles.secondItem}>{children[1]}</div>
    </div>
  );
};

const SingleItemArea = ({ children }) => {
  return <div className={styles.singleItemArea}>{children}</div>;
};

export default function Info({ data }) {
  const [firstname, setfirstname] = useState(data?.first_name || "");
  const [lastname, setlastname] = useState(data?.last_name || "");
  const [school, setschool] = useState(data?.school || "");
  const [schoolresults, setschoolresults] = useState([]);
  const [city, setcity] = useState(data?.city || "");
  const [state, setstate] = useState(data?.state || "");
  const [dob, setdob] = useState(data?.dob ? new Date(Number(data.dob)) : "");
  const [gender, setgender] = useState(data?.gender || "");

  const [infoData, setInfoData] = useState({
    firstName: "",
    lastName: "",
    school: "",
    city: "",
    state: "",
    dob: "",
    gender: "",
  });

  useEffect(() => {
    if (data) {
      setInfoData({
        firstName: data.first_name || "",
        lastName: data.last_name || "",
        school: data.school || "",
        city: data.city || "",
        state: data.state || "",
        dob: data.dob ? new Date(Number(data.dob)) : "",
        gender: data.gender || "",
      });
    }
  }, [data]);

  async function handleSave() {}

  console.log("profile info: ", data, infoData);

  return (
    <div className={styles.leftContent}>
      <DoubleItemArea>
        <Input
          label={"First Name"}
          value={infoData.firstName}
          maxLength={10}
          onChange={(e) =>
            setInfoData((prev) => ({
              ...prev,
              firstName: onlyText(e.target.value),
            }))
          }
          disabled={false}
          textOnly={true}
        />
        <Input
          label={"Last Name"}
          value={infoData.lastName}
          maxLength={10}
          onChange={(e) =>
            setInfoData((prev) => ({
              ...prev,
              lastName: onlyText(e.target.value),
            }))
          }
          disabled={false}
          textOnly={true}
        />
      </DoubleItemArea>
      <SingleItemArea>
        <ModernInputBox
          value={school}
          setvalue={setschool}
          onChange={(e) => setschool(e.target.value)}
          placeholder="School *"
          tooltipid={"school-tooltip"}
          tooltip={"School is required to put your child in related circles."}
          suggestions={schoolresults}
        />
      </SingleItemArea>
      <DoubleItemArea>
        <div className={styles.cityInput}>
          <CitySearch
            placeholder="City *"
            textOnly={true}
            options={Cities_Data}
            wrapperclassname={"editprofilecity"}
            value={city}
            setvalue={setcity}
            setstate={setstate}
          />
        </div>
        <div className={styles.stateInput}>
          <DropDown
            value={state}
            options={STATES_ARR}
            setvalue={setstate}
            placeholder="State"
          />
        </div>
      </DoubleItemArea>
      <DoubleItemArea>
        <div className={styles.dobInput}>
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
        </div>
        <div className={styles.genderInput}>
          <DropDown
            value={gender}
            options={["male", "female", "other", "Don't want to disclose"]}
            setvalue={setgender}
            placeholder="Gender"
            className={"gender"}
          />
        </div>
      </DoubleItemArea>
      <SingleItemArea>
        <button className={styles.saveButton} onClick={handleSave}>
          Save Changes
        </button>
      </SingleItemArea>
    </div>
  );
}
