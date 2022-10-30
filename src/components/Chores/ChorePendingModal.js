import React,{useState, useEffect} from 'react'
import PreviewIcon from '@mui/icons-material/Preview';
import styles from "../../styles/kidDashboard/kidchorepopup.module.scss";
import Image from 'next/image';
import ChoreApis from "../../actions/apis/ChoreApis";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
function ChorePendingModal({setShowModal,showModal,data,getDueDate, settoastdata, setchores, setallchores, setid }) {
  console.log(data);
    const [selectedPreview, setSelectedPreview] = useState(null);
  const [image, setImage] = useState([]);
  async function handleApprove() {
    let response = await ChoreApis.approvechore({ id: data.id });
    if (response && response.data && response.data.success) {
      settoastdata({ show: true, type: "success", msg: "done" });
      setchores((prev) => prev.filter((item) => item.id !== data.id));
      setallchores((prev) => prev.filter((item) => item.id !== data.id));
      setShowModal(!showModal);
    } else {
      settoastdata({
        show: true,
        type: "success",
        msg: response?.data?.message || "Cannot reach server",
      });
    }
  }
  return (
    <div className={styles.chorePopUp}>
    <div className={styles.chorePopUpWrapper}>
            <div
                className={styles.background}
                onClick={() => setShowModal(!showModal)}
              ></div>
              <div className={styles.chorePopUpcontainer}>
              <div className={styles.firstSection}>
              <div className={styles.reward}>
                <Image src={data.img_url} width={"100px"} height={"100px"} alt="ChoreImg"/>
              <span className={styles.rewardLabel}>UniCoins to Earn: </span>
              <span className={styles.rewardValue}>
              {data.reward_amount}
              {" "}
              {data.reward_type}
              </span>
              </div>
              </div>
              <div className={styles.secondSection}>
              <div className={styles.title}>
          <h3>Chore: </h3>  {data.title} {data.is_reoccurring && "(Daily)"}
          </div>
          <div className={styles.message}>
          <p>Message</p>
          {data.message}
              </div>
          <div className={styles.deadline}>
            <p>
                Deadline: 
                </p>
                {getDueDate()}
          </div>
          <div className={styles.customReward}>
            <p>Special Reward:</p>
            {data.custom_rewards}
          </div>
          </div>
                <div className={styles.fourthsection}>
            <div className={styles.msgsection} id="chore-msg">
          <p> Remarks:</p>
          {data.child_remark}
            <p className={styles.lettersleft}>
            </p>
            </div>
            <div className={styles.uploadedimg}>
              {image.map((image, index) => {
                let previewactive = false;
                const handlePreview = (index) =>{
                  setSelectedPreview(index);
                  if(selectedPreview === index)
                  {
                    setSelectedPreview(null);
                  }
                }
                if(selectedPreview === index)
                {
                  previewactive = true;
                }
                return (
                  <div key={index} className={`${styles.preview} ${ previewactive && styles.previewActive }`}>
                  <Image alt="Image" layout='fill' className={styles.displayimg} src={image} />
                  <PreviewIcon className={styles.PreviewIcon} onClick={()=>{handlePreview(index)}} />
                  </div>
              );
            })}
              </div>
            </div>
              <div className={styles.thirdSection}>
                <div className={styles.left}>
                <VolumeUpIcon />: Click to listen to the message
                </div>
                <div className={styles.right}>
                <div
        className={styles.startButton}
        onClick={handleApprove}
        // onClick={() => setChorePhotoModal(true)}
        >
        Approve 
      </div>
          </div>
          </div>
          </div>
          </div>
          </div>
  )
}

export default ChorePendingModal