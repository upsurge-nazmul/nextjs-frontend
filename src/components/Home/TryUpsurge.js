import React,{useContext, useState} from 'react'
import { MainContext } from "../../context/Main";
import Spinner from "../Spinner";
import styles from "../../styles/Home/tryupsurge.module.scss";
function TryUpsurge({content,setauthmode,
    setshowauth,inSection }) {
    const {userdata} = useContext(MainContext);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  async function signup(e) {
    e?.preventDefault();
    setloading(true);
    // setshowpopup(true);
    setshowauth(true);
    setauthmode("parent");
    setloading(false);
  }
  return (
    <>
    {userdata ? (null
        ) : (<>
          <p className={styles.error}>{error}</p>
          <div className={`${styles.signupBox} ${error && styles.errsignbox}`}>
            {!loading ? (
                <div className={`${inSection? styles.inDasButton : styles.button}`} onClick={signup}>
                {content}
              </div>
            ) : (
              <div className={`${styles.button} ${styles.spinner_btn}`}>
                <Spinner />
              </div>
            )}
          </div>
            </>
        )}
    </>
  )
}

export default TryUpsurge