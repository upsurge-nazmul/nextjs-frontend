import React, { useEffect, useState } from "react";
import styles from "../../../styles/StockSimulator/select.module.scss";
import DropDownArrow from "../../SVGcomponents/DropDownArrow";

function CompanySelection({
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
      let elmnt = document.getElementById("CompanySelection" + options[0]);
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
    setvalue(item.symbol);
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
        <p
          className={`${value ? styles.placeholderlifted : styles.placeholder}`}
        >
          {placeholder}
        </p>
        <p className={styles.text}>
          {options && options.length
            ? options.find((option) => option.symbol === value)
              ? options.find((option) => option.symbol === value).name
              : "Select..."
            : ""}
        </p>
        <DropDownArrow className={styles.svg} />
      </div>
      {showoptions && (
        <div className={styles.options} id={placeholder + "dropdown"}>
          <div className={styles.searchArea}>
            <input
              placeholder="Search..."
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

export default CompanySelection;
