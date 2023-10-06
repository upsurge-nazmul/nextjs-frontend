import { useState, useEffect } from "react";
import Input from "../Input";

const GENDER_DATA = [
  { id: 1, name: "Male" },
  { id: 2, name: "Female" },
  { id: 3, name: "Other" },
  { id: 4, name: "Don't want to disclose" },
];

export default function GenderInput({ value, setValue, ...props }) {
  const [genderOptions, setGenderOptions] = useState([]);
  const [showSuggestions, setShowsuggestions] = useState(false);

  useEffect(() => {
    if (value) searchGender(value);
    else setGenderOptions(GENDER_DATA);
  }, [value]);

  function searchGender(query) {
    setGenderOptions((prev) =>
      prev.filter(
        (item) => item.name.toLowerCase().indexOf(query.toLowerCase()) === 0
      )
    );
  }

  return (
    <Input
      label={"Gender"}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onFocus={() => setShowsuggestions(true)}
      suggestions={genderOptions}
      selectSuggestion={(option) => {
        setValue(option.name);
        setShowsuggestions(false);
      }}
      dropdown={false}
      showSuggestions={showSuggestions}
      setShowsuggestions={setShowsuggestions}
      {...props}
    />
  );
}
