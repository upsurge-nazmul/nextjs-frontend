import { useState, useEffect } from "react";
import Input from "../Input";
import DashboardApis from "../../actions/apis/DashboardApis";

export default function SchoolInput({ value, setValue, ...props }) {
  const [schoolOptions, setSchoolOptions] = useState([]);
  const [showSuggestions, setShowsuggestions] = useState(false);

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
        onFocus={() => setShowsuggestions(true)}
        suggestions={schoolOptions}
        selectSuggestion={(option) => {
          setValue(option.name);
          setShowsuggestions(false);
        }}
        showSuggestions={showSuggestions}
        setShowsuggestions={setShowsuggestions}
        {...props}
      />
    </>
  );
}
