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
          <h1 id="privacy-policy">PRIVACY POLICY</h1>
          <p>This Privacy Policy (“Privacy Policy/Policy”) discloses the privacy practices for <strong>Surgeup Technologies Private Limited</strong> (“Upsurge”, “We/we” or “Us/us”) with regard to collection and use of the Personal Information (defined hereunder) of the customers, vendors, employees and the users (“You/you” or “Your/your”) and use of the online platform “<strong>Upsurge</strong>”.  This Privacy Policy along with Terms of Use describes our practices regarding, including your choices in relation to how we collect, store, use, share and secure your Personal Information across our Website and Mobile application called “<strong>Upsurge”-Made in India</strong>. The website and mobile application are referred to as the “<strong>Platform</strong>” It also describes your choices regarding use, access and correction of your Personal Information and your rights in relation to your Personal Information and how to contact us or supervisory authorities in the event you have a complaint.</p>
          <p>By providing your consent to this Privacy Policy and accepting the Terms of Use, you agree to the collection, use and transfer of your Personal Information as set out in this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not use/access this Website or application.</p>
          <p>We will review this Privacy Policy from time to time to make sure it is up to date. If you are just a visitor, then please note that this Privacy Policy is subject to change at any time without notice. To make sure you are aware of any changes, please review this Policy periodically. If you are our registered user, we will notify you before we make changes to this Policy and give you the opportunity to review the revised Policy before you choose to continue using our services.  </p>
          <p>By Personal Information, we mean any information that can either itself identify you as an individual (&quot;Personally Identifying Information&quot;) or that can be connected to you indirectly by linking it to Personally Identifying Information. Please note that usage of the term Personal Information in this Privacy Policy includes sensitive personal data or information, wherever appropriate and/or mandated under applicable laws. </p>
          <h2 id="collection-of-information">COLLECTION OF INFORMATION</h2>
          <p>As a visitor, you can browse our website or application to find out more about our platform. You are not required to provide us with any Personal Information as a visitor. When you visit the Website or application, we collect and store certain information to improve security, analyse trends and administer the Website and application with a view to assist us in improving customer experience. We use this information to evaluate traffic patterns on our platform so that we can make it more useful to our visitors.   </p>
          <p>We collect your Personal Information when you register with us, when you express an interest in obtaining information about us or our products and services, when you participate in activities on our platform or otherwise contact us.  </p>
          <p>We will only collect your Personal Information if we have a proper reason for doing so, e.g.: to comply with our legal and regulatory obligations; for the performance of our contract with you or to take steps at your request before entering into a contract; for our legitimate interests (where permitted by law) or those of a third party; or where you have given consent. </p>
          <p>In some cases, we may also have a legal obligation to collect Personal Information from you or may otherwise need the Personal Information to protect your vital interests or those of another person (for example, to prevent payment fraud or confirm your identity.)   </p>
          <p>Our primary goal in collecting your Personal Information is to provide you a safe, efficient, smooth, and customized experience. This allows us to provide courses, study material, tutorials, educational games that most likely meet your needs and to customize our Platform to make your experience safer and easier. We also use your Personally Identifiable Information together with other information to help us better understand our users and to improve the content and functionality of our Platform. The information we learn from you helps us personalize and continually improve your experience at our Platform.  We do not voluntarily make this information available to third parties, nor do we use it for any other purpose, except as set out herein.  </p>
          <p>When you visit our Platform, as part of a purchase of products and services or registering on our platform, we may collect a variety of Personal Information that you will voluntarily provide to us via one of our contact forms, via a chat or phone session, such as:   </p>
          <ul>
            <li>Contact Information, such as name, email address, display picture, mailing address, phone number, IP address, geographic location, or phone number.     </li>
            <li>Billing Information, such as debit card number, credit card number and billing address.   </li>
            <li>Unique Identifiers, such as username or password.   </li>
            <li>Reviews or ratings, account settings, (including preferences set in the &quot; Account &quot; section of our platform); and   </li>
            <li>Information provided to us through our service, interaction with our customer service, participation in surveys or marketing promotions.  </li>
          </ul>
          <p>We collect information about you and your use of our service, your interactions with us as well as information regarding your computer or other device used to access our service. This information includes your activity on our platform, details of your interactions with customer service , such as the date , time and  reason for contacting us, transcripts of any chat conversations, and if you call us , your phone number and call recordings; device  IDs or other unique identifiers, device and software characteristics (such as type and configuration), connection information,  statistics on page views , referring source (for example, referral URLs), IP address (which may tell us your general location),  browser and standard web server log information, information collected via the use of cookies, web beacons and other  technologies.   </p>
          <p>If you use a feature that requires payment of a fee options like NEFT, or Card will appear. In case of payments via credit or debit card, we will redirect you to registered payment gateways such as razorpay and other such registered gateways. You may store and save your payment details like card numbers with the gateway. We do not have access to this data. All payment transactions are processed through secure payment gateway providers.  We do not store any card information (other than the last 4 digits of your card) in our servers. </p>
          <p>When you use one of our paid products, we track the web pages, and information that has been accessed by you, and store it on our servers. This enables us to track items that you have completed, and those that you need to see.</p>
          <p>Upsurge can use technologies such as cookies, clear gifs, log files, and flash cookies for several purposes, including to help understand how you interact with our platform and services, to provide a better experience.</p>
          <h2 id="usage-and-retenton-of-information">USAGE AND RETENTON OF INFORMATION</h2>
          <p>We use the Personal Information we collect, where it is necessary to deliver the services, you have requested, where it is necessary to exercise or comply with legal rights or obligations or for normal business purposes of the kind set out in this Policy.  </p>
          <p>We will use your Personal Information to provide, analyze, administer, and improve our services, to provide you with a personalized experience on our Platform (especially, by offering you services that is best suited for you), to contact you about your account and our services, to provide you customer service, to provide you with personalized marketing and to detect, prevent, mitigate and investigate fraudulent or illegal activities.   </p>
          <p>We further use your Personal Information to determine your general geographic location and  recommendations, determine your internet service provider, and  help us quickly and efficiently respond to inquiries and requests and enforcing our terms (such as determining free trial eligibility)  and communicate with you concerning our service (for example by email, push notifications, text messaging ,and online  messaging channels), so that we can send you details about new features and content available on the platform, special offers,  promotional announcements, surveys, and to assist you with operational requests such as password reset requests.  </p>
          <p>Upsurge is a community. We offer several features that allow members to connect and communicate in public or semi-public spaces, such as Forums and Teams. Please be sensible and judge before posting in these community spaces or sharing your Personal Information with others on Upsurge. Be aware that any Personal Information you submit there can be read, collected, or used by others, or could be used to send you unsolicited messages.   </p>
          <p>Upsurge do not retain your Personal Information for longer than is required for the purposes for which the information may be lawfully used. </p>
          <h2 id="sharing-and-disclosing-personal-information">SHARING AND DISCLOSING PERSONAL INFORMATION</h2>
          <p>We use other companies, agents, or contractors (&quot;Service Providers&quot;) to perform services on our behalf or to assist us with the provision of services to you. We engage Service Providers to provide marketing, advertising, communications, infrastructure, and IT services, to personalize and optimize our service, to process credit card transactions or other payment methods, to provide customer service, to collect debts, to analyze and enhance data (including data about users’ interactions with our service), and to process and administer consumer surveys. In the course of providing such services, these Service Providers may have access to your Personal Information or other information. We do not authorize them to use or disclose your Personal Information except in connection with providing their services.  </p>
          <p>Note to our customers in Europe: We transfer your Personal Information from the European Economic Area a to India. By submitting your data and/or using our services, you consent to the transfer, storing, and processing of your Personal Information in India.  </p>
          <h2 id="security">SECURITY</h2>
          <p>We shall try to take all precautions to protect the Personal Information both online and offline. We will try to protect your information using technical and administrative security measures to reduce the risks of loss, misuse, unauthorized access, disclosure, and alteration. We have standard SSL certification which basically helps us create a secure connection between our server and user to render any information or action. Some of the safeguards we use are firewalls and data encryption, physical access controls to our data centers and information access authorization controls. Only user passwords are encrypted and stored because generally users use the same password on multiple sites, to prevent any kind of theft, piracy, or unauthorized access. If you believe your account has been abused or hacked, please contact us by sending us an email at karan@upsurge.in.   </p>
          <p>We do not sell, transfer, or rent your Personal Information to third parties for their marketing purposes without your explicit consent and we only use your information as described in the Privacy Policy. We view protection of your privacy as a very important community principle. We understand clearly that you and your Personal Information is one of our most important assets.  </p>
          <p>We store and process your Personal Information on computers located in India that are protected by physical as well as technological security devices. We use third parties to verify and certify our privacy principles. If you object to your Personal Information being transferred or used in this way, please do not accept this Privacy Policy.   </p>
          <p>Under no circumstances, we rent, trade, transfer or share your Personal Information that we have collected with any other company for their marketing purposes without your consent. We reserve the right to communicate your Personal Information to any third party that makes a legally compliant request for its disclosure.   </p>
          <h2 id="keeping-your-personal-information-secure">KEEPING YOUR PERSONAL INFORMATION SECURE</h2>
          <p>We have appropriate security measures to prevent your Personal Information from being accidentally lost or used or accessed unlawfully.  Processing your Personal Information will be done only in an authorized manner and subject to a duty of confidentiality. We also have procedures in place to deal with any suspected data security breach. We will notify you about any applicable regulator of a suspected data security breach where we are legally required to do so.   </p>
          <p>Notwithstanding anything contained anywhere in this Policy; we cannot assure absolute security to your Personal Information and by entering or by logging into our Platform, you explicitly agree not to sue us for any data breach.   </p>
          <h2 id="cookies">COOKIES</h2>
          <p>We transfer cookies, which are small files containing a string of character, to your IP address, giving the browser distinct identification, to keep track of the user’s preferences. Furthermore, these files also help in logging-in faster and they act as a mechanism to determine user trends. The data thus retrieved from the user’s IP address, enables us to enhance our offers, including but not limited to more content in areas of greater interest to most users.   </p>
          <p>Our platform uses &quot;Cookies&quot; to identify the areas of our website or mobile application that you have visited. A Cookie is a small piece of data stored on your computer or mobile device by your web browser. We use Cookies to personalize the Content that you see on our platform.  Most web browsers can be set to disable the use of Cookies. However, if you disable Cookies, you may not be able to access functionality on our Platform correctly or at all. We never place Personally Information in Cookies.   </p>
          <h3 id="third-parties-and-links">THIRD PARTIES AND LINKS</h3>
          <p>We may pass your details to other companies in our group. We may also pass your details to our agents and subcontractors to help us with any of our uses of your data set out in our Privacy Policy. For example, we may use third parties to assist us with delivering services to you, to help us to collect payments from you, to analyse data and to provide us with marketing or customer service assistance. </p>
          <p>We may exchange information with third parties for the purposes of fraud protection and credit risk reduction. We may transfer our databases containing your Personal Information if we sell our business or part of it. Other than as set out in this Privacy Policy, we shall NOT sell or disclose your Personal Information to third parties without obtaining your prior consent unless it is necessary for the purposes set out in this Privacy Policy or unless we are required to do so by law. The platform may contain advertising of third parties and links to other sites or frames of other sites. Please be aware that we are not responsible for the privacy practices or content of those third parties or other sites, nor for any third party to whom we transfer your data in accordance with our Privacy Policy. </p>
          <p>Our Platform may contain links to other websites that are not under our direct control. These websites may have their own policies regarding privacy. We have no control of or responsibility for linked websites and provide these links solely for the convenience and information of our visitors. You are accessing such linked websites shall be at your own risk. These websites are not subject to this Privacy Policy. You should check the privacy policies, if any, of those individual websites to see how the operators of those third-party websites will utilize your personal information. In addition, these websites may contain a link to websites of our affiliates.  The websites of our affiliates are not subject to this Privacy Policy, and you should check their individual privacy policies to see how the operators of such websites will utilize your personal information.   </p>
          <h3 id="consulting">CONSULTING</h3>
          <p>We use third parties to help us provide services to You including the fulfilment of service, processing of payments, monitoring site activity, conducting surveys, maintaining our database, administering emails, and administering contents, and to provide aggregate, comparative information on the performance of our platform to us and a select group.   </p>
          <h3 id="choice">CHOICE</h3>
          <p>It is open for you to customize our usage of your personal information to communicate with you, to send you marketing information, how we provide you with customized and relevant advertising, and whether you want to stay signed into your account.</p>
          <p>If you do not wish to receive marketing communications from us, you can unsubscribe from the link in the email you would receive or change your communication preferences or indicate your communication preferences. You can also reach us via chat, WhatsApp, call or email to block promotional communication to you. Keep in mind, we do not sell or rent your personal information to third parties for their marketing purposes without your explicit consent. </p>
          <h2 id="ownership-of-rights">OWNERSHIP OF RIGHTS</h2>
          <p>All rights, including copyright, in this platform are owned by or licensed to us. Any use of this Website and mobile application or its contents, including copying or storing it or them in whole or part, other than for your own personal, non-commercial use is prohibited without our permission. You are prohibited from modifying, copying, distributing, transmitting, displaying, printing, publishing, selling, licensing, creating derivative works or using any content available on or through our platform for commercial or public purposes.  You may not modify, distribute or re-post something on this platform for any purpose.   </p>
          <p>The Site contains copyrighted material, trademarks, and other proprietary information, including, but not limited to, text, software, photos, video, graphics, music, sound, and the entire contents of Upsurge is protected by copyright as a collective work under the applicable copyright laws. Upsurge owns a copyright in the selection, coordination, arrangement, and enhancement of such content, as well as copyright or license to use in the content original to it. You may not modify, publish, transmit, participate in the transfer or sale, create derivative works, or in any way exploit, any of the content, in whole or in part. You may download / print / save copyrighted material for your personal use only. Except as otherwise expressly stated under copyright law, no copying, redistribution, retransmission, publication, or commercial exploitation of downloaded material without the express permission of Upsurge is permitted. If copying, redistribution, or publication of copyrighted material is expressly permitted by Upsurge, then no changes in or deletion of author attribution, trademark legend or copyright notice shall be made.   </p>
          <p>You acknowledge that you do not acquire any ownership rights by downloading copyrighted material. Trademarks that are located within or on our Website or a website otherwise owned or operated in conjunction with Upsurge shall not be deemed to be in the public domain but rather the exclusive property of Upsurge, unless such site is under license from the trademark owner thereof in which case such license is for the exclusive benefit and use of Upsurge, unless otherwise stated.   </p>
          <p>Upsurge does not have any express burden or responsibility to provide you with indications, markings, or anything else that may aid you in determining whether the material in question is copyrighted or trademarked. You shall be solely liable for any damage resulting from any infringement of copyrights, trademarks, proprietary rights or any other harm resulting from such a submission.  By submitting material to any public area of the Website, you warrant that the owner of such material has expressly granted Upsurge the royalty-free, perpetual, irrevocable, non-exclusive right and license to use, reproduce, modify, adapt, publish, translate and distribute such material (in whole or in part) worldwide and/or to incorporate it in other works in any form, media or technology now known or hereafter developed for the full term of any copyright that may exist in such material. You also permit any other end user to access, view, store or reproduce the material for that end user&#39;s personal use. You hereby grant Upsurge, the right to edit, copy, publish and distribute any material made available on the Platform by you. If you come across any abuse or violation of these Terms, please report to karan@upsurge.in</p>
          <h3 id="your-rights-in-relation-to-personal-information-collected-by-us">YOUR RIGHTS IN RELATION TO PERSONAL INFORMATION COLLECTED BY US</h3>
          <p>You have the right to withdraw your consent at any time in writing by sending an e-mail to us at karan@upsurge.in, in accordance with the terms of this Privacy Policy. However, please note that withdrawal of consent will not be retrospective in nature and shall be applicable prospectively. </p>
          <p>You may write to us at karan@upsurge.in to access, review, modify or correct your Personal Information or withdraw your consent to provide Personal Information. We are not responsible for the authenticity of the information provided by you.</p>
          <p>You agree and acknowledge that Your right to access, modify and/or withdrawing Your consent to provide Personal Information as mentioned above may be denied or limited by us, as may be required under any applicable law, law enforcement requests or under any judicial proceedings. </p>
          <p>Under Rule 5 (5) of the Rule 5 (5) of the <em>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</em>(“<strong>Rules</strong>”) any data (personal information and sensitive personal information) collected by us from you, shall not be used for any purpose other than what was specified at the time of its collection. Under Rule 5(6) of the Rules, you have a right to ask us to review, correct and amend the information we collect about you at any point in time. Under Rule 5(7) of the Rules, you also have the right to revoke your consent to the collection of your information going forward. However, please note that revoking your consent may negatively affect your use of the Platform.</p>
          <h2 id="children-s-information">Children&#39;s Information</h2>
          <p>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</p>
          <p>Upsurge does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records</p>
          <h2 id="conditions-of-use">CONDITIONS OF USE</h2>
          <p>Licensee does not warrant that this Website or Mobile application, its servers, or email sent by us or on our behalf are virus free. We will not be liable for any damages of any kind arising from the use of this platform, including, but not limited to compensatory, direct, indirect, incidental, punitive, special, or consequential damages, loss of data, goodwill, business opportunity, income or profit, loss of or damage to property and claims of third parties.   </p>
          <p><strong>GRIEVANCE OFFICER </strong></p>
          <p>Any discrepancies and grievances with respect to processing of Personal Information shall be informed to the designated Grievance Officer as mentioned below:</p>
          <p>Name: Karan Baweja</p>
          <p>Designation: Grievance Officer</p>
          <p>Email ID: karan@upsurge.in </p>
          <p><strong>CONSENT TO THE POLICY </strong></p>
          <p>The Terms of Use Agreement is incorporated herein by reference in its entirety.   </p>
          <h2 id="general">GENERAL</h2>
          <p><strong>Modification:   </strong></p>
          <p>We may at any time modify the Terms of Use of our Website without any prior notification to you. Should you wish to terminate your account due to a modification to the Terms or the Privacy Policy, you may do so email us at_ karan@upsurge.in . However, if you continue to use the service you shall be deemed to have agreed to accept and abide by the modified Terms of this Website.   </p>
          <p><strong>Privileged/Exclusive Service:   </strong></p>
          <p>By having an Upsurge account, you have explicitly given consent for us to capture images (followed by analysis), camera/mic permissions to make video calls and record the same.</p>
          <p>Upsurge May Disclose Information:</p>
          <ul>
            <li>as required by law, such as to comply with a subpoena, or similar legal process;   </li>
            <li>to enforce applicable ToU (Terms of Use), including investigation of potential violations thereof;  </li>
            <li>when we believe in good faith (doctrine of uberrima fides) that the disclosure is necessary to protect our rights, protect your safety or the safety of others, investigate fraud, address security or technical issues or respond to a government request;   </li>
            <li>with our trusted service providers who work on our behalf and do not have an independent use of the information we disclose to them and have agreed to and adhered to the rules set forth in this </li>
          </ul>
          <p><strong>Policy:   </strong></p>
          <ul>
            <li>to protect against imminent harm to the rights, property or safety of the Application/Website or our users or the public as required or permitted by law;  </li>
            <li>with third party service providers in order to personalize the Application/Website/Services/products for a better user experience and to perform behavioral analysis;  </li>
          </ul>
          <p><strong>Governing Law and Jurisdiction:</strong></p>
          <p>In the event of any dispute arising between the parties with respect to this Agreement, the same shall be referred to the Sole Arbitrator appointed by the company and the arbitration shall be in accordance with Arbitration and Conciliation Act of 1996. The language of arbitration proceedings shall be English. The seat and place of arbitration shall be Delhi and the decision of the Arbitrator shall be final and binding on both parties herein.   </p>
          <p>This contract shall be subject to the exclusive jurisdiction of courts in Delhi, India and shall be governed by the Indian laws.</p>



          <h2 id="upsurge-children-s-privacy-policy-">Upsurge <strong>Children’s Privacy Policy</strong></h1>
          <h3 id="overview">Overview</h3>
          <p>Upsurge is dedicated to making learning awesome and we take the privacy of our users seriously. Keeping Children&#39;s personal information safe is a priority at Upsurge. This Children Privacy Policy explains how we use the personal information we collect from and about Children’s when they engage with Upsurge. As set forth below, we use such personal information solely as a service provider.</p>
          <p>To learn about our practices with respect to other users, who sign up for Upsurge and student accountholders who use Upsurge, please read our Privacy Policy.</p>
          <h3 id="2-our-handling-of-student-information-">2. Our handling of student information**</h3>
          <p>As a trusted provider of tools that help make learning awesome for Children&#39;s, Upsurge is particularly concerned about the use of Children&#39;s personal information. and we comply with privacy laws, such as the Privacy Act and the Children’s Online Privacy Protection Act (“COPPA”), as applicable.</p>
          <p>Upsurge does not collect, retain, use or share Children&#39;s personal information, except as necessary for authorized purposes, without limitation, this means that:</p>
          <p>•  We do not sell Children&#39;s personal information.</p>
          <p>•  We do not serve targeted ads on our platforms and do not use information we collect to serve targeted ads on other services. Upsurge does not use or disclose information collected through our services for any targeted advertising purposes.</p>
          <p>· Provide, operate, and maintain our website and Platform</p>
          <p>•  Improve, personalize, and expand our website and Platform</p>
          <p>•  Understand and analyze how you use our website and Platform</p>
          <p>•  Develop new products, services, features, and functionality</p>
          <p>•  Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</p>
          <p>•  Send you emails</p>
          <p>•  Find and prevent fraud</p>
          <h3 id="3-children-s-personal-information-">3. <strong>Children&#39;s Personal information</strong></h3>
          <h4 id="3-1-personal-information-we-collect-from-children-s">3.1 Personal information we collect from Children&#39;s</h4>
          <p>Children&#39;s players: Upsurge collects only a nickname, which is anonymous and not linked to a persistent identifier, from a Children who merely plays an Upsurge game. We use the nickname to permit the student to play.</p>
          <h4 id="3-2-anonymized-information">3.2 Anonymized information</h4>
          <p>We may anonymize and/or aggregate personal information so that it no longer identifies any Children. We may use and disclose such anonymized and/or aggregated information for any purpose, including for analytics purposes, to help us understand how our products are used and improve upon them.</p>
          <h3 id="4-security-">4. <strong>Security</strong></h3>
          <p>Upsurge maintains a comprehensive security program designed to protect the security, privacy, confidentiality and integrity of Personal Information within our organization. We have in place appropriate and reasonable technical and organizational measures designed to protect Personal Information from loss, misuse, unauthorized access, disclosure, alteration, and destruction, taking into account the risks involved in the processing and the nature of the Personal Information. Our security measures include data encryption, firewalls, data use, and access limitations for our personnel and service providers, and physical access controls to our facilities. Our service providers that process payment data, maintain the applicable Payment Card Industry (PCI) compliance levels.</p>
          <p>Details about our security program can be found here. If you have any questions about the security of your Personal Information, you may contact us at karan@upsurge.in.</p>
          <h3 id="5-compliance-with-coppa-">5. <strong>Compliance with COPPA</strong></h3>
          <p>We comply with COPPA when applicable to us. To the extent COPPA applies We encourage parents and guardians to observe, participate in, and/or monitor and guide their children online activity.</p>
          <h3 id="6-changes-to-this-policy-">6. <strong>Changes to this Policy</strong></h3>
          <p>We may change this Children Privacy Policy at any time and from time to time. The most recent version of the Privacy Policy is reflected by the version date located at the top of this Children Privacy Policy. We encourage you to review this Children Privacy Policy often to stay informed of changes that may affect you.</p>
          <p>If we make material changes in the Privacy Policy, for example if we seek to use personal information in a materially different way than we had previously, we will provide prior notice by, for example, email or a pop-up so that you have sufficient time to evaluate the change in practice. Of course, you can always opt-out by deleting your account if you do not accept the change.</p>
          <h3 id="-about-upsurge-"><strong>About Upsurge</strong></h3>
          <p>Name: Karan Baweja</p>
          <p>Designation: Grievance Officer</p>
          <p>Email ID: karan@upsurge.in </p>
          <p>Address: B-5/30, SAFDARJUNG ENCLAVE,</p>
          <p>LOWER GROUND FLOOR, DELHI 110029</p>




        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
