import { useState, useEffect } from "react";
import styles from "../../styles/EditProfile/profilePage.module.scss";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import Input from "../Input";

export default function BioItem({
  label = "",
  value = "",
  editActionHandler = () => {},
  additionalAction = {
    icon: "",
    label: "",
    actionHandler: () => {},
  },
}) {
  const [editMode, setEditMode] = useState(false);
  const [itemValue, setItemValue] = useState();

  useEffect(() => {
    setItemValue(value);
  }, [value]);

  return (
    <div className={styles.bioItem}>
      <div className={styles.bioItemContainer}>
        <div className={styles.itemBody}>
          <div className={styles.itemLabel}>{label}</div>
          <div className={styles.itemValue}>
            {editMode ? (
              <Input
                value={itemValue}
                onChange={(e) => setItemValue(e.target.value)}
                designType="underline"
                style={{ fontSize: "1rem", marginBottom: "1px" }}
              />
            ) : (
              <p style={{ padding: "3px 0" }}>{value}</p>
            )}
          </div>
        </div>
        <div className={styles.itemAction}>
          {editMode ? (
            <>
              <button
                onClick={() => {
                  editActionHandler(itemValue);
                  setEditMode(false);
                }}
                style={{ color: "#7bd0bc" }}
                className={styles.actionButton}
              >
                <SaveIcon /> Save
              </button>
              <button
                onClick={() => {
                  setItemValue(value);
                  setEditMode(false);
                }}
                style={{ color: "#de6869" }}
                className={styles.actionButton}
              >
                <ClearIcon /> Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              style={{ color: "#5955e5" }}
              className={styles.actionButton}
            >
              <EditIcon /> Edit
            </button>
          )}
        </div>
      </div>
      <div
        className={styles.itemAdditionalAction}
        style={{
          cursor: additionalAction.actionHandler ? "pointer" : "default",
        }}
        onClick={additionalAction.actionHandler}
      >
        {additionalAction.icon} {additionalAction.label}
      </div>
    </div>
  );
}
