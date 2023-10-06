import styles from "../../styles/GeneralComponents/customInput.module.scss";
import ReactTooltip from "react-tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

/**
 *
 * @SuggestionsFormat: [
 *    {id: 1, name: "Option 1", ...},
 *    {id: 2, name: "Option 2", ...},
 *  ]
 */

export default function Input({
  label = "",
  suggestions = null,
  selectSuggestion = () => {},
  showSuggestions = false,
  setShowsuggestions = () => {},
  tooltip = "",
  tooltipId = "",
  dropdown = false,
  designType = "boundary", // or 'underline'
  ...props
}) {
  return (
    <div className={styles.customInput}>
      {showSuggestions && (
        <div
          className={styles.inputBg}
          onClick={() => setShowsuggestions(false)}
        />
      )}
      {label && <label for={label}>{label}</label>}
      <input
        className={
          designType === "underline"
            ? styles.underlineInput
            : styles.boundayInput
        }
        id={label}
        name={label}
        {...props}
      />
      {showSuggestions && suggestions.length ? (
        <div className={styles.suggestions}>
          {suggestions.map((item) => {
            return (
              <div
                className={styles.suggestion}
                key={item.id}
                onClick={() => selectSuggestion(item)}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
      <div className={styles.iconArea}>
        {dropdown && (
          <div className={styles.dropdownIcon}>
            <ArrowDropDownIcon className={styles.icon} />
          </div>
        )}
        {tooltip && (
          <div data-tip data-for={tooltipId} className={styles.tooltip}>
            <InfoOutlinedIcon className={styles.icon} />
            <ReactTooltip id={tooltipId} type="dark" effect="solid">
              <p>{tooltip}</p>
            </ReactTooltip>
          </div>
        )}
      </div>
    </div>
  );
}
