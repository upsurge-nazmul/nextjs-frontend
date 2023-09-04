import styles from "../../../styles/Menu/accountSwitcher.module.scss";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

export default function AccountSwitcher({
  savedUsers,
  setshowauth,
  setSavedUser,
  userdata,
}) {
  return (
    <div className={styles.userWrapper}>
      {savedUsers &&
        savedUsers.length &&
        savedUsers.map((user) => {
          if (user.id === userdata.user_id) return null;
          return (
            <div
              onClick={() => {
                setshowauth(true);
                setSavedUser(user);
              }}
              className={`${styles.innerUser} ${
                user.id === userdata.user_id && styles.selectedUser
              }`}
              key={user.id}
            >
              <img
                src={
                  user.image ||
                  "https://imgcdn.upsurge.in/images/default-avatar.png"
                }
                alt="User Image"
              />
              <div className={styles.userInfo}>
                <p>{user.name}</p>
                <p>{user.type}</p>
              </div>
            </div>
          );
        })}

      <div className={`${styles.innerUser} `} onClick={() => setshowauth(true)}>
        <GroupAddIcon className={styles.icon} />
        <div className={styles.userInfo}>
          <p>Add new account</p>
        </div>
      </div>
    </div>
  );
}
