import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import Header from "../../components/Header/Header";
import LeftPanel from "../../components/LeftPanel";
import PageTitle from "../../components/PageTitle";
import Curve1 from "../../components/SVGcomponents/Curve1";
import Curve2 from "../../components/SVGcomponents/Curve2";
import styles from "../../styles/privacy/privacy.module.scss";

function PrivacyPolicy() {
  const router = useRouter();
  const [endreached, setendreached] = useState(true);
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [showpopup, setshowpopup] = useState(false);
  const [stickyheader, setstickyheader] = useState(false);

  return (
    <div className={styles.privacyPage}>
      <PageTitle />
      <Header
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        setshowauth={setshowauth}
        stickyheader={stickyheader}
        showpopup={showpopup}
        setshowpopup={setshowpopup}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <Curve1 className={styles.curve1} />
      <Curve2 className={styles.curve2} />

          <div className={styles.mainContent}>
              <h1 className={styles.heading}>Hi, welcome to Upsurge.</h1>
              <div className={styles.details} id="privacy-main">\

                  <h2 id="return-refund-policy">Return/Refund Policy</h2>
                  <p>i. Our platform provides free limited access to the App and some content after logging in. You can decide based on this whether to subscribe or not. We stand by the quality and depth of the content we provide and Customer may make the refund request within 7 days from subscription. Further, all payments on this platform will be irrevocable, non-refundable, non-transferable and non-creditable, if request made beyond the aforesaid period of 7 days. </p>
                  <p>ii. At <strong>Upsurge</strong> (hereinafter referred as <strong>platform</strong>), we can decide the process for crediting the applicable refund against the various acceptable conditions, If the payment for subscription was done from your side, then a refund for such payment will be processed to your original payment method. </p>
                  <p>iii. Following are the conditions applicable on the refund process: </p>
                  <table>
                      <thead>
                          <tr>
                              <th></th>
                              <th></th>
                              <th></th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td><strong>Available refund method</strong></td>
                              <td><strong>Refund Time-frame</strong></td>
                              <td></td>
                          </tr>
                          <tr>
                              <td><strong>  Prepaid</strong></td>
                              <td></td>
                              <td></td>
                          </tr>
                          <tr>
                              <td>OTHERS Wallet&#39;s</td>
                              <td>Within 24 working hours, the refund will be initiated and it will take upto 7-10 working days to reflect into your original source account it may vary from time to time.</td>
                              <td></td>
                          </tr>
                          <tr>
                              <td>Credit Card/ Debit Card</td>
                              <td></td>
                          </tr>
                          <tr>
                              <td>Net Banking Account (Credited to Bank Account)</td>
                              <td></td>
                          </tr>
                          <tr>
                              <td>UPI Linked Bank Account</td>
                              <td></td>
                          </tr>
                          <tr>
                              <td>Chargeback</td>
                              <td></td>
                          </tr>
                      </tbody>
                  </table>

                  <h2>Contact Us</h2>
                  <p>If you have any questions about our Returns and Refunds Policy, please contact us:</p>
                  <ul>
                      <li>By email: hello@upsurge.in</li>
                  </ul>
              </div>

          </div>
    </div>
  );
}

export default PrivacyPolicy;
