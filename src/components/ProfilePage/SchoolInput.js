import { useState, useEffect, useContext } from "react";
import Input from "../Input";
import DashboardApis from "../../actions/apis/DashboardApis";

export default function SchoolInput({
  value,
  setValue,
  tooltipId,
  tooltip,
  ...props
}) {
  const [schoolOptions, setSchoolOptions] = useState([]);

  useEffect(() => {
    if (value) searchSchool(value);
    else setSchoolOptions([]);
  }, [value]);

  async function searchSchool(query) {
    let res = await DashboardApis.getschools({ query });
    if (res?.data.success) {
      setSchoolOptions(res.data.data);
    } else {
      setSchoolOptions([]);
    }
  }

  return (
    <>
      <Input
        label={"School"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => searchSchool(value)}
        suggestions={schoolOptions}
        selectSuggestion={setValue}
        {...props}
      />
    </>
  );
}
