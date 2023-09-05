import { useState } from "react";
import styles from "../../styles/GeneralComponents/customInput.module.scss";
import { useEffect } from "react";

export default function Input({
  label = "",
  suggestions = null,
  selectSuggestion = () => {},
  ...props
}) {
  const [showSuggestions, setShowsuggestions] = useState(false);

  useEffect(() => {
    if (suggestions && suggestions.length) {
      if (suggestions.length == 1 && suggestions[0].name === props.value) {
        setShowsuggestions(false);
      } else {
        setShowsuggestions(true);
      }
    } else setShowsuggestions(false);
  }, [suggestions]);

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
                  selectSuggestion(item.name);
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
    </div>
  );
}
