import { useState, useEffect, useContext } from "react";
import styles from "../../styles/EditProfile/profilePage.module.scss";
import Input from "../Input";
import { onlyText } from "../../helpers/validationHelpers";
import SchoolInput from "./SchoolInput";
import CityStateInput from "./CityStateInput";
import StateName from "./StateName";
import DateInput from "../Input/DateInput";
import GenderInput from "./GenderInput";
import DashboardApis from "../../actions/apis/DashboardApis";
import { MainContext } from "../../context/Main";

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

export default function Info({ data, settoastdata = () => {} }) {
  const { setUnicoinsEarnedPopUp, setUnicoins } = useContext(MainContext);

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

  const checkData = (changedData) => {
    let returnData = {};
    if (changedData.firstItem && data.first_name !== changedData.firstName)
      returnData.first_name = changedData.firstName;
    if (changedData.lastName && data.last_name !== changedData.lastName)
      returnData.last_name = changedData.lastName;
    if (changedData.school && data.school !== changedData.school)
      returnData.school = changedData.school;
    if (changedData.city && data.city !== changedData.city)
      returnData.city = changedData.city;
    if (changedData.state && data.state !== changedData.state)
      returnData.state = changedData.state;
    if (changedData.dob && data.dob !== changedData.dob)
      returnData.dob = changedData.dob;
    if (changedData.gender && data.gender !== changedData.gender)
      returnData.gender = changedData.gender;
    return returnData;
  };

  async function handleSave() {
    const dataPayload = checkData(infoData);
    if (dataPayload && Object.keys(dataPayload).length !== 0) {
      let response = await DashboardApis.updatechildprofile(dataPayload);
      if (response && response.data && response.data.success) {
        const responseData = response.data.data;
        setInfoData({
          firstName: responseData.first_name,
          lastName: responseData.last_name,
          school: responseData.school,
          city: responseData.city,
          state: responseData.state,
          dob: responseData.dob,
          gender: responseData.gender,
        });
        if (response.data.message === "Profile Completed") {
          setUnicoinsEarnedPopUp(true);
          setUnicoins(2500);
        } else {
          settoastdata({
            show: true,
            msg: response.data.message,
            type: "success",
          });
        }
      } else {
        settoastdata({ show: true, msg: response.data.message, type: "error" });
      }
    }
  }

  return (
    <div className={styles.info}>
      <DoubleItemArea>
        <Input
          type={"text"}
          label={"First Name"}
          value={infoData.firstName}
          minLength={2}
          maxLength={50}
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
          type={"text"}
          label={"Last Name"}
          value={infoData.lastName}
          minLength={2}
          maxLength={50}
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
        <SchoolInput
          value={infoData.school}
          setValue={(value) => {
            setInfoData((prev) => ({ ...prev, school: value }));
          }}
          disabled={false}
          tooltipId={"school-tooltip"}
          tooltip={"School is required to put your child in related circles."}
        />
      </SingleItemArea>
      <DoubleItemArea>
        <CityStateInput
          value={infoData.city}
          setValue={(value) => {
            setInfoData((prev) => ({ ...prev, city: value }));
          }}
          setState={(value) => {
            setInfoData((prev) => ({ ...prev, state: value }));
          }}
          disabled={false}
          tooltipId={"city-tooltip"}
          tooltip={"City is required to put your child in related circles."}
        />
        <StateName data={infoData.state} />
      </DoubleItemArea>
      <DoubleItemArea>
        <DateInput
          label={"Date of Birth"}
          value={infoData.dob}
          onChange={(e) => {
            if (e) {
              if (e.getTime() < new Date().getTime()) {
                setInfoData((prev) => ({
                  ...prev,
                  dob: new Date(e).getTime(),
                }));
              }
            }
          }}
          maxDate={"today"}
        />
        <GenderInput
          value={infoData.gender}
          setValue={(val) => setInfoData((prev) => ({ ...prev, gender: val }))}
          disabled={false}
        />
      </DoubleItemArea>
      <SingleItemArea>
        <button className={styles.saveButton} onClick={handleSave}>
          Save Changes
        </button>
      </SingleItemArea>
    </div>
  );
}
