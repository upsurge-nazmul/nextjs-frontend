import styles from "../../styles/GeneralComponents/addChildSuccess.module.scss";
import {useState} from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
export default function AddChildSuccess({
  name,
  userName,
  password,
  clickHandler = () => {},
}) {
  const CopyContent = dynamic(() => import("./CopyClipboard").then(mod => mod.CopyClipboard), { ssr: false })
  const [shareWhatsApp,setshareWhatsApp] = useState(`whatsapp://send?text= Username: ${userName} Password: ${password}`);
  const textToCopy = `Username: ${userName} Password: ${password}`;
  const [classState, setClassState] = useState(false);
  return (
    <div className={styles.popup}>
      <div className={styles.background}></div>
      <div className={styles.content}>
        <div className={styles.bodyArea}>
          <div className={styles.bodyTitle}>
            Now <span className={styles.name}>{name}</span> can login using
          </div>
          <div className={styles.bodyItem}>
            <span className={styles.label}>Username: </span>
            <span className={styles.value}>{userName}</span>
          </div>
          <div className={styles.bodyItem}>
            <span className={styles.label}>Password: </span>
            <span className={styles.value}>{password}</span>
          </div>
        </div>
        <div className={styles.actionArea}>
          <button className={styles.nextButton} onClick={clickHandler}>
            Done
          </button>
            <Link href = {`${shareWhatsApp}`} passHref>
            <div className={styles.shareButton}>
            Share
            <WhatsAppIcon
                className={styles.WhatsAppIcon}
              />
            </div>
            </Link>
            <div className={styles.textToCopy} onClick={()=>{setClassState(true)}} >
              <span className={styles.textToCopyToolTip}>Click to Copy</span>
              <span className={classState ? styles.textToCopyToolTip : styles.none}>Copied</span>
              <CopyContent content={textToCopy} />
            </div>
        </div>
      </div>
    </div>
  );
}
