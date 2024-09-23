import React, { useState, useEffect, useContext } from "react";
import styles from "../../styles/GeneralComponents/avatarselector.module.scss";
import TickSvg from "../SVGcomponents/TickSvg";
import KidApis from "../../actions/apis/KidApis";
import { MainContext } from "../../context/Main";
import DashboardApis from "../../actions/apis/DashboardApis";
import { modifiedImageURL } from "../../utils/utils";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";

export default function AvatarSelector({ setshow, tribe = null }) {
  const { userdata, setuserdata } = useContext(MainContext);
  const [availableAvatars, setAvailableAvatars] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  async function fetchAvailableAvatars() {
    const res = await DashboardApis.getallavatars(null);
    if (res && res.data && res.data.success) {
      setAvailableAvatars((prev) => [...prev, ...res.data.data]);
    }
  }

  async function fetchPurchasedAvatars() {
    const res = await KidApis.getavatars(null);
    if (res && res.data && res.data.success) {
      setAvailableAvatars((prev) => [...prev, ...res.data.data]);
    }
  }

  async function setAvatar(img) {
    let response = await DashboardApis.updatechildprofile({
      user_img_url: img,
    });
    if (response && response.data && response.data.success) {
      setuserdata((prev) => ({ ...prev, user_img_url: img }));
    }
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // Save the image preview
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    fetchPurchasedAvatars();
    fetchAvailableAvatars();
  }, []);

  useEffect(() => {
    setSelected(
      userdata?.user_img_url ||
        "https://imgcdn.upsurge.in/images/default-avatar.png"
    );
  }, [userdata]);

  return (
    <div className={styles.avatarselector}>
      <div className={styles.background} onClick={() => setshow(false)} />
      <div className={styles.main}>
        <div className={styles.imageSection}>
          <img
            id="avatar-button"
            src={
              selectedImage
                ? selectedImage
                : userdata?.user_img_url
                ? modifiedImageURL(userdata.user_img_url)
                : "https://imgcdn.upsurge.in/images/default-avatar.png"
            }
            alt=""
            className={styles.avatarImg}
          />
          <div className={styles.selectImageArea}>
            <div className={styles.uploadContainer}>
              <label for="image-upload" className={styles.uploadLabel}>
                Upload photo
                <AddPhotoAlternateIcon />
              </label>
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                className={styles.uploadInput}
                onChange={handleImageChange}
              />
            </div>
            {selectedImage && (
              <div className={styles.selectionActionButtons}>
                <button
                  className={styles.cancelButton}
                  onClick={() => setSelectedImage()}
                >
                  Cancel
                  <CancelIcon />
                </button>
                <button className={styles.saveButton}>
                  Save
                  <SaveIcon />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className={styles.avatarSection}>
          <p className={styles.heading}>
            Select{tribe ? " tribe " : " your "}avatar
          </p>
          <div className={styles.wrapper}>
            {availableAvatars &&
              availableAvatars.map((item) => {
                return (
                  <div
                    className={styles.avatar}
                    key={item}
                    onClick={() => {
                      setAvatar(item.img_url);
                      setshow(false);
                    }}
                  >
                    {selected === item.img_url && (
                      <div className={styles.selected}>
                        <TickSvg className={styles.tick} />
                      </div>
                    )}
                    <img src={item.img_url} alt={item.name} />
                  </div>
                );
              })}
            <div
              className={styles.avatar}
              key={"default-avatar"}
              onClick={() => {
                setAvatar(
                  "https://imgcdn.upsurge.in/images/default-avatar.png"
                );
                setshow(false);
              }}
            >
              {selected ===
                "https://imgcdn.upsurge.in/images/default-avatar.png" && (
                <div className={styles.selected}>
                  <TickSvg className={styles.tick} />
                </div>
              )}
              <img
                src={"https://imgcdn.upsurge.in/images/default-avatar.png"}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
