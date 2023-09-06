import { useState, useEffect } from "react";
import styles from "../../styles/EditProfile/profilePage.module.scss";
import Input from "../Input";
import { onlyText } from "../../helpers/validationHelpers";
import SchoolInput from "./SchoolInput";
import CityStateInput from "./CityStateInput";
import StateName from "./StateName";
import DateInput from "../Input/DateInput";
import GenderInput from "./GenderInput";

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
    <div className={styles.info}>
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
