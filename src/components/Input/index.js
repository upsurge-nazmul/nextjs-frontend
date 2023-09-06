import { useState, useEffect } from "react";
import styles from "../../styles/GeneralComponents/customInput.module.scss";
import ReactTooltip from "react-tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function Input({
  label = "",
  suggestions = null,
  selectSuggestion = () => {},
  tooltip = "",
  tooltipId = "",
  ...props
}) {
  const [showSuggestions, setShowsuggestions] = useState(false);
  const [valueSelected, setValueSelected] = useState(false);

  useEffect(() => {
    if (suggestions && suggestions.length) {
      if (!valueSelected) setShowsuggestions(true);
    } else setShowsuggestions(false);
  }, [suggestions, valueSelected]);

  return (
    <div className={styles.customInput}>
      {label && <label for={label}>{label}</label>}
      <input id={label} name={label} {...props} />
      {showSuggestions ? (
        <div className={styles.suggestions}>
          {suggestions.map((item) => {
            return (
              <div
                className={styles.suggestion}
                key={item.id}
                onClick={() => {
                  selectSuggestion(item);
                  setValueSelected(true);
                  setShowsuggestions(false);
                }}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
      {tooltip && (
        <div data-tip data-for={tooltipId} className={styles.tooltip}>
          <InfoOutlinedIcon className={styles.infoIcon} />
          <ReactTooltip id={tooltipId} type="dark" effect="solid">
            <p>{tooltip}</p>
          </ReactTooltip>
        </div>
      )}
    </div>
  );
}
