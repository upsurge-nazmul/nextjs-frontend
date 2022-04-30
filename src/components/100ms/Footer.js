import { useAVToggle } from "@100mslive/react-sdk";

export default  function ConferenceFooter() {
  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } =
    useAVToggle();
  return (
    <div className="control-bar">
      <button className="btn-control" onClick={toggleAudio}>
        {isLocalAudioEnabled ? "Mute" : "Unmute"}
      </button>
      <button className="btn-control" onClick={toggleVideo}>
        {isLocalVideoEnabled ? "Hide" : "Unhide"}
      </button>
    </div>
  );
}

