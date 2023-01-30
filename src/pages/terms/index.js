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
        <h1 className={styles.subheading}>Your privacy matters to us.</h1>
        <div className={styles.details} id="privacy-main">
          <h1>Delivery and Shipping policy</h1>
          <p> We provide digatal products only. The product is acessible to you instantly after payment.</p>
          <p>No physical items are shipped by us.</p>

          <h1>Refund and cancellation policy</h1>
          <p> We have a 24 hour refund policy.</p>

          <h1>Return and Refund Policy</h1>
          <p>Last updated: January 30, 2023</p>
          <p>Thank you for buying our paid plans at upsurge.</p>
          <p>This Return and Refund Policy (&quot;Return and Refund Policy&quot;) applies to all products and services offered by Surgeup Technologies Pvt LTD (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;).</p>
          <p>The following terms are applicable for any products that You purchased with Us.</p>
          <h1>Interpretation and Definitions</h1>
          <h2>Interpretation</h2>
          <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
          <h2>Definitions</h2>
          <p>For the purposes of this Return and Refund Policy:</p>
          <ul>
            <li>
              <p><strong>Application</strong> means the software program provided by the Company downloaded by You on any electronic device, named upsurge app</p>
            </li>
            <li>
              <p><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to Surgeup Technolologies Pvt LTD, Delhi, India.</p>
            </li>
            <li>
              <p><strong>Goods</strong> refer to the items offered for sale on the Service.</p>
            </li>
            <li>
              <p><strong>Orders</strong> mean a request by You to purchase Goods from Us.</p>
            </li>
            <li>
              <p><strong>Service</strong> refers to the Application or the Website or both.</p>
            </li>
            <li>
              <p><strong>Website</strong> refers to Upsurge, accessible from <a href="https://upsurge.in" rel="external nofollow noreferrer" target="_blank">https://upsurge.in</a></p>
            </li>
            <li>
              <p><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>
            </li>
          </ul>
          <h1>Your Order Cancellation Rights</h1>
          <p>You are entitled to cancel Your Order within 7 days by providing a solid reason for doing so.</p>

          <p>In order to exercise Your right of cancellation, You must inform Us of your decision by means of a clear statement. You can inform us of your decision by:</p>
          <ul>
            <li>By email: hello@upsurge.in</li>
          </ul>
          <p>We will reimburse You no later than 14 days. We will use the same means of payment as You used for the Order, and You may incur a small fees for such reimbursement.</p>

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
