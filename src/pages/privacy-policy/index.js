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
          {`Revision Date: July 24, 2020 
        
        These Terms of Service (these “Terms”) govern your use of the Upsurge website (the “Site”), the Upsurge video platform and associated tools (collectively, the “Service”) made available by Upsurge, Inc. (“Upsurge”, "our", "us", or "we"). Your use of the Site and/or your registration to use the Service indicates that you agree on behalf of yourself or the entity that you represent (collectively, "you") to be bound by these Terms as well as the Upsurge Privacy Policy. Please read these Terms carefully before registering for or otherwise using the Upsurge Service.
        
         I. Overview
        
         Upsurge provides a financial learning platform. Upsurge is
        offered via the following plans or service offerings.
        
         - Basic. For individuals that just need to record and share
        videos quickly, a basic version of Upsurge is available for free when
        you register with Upsurge and set up a user account.   -
        Starter. A new version of our Basic plan (limited availability). This
        plan is limited to one Creator and unlimited Viewers, 25 videos and a 5
        minute recording limit.
          - Starter Unlimited Videos. A new version of our Basic
        plan (limited availability) which gives users access to Basic features
        plus unlimited videos in their Workspace.
          - Pro. For individuals that need advanced recording and
        editing functions, a Pro plan is available on a paid basis via either a
        monthly or annual subscription. Upsurge Pro provides enhanced Upsurge
        features, including higher video quality and access to unlimited number
        of videos.
          - Professional. A new version of our Pro plan (limited
        availability). This plan is limited to one Creator and unlimited
        Viewers.
          - Business. Includes the premium features of Upsurge
        Professional, but with added flexibility for teams that need advanced
        sharing and reporting functions. This plan allows for as many Creators
        as needed.
         - Enterprise. Includes the premium features of Upsurge
        Business, but with additional features suitable for companies that need
        advanced administrative and security functions. This plan allows for as
        many Creators as needed.
         
        See our Site for further details on the features of the various Upsurge
        Service offerings, which Upsurge will endeavor to improve and expand
        over time.  
        By registering for a Upsurge Business or Upsurge Enterprise account, you
        acknowledge that the account administrator of your organization has
        control of and access to Your Content (as defined below). Furthermore,
        you (1) agree to comply with your organization’s terms and policies with
        regard to your use of the Service; (2) acknowledge your organization’s
        ability to monitor, restrict or terminate your or other users’ access to
        Your Content; and (3) acknowledge your organization’s ownership of the
        Upsurge Team or Upsurge Company account.
          II. Registration Use of the Service requires that you
        register with Upsurge. When you register with Upsurge, you will be asked
        to disclose certain personal information, including your name and email
        address, and to set up a username and password, all of which will be
        subject to our Privacy Policy. You are responsible for all activities
        that occur under your account and for keeping your password and log-in
        information secure. You agree that you (1) will monitor your account,
        (2) will not share your account or password with anyone, and (3) will
        notify Upsurge immediately of any unauthorized use of your account or
        password, or any other breach of security. You agree to provide us with
        true, accurate and complete information as requested in our registration
        process. You also agree to update such information promptly as necessary
        to keep it current and accurate.
          III. Payment If you register for Upsurge Starter
        Unlimited, Upsurge Pro, Upsurge Professional, Upsurge Business or
        Upsurge Enterprise (collectively, “Upsurge Premium”), you agree to pay
        all fees or charges to your account for the Service in accordance with
        the fees, charges and billing terms in effect at the time that each fee
        or charge is due and payable. Unless otherwise indicated in an order
        form, you must provide Upsurge with a valid credit card (Visa,
        MasterCard, or any other issuer accepted by us) (“Payment Provider”) as
        a condition to signing up for the Upsurge Premium. Your Payment Provider
        agreement governs your use of the designated credit card account, and
        you must refer to that agreement and not these Terms to determine your
        rights and liabilities with respect to your Payment Provider. By
        providing Upsurge with your credit card number and associated payment
        information, you agree that Upsurge is authorized to verify information
        immediately, and subsequently invoice your account for all fees and
        charges due and payable to Upsurge hereunder and that no additional
        notice or consent is required. You agree to immediately notify Upsurge
        of any change in your billing address or the credit card used for
        payment hereunder. Upsurge reserves the right at any time to change its
        prices and billing methods, either immediately upon posting on our Site
        or by e-mail delivery to your organization’s administrator(s).
          Any attorney fees, court costs, or other costs incurred in
        collection of delinquent undisputed amounts shall be the responsibility
        of and paid for by you.  
        All fees for the Service are non-refundable. No contract will exist
        between you and Upsurge for the Service until Upsurge accepts your order
        by a confirmatory e-mail, SMS/MMS message, or other appropriate means of
        communication.
          You are responsible for any third-party fees that you may
        incur when using the Service.
          IV. Changes to and Your Termination of the Service You
        acknowledge and agree that Upsurge may stop (permanently or temporarily)
        providing the Service (or any features within the Service) to you or to
        users generally at Upsurge’s sole discretion, without prior notice to
        you (except that if you are a Upsurge Premium customer, Upsurge will
        notify you and not charge you for any Service that you have not
        received). You may stop using the Service at any time. You do not need
        to specifically inform Upsurge when you stop using the Service. You
        acknowledge and agree that if Upsurge disables access to your account,
        you may be prevented from accessing the Service, your account details or
        any files or other materials which is contained in your account.
         
        V. User Conduct, Commitments and Understandings - You agree not to
        access (or attempt to access) any of the Service by any means other than
        through the interface that is provided by Upsurge, unless you have been
        specifically allowed to do so in a separate agreement with Upsurge.{" "}
         - You, directly or indirectly, alone or with any other
        party, may not:  
        1. modify, change, create derivative works of, disassemble, decompile or
        otherwise reverse engineer the Service or any software provided in
        connection with the Service (“Software”), or remove proprietary legends
        in the Service or Software;  
        2. distribute, transfer, resell, rent, lease, or loan the Service or
        Software to any other party, except as described herein;  
        3. make the Service or Software available to others in a service bureau
        arrangement or for any similar commercial time-sharing or third party
        training use;  
        4. harass, threaten or otherwise cause distress, unwanted attention or
        discomfort to a person or entity;  
        5. post or otherwise transmit any unlawful, harmful, threatening,
        abusive, harassing, defamatory, vulgar, obscene, or hateful content or
        content which is racially, ethnically or otherwise objectionable, or
        which infringes upon the rights of any third party;  
        6. post or otherwise transmit any content that (i) infringes any patent,
        trademark, trade secret, copyright or other proprietary rights of any
        party; (ii) you do not have the right to transmit, such as information
        that is subject to a confidentiality agreement between you and another
        party; (iii) contains sexually explicit images or other content that is
        offensive; (iv) is harmful to minors in any way; or (v) promotes or
        provides instructional information about illegal activities or promotes
        physical harm or injury against any group or individual;  
        7. send any unsolicited commercial email, spam, or bulk commercial
        email;  
        8. impersonate any person or entity, or falsely state or otherwise
        misrepresent your affiliation with a person or entity;  
        9. violate (intentionally or unintentionally) any applicable local,
        state, national or international law including, but not limited to, any
        regulations having the force of law; or  
        10. interfere with or disrupt the Service or Software, or servers or
        networks connected to the Software, or disobey any requirements,
        procedures, policies or regulations of networks connected to the Service
        or Software.  
        - You agree that you are solely responsible for (and that Upsurge has no
        responsibility to you or to any third party for) any breach of your
        obligations under these Terms and for the consequences (including any
        loss or damage which Upsurge may suffer) of any such breach. To the
        extent Upsurge incurs any financial penalties or other costs and
        expenses (including investigation expenses) from Upsurge’s server
        hosting facility, internet service provider or other vendors because of
        your use of the Software, you shall be obligated to immediately
        reimburse Upsurge for any such penalties, costs or expenses. {" "}
        - You understand that all information (such as data files, written
        text, computer software, music, audio files or other sounds,
        photographs, videos or other images) which you may have access to as
        part of, or through your use of, the Service are the sole responsibility
        of the person from which such materials originated, which may be you.{" "}
         - While Upsurge uses reasonable efforts to include accurate
        and up-to-date information on the Site, Upsurge makes no warranties or
        representations as to its accuracy. Upsurge assumes no liability or
        responsibility for any errors or representations in the content
        available on the Site (the “Content”).  - The Site may
        contain links to other sites on the Internet which are owned and
        operated by Third Party Vendors and other third parties (the “External
        Sites”). You acknowledge that Upsurge is not responsible for the
        availability of, or the materials located on or through, any External
        Sites. You should contact the site administrator or webmaster for those
        External Sites if you have any concerns regarding such links or the
        materials located on such External Sites.  - You acknowledge
        that by accessing the Site, you may come into contact with Content that
        you find harmful, offensive, threatening, indecent or objectionable and
        you acknowledge that Upsurge shall have no liability to you for the
        Content including, but not limited to explicit language and other
        potentially offensive material. You agree not to impersonate any person
        or communicate under a false name or a name you are not entitled or
        authorized to use. Upsurge has the right (but not the obligation) to
        remove, prohibit, edit or discontinue any Content on the Site, including
        Content that has been posted by users.  - You retain sole
        ownership of any Content you post or any other material you submit using
        the Service (“Your Content”). You hereby grant Upsurge and its
        affiliates a revocable, worldwide, royalty-free, non-exclusive,
        sublicensable license to use, reproduce and display Your Content solely
        for the purpose of providing the Service to you. Upsurge will not use
        Your Content for any other purpose or distribute Your Content to any
        third party without your permission. You represent and warrant that Your
        Content will be your original work product and will not be based on, or
        derived from, the proprietary information or materials of a third party.
        Furthermore, you represent and warrant that your use of the Service in
        connection with Your Content or any third party content complies with
        all laws including, but not limited to, copyright law. You also hereby
        grant each user of the Service a non-exclusive license to access Your
        Content through the Service. The licenses granted in Your Content
        terminate within a commercially reasonable time after you remove or
        delete Your Content from the Service; however, you understand,
        acknowledge and agree that Upsurge may retain, but not display, server
        copies of Your Content that has been removed or deleted. You grant
        Upsurge and its affiliates a perpetual and irrevocable license to use
        and display any comments you add via the Service. You will defend,
        indemnify and hold Upsurge and its affiliates harmless from and against
        any claims resulting from any of Your Content.  - At your
        discretion, you may provide feedback to Upsurge concerning the
        functionality and performance of the Service from time to time,
        including, without limitation, identifying potential errors,
        improvements, modifications, bug fixes, or enhancements (“Feedback”). If
        you, through your evaluation or otherwise, suggests any Feedback, you
        hereby assign the ownership in all Feedback to Upsurge. In the event
        ownership in the Feedback cannot be granted to Upsurge, you grant
        Upsurge at no charge a perpetual, irrevocable, royalty-free, worldwide
        right and license to use, reproduce, disclose, sublicense, distribute,
        modify, and otherwise exploit such Feedback without restriction. You
        agree that Upsurge may disclose that Feedback to any third party in any
        manner and you agree that Upsurge has the ability to sublicense all
        Feedback in any form to any third party without restriction. {" "}
        - The Site may contain areas in which additional terms and
        conditions apply. For purposes of the use of such areas, in the event of
        a conflict between the terms and conditions of such other areas and
        these Terms, the terms and conditions of the other area shall prevail.
        Upsurge may at any time revise these Terms by updating this posting. You
        are bound by any such revisions and should therefore periodically visit
        this page to review the current Terms to which you are bound. {" "}
        - You shall not transmit to Upsurge or upload to this Site any
        Harmful Code or use or misappropriate the data on this Site for your own
        commercial gain. “Harmful Code” shall mean any software (sometimes
        referred to as “viruses,” “worms,” “trojan horses,” “time bombs,” “time
        locks,” “drop dead devices,” “traps,” “access codes,” “cancelbots” or
        “trap door devices”) that: (a) is intentionally designed to damage,
        disrupt, disable, harm, impair, interfere with, intercept, expropriate
        or otherwise impede in any manner, any data, storage media, program,
        system, equipment or communication, based on any event, including for
        example but not limited to (i) exceeding a number of copies, (ii)
        exceeding a number of users, (iii) passage of a period of time, (iv)
        advancement to a particular date or other numeral, or (v) use of a
        certain feature; or (b) would enable an unauthorized person to cause
        such result; or (c) would enable an unauthorized person to access
        another person’s information without such other person’s knowledge and
        permission.  - You may not use your username and password
        for any unauthorized purpose.  
        VI. Monitoring and Enforcement; Termination Upsurge has the right to:{" "}
         - Remove or refuse to post any of Your Content for any or
        no reason at our sole discretion.  - Take any action with
        respect to Your Content that we deem necessary or appropriate in our
        sole discretion, including if we believe that Your Content violates
        these Terms, infringes any intellectual property right or other right of
        any person or entity, threatens the personal safety of users of the
        Service or the public or could create liability for Upsurge. {" "}
        - Take appropriate legal action, including without limitation,
        referral to law enforcement, for any illegal or unauthorized use of the
        Service or the Site.  - Terminate or suspend your access to
        all or part of the Service or the Site for any violation of these Terms.{" "}
         
        Without limiting the foregoing, we have the right to fully cooperate
        with any law enforcement authorities or court order requesting or
        directing us to disclose the identity or other information of anyone
        posting any materials on or through the Service or the Site. YOU WAIVE
        AND HOLD HARMLESS UPSURGE AND ITS AFFILIATES, LICENSEES AND SERVICE
        PROVIDERS FROM ANY CLAIMS RESULTING FROM ANY ACTION TAKEN BY ANY OF THE
        FOREGOING PARTIES DURING OR AS A RESULT OF ITS INVESTIGATIONS AND FROM
        ANY ACTIONS TAKEN AS A CONSEQUENCE OF INVESTIGATIONS BY EITHER SUCH
        PARTIES OR LAW ENFORCEMENT AUTHORITIES.  
        However, we do not undertake to review Content before it is posted via
        the Service, and we cannot ensure prompt removal of objectionable
        material after it has been posted. Accordingly, we assume no liability
        for any action or inaction regarding transmissions, communications or
        Content provided by any user or third party. We have no liability or
        responsibility to anyone for performance or nonperformance of the
        activities described in this section.  
        VII. Indemnity
        
        You agree to indemnify, defend and hold harmless Upsurge, and its
        directors, officers, agents, contractors, partners and employees, from
        and against any loss, liability, claim, demand, damages, costs and
        expenses (including reasonable attorney's fees) arising out of or in
        connection with (i) any allegation that any of Your Content infringes or
        misappropriates any intellectual property or other proprietary right of
        a third party or violates any applicable law, (ii) your conduct in
        connection with the Service, and/or (iii) any violation by you of these
        Terms.
         
        VIII. Intellectual Property
         Rights Upsurge reserves all rights not specifically granted
        herein. You shall not modify any copyright notices, proprietary legends,
        any trademark and service mark attributions, any patent markings, and
        other indicia of ownership on the Content or other materials accessed
        through the Service. The delivery of, and license to, the Content and/or
        access to third party materials does not transfer to you any commercial
        or promotional use rights in the Content or any portion thereof. Any use
        of Content, or descriptions; any derivative use of this Site or its
        materials; and any use of data mining, robots, or similar data gathering
        and extraction tools is strictly prohibited. In no event shall the user
        frame any portion of the Site or any materials contained therein.
          As between the parties, Upsurge owns and shall continue to
        own all right, title and interest in and to all aggregate and
        statistical information or analyses created and developed by Upsurge
        from performance and usage data generated through your use of the Site,
        Service or Software (collectively, “Aggregate Data”). Aggregate Data is
        de-identified so that you cannot be identified as the source within the
        Aggregate Data.  
        IX. Copyright Protection  The U.S. Digital Millennium Copyright
        Act ("DMCA") provides recourse to copyright owners who believe that
        their rights under the United States Copyright Act have been infringed
        by acts of third parties over the Internet. If you believe that any
        content uploaded or otherwise made available on the Service infringes
        upon any copyright which you own or control, you may so notify us in
        accordance with our DMCA process available here.In accordance with the
        DMCA and other applicable law, we have adopted a policy of terminating,
        in appropriate circumstances and at our sole discretion, the accounts of
        users of the Service who are deemed to be repeat infringers. Upsurge may
        also at its sole discretion limit access to the Service or terminate the
        account of any user who infringes any intellectual property rights of
        others, whether or not there is any repeat infringement.
          X. Data Processing Addendum
         To the extent that Upsurge processes any personal data on your
        behalf in providing the Service that is subject to the EU General Data
        Protection Regulation (“GDPR”), the terms of Upsurge’s data processing
        addendum, which are hereby incorporated by reference, shall apply and
        the parties agree to comply with such terms.  
        XI. Governing Law 
        Your use of the Service and these Terms shall be governed by, and
        construed in accordance with, the internal laws of the State of
        California without reference to the choice of law or conflicts of law
        principles thereof, and all claims relating to or arising out of your
        use of the Service or these Terms, or the breach thereof, whether
        sounding in contract, tort or otherwise, shall likewise be governed by
        the laws of the State of California without reference to the choice of
        law or conflicts of law principles thereof. Notwithstanding the
        foregoing, if you represent an entity or institution subject to state
        law mandating that such state’s laws govern your use of the Services,
        Upsurge agrees to such governing state law.  
        XII.
         Disclaimer of Warranties THE MATERIALS, CONTENT ON THIS SITE AND
        SERVICE ARE PROVIDED “AS IS”, “AS AVAILABLE” WITHOUT WARRANTIES OF ANY
        KIND EITHER EXPRESS OR IMPLIED. UPSURGE SHALL HAVE NO RESPONSIBILITY OR
        LIABILITY FOR ANY CONTENT, MATERIALS POSTED ON THE SITE OR SERVICES.
        UPSURGE MAKES NO GUARANTEES AS TO UPTIME OR AVAILABILITY OF THE SERVICE.
        TO THE FULLEST EXTENT POSSIBLE PURSUANT TO THE APPLICABLE LAW, UPSURGE
        DISCLAIMS ALL WARRANTIES, EXPRESSED OR IMPLIED, INCLUDING, BUT NOT
        LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
        PARTICULAR PURPOSE, NONINFRINGEMENT OR OTHER VIOLATION OF RIGHTS. THE
        SERVICE MAY BE SUBJECT TO LIMITATIONS, DELAYS, AND OTHER PROBLEMS
        INHERENT IN THE USE OF THE INTERNET AND ELECTRONIC COMMUNICATIONS. LOON
        IS NOT RESPONSIBLE FOR ANY DELAYS, DELIVERY FAILURES, OR OTHER DAMAGE
        RESULTING FROM SUCH PROBLEMS, INCLUDING INTERNET CONGESTION, VIRUS
        ATTACKS, AND DENIAL OF SERVICE (DOS) ATTACKS.  
        XIII. Limitation of Liability
         UNDER NO CIRCUMSTANCES, INCLUDING, BUT NOT LIMITED TO,
        NEGLIGENCE, BREACH OF CONTRACT, OR BREACH OF ANY STATUTORY OR OTHER DUTY
        OF CARE, SHALL UPSURGE OR ITS THIRD PARTY LICENSORS BE LIABLE FOR ANY
        INDIRECT, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES, INCLUDING, BUT
        NOT LIMITED TO, LOSS OF DATA OR PROFIT, ARISING OUT OF THE USE, OR THE
        INABILITY TO USE, THE MATERIALS ON THIS SITE OR THE SERVICE, EVEN IF
        UPSURGE HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES AND
        NOTWITHSTANDING THE FAILURE OF ESSENTIAL PURPOSE OF ANY REMEDY.
          UPSURGE’S AND ITS LICENSORS’ ENTIRE AND AGGREGATE
        LIABILITY, WHETHER BASED IN CONTRACT, TORT (INCLUDING NEGLIGENCE),
        STRICT LIABILITY OR OTHERWISE, SHALL NOT EXCEED THE GREATER OF $100 OR
        THE AMOUNT YOU HAVE PAID TO UPSURGE FOR THE SERVICE DURING THE SIX (6)
        MONTHS PRECEDING THE DATE THAT A CLAIM OR DEMAND IS FIRST ASSERTED, EVEN
        IF UPSURGE HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES AND
        NOTWITHSTANDING THE FAILURE OF ESSENTIAL PURPOSE OF ANY REMEDY. IF YOUR
        USE OF MATERIALS FROM THIS SITE OR THE SERVICE RESULTS IN THE NEED FOR
        SERVICING, REPAIR OR CORRECTION OF EQUIPMENT OR DATA, YOU ASSUME ANY
        COSTS THEREOF. SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF
        INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE LIMITATION OR
        EXCLUSION MAY NOT APPLY TO YOU. 
        
        XIV. Entire Agreement; Modifications  These Terms constitute the
        entire agreement between the parties regarding the subject matter hereof
        and supersede all proposals and prior discussions and writings between
        the parties with respect thereto. No failure or delay in enforcing any
        right or exercising any remedy will be deemed a waiver of any right or
        remedy. Each provision of these Terms is a separately enforceable
        provision. If any provision of these Terms is determined to be or
        becomes unenforceable or illegal, such provision shall be reformed to
        the minimum extent necessary in order for these Terms to remain in
        effect in accordance with its terms as modified by such reformation.
        These Terms may not be modified, supplemented, amended or interpreted by
        any trade usage or prior course of dealing unless specifically agreed
        upon in writing. Reasonable attorneys’ fees and costs will be awarded to
        the prevailing party in the event of litigation involving the
        enforcement or interpretation of these Terms.  
        XV. Force Majeure Upsurge
        
        shall not be liable to you for any delay or failure of Upsurge to
        perform its obligations hereunder if such delay or failure arises from
        any cause or causes beyond the reasonable control of Upsurge. Such
        causes shall include, but are not limited to, acts of God, floods,
        fires, loss of electricity or other utilities, labor strike, or delays
        by you in performing any requirements hereunder.
          XVI. Dispute Resolution
         The state or federal courts sitting in San Francisco County,
        California shall have exclusive jurisdiction and venue over any dispute
        arising out of these Terms and sale, and you hereby consent to the
        jurisdiction of such courts. Any dispute, controversy or claim arising
        under, out of or relating to these Terms and any subsequent amendments
        of these Terms, including, without limitation, its formation, validity,
        binding effect, interpretation, performance, breach or termination, as
        well as non-contractual claims, shall be submitted to arbitration before
        the American Arbitration Association (“AAA”) in accordance with the AAA
        Commercial Arbitration Rules. The place of arbitration shall be San
        Francisco, California. The language to be used in the arbitral
        proceedings shall be English. The parties may apply to any court of
        competent jurisdiction for a temporary restraining order, preliminary
        injunction, or other interim or conservatory relief as necessary,
        without breach of this Section and without abridgment of the powers of
        the arbitrator. The arbitrator may award any form of individual or
        equitable relief, including injunctive relief. Any award will be final
        and conclusive to the parties and may be entered in any court of
        competent jurisdiction. You agree to the entry of injunctive relief to
        stop any lawsuit or to remove you as a participant in such a suit. These
        Terms do not constitute a waiver of any of your rights and remedies to
        pursue a claim individually in binding arbitration, but not as a class
        action. This provision preventing you from bringing, joining or
        participating in any class action lawsuits is an independent covenant.
        You may opt-out of this Section by providing written notice of your
        decision within thirty (30) days of the date that you first use the Site
        or Service. Notwithstanding the foregoing, if you represent an entity or
        institution subject to state law mandating different dispute resolution
        terms, Upsurge agrees to such state law requirements.  
        XVII. Questions and Comments
         If you have any questions regarding these Terms, please contact
        Upsurge by emailing privacy@Upsurge.com.
          XVIII. Notices  All notices regarding these Terms
        and the Service will be provided in writing to you by e-mail using the
        contact information provided by you upon registration or by posting on
        the Site. Notice will be deemed given one (1) business day after e-mail
        transmission from Upsurge, or two (2) business days after the date of
        posting.`}
        </div>
        <div
          data-tip
          data-for="continue-button-privacy"
          className={`${styles.button}`}
          onClick={() => router.push("/dashboard/p")}
        >
          I Agree
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
