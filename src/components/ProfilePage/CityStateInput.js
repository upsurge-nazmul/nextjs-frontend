import React, { useState, useEffect } from "react";
import Input from "../Input";
import { Cities_Data } from "../../static_data/Cities_Data";

export default function CityStateInput({
  value,
  setValue,
  setState,
  ...props
}) {
  const [cityOptions, setCityOptions] = useState([]);

  function formattedCities() {
    let id = 0;
    return Cities_Data.map((city) => {
      id++;
      return {
        name: city.city + ", " + city.state,
        city: city.city,
        state: city.state,
        id: id,
      };
    });
  }

  function searchCities(query) {
    if (query) {
      setCityOptions(
        formattedCities().filter(
          (item) => item.name.toLowerCase().indexOf(query.toLowerCase()) === 0
        )
      );
    } else {
      setCityOptions([]);
    }
  }

  useEffect(() => {
    if (value) {
      searchCities(value);
    } else setCityOptions([]);
  }, [value]);

  function handleSelectOption(city) {
    setValue(city.city);
    setState(city.state);
  }

  return (
    <>
      <Input
        label={"City"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => searchCities(value)}
        suggestions={cityOptions}
        selectSuggestion={handleSelectOption}
        {...props}
      />
    </>
  );
}
