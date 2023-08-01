import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/Dashboard/redeemsection.module.scss";
import Jasper from "../../components/SVGcomponents/Jasper";
import ModernInputBox from "../../components/ModernInputBox";
import DashboardApis from "../../actions/apis/DashboardApis";
import { UniCoinValue } from "../../../config";
import { MainContext } from "../../context/Main";
export default function RedeemSection({
  unicoins,
  balance,
  settoastdata,
  user_unicoin,
  setuser_unicoin,
  user_balance,
  setuser_balance,
}) {
  const [showinput, setshowinput] = useState(false);
  const [unicointoconvert, setunicointoconvert] = useState("");
  const [err, seterr] = useState("");
  const { userdata } = useContext(MainContext);

  async function convert() {
    seterr("");
    if (unicointoconvert > user_unicoin) {
      seterr("You do not have enough unicoins");
      return;
    }
    if (unicointoconvert < 100) {
      seterr("Minimum unicoins that can be converted is 100");
      return;
    }
    let response = await DashboardApis.convertUnicoins({
      unicoins: unicointoconvert,
    });
    if (response && response.data.success) {
      setuser_unicoin(response.data.data.updated_unicoins);
      setuser_balance(response.data.data.updated_balance);
      settoastdata({
        show: true,
        type: "success",
        msg: "Converted successfully",
      });
    } else {
      seterr(response.data.message || "Couldn't connect to server");
    }
  }

  useEffect(() => {
    seterr("");
  }, [unicointoconvert]);

  return (
    <div className={styles.head}>
      <div className={styles.left}>
        <p className={styles.heading}>You currently have</p>
        <div className={styles.coinflex}>
          <p className={styles.unicoins}>
            <span>
              {userdata
                ? userdata.num_unicoins > 1000
                  ? userdata?.num_unicoins / UniCoinValue + "K "
                  : userdata.num_unicoins
                : 0}
            </span>{" "}
            Unicoins
          </p>
          {/* <p className={styles.or}>or</p>
          <p className={styles.rupees}>
          <span>
          {userdata?.num_unicoins
            ? (Number(userdata.num_unicoins) / UniCoinValue).toFixed(2)
            : 0}
            </span>{" "}
            Rupees
          </p> */}
        </div>
        <p style={{ marginTop: "1rem" }}>
        Rewards make learning even more fun - here are all the rewards you can earn!
        </p>

        {/* {err && <p className={styles.converstiondetails}>{err}</p>} */}
        {/* <div className={styles.converstiondiv}>
          {showinput && (
            <ModernInputBox
              setvalue={setunicointoconvert}
              value={unicointoconvert}
              maxValue={unicoins}
              extrastyle={{ marginBottom: 0, height: "fit-content" }}
              extraclass={
                unicointoconvert ? styles.placeholderactive : styles.input
              }
              numOnly
              placeholderClass={styles.placeholder}
              placeholder="Unicoins to convert"
            />
          )}
          <div
            className={styles.converbutton}
            style={{ marginLeft: !showinput ? 0 : "15px" }}
            onClick={(e) => {
              if (showinput) {
                convert();
              } else {
                setshowinput(true);
              }
            }}
          >
            {!showinput ? "Convert unicoins" : "Convert"}
          </div>
        </div> */}
      </div>
      <div className={styles.right}>
        <Jasper className={styles.jasper} />
      </div>
    </div>
  );
}
