import { useState } from "react";
import styles from "../../styles/EditProfile/profilePage.module.scss";
import EditIcon from "@mui/icons-material/Edit";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import VerifiedIcon from "@mui/icons-material/Verified";

const BioItem = ({
  label = "",
  value = "",
  editActionHandler = () => {},
  additionalAction = {
    icon: "",
    label: "",
    actionHandler: () => {},
  },
}) => {
  return (
    <div className={styles.bioItem}>
      <div className={styles.itemBody}>
        <div className={styles.itemLabel}>{label}</div>
        <div className={styles.itemValue}>{value}</div>
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
      <div className={styles.itemAction}>
        <button onClick={editActionHandler} className={styles.actionButton}>
          <EditIcon /> Edit
        </button>
      </div>
    </div>
  );
};

export default function Bio({ data }) {
  const [bioData, setbioData] = useState({
    userName: "",
    email: "",
    phone: "",
  });

  console.log("data", data);

  return (
    <div className={styles.bio}>
      <div className={styles.avatarArea}>
        <img
          onClick={() => {}}
          id="avatar"
          src={
            data?.user_img_url ||
            "https://imgcdn.upsurge.in/images/default-avatar.png"
          }
          alt="User Avatar"
          className={styles.avatarImg}
        />
      </div>
      <BioItem label={"Username"} value={data.user_name} />
      {data.email ? (
        <BioItem label={"Email"} value={data.email} />
      ) : (
        <BioItem
          label={"Parent Email"}
          value={data.parent_email}
          additionalAction={{
            icon: <GppMaybeIcon style={{ color: "#de6869" }} />, // just pass color with the icon
            label: "Click here to Verify your email address",
            action: () => {},
          }}
        />
      )}
      {data.phone ? (
        <BioItem label={"Phone"} value={data.phone} />
      ) : (
        <BioItem
          label={"Parent Phone"}
          value={data.parent_phone}
          additionalAction={{
            icon: <VerifiedIcon style={{ color: "#5955e5" }} />, // just pass color with the icon
            label: "Verified",
            action: () => {},
          }}
        />
      )}
      <div className={styles.passwordArea}>
        <button className={styles.changePasswordButton}>Change Password</button>
      </div>
    </div>
  );
}
