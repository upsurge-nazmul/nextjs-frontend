import React, { useContext, useEffect, useState } from "react";
import Toast from "../../../../components/Toast";
import DashboardHeader from "../../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../../components/Dashboard/DashboardLeftPanel";
import GameCard from "../../../../components/Dashboard/GameCard";
import { useRouter } from "next/dist/client/router";
import styles from "../../../../styles/kidDashboard/managetribe.module.scss";
import HeadingArrow from "../../../../components/SVGcomponents/HeadingArrow";
import { MainContext } from "../../../../context/Main";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LoginApis from "../../../../actions/apis/LoginApis";
import FreeGameApis from "../../../../actions/apis/FreeGameApis";
import { Game_Data } from "../../../../static_data/Game_Data";
import KidDashboardHeader from "../../../../components/KidDashboard/KidDashboardHeader";
import TribeCard from "../../../../components/KidDashboard/TribeCard";
import ModernInputBox from "../../../../components/ModernInputBox";
import AddTribeMemberModal from "../../../../components/KidDashboard/AddTribeMemberModal";
import TribeApis from "../../../../actions/apis/TribeApis";
import { getCookie } from "../../../../actions/cookieUtils";
import AvatarSelector from "../../../../components/Dashboard/AvatarSelector";
export default function ManageTribe({ userdatafromserver, token }) {
  const router = useRouter();
  const { setuserdata, userdata } = useContext(MainContext);
  const [mode, setmode] = useState(router.query.type + " Tribe");
  const [name, setname] = useState("");
  const [img_url, setimg_url] = useState(
    "https://i.ibb.co/v3vVV8r/default-avatar.png"
  );
  const [description, setdescription] = useState("");
  const [showtribemodal, setshowtribemodal] = useState(false);
  const [selectedmembers, setselectedmembers] = useState([]);
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [avatars, setavatars] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
  ]);
  const [showimgsetter, setshowimgsetter] = useState(false);
  const [showavatarmodal, setshowavatarmodal] = useState(false);
  useEffect(() => {
    setuserdata(userdatafromserver);
  }, []);
  async function handleSave() {
    let model = {
      name: name,
      description: description,
      members: selectedmembers,
      tribe_img_url: img_url,
    };
    const res = await TribeApis.createtribe(model, getCookie("accesstoken"));
    if (res && res.data && res.data.success) {
      alert("done");
      // router.push("/dashboard/k/tribes");
    } else {
      alert("error");
    }
  }
  return (
    <div className={styles.managetribepage}>
      <DashboardLeftPanel type="kid" />
      <Toast data={toastdata} />
      {showtribemodal && (
        <AddTribeMemberModal
          members={selectedmembers}
          setmembers={setselectedmembers}
          onCancel={() => setshowtribemodal(false)}
        />
      )}
      <div className={styles.contentWrapper}>
        <KidDashboardHeader
          mode={mode}
          setmode={setmode}
          settoastdata={settoastdata}
        />
        <div className={styles.mainContent}>
          <div className={styles.flexLeft}>
            <div className={styles.top}>
              {showavatarmodal && (
                <AvatarSelector
                  avatars={avatars}
                  setshow={setshowavatarmodal}
                  value={img_url}
                  dirlink={"/images/tribe_avatars/"}
                  setvalue={setimg_url}
                  extension=".svg"
                  tribe={true}
                />
              )}
              <div
                className={styles.imagesection}
                onMouseEnter={() => setshowimgsetter(true)}
                onMouseLeave={() => setshowimgsetter(false)}
              >
                {showimgsetter && (
                  <div
                    className={styles.imagesetter}
                    onClick={() => setshowavatarmodal(true)}
                  >
                    Choose avatar
                  </div>
                )}
                <img className={styles.avatarimg} src={img_url} alt="" />
              </div>
              <div className={styles.right}>
                <ModernInputBox
                  value={name}
                  maxLength={20}
                  setvalue={setname}
                  wrapperclassname={styles.input}
                  placeholder="Tribe Name"
                />
                <textarea
                  onChange={(e) => setdescription(e.target.value)}
                  placeholder="Description"
                />
              </div>
            </div>
            <p className={styles.memeberheading}>Select memebers</p>
            <div className={styles.memberwrapper}>
              {selectedmembers.map((item) => {
                return (
                  <div className={styles.member} key={item.id}>
                    <img src={item.user_img_url} alt="" />
                    <p className={styles.name}>
                      {item.first_name + " " + item.last_name}
                    </p>
                    <p className={styles.username}>@{item.user_name}</p>
                  </div>
                );
              })}
              <div
                className={`${styles.member} ${styles.add}`}
                onClick={() => setshowtribemodal(true)}
              >
                <AddCircleOutlineIcon className={styles.icon} />
                <p className={styles.username}>Add Member</p>
              </div>
            </div>
            <div className={styles.button} onClick={handleSave}>
              Save Tribe
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params, req }) {
  let token = req.cookies.accesstoken;
  let msg = "";
  if (token) {
    let response = await LoginApis.checktoken({
      token: token,
    });
    if (response && !response.data.success) {
      msg = response.data.msg;
      return {
        props: { isLogged: false, msg },
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    } else {
      return {
        props: {
          isLogged: true,
          userdatafromserver: response.data.data,
          token: token,
        },
      };
    }
  } else {
    return {
      props: { isLogged: false, msg: "cannot get token" },
      redirect: {
        permanent: false,
        destination: "/?err=01",
      },
    };
  }
}
