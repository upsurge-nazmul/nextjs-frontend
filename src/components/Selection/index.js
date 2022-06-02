import React, { useEffect, useState } from "react";
import styles from "../../styles/Selection/index.module.scss";
import DropDownArrow from "../SVGcomponents/DropDownArrow";

function Dropdown({
  value,
  setvalue,
  options = [],
  placeholder,
  margin,
  className,
}) {
  const [showoptions, setshowoptions] = useState(false);
  const [filteredOptoins, setFilteredOptions] = useState(options);
  const [searchParam, setSearchParam] = useState("");

  useEffect(() => {
    function getifclickedoutside(e) {
      let elmnt = document.getElementById("Dropdown" + options[0]);
      if (elmnt !== null && !elmnt.contains(e.target)) {
        setshowoptions(false);
        setSearchParam("");
        setFilteredOptions(options);
      }
    }
    document.addEventListener("mousedown", getifclickedoutside);
    return () => {
      document.removeEventListener("mousedown", getifclickedoutside);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (searchParam && options.length) {
      setFilteredOptions(() =>
        options.filter((item) =>
          item.name.toLowerCase().startsWith(searchParam.toLowerCase())
        )
      );
    } else {
      setFilteredOptions(options);
    }
  }, [searchParam, options]);

  const handleChange = (item) => {
    setvalue(item.value);
    setSearchParam("");
    setFilteredOptions(options);
    setshowoptions(false);
  };

  return (
    <div
      id={"CompanySelection" + options[0]}
      className={`${styles.dropdown} ${className}`}
      style={{ margin: margin ? margin : "0" }}
    >
      <div
        className={styles.selected}
        onClick={() => setshowoptions(!showoptions)}
      >
<<<<<<< HEAD
        {/* <p
          className={`${value ? styles.placeholderlifted : styles.placeholder}`}
        >
          {placeholder}
        </p> */}
=======
        <p
          className={`${value ? styles.placeholderlifted : styles.placeholder}`}
        >
          {placeholder}
        </p>
>>>>>>> f27f25fa (quest kids selection added)
        <p className={styles.text}>
          {options && options.length
            ? options.find((option) => option.value === value)
              ? options.find((option) => option.value === value).name
<<<<<<< HEAD
              : placeholder
=======
              : "Select..."
>>>>>>> f27f25fa (quest kids selection added)
            : ""}
        </p>
        <DropDownArrow className={styles.svg} />
      </div>
      {showoptions && (
        <div className={styles.options} id={placeholder + "dropdown"}>
          <div className={styles.searchArea}>
            <input
<<<<<<< HEAD
              placeholder={"Search..."}
=======
              placeholder="Search..."
>>>>>>> f27f25fa (quest kids selection added)
              value={searchParam}
              onChange={(e) => setSearchParam(e.target.value)}
            />
          </div>
          <div className={styles.optionArea}>
            {filteredOptoins.length ? (
              filteredOptoins.map((item, index) => {
                return (
                  <p
                    className={`${styles.option} ${
                      item === value ? styles.selectedOption : null
                    }`}
                    onClick={() => {
                      handleChange(item);
                    }}
                    key={"CompanySelectionOption" + index}
                  >
                    {item.name}
                  </p>
                );
              })
            ) : (
              <div className={styles.noData}>
                <p>No Data Available</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
