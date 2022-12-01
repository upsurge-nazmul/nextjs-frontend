import React, { useState } from "react";
import ChoreApis from "../../actions/apis/ChoreApis";
import DashboardApis from "../../actions/apis/DashboardApis";
import { duetimeDifference } from "../../helpers/timehelpers";
import styles from "../../styles/Chores/chorepending.module.scss";
import PhotoUpload from "../PhotoUpload";
import ClockSvg from "../SVGcomponents/ClockSvg";
import RemoveSvg from "../SVGcomponents/RemoveSvg";
import ChorePendingModal from "./ChorePendingModal";

function ChorePending({ data, settoastdata, setchores, setallchores, setid }) {
  const [chorePhotoModal, setChorePhotoModal] = useState(false);
  const [choreImage, setChoreImage] = useState(
    "https://www.myenglishteacher.eu/blog/wp-content/uploads/2017/05/housekeeping-duties.png?ezimgfmt=rs:372x333/rscb38/ng:webp/ngcb38"
  );
  const [showModal, setShowModal] = useState(false);
  async function handleApprove() {
    let response = await ChoreApis.approvechore({ id: data.id });
    if (response && response.data && response.data.success) {
      settoastdata({ show: true, type: "success", msg: "done" });
      setchores((prev) => prev.filter((item) => item.id !== data.id));
      setallchores((prev) => prev.filter((item) => item.id !== data.id));
    } else {
      settoastdata({
        show: true,
        type: "success",
        msg: response?.data?.message || "Cannot reach server",
      });
    }
  }
  async function handleReject() {
    setid(data.id);
  }
  function getDueDate() {
    if (data.is_reoccurring) {
      if (JSON.stringify(data.latest_chore) !== "{}") {
        if (data.latest_chore.completion === "completed")
          return completedtimeDifference(data.latest_chore.completed_at);
        else {
          return duetimeDifference(data?.latest_chore?.due_date);
        }
      }
    }
    console.log("reaching");
    if (data.completion === "completed")
      return completedtimeDifference(data.completed_at);
    else {
      return duetimeDifference(data.due_date);
    }
  }
  return (
    <div className={styles.chorePending}>
      <img
        src={
          data?.img_url
            ? data?.img_url
            : data.category === "Bathroom"
            ? "/images/chores/bathroom.jpg"
            : "/images/chores/kitchen.png"
        }
        alt=""
      />
      <div className={styles.taskAndTo}>
        <div className={styles.task}>
          {data.title} {data.is_reoccurring && "(Daily)"}
        </div>
        <div className={styles.to}>{data.assigned_to}</div>
      </div>
      <div className={styles.time}>
        <ClockSvg />
        <p>{getDueDate()}</p>
      </div>

      <div
        className={styles.button}
        onClick={()=>{setShowModal(!showModal)}}
        // onClick={() => setChorePhotoModal(true)}
      >
        View
      </div>
      {showModal && (
        <ChorePendingModal setShowModal={setShowModal} showModal={showModal} data={data} getDueDate={getDueDate}
        settoastdata = {settoastdata} setchores={setchores} setallchores={setallchores} setid={setid}
        />
      )

      }
      <div className={styles.removebutton} onClick={handleReject}>
        <RemoveSvg />
      </div>
      {chorePhotoModal && choreImage && (
        <PhotoUpload
          title={"This image is provided for this chore"}
          setShowModal={setChorePhotoModal}
          defaultImage={choreImage}
          actionButtonTitle={"Approve"}
          actionHandler={() => {}}
        />
      )}
    </div>
  );
}

export default ChorePending;
