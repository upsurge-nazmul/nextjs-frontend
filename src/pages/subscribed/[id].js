import { useRouter } from "next/dist/client/router";
import React, { useEffect, useRef, useState } from "react";
import LoginApis from "../../actions/apis/LoginApis";
import PaymentsApi from "../../actions/apis/PaymentsApi";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import Fb from "../../components/SVGcomponents/Fb";
import Insta from "../../components/SVGcomponents/Insta";
import LinkedIN from "../../components/SVGcomponents/LinkedInSvg";
import styles from "../../styles/waitlist/waitlist.module.scss";
import ConfirmInvoice from "../../components/ConfirmInvoice";
import { useReactToPrint } from "react-to-print";
import PageTitle from "../../components/PageTitle";

export default function Subscribed({ invoice_data, userdatafromserver }) {
  const [showauth, setshowauth] = useState(false);
  const [showpopup, setshowpopup] = useState(false);
  const [stickyheader, setstickyheader] = useState(false);
  const pdfRef = useRef(null);
  const router = useRouter();
  useEffect(() => {
    const handlescroll = () => {
      if (window.scrollY > 0) {
        setstickyheader(true);
      } else {
        setstickyheader(false);
      }
    };
    window.addEventListener("scroll", handlescroll);
    return () => window.removeEventListener("scroll", handlescroll);
  }, []);

  const handlerSave = useReactToPrint({
    content: () => pdfRef.current,
  });

  return (
    <div className={styles.waitlist}>
      <PageTitle />
      <Header
        stickyheader={stickyheader}
        showauth={showauth}
        setshowauth={setshowauth}
        setshowpopup={setshowpopup}
        showpopup={showpopup}
      />
      <div className={styles.container}>
        <div className={styles.green}></div>
        <div className={styles.white}></div>
        <div className={styles.ball4}></div>
        <div className={styles.yellow}></div>
        <p className={styles.heading3}>Subscription Confirmed </p>
        <div className={styles.line}></div>

        <p className={styles.heading2}>Thank you for subscribing!</p>
        <p className={styles.msg}>
          Your payment is successful you can check the invoice and download or
          print the invoice.
        </p>

        <div className={styles.invoiceContainer}>
          <div className={styles.invoiceWrapper}>
            <ConfirmInvoice data={invoice_data} ref={pdfRef} />
          </div>
          <div className={styles.btnContainer}>
            <button onClick={() => handlerSave()} className={styles.btn}>
              Print Invoice
            </button>
            {/* <button onClick={() => handlerSave()} className={styles.btn}>
              Download Invoice
            </button> */}
          </div>
        </div>
        <p className={styles.subheading}>
          To stay up to date at all times, follow us on.
        </p>
        <div className={styles.socials}>
          <a
            href="https://www.facebook.com/upsurgeindia/"
            target="_blank"
            rel="noreferrer"
          >
            <Fb className={styles.social} />
          </a>
          <a
            href="https://www.instagram.com/upsurge.in/"
            target="_blank"
            rel="noreferrer"
          >
            <Insta className={styles.social} />
          </a>
          <a
            href="https://www.linkedin.com/company/upsurgeindia/"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedIN className={styles.socialyt} />
          </a>
          {/* <Fb className={styles.social} />
          <Twitter className={styles.social} alt="" />
          <Insta className={styles.social} />
          <YtSvg className={styles.socialyt} />
          <LinkedIN className={styles.socialyt} /> */}
        </div>
        <div className={styles.goback} onClick={() => router.push("/")}>
          Go Back
        </div>
      </div>
      <Footer />
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
      return {
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    } else {
      let invoice_data = await PaymentsApi.getinvoice(
        { invoice_id: params.id },
        token
      );
      let invoice = "";
      console.log("IN", invoice_data);
      if (invoice_data && invoice_data.data) {
        if (invoice_data.data.success) {
          invoice = invoice_data.data.data;
        } else {
          if (invoice_data.data.data === "NO ACCESS") {
            invoice = "NO ACCESS";
          }
          invoice = "NOT FOUND";
        }
      } else {
        invoice = null;
      }
      return {
        props: {
          userdatafromserver: response.data.data,
          invoice_data: invoice,
        },
      };
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/?err=01&next=/dashboard/invoice/" + params.id,
      },
    };
  }
}
