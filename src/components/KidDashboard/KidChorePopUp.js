import React,{useEffect,useState} from 'react'
import { useRouter } from "next/dist/client/router";
import PendingSvg from "../SVGcomponents/PendingSvg";
import RoundedTick from "../SVGcomponents/RoundedTick";
import ChoreApis from "../../actions/apis/ChoreApis";
import styles from "../../styles/kidDashboard/kidchorepopup.module.scss";
import KidApis from "../../actions/apis/KidApis";
import {completedtimeDifference, duetimeDifference } from "../../helpers/timehelpers";
import Image from 'next/image';
import styles from "../../styles/kidDashboard/kidchorepopup.module.scss";
function KidChorePopUp({choredata,showPopUp,setShowPopUp,settoastdata,setchoredata}) {
    const [showmenu, setshowmenu] = useState(false);
    const [choredatas, setchoredatas] = useState(choredata);
    const router = useRouter();
    const [duedate, setduedate] = useState(getDueDate());
    const [lettercounts, setlettercounts] = useState(100);
    const [imagecounts, setimagecounts] = useState(5);
    const [openPhotoUpload, setOpenPhotoUpload] = useState(false);
    const [remark, setremark] = useState(choredata?.message || "");
    const [imageDisplay, setImageDisplay] = useState([]);
    const [imageInput, setImageInput] = useState([]);
    const [selectedPreview, setSelectedPreview] = useState(null);
    const [selectedRemove, setSelectedRemove] = useState(null);
    const [index, setIndex] = useState(null);
    
    const handleImage = async (e)  => {
      var images = e.target.files;
      if(images.length === 1)
          setImageInput ([...imageInput, e.target.files[0]]);
        if(images.length === 2 )
        setImageInput ([...imageInput, e.target.files[0],e.target.files[1]]);
        if(images.length === 3 )
        setImageInput ([...imageInput, e.target.files[0],e.target.files[1],e.target.files[2]]);
        if(images.length === 4 )
        setImageInput ([...imageInput, e.target.files[0],e.target.files[1],e.target.files[2],e.target.files[3]]);
        if(images.length === 5 )
        setImageInput ([...imageInput, e.target.files[0],e.target.files[1],e.target.files[2],e.target.files[3],e.target.files[4]]);
      }

      useEffect(() => {
       console.log(imageInput);
        setimagecounts(5 - imageInput.length);
    }, [imageInput]);
    useEffect(()=>{
      setImageDisplay(imageDisplay.filter(function(img){
        return img !== selectedRemove
      }))
      if(imageInput.length === 1)
      {
        setImageInput([]);
      }
      else{
        setImageInput(imageInput.splice(index , 1 , null ))
      }
    },[selectedRemove])
    useEffect(() => {
      setlettercounts(200 - remark.length);
    }, [remark]);
    useEffect(() => {
      if (showmenu) document.addEventListener("mousedown", getifclickedoutside);
      else document.removeEventListener("mousedown", getifclickedoutside);
      function getifclickedoutside(e) {
        let menu = document.querySelector(".menu");
        if (menu !== null && !menu.contains(e.target)) {
          setshowmenu(false);
        }
      }
      return () => {
        document.removeEventListener("mousedown", getifclickedoutside);
      };
    }, [showmenu]);
    useEffect(() => {
      console.log(choredata);
      let x = setInterval(() => {
        if (duedate === "Expired") {
          if (x) {
            clearInterval(x);
          }
          return;
        }
        setduedate(getDueDate());
      }, 1000 * 60);
      return () => clearInterval(x);
    }, []);
    async function handleMarkStart() {
      if (choredata.completion === "started") {
        return;
      }
      let response = await ChoreApis.markchorestarted({
        choreId: choredata.id,
        is_reoccurring: choredata.is_reoccurring,
      });
      if (response && response.data && response.data.success) {
        settoastdata({ show: true, type: "success", msg: "done" });
        if (choredata.is_reoccurring) {
          setchoredata((prev) => ({
            ...prev,
            latest_chore: {
              ...prev.latest_chore,
              completion: "started",
            },
          }));
        } else setchoredata((prev) => ({ ...prev, completion: "started" }));
      } else {
        console.log(response);
        settoastdata({
          show: true,
          type: "error",
          msg: response?.data.message || "cannot reach server",
        });
      }
    }
    async function handleMarkForApproval() {
      if (choredata.completion === "approval") {
        return;
      }
      let response = await ChoreApis.markchoreforapproval({
        choreId: choredata.id,
      });
      if (response && response.data && response.data.success) {
        settoastdata({ show: true, type: "success", msg: "done" });
        if (choredata.is_reoccurring) {
          setchoredata((prev) => ({
            ...prev,
            latest_chore: {
              ...prev.latest_chore,
              completion: "approval",
            },
          }));
        } else setchoredata((prev) => ({ ...prev, completion: "approval" }));
      } else {
        settoastdata({
          show: true,
          type: "error",
          msg: response?.data?.message || "cannot reach server",
        });
      }
    }
    function getDueDate() {
      if (choredata.is_reoccurring) {
        if (JSON.stringify(choredata.latest_chore) !== "{}") {
          if (choredata.latest_chore.completion === "completed")
            return completedtimeDifference(choredata.latest_chore.completed_at);
          else {
            return duetimeDifference(choredata?.latest_chore?.due_date);
          }
        }
      }
      if (choredata.completion === "completed")
        return completedtimeDifference(choredata.completed_at);
      else {
        return duetimeDifference(choredata.due_date);
      }
    }
  
  return (
    <div className={styles.chorePopUp}>
    <div className={styles.chorePopUpWrapper}>
            <div
                className={styles.background}
                onClick={() => setShowPopUp(!showPopUp)}
              ></div>
              <div className={styles.chorePopUpcontainer}>
              <div className={styles.firstSection}>
              <div className={styles.reward}>
              <span className={styles.rewardLabel}>UniCoins to Earn: </span>
              <span className={styles.rewardValue}> 
             { choredata.custom_rewards === "" && (
                <>
                 {choredata.reward_amount}
                </>
                )
              } 
            {choredata.custom_rewards}
              </span>
              </div>
              </div>
              <div className={styles.secondSection}>
              <div className={styles.title}>
          <h3>Chore: </h3>  {choredata.title} {choredata.is_reoccurring && "(Daily)"}
          </div>
          <div className={styles.message}>
          <h4 style={{marginBottom:"0.5rem"}}>Message</h4>
          {choredata.message}
              </div>
          <div className={styles.deadline}>
            <h4>
                Deadline: 
                </h4>
            {duedate}
          </div>
          </div>
          <div className={styles.fourthsection}>
          {choredata.completion === "started" &&
          (<>
            <div className={styles.msgsection} id="chore-msg">
            Remarks:
            <textarea
              maxLength="100"
              value={remark}
              onChange={(e) => setremark(e.target.value)}
              placeholder="remark goes here...."
              ></textarea>
            <p className={styles.lettersleft}>
              {lettercounts + " characters left"}
            </p>
            </div>
            <div className={styles.uploadedimg}>
               {/* {imageDisplay.map((image, index) => {
                let previewactive = false;
                const handlePreview = (index) =>{
                  setSelectedPreview(index);
                  if(selectedPreview === index)
                  {
                    setSelectedPreview(null);
                  }
                }
                const handleRemove = (image,index) =>  {
                  setSelectedRemove(image);
                  setIndex(index);
                }
                if(selectedPreview === index)
                {
                  previewactive = true;
                }
                return (
                  <div key={index} className={`${styles.preview} ${ previewactive && styles.previewActive }`}>
                  <Image alt="Image" layout='fill' className={styles.displayimg} src={image} />
                  <PreviewIcon className={styles.PreviewIcon} onClick={()=>{handlePreview(index)}} />
                  <CloseIcon className={styles.CloseIcon} onClick={()=>{handleRemove(image,index)}} />
                  </div>
              );
            })} */}
              </div>
            <div className={styles.inputImages}>
            {imagecounts === 0 ? (
              <button>Max limit Reached</button>
              )
              : (
                <input className={styles.inputImage} type="file" name="uploadedImages" accept='image/*' onChange={handleImage} multiple="multiple" />
                )
              }
            
            {imagecounts}/5
            </div>
              </>
              )
            }
            </div>
              <div className={styles.thirdSection}>
                <div className={styles.left}>
                    Sound: Click to listen to the message
                </div>
                <div className={styles.right}>
        {choredata.is_reoccurring &&
          JSON.stringify(choredata.latest_chore) !== "{}" ? (
              choredata.latest_chore.completion === "completion" ? (
                  <button className={styles.completedButton}>Completed</button>
                  ) : duetimeDifference(choredata?.latest_chore.due_date) ===
                  "Expired" ? (
                      <button
                      className={styles.expiredButton}
                      onClick={() =>
                        settoastdata({
                            show: true,
                            type: "success",
                            msg: "Oh oh time's up for this chore !",
                        })
                    }
                    >
                Expired
              </button>
            ) : choredata.latest_chore.completion === "approval" ? (
                <button
                className={styles.approvalButton}
                onClick={() =>
                    settoastdata({
                        show: true,
                        type: "success",
                        msg: "Waiting for approval !",
                    })
                }
                >
                <PendingSvg />
                Approval
              </button>
            ) : choredata.latest_chore.completion === "pending" ? (
                <button className={styles.startButton} onClick={handleMarkStart}>
                Start
              </button>
            ) : (
                <button
                className={styles.markDoneButton}
                onClick={handleMarkForApproval}
                // onClick={() => setOpenPhotoUpload(true)}
                >
                <RoundedTick />
                Mark as done
              </button>
            )
            ) : choredata.completion === "completed" ? (
                <button className={styles.completedButton}>Completed</button>
                ) : duetimeDifference(choredata?.due_date) === "Expired" ? (
                    <button
                    className={styles.expiredButton}
                    onClick={() =>
                        settoastdata({
                            show: true,
                            type: "success",
                            msg: "Oh oh time's up for this chore !",
                        })
                    }
                    >
              Expired
            </button>
          ) : choredata.completion === "approval" ? (
              <button
              className={styles.approvalButton}
              onClick={() =>
                settoastdata({
                    show: true,
                    type: "success",
                    msg: "Waiting for approval !",
                })
            }
            >
              <PendingSvg />
              Approval
            </button>
          ) : choredata.completion === "pending" ? (
              <button className={styles.startButton} onClick={handleMarkStart}>
              Start
            </button>
          ) : (
            <>
              <button
              className={styles.markDoneButton}
              onClick={handleMarkForApproval}
              // onClick={() => setOpenPhotoUpload(true)}
              >
              <RoundedTick />
              Mark as done
            </button>
            
                </>
          )}
          </div>
          </div>

          
          </div>
          </div>
    </div>
  )
}

export default KidChorePopUp