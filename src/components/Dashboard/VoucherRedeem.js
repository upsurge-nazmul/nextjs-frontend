import React, { useEffect, useState } from "react";
import styles from "../../styles/ParentStore/voucherpopup.module.scss";
import validator from "validator";
import { useRouter } from "next/dist/client/router";
import DashboardApis from "../../actions/apis/DashboardApis";
import PaymentSuccessSvg from "../SVGcomponents/PaymentSuccessSvg";
import PaymentSuccessBackground from "../SVGcomponents/PaymentSuccessBackground";
import Loader from "../Loader";
import DropDown from "../DropDown";
import CancelIcon from "@mui/icons-material/Cancel";
import Spinner from "../Spinner";
export default function VoucherRedeem({
  userdata_email,
  userdata_phone,
  quantity,
  setshowpopup,
  prices,
  data,
  setuser_balance,
  kidsdata,
}) {
  const [email, setemail] = useState(userdata_email || "");
  const [error, seterror] = useState("");
  const [phone, setphone] = useState(userdata_phone || "");
  const [success, setsuccess] = useState(false);
  const [interval, setinterval] = useState(null);
  const [progress, setprogress] = useState(0);
  const [loading, setloading] = useState(false);
  const [selectedchild, setselectedchild] = useState(null);
  const [childs, setchilds] = useState([]);
  const [selectedchilddata, setselectedchilddata] = useState([]);
  const router = useRouter();
  useEffect(() => {
    kidsdata.forEach((kid) => {
      setchilds((prev) => [...prev, kid.first_name]);
    });
    setselectedchild(kidsdata[0].first_name);
  }, [kidsdata]);
  useEffect(() => {
    setselectedchilddata(
      kidsdata[kidsdata.findIndex((item) => item.first_name === selectedchild)]
    );
  }, [selectedchild]);
  useEffect(() => {
    seterror("");
  }, [selectedchild]);
  async function handleUpdateData() {
    seterror("");
    if (!selectedchild) {
      seterror("Select a child first");
      return;
    }
    if (!validator.isMobilePhone(phone, "en-IN")) {
      seterror("Invalid phone number");
      return;
    }
    if (quantity < 1) {
      seterror("Quantity must be greater than zero");
      return;
    }
    setinterval(
      setInterval(() => {
        setprogress((prev) => {
          if (prev + 1 > 90) {
            return 90;
          }
          return prev + 1;
        });
      }, 100)
    );
    setloading(true);
    let res = await DashboardApis.ordervouchers({
      productId: data.productId,
      denomination: prices / process.env.NEXT_PUBLIC_UNICOIN_VALUE,
      quantity,
      vendor: "xoxo",
      name: data.name,
      img_url: data.imageUrl,
      child_id: selectedchilddata.id,
    });
    setprogress(100);
    clearInterval(interval);
    if (res && res.data.success) {
    } else {
      seterror(res?.data?.message || "Error connecting to server");
    }
    setsuccess(true);
    setloading(false);
  }

  return (
    <div className={styles.waitlistpopup}>
      <div
        className={styles.background}
        onClick={() => {
          router.reload();
          setshowpopup(false);
        }}
      ></div>

      <div className={styles.block}>
        {!success ? (
          <div className={styles.childselector}>
            <p className={styles.heading}>Select child to redeem for</p>
            <DropDown
              className={styles.childdropdown}
              placeholder="Select child"
              options={childs}
              value={selectedchild}
              keyprefix="selectchilddropdown"
              setvalue={setselectedchild}
            />
            {selectedchilddata && (
              <div className={styles.unicoin}>
                <span>{selectedchild}</span> has{" "}
                {selectedchilddata.num_unicoins > 1000
                  ? selectedchilddata.num_unicoins / 1000 + "K "
                  : selectedchilddata.num_unicoins + " "}{" "}
                UniCoins.
              </div>
            )}
            {error && <p className={styles.error}>{error}</p>}
            <div
              className={styles.btn}
              onClick={() => {
                if (!loading) handleUpdateData();
              }}
            >
              {loading ? <Spinner /> : "Redeem"}
            </div>
          </div>
        ) : error ? (
          <div className={styles.approveModalcontainer}>
            <div className={styles.heading}>
              <div className={styles.text}>
                <p>Oops!</p>
                <p className={styles.payment}>
                  {error || `There was some issue, please try again later.`}
                </p>
              </div>
            </div>

            <div className={styles.svgholder}>
              <CancelIcon className={styles.cancelicon} />
              <PaymentSuccessBackground className={styles.backsvg} />
            </div>
            <div className={styles.button} onClick={() => setshowpopup(false)}>
              Done
            </div>
          </div>
        ) : (
          <div className={styles.approveModalcontainer}>
            <div className={styles.heading}>
              <div className={styles.text}>
                <p>Thank You!</p>
                <p className={styles.payment}>Purchase was successful.</p>
              </div>
            </div>

            <div className={styles.svgholder}>
              <PaymentSuccessSvg className={styles.ticksvg} />
              <PaymentSuccessBackground className={styles.backsvg} />
            </div>
            <div
              className={styles.button}
              onClick={() => {
                router.reload();
                setshowpopup(false);
              }}
            >
              Done
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
