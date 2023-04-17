import { useState } from "react";
import Modal from "../Modal";
import LoginApis from "../../actions/apis/LoginApis";
import VideoPlayer from "./videoPlayer";

export default function Onboarding({
  setOpen = () => {},
  actionHandler = () => {},
}) {
  const [watched, setwatched] = useState(false);
  async function closeOnBoardingVideo() {
    let response = await LoginApis.closeOnBoardingVideo({ watched: watched });
    if (response.data.success) {
      setOpen(false);
    } else {
      setOpen(false);
    }
  }

  /**
   * <iframe src="https://drive.google.com/file/d/1QzZ9zP2EP97mB-rwn-rgz4n6o081FB2M/preview" width="640" height="480" allow="autoplay"></iframe>
   */

  return (
    <Modal
      title={"Walkthrough upsurge"}
      actions={{
        cancelText: "Cancel",
        isCancel: false,
        handleCancel: () => {},
        proceedText: "Done",
        isProceed: true,
        handleProceed: closeOnBoardingVideo,
        proceedButtonType: "normal",
      }}
    >
      <VideoPlayer setwatched={setwatched} />
    </Modal>
  );
}
