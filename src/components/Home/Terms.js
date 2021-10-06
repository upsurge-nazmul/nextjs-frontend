import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import styles from "../../styles/Home/terms.module.scss";

export default function Terms({ setshowterm, termmode }) {
  const router = useRouter();
  function move(id) {
    let element = document.querySelector(id);
    console.log(element, id);
    if (!element) {
      return;
    }
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
  const content = [
    { name: "Account Types", href: "#actype" },
    { name: "Registration", href: "#reg" },
    { name: "Use of Content", href: "#content" },
    { name: "Acceptable Website Use", href: "#accept" },
    { name: "Online Learning Game", href: "#online" },
    { name: "Membership and Paid Membership Fees", href: "#membership" },
    { name: "Service Ownership and License", href: "#service" },
    { name: "Termination", href: "#termination" },
    { name: "Privacy", href: "#privacy" },
    { name: "Disclaimer of Warranties", href: "#warranty" },
    { name: "Disclaimer of Consequential Damages ", href: "#damage" },
    { name: "Limitation of Liabilities", href: "#liabilities" },
    { name: "Indemnity", href: "#indemnity" },
    { name: "Third-Party Links", href: "#thirdparty" },
    { name: "Severability", href: "#severability" },
    { name: "Governing Law", href: "#law" },
    { name: "Assignment", href: "#assignment" },
    { name: "Entire Agreement", href: "#agreement" },
  ];
  return (
    <div className={styles.terms}>
      <div
        className={styles.background}
        onClick={() => setshowterm(false)}
      ></div>
      {termmode === "terms" ? (
        <div className={styles.main} id="termswrapper">
          <h1 className={styles.heading}>Terms and Conditions</h1>
          <p className={styles.para}>
            <strong> Please read these terms and conditions carefully.</strong>
          </p>
          <p className={styles.para}>
            These Terms (“Terms”) govern your use of our “Upsurge” – Made in
            India” mobile and web application (the “Platform”) made available by
            Surgeup Technologies Private Limited (“Upsurge”, “Company”, “we”,
            “us” and “our”), a private company established under the laws of
            India having its registered office at B-5/30, Safdarjung Enclave
            Lower Ground Floor Delhi South West Delhi DL 110029. The terms “you”
            and “yours” refer to the User of the Website or application.
          </p>
          <p className={styles.para}>
            Our Services (as we have described below in detail) and these Terms
            are compliant with the Indian Penal Code, 1860, and Information
            Technology Act, 2000, including all amendments made to it and rules
            framed under it. When you use our Platform, you accept and agree to
            these Terms. However, please note that we do not represent that we
            are compliant with laws of any country apart from the Republic of
            India. If you wish to use our Services, please ensure that you are
            permitted to do so, in your jurisdiction.
          </p>
          <p className={styles.para}>
            You and we are required to follow certain rules while you use our
            Platform. We have listed these rules in these Terms. Please read
            these Terms and all other hyperlinks mentioned here carefully. Do
            remember that by using our Platform, you agree to these Terms. Also,
            if you are using these services outside India, please comply with
            your local laws.
          </p>
          <p className={styles.heading}>1. OUR SERVICES</p>
          <p className={styles.para}>
            We agree to provide you with our Services. The Services includes all
            of Upsurge’s products, features, applications, services, educational
            games, technologies, and software that we provide to you.
          </p>
          <p className={styles.para}>
            Our community-driven Platform lets User of the Platform to upload or
            chat or post or otherwise make available content through the
            Platform including, without limitation, any photographs,
            information, answer, solutions, reports, user videos, sound
            recordings.
          </p>
          <p className={styles.heading}>2. ELIGIBILITY</p>
          <p className={styles.para}>
            You represent and warrant that you are competent and eligible to
            enter into legally binding agreements and that you have the
            requisite authority to bind yourself to these Terms, as determined
            solely by the provisions of the Indian Contract Act, 1872. You may
            not use the website or App if you are not competent to contract
            under the Indian Contract Act, 1872, or are disqualified from doing
            so by any other applicable law, rule or regulation currently in
            force.
          </p>
          <p className={styles.heading}>3. ACCOUNTS</p>
          <p className={styles.para}>
            When you create an account with us, you must provide us information
            that is accurate, complete, and current at all times. Failure to do
            so constitutes a breach of the Terms, which may result in immediate
            termination of your account on our Service.
          </p>
          <p className={styles.para}>
            You are responsible for safeguarding the password that you use to
            access the Service and for any activities or actions under your
            password, whether your password is with our Service or a third-party
            service. You agree not to disclose your password to any third party.
            You must notify us immediately upon becoming aware of any breach of
            security or unauthorized use of your account.
          </p>
          <p className={styles.para}>
            You may not use as a username the name of another person or entity
            or that is not lawfully available for use, a name or trade mark that
            is subject to any rights of another person or entity other than you
            without appropriate authorization, or a name that is otherwise
            offensive, vulgar or obscene.
          </p>
          <p className={styles.heading}>4. ACCEPTANCE OF TERMS</p>
          <p className={styles.subheading}>
            <strong>Acceptance :</strong>
          </p>
          <p className={styles.para}>
            By signing-up to use the Platform, you acknowledge that you have
            read these Terms and agree to be bound by them. You also acknowledge
            that you have read our Privacy Policy and agree to be bound by it.
            By signing up to use the Platform, you represent that you have
            provided us with valid identifying information which may be used to
            verify your identity. Please note that we may restrict, suspend, or
            terminate your access at any time to the Platform if we believe you
            have breached these Terms. We may also monitor or use certain
            technologies to monitor your activities including your IP address to
            verify your geographical location.
          </p>
          <p className={styles.subheading}>
            <strong>Compliance with Applicable Laws :</strong>
          </p>
          <p className={styles.para}>
            You must ensure that your use of the Platform and the Services
            complies with Applicable Laws.
          </p>
          <p className={styles.subheading}>
            <strong>Legal responsibility on behalf of minors :</strong>
          </p>
          <p className={styles.para}>
            We understand the importance of financial education and want
            individuals to start their journey to financial literacy under the
            supervision of their parents/guardians from a young age. But, users
            below the age of 18 years (“Minor(s)”) can use the Platform only
            with the permission and under the supervision of their parent or
            legally appointed guardian (“Parent”). As the Parent you must agree
            to and accept these Terms and the Privacy Policy on behalf of the
            Minor(s). Minors cannot, therefore, use the Platform unless their
            Parent agrees to and accepts these Terms and the Privacy Policy on
            their behalf. If you agree to these Terms and the Privacy Policy on
            behalf of a Minor(s), you represent to us that you are their Parent.
            As a Parent, you agree to take full financial and legal
            responsibility for the acts and omissions of the Minor(s). A Minor’s
            use of the Services and interaction with the Platform must be
            supervised by the Parent. As a Parent you must take full
            responsibility for a Minor(s) action while using the Services and
            any interaction with the Platform, such as – setting up and using
            the “Upsurge” Account, creating and adding members to a Family
            (defined below). This is a crucial obligation, so we advise you not
            to add individuals to your Family who you do not know or want to
            take responsibility for.
          </p>
          <p className={styles.subheading}>
            <strong>Compliance with Applicable Laws :</strong>
          </p>
          <p className={styles.para}>
            You must ensure that your use of the Platform and the Services
            complies with Applicable Laws.
          </p>
          <p className={styles.subheading}>
            <strong>Inquiries as to Minors :</strong>
          </p>
          <p className={styles.para}>
            By taking responsibility for a Minor, you authorize us to make
            inquiries (if we choose to do so), either directly or through third
            parties to validate the information provided about the Minor or your
            relationship with the Minor. This could include information to
            verify your relationship as a Parent to the Minor(s). If we are
            unable to verify the information that you provide, we may: <br />
            (i) refuse to establish a “Upsurge” Account (defined below) for the
            Minor; <br />
            (ii) close the “Upsurge” Account of a Minor; <br />
            (iii) close the Parent’s “Upsurge” Account and
            <br /> (iv) terminate our Services or portion(s) thereof.
          </p>
          <p className={styles.subheading}>
            <strong>Scope of Use :</strong>
          </p>
          <p className={styles.para}>
            By using a “Upsurge” website, you are deemed to have agreed to all
            terms, conditions, use, and notices contained or referenced herein
            (the “Terms of Use”). “Upsurge” reserves its right, at its
            discretion, to update or revise these Terms of Use. You should check
            these terms of use periodically for changes. By accessing a
            “Upsurge” site after the posting of any changes to the terms of use,
            you acknowledge and agree to those changes, whether or not you have
            reviewed them
          </p>
          <p className={styles.heading}>5. SUBSCRIPTIONS</p>
          <p className={styles.para}>
            Some parts of the Service are billed on a subscription basis
            ("Subscription(s)"). You will be billed in advance on a recurring
            and periodic basis ("Billing Cycle"). Billing cycles are set on a
            monthly or annual basis. At the end of each Billing Cycle, your
            Subscription will automatically renew under the exact same
            conditions unless you cancel it or Surgeup Technologies Private
            Limited cancels it. You may cancel your Subscription renewal either
            through your online account management page or by contacting Surgeup
            Technologies Private Limited customer support team.
          </p>
          <p className={styles.para}>
            You shall provide Surgeup Technologies Private Limited with accurate
            and complete billing information including full name, address,
            state, zip code, telephone number, e-mail address and a valid
            payment method information. A valid payment method is required to
            process the payment for your Subscription.
          </p>
          <p className={styles.para}>
            The company uses the Payment Gateway of a third party to process
            payments and receipts, the company will not be responsible for any
            loss caused by default of the third party.
          </p>
          <p className={styles.heading}>6. FREE TRIAL</p>
          <p className={styles.para}>
            Surgeup Technologies Private Limited may, at its sole discretion,
            offer a Subscription with a free trial for a limited period ("Free
            Trial"), you will not be charged by Surgeup Technologies Private
            Limited until the Free Trial has expired. On the last day of the
            Free Trial period, unless you cancelled your Subscription, you will
            be automatically charged the applicable Subscription fees for the
            type of Subscription you have selected at any time and without
            notice, Surgeup Technologies Private Limited reserves the right to{" "}
            <br />
            (i) modify the terms and conditions of the Free Trial offer, or{" "}
            <br />
            (ii) cancel such Free Trial offer.
          </p>{" "}
          <p className={styles.heading}>7. FEE CHANGES</p>
          <p className={styles.para}>
            Surgeup Technologies Private Limited, in its sole discretion and at
            any time, may modify the Subscription fees for the Subscriptions.
            Any Subscription fee change will become effective at the end of the
            then-current Billing Cycle.
          </p>{" "}
          <p className={styles.para}>
            Surgeup Technologies Private Limited will provide you with a
            reasonable prior notice of any change in Subscription fees to give
            you an opportunity to terminate your Subscription before such change
            becomes effective.
          </p>{" "}
          <p className={styles.para}>
            Your continued use of the Service after the Subscription fee change
            comes into effect constitutes your agreement to pay the modified
            Subscription fee amount.
          </p>
          <p className={styles.heading}>8. REFUNDS</p>
          <p className={styles.para}>
            Except when required by law, paid Subscription fees are
            non-refundable.
          </p>
          <p className={styles.heading}>9. UPSURGE REWARDS :</p>
          <p className={styles.para}>
            You may win prizes while playing education games on the Platform.
            Such prizes are subject to the specific terms and conditions
            communicated at the time of issuance of the prize. The prize and the
            bonus or any other amount or benefit in the Bonus Segment cannot be
            Withdrawn, or transferred to another user.
          </p>
          <p className={styles.heading}>
            10. RESTRICTIONS ON USE OF MATERIALS :
          </p>
          <p className={styles.para}>
            The content of this site and any other “Upsurge” site is protected
            by copyright and trademark laws, and is the property of “Upsurge” is
            an initiative of Surgeup Technologies Private Limited. Any content
            within “Upsurge” sites may be accessed only for your use. You agree
            not to sell, license, rent, modify, distribute, copy, reproduce,
            transmit, publicly display, publicly perform, publish, adapt, edit
            or create works from such materials or content or in any way exploit
            the material or content of our website. This means, you may download
            copies of posted materials for business use only, so long as you
            neither change nor delete any author attribution, trademark, legend
            or copyright or other proprietary notices. When you download
            copyrighted material, you do not obtain any ownership rights in that
            material. As noted above, reproduction, copying, or redistribution
            of any material within the “Upsurge” site is strictly prohibited
            without the express written permission of “Upsurge” You also may
            not, without “Upsurge” permission, “mirror” any materials contained
            within any “Upsurge” site or any other service. Any unauthorized
            user of any material contained within any “Upsurge” site may violate
            copyright laws, trademark laws, the laws of privacy and publicity,
            and communications regulations and statutes.
          </p>
          <p className={styles.heading}>11. INFORMATION :</p>
          <p className={styles.para}>
            The information, materials, products, and services within “Upsurge”
            websites are subject to change.
          </p>
          <p className={styles.heading}>12. Child Safety Policy :</p>
          <p className={styles.para}>
            This policy is applicable to all persons and organizations
            associated with “Upsurge”, referred to as “Upsurge” Stakeholders,
            including:
          </p>
          <p className={styles.para}>
            1. Employees of “Upsurge”, who maybe full-time or part-time
            employees, permanent or temporary employee, regular permanent
            employee or employed on contract
          </p>
          <p className={styles.para}>
            2. Organizations and persons belonging to that organization, who may
            partner and/ or work with “Upsurge” in any capacity, even for a
            limited time period or job
          </p>
          <p className={styles.para}>
            3. Volunteers who may work with “Upsurge”, in whichever capacity,
            even for a limited period of time
          </p>
          <p className={styles.para}>
            4. Children enrolled as students of “Upsurge” and their parents or
            guardians who associate with the child in the official records of
            “Upsurge”
          </p>
          <p className={styles.para}>
            5. Children who may not be enrolled but are reached out through
            marketing or sales of the product and their parents or guardians who
            associate with the Child
          </p>
          <p className={styles.para}>
            6. Any other person or organisations who may be officially
            associated with “Upsurge” and its ambit of work and activity
          </p>
          <p className={styles.para} style={{ marginTop: "20px" }}>
            “Upsurge” expects all its stakeholders falling within the scope of
            this policy to adhere to the following child safety code of conduct:
          </p>
          <p className={styles.para}>
            <strong>1. Expected Behaviour and Actions</strong>
          </p>
          <p className={styles.listelement}>
            1. Listen to the child and, their views and opinions
          </p>
          <p className={styles.listelement}>
            2. Have a non-judgmental attitude
          </p>
          <p className={styles.listelement}>
            3. Treat every child with empathy and respect regardless of his/her
            race, colour, gender, sexuality, religion, language, heritage,
            religious belief, social origin, or any point that discriminated a
            child
          </p>
          <p className={styles.listelement}>
            4. Use appropriate language, behaviours while interacting with the
            child
          </p>
          <p className={styles.listelement}>
            5. Use appropriate language, behaviours in any online medium used by
            the organisation to communicate or engage with children
          </p>
          <p className={styles.listelement}>
            6. Create an environment that enables children to share and express
            freely
          </p>
          <p className={styles.listelement}>
            7. Always take permission and written consent from guardian before
            taking photos or videos of a child
          </p>
          <p className={styles.listelement}>
            8. Keep all personal information of children, their parents and
            guardians confidential and secure, such information shall only be
            shared with authorised individuals
          </p>
          <p className={styles.listelement}>
            9. The live online classes and the content, including but not
            limited to audio visual content is age appropriate and culturally
            appropriate
          </p>
          <p className={styles.para}>
            <strong>2. Prohibited Behaviours and Actions</strong>
          </p>
          <p className={styles.listelement}>
            1. Do not develop, induce or support any emotional, online/offline
            physical abuse or sexual relationship with children in any way
          </p>
          <p className={styles.listelement}>
            2. Do not use or encourage the use of alcohol, drugs, cigarettes or
            other intoxicating substance in any of your interaction with
            children
          </p>
          <p className={styles.listelement}>
            3. Do not develop any form of relationship or arrangement with
            children including but not limited to financial, which could be
            deemed to be exploitative or abusive
          </p>
          <p className={styles.listelement}>
            4. Do not share with or show children online/offline any
            inappropriate content including pornographic material or material
            that encourages crime, violence, racism, sexism, self-harm, suicide,
            cruelty
          </p>
          <p className={styles.listelement}>
            5. Do not use language or behaviour towards children that is
            inappropriate, harassing, abusive, sexually provocative, demeaning,
            intimidating, discriminatory, or culturally insensitive.
          </p>
          <p className={styles.heading}>13. APPLICATION LICENSE</p>
          <p className={styles.para}>
            Subject to your compliance with these Terms, “Upsurge” grants you a
            limited non-exclusive, non-transferable license to download and
            install a copy of the Application on each mobile device or computer
            that you own or control and run such copy of the Application solely
            for your own personal use.
          </p>
          <p className={styles.listelement}>
            <strong>Upsurge Content</strong>
          </p>
          <p className={styles.listelement}>
            1. Subject to your compliance with these Terms, “Upsurge” grants you
            a limited, non-exclusive, non-transferable license, to (a) access
            and view any “Upsurge” Content solely for your personal and
            non-commercial purposes and (b) access and view any M Content to
            which you are permitted access, solely for your personal and
            non-commercial purposes. You have no right to sublicense the license
            rights granted in this section.
          </p>
          <p className={styles.listelement}>
            2. You will not use, copy, adapt, modify, prepare derivative works
            based upon, distribute, license, sell, transfer, publicly display,
            publicly perform, transmit, broadcast or otherwise exploit the Site,
            Application, Services, or Collective Content, except as expressly
            permitted in these Terms. No licenses or rights are granted to you
            by implication or otherwise under any intellectual property rights
            owned or controlled by “Upsurge” or its licensors, except for the
            licenses and rights expressly granted in these Terms.
          </p>
          <p className={styles.listelement}>
            <strong>Users Content</strong>
          </p>
          <p className={styles.listelement}>
            1. We may, in our sole discretion, permit you to post, upload,
            publish, submit or transmit User Content. By making available any
            Member Content on or through the Site, Application, Services, or
            through “Upsurge” promotional campaigns, you hereby grant to
            “Upsurge” a worldwide, irrevocable, perpetual (or for the term of
            the protection), non-exclusive, transferable, royalty-free license,
            with the right to sublicense, to use, view, copy, adapt, modify,
            distribute, license, sell, transfer, publicly display, publicly
            perform, transmit, stream, broadcast, access, view, and otherwise
            exploit such Member Content on, though, by means of or to promote or
            market the Site, Application and Services. “Upsurge” does not claim
            any ownership rights in any such User Content and nothing in these
            Terms will be deemed to restrict any rights that you may have to use
            and exploit any such User Content.
          </p>
          <p className={styles.heading}>14. LINKS TO OTHER WEB SITES</p>
          <p className={styles.para}>
            Our Service may contain links to third-party web sites or services
            that are not owned or controlled by Surgeup Technologies Private
            Limited.
          </p>
          <p className={styles.para}>
            Surgeup Technologies Private Limited has no control over, and
            assumes no responsibility for, the content, privacy policies, or
            practices of any third-party web sites or services. You further
            acknowledge and agree that Surgeup Technologies Private Limited
            shall not be responsible or liable, directly or indirectly, for any
            damage or loss caused or alleged to be caused by or in connection
            with use of or reliance on any such content, goods or services
            available on or through any such web sites or services.
          </p>
          <p className={styles.para}>
            We strongly advise you to read the terms and conditions and privacy
            policies of any third-party web sites or services that you visit.
          </p>
          <p className={styles.heading}>15. PRIVACY POLICY</p>
          <p className={styles.para}>
            To effectively provide and introduce any new Services to you, we
            collect certain information such as your phone number, your gender
            and your name from you. We may further request and store additional
            information. Such information is stored securely on the
            “_____________ Web Service” cloud servers, thereby also subject to
            the terms of the ________________ Web Service privacy policy. The
            Upsurge Privacy Policy explains how we collect, use, share and store
            the information collected. The Upsurge Privacy Policy also details
            your rights under law and how you may control the data you provide
            us.
          </p>
          <p className={styles.para} style={{ fontStyle: "italic" }}>
            You provide us with some information about yourself so that we can
            serve you better. We have described how we store and use this
            information in the Upsurge Privacy Policy.
          </p>
          <p className={styles.heading}>16. GDPR COMPLIANCE STATEMENT</p>
          <p className={styles.para}>
            Upsurge respects and complies with the EU General Data Protection
            Regulations (GDPR). Some of the key ways we comply with these
            regulations are:
          </p>
          <p className={styles.subheading}>1. Consent</p>
          <p className={styles.para}>
            We explain what you’re consenting to clearly and without ‘legalese’,
            and ask that you explicitly consent to contact from us.
          </p>
          <p className={styles.subheading}>2. Breach Notification</p>
          <p className={styles.para}>
            In the event of a breach, we will notify affected users within 72
            hours of first having become aware of the breach.
          </p>
          <p className={styles.subheading}>3. Right to Access</p>
          <p className={styles.para}>
            Users can request confirmation as to whether or not personal data
            concerning them is being processed, where and for what purpose.
            Further, we shall provide a copy of the personal data, in an
            electronic format.
          </p>
          <p className={styles.subheading}>4. Right to be Forgotten</p>
          <p className={styles.para}>
            Once we have compared your (the subjects') rights to "the public
            interest in the availability of the data", we may delete your
            personal data where you have requested this.
          </p>
          <p className={styles.subheading}>5. Data Portability</p>
          <p className={styles.para}>
            We allow you to receive the personal data concerning you, which we
            will provide in a 'commonly used and machine readable format' and
            you have the right to transmit that data to another ‘controller’.
          </p>
          <p className={styles.subheading}>6. Privacy by Design</p>
          <p className={styles.para}>
            We implement appropriate technical and organisational measures, in
            an effective way and protect the rights of data subjects'. We hold
            and process only the data absolutely necessary for the completion of
            our duties (data minimisation), as well as limiting the access to
            personal data to those needing to act out the processing
          </p>
          <p className={styles.heading}>17. SAFETY</p>
          <p className={styles.para}>
            We try hard to keep our Platform a safe place for all User. But we
            cannot guarantee it. That is where you come in. By using the
            Services, you agree that:
          </p>
          <ul>
            <li className={styles.listelement}>
              You will not use the Services for any purpose that is illegal or
              prohibited in these Terms.
            </li>
            <li className={styles.listelement}>
              You will not use any robot, spider, crawler, scraper, or other
              automated means or interface to access the Services or extract
              other user’s information.
            </li>
            <li className={styles.listelement}>
              You will not use or develop any third-party applications that
              interact with the Services or other users’ content or information
              without our written consent.
            </li>
            <li className={styles.listelement}>
              You will not use the Services in a way that could interfere with,
              disrupt, negatively affect, or inhibit other users from fully
              enjoying the Services, or that could damage, disable, overburden,
              or impair the functioning of the Services.
            </li>
            <li className={styles.listelement}>
              You will not post content that can be considered to infringe any
              Intellectual Property rights of any third party.
            </li>
            <li className={styles.listelement}>
              You will not falsely represent yourself as another person or
              representative of another person to use our Services.
            </li>
            <li className={styles.listelement}>
              You will not use or attempt to use another user’s account,
              username, or password without their permission.
            </li>
            <li className={styles.listelement}>
              You will not solicit login credentials from another user.
            </li>
            <li className={styles.listelement}>
              You will not post content that contains or links to pornography,
              graphic violence, threats, hate speech, or incitements to
              violence.
            </li>
            <li className={styles.listelement}>
              You will not upload viruses or other malicious code or otherwise
              compromise the security of the Services.
            </li>
            <li className={styles.listelement}>
              You will not attempt to circumvent any content-filtering
              techniques we employ, or attempt to access areas or features of
              the Services that you are not authorized to access.
            </li>
            <li className={styles.listelement}>
              You will not probe, scan, or test the vulnerability of our
              Services or any system or network.
            </li>
            <li className={styles.listelement}>
              You will not post any content that in any way or form threatens
              the unity, integrity, defence, security or sovereignty of India,
              friendly relations with foreign states, or public order or causes
              incitement to the commission of any cognisable offence or prevents
              investigation of any offence or is insulting any other nation.
            </li>
            <li className={styles.listelement}>
              You will not encourage or promote any activity that violates these
              Terms.
            </li>
          </ul>
          <p className={styles.heading}>18. YOUR COMMITMENTS</p>
          <p className={styles.para}>
            Providing a safe Service for a broad community requires that we all
            do our part. In return for our commitment to provide our Services,
            we require you to make some commitments to us. Your commitments to
            us are:
          </p>
          <p
            className={styles.subheading}
            style={{ textDecoration: "underline" }}
          >
            <strong>
              a. No Impersonation or False Information to be Provided
            </strong>
          </p>
          <p className={styles.para}>
            You have to use your actual name on our Platform, you are required
            to input your correct phone number and gender to use our Services.
            You will not falsely represent yourself as another person or
            representative of another person to use our Services. In the event
            you are operating a parody account for satirical or comedic
            purposes.
          </p>
          <p className={styles.para}>
            You will not lie about your details, including your age, for any
            reason.
          </p>
          <p
            className={styles.subheading}
            style={{ textDecoration: "underline" }}
          >
            <strong>b. Device Security</strong>
          </p>
          <p className={styles.para}>
            We have implemented measures to ensure that our Platform is secure.
            However, there is no guarantee that our Platform is immune to
            hacking and virus attacks. You will ensure that you have requisite
            anti-malware and antivirus software on your mobile device and
            computer to ensure its safety. You will not allow any person to use
            your phone number, and not allow multiple accounts to be linked to
            your phone number. You will be responsible for all content posted by
            any account linked to your phone number.
          </p>
          <p className={styles.para} style={{ textDecoration: "italic" }}>
            While we do everything, we can to secure your use of our Services,
            keep in mind that we cannot contemplate all forms of attack on our
            Platform. You should, as a matter of practice, ensure that your
            mobile device and computer are not used wrongly or tampered with in
            any way.
          </p>
          <p
            className={styles.subheading}
            style={{ textDecoration: "underline" }}
          >
            <strong>
              c. Platform Not to be Used for Anything Unlawful or Illegal
            </strong>
          </p>
          <p className={styles.para}>
            Our Platform is designed to accommodate a multiplicity of languages
            and cultures, as well as a diverse range of contents. To this
            effect, we have developed various tags to classify the nature of the
            content.
          </p>
          <p className={styles.para}>
            You must therefore, correctly identify the nature of the content
            shared by you and tag it appropriately.
          </p>
          <p className={styles.para}>
            You shall not, however, use our Platform to share any content which
            is obscene, pornographic, harmful for minors, discriminatory,
            spreading hate speech, inciting any form of violence or hatred
            against any persons, or of seditious in nature, or violates any laws
            of the Republic of India, or is barred from being shared by any laws
            of the Republic of India. We reserve the right to remove such
            content.
          </p>
          <p className={styles.para} style={{ textDecoration: "italic" }}>
            In addition to the above, please note that we may share your
            information with appropriate law enforcement authorities if we have
            good-faith belief that it is reasonably necessary to share your
            personal data or information in order to comply with any legal
            obligation or any government request; or to protect the rights or
            prevent any harm to our property or safety, our customers, or
            public; or to detect, prevent or otherwise address public safety,
            fraud, security or technical issues. You understand however, that we
            cannot be held responsible for any actions done by or to you by a
            third party or user by way of using our Platform.
          </p>
          <p className={styles.para}>
            We have developed a platform for people to come together; please do
            not share any content which is illegal or causes any harm to the
            well-being of members of the society or community.
          </p>
          <p
            className={styles.subheading}
            style={{ textDecoration: "underline" }}
          >
            <strong>d. Content Rights and Liabilities</strong>
          </p>
          <p className={styles.para}>
            We strongly believe in the freedom of expression and allow you to
            share photographs, user videos, sound recordings and other content
            on our Platform. We do not have any ownership over any of the
            content shared by you and the rights in the content remain only with
            you. You will not use our Platform to violate or infringe upon our
            or any third-party’s intellectual property rights. Further, if you
            use any content developed by us, then we shall continue to own the
            intellectual property rights in such content.
          </p>
          <p className={styles.para}>
            By sharing/posting/uploading any photographs, user videos, sound
            recordings any other content, using our Services, you grant us a
            non-exclusive, royalty-free, transferable, sub-licensable, worldwide
            license to host, use, distribute, run, copy, publicly perform or
            display, translate, and create derivative works of your content
            (consistent with your privacy and application settings). You may
            delete your content and/or account at any point. However, your
            content may continue to appear on the Platform if it has been shared
            with others. To learn more about how we use information, and how to
            control or delete your content, please read the Upsurge Privacy
            Policy.
            <strong>
              You remain solely responsible for the content you post on our
              Platform. We do not endorse and are not responsible for any
              content shared or posted on or through our Platform, and for the
              consequence of such sharing or posting. The presence of our logo
              or any trademark on any content shared by you does not mean that
              we have endorsed or sponsored your content. Further, we will not
              be liable for or responsible for the consequences of any
              transactions made or entered into by you with other users of the
              Platform.
            </strong>
          </p>
          <p className={styles.para} style={{ textDecoration: "italic" }}>
            You will always have ownership and responsibilities for the content
            you share. We will never claim that we have intellectual property
            rights over your content, but will have a free of cost, permanent
            license to use what you share and post on our Platform.
          </p>
          <p
            className={styles.subheading}
            style={{ textDecoration: "underline" }}
          >
            <strong>f. Intermediary Status and No Liability</strong>
          </p>
          <p className={styles.para}>
            We are an intermediary under the Information Technology Act, 2000
            and the Information Technology Act (Intermediary Guidelines) Rules,
            2011. These Terms are published in accordance with the provisions of
            Rule 3(1) of the Information Technology (Intermediaries Guidelines)
            Rules, 2011 that require publishing of the rules and regulations,
            Upsurge Privacy Policy, and upsurge Terms of Condition for accessing
            and using our Platform.
          </p>
          <p className={styles.para}>
            We do not control what people do or say and are not responsible for
            their (or your) actions (whether online or offline). We are not
            responsible for services and features offered by others, even if you
            access them through our Services. Our responsibility for anything
            that happens on our Platform is strictly governed by the laws of the
            Republic of India and is limited to that extent. You agree that we
            will not be responsible for any loss of profits, revenues,
            information, or data, or consequential, special, indirect,
            exemplary, punitive, or incidental damages arising out of or related
            to these Terms, even if we know they are possible. This includes
            when we delete your content, information, or account.
          </p>
          <p className={styles.para} style={{ textDecoration: "italic" }}>
            We are an intermediary under Indian law. We do not control what
            people post on our Platform but we expect everyone to comply with
            the laws of the Republic of India.
          </p>
          <p
            className={styles.subheading}
            style={{ textDecoration: "underline" }}
          >
            <strong>
              g. You Will Not Attempt to Disrupt or Jeopardize Upsurge
            </strong>
          </p>
          <p className={styles.para}>
            We have developed a community-driven platform. Therefore, you agree
            to not interfere with, or use non-public areas of our Platform,
            Services, and our technical delivery system. You will not introduce
            any trojans, viruses, any other malicious software, any bots or
            scrape our Platform for any user information. Additionally, you will
            not probe, scan, or test the vulnerability of any system, security
            or authentication measures implemented by us. If you tamper or
            attempt to tamper with our technological design and architecture, we
            may terminate your user profile. We may further report such actions
            to the appropriate law enforcement authorities and proceed against
            you with legal actions.
          </p>
          <p className={styles.para} styles={{ textDecoration: "italic" }}>
            You will not hack into or introduce malicious software of any kind
            onto our Platform. If you commit such actions, we may remove you
            from the platform and even have to report your actions to the
            police.
          </p>
          <p className={styles.heading}>19. PERMISSIONS YOU GIVE TO US</p>
          <p className={styles.para}>
            You accept these Terms and give us certain permissions so that we
            can serve you better. Permissions you have granted us are:
          </p>
          <p className={styles.para}>a. Automatic Downloads and Updates</p>
          <p className={styles.para}>
            We are constantly updating our Platform and Services offered. To use
            our Platform, you may need to download the Upsurge mobile
            application to your mobile device and update it from time to time if
            you have disabled automatic updates.
          </p>
          <p className={styles.para}>
            Applications and software are constantly updated for your use and
            you will need to install the latest version of the Upsurge mobile
            application to your mobile device each time such an update is
            generated.
          </p>
          <p className={styles.para}>b. Permission to Use Cookies</p>
          <p className={styles.para}>
            We may use cookies, pixel tags, web beacons, mobile device IDs,
            flash cookies and similar files or technologies to collect and store
            information with respect to your use of the Services and third-party
            websites. Please see the Upsurge Policy for more information
            regarding the use of cookies and other technologies described in
            this section, including regarding your choices relating to such
            technologies.
          </p>
          <p className={styles.para}>c. Data Retention</p>
          <p className={styles.para}>
            We shall have the right to retain certain information regarding your
            usage of the Platform. Please view the Upsurge Privacy Policy for
            further information relating to the collection, storage and use of
            your information by us.
          </p>
          <p className={styles.para}>
            You grant us the right to store and retain information relating to
            you and provided by you. Please see the Privacy Policy for further
            information.
          </p>
          <p className={styles.heading}>
            20. OUR AGREEMENT AND WHAT HAPPENS IF WE DISAGREE
          </p>
          <p className={styles.para}>a. Who Has Rights Under These Terms</p>
          <p className={styles.para}>
            The rights and obligations under these terms are granted only to you
            and shall not be assigned to any third party without our consent.
            However, we are permitted to assign our rights and obligations under
            these Terms to others. This can happen when, for example, we enter
            into a merger with another company and create a new company.
          </p>
          <p className={styles.para}>b. How We Will Handle Disputes</p>
          <p className={styles.para}>
            In all cases, you agree that disputes will be subject to the laws of
            the Republic of India and the courts of Delhi shall have exclusive
            jurisdiction over all such disputes.
          </p>
          <p className={styles.para}>c. Grievance Officer</p>
          <p className={styles.para}>
            We have a Grievance Officer to address your concerns regarding data
            safety, privacy, and Platform usage concerns. We will resolve the
            issues raised by you within 30 (thirty) days from receiving them.
          </p>
          <p className={styles.para}>
            You may contact the Grievance Officer at any of the following:
          </p>
          <p className={styles.para}>Address: </p>
          <p className={styles.para}>Office Hours:.</p>
          <p className={styles.para}>Email: </p>
          <p className={styles.para}>
            We have created a method for you to get in touch with us and for us
            to address your concerns.
          </p>
          <p className={styles.heading}>21. LIMITATION OF LIABILITY</p>
          <p className={styles.para}>
            We do not assume any liability with respect to any loss or damage,
            arising directly or indirectly due to any inaccuracy or
            incompleteness of any information or a breach of any warranty or
            guarantee due to the actions of any user of the Platform.
          </p>
          <p className={styles.para}>
            The Platform and Services are provided on "as is" and "as available"
            basis without any representation or warranties, express or implied
            except otherwise specified in writing. We do not warrant the quality
            of the Services or the Platform including its uninterrupted, timely,
            secure or error-free provision, continued compatibility on any
            device, or correction of any errors.
          </p>
          <p className={styles.para}>
            In no event shall we, or any of our affiliates, successors, and
            assigns, and each of their respective investors, directors,
            officers, employees, agents, service providers, and suppliers be
            liable for any special, incidental, punitive, direct, indirect or
            consequential damages suffered as a consequence of a breach of the
            Terms by another user or arising out of the use of or the reliance
            on any of the Services or the Platform.
          </p>
          <p className={styles.para}>
            In the event any exclusion contained herein is held to be invalid
            for any reason and we or any of our affiliate entities, officers,
            directors or employees become liable for loss or damage, then, any
            such liability shall be limited to not exceeding the charges or
            amounts paid to us for use of the Platform or the Services in the
            month preceding the date of the claim.
          </p>
          <p className={styles.heading}>22. INDEMNIFICATION</p>
          <p className={styles.para}>
            You agree to indemnify, defend and hold harmless us, and our
            subsidiaries, affiliates and agents and their respective officers,
            directors, employees, successors and assigns from and against any
            claim, proceeding, loss, damage, liability, cost, demand or expense
            (including but not limited to attorney's fees) of any kind arising
            out of: <br />
            (i) your access to or use of the Platform and Services; <br />
            (ii) any breach by you of your obligations under this Agreement;{" "}
            <br />
            (iii) your violation of the rights of any third party, including any
            infringement of intellectual property, or of any privacy or consumer
            protection right; <br />
            (iv) any violation of law or contractual obligation and any claims,
            demands, notices pursuant to such violation; <br />
            (v) your negligence or wilful misconduct. This obligation will
            survive termination of our Terms.
          </p>
          <p className={styles.para}>23. UNSOLICITED MATERIAL</p>
          <p className={styles.para}>
            We always appreciate feedback or other suggestions. We may use the
            same without any restrictions or obligation to compensate you for
            them and are under no obligation to keep them confidential.
          </p>
        </div>
      ) : (
        <div className={styles.main} id="termswrapper">
          <h1 className={styles.heading}>Privacy Policy</h1>
          <p className={styles.para}>
            Welcome to Upsurge. This Privacy Policy describes how we collect,
            use, and disclose information about you, the Parent, the Child, or
            Educator (collectively, the <strong>Users</strong> ).
          </p>
          <p className={styles.para}>
            Please read this Privacy Policy carefully. By using our website,
            applications, and online games (collectively, the
            <strong>Services</strong>), you agree to the handling of your
            information in accordance with this Privacy Policy.
          </p>
          <p className={styles.para}>
            The terms “We” / “Us” / “Our”/”Company” individually and
            collectively refer to Surgeup Technologies Private Limited and the
            terms “You” /”Your” / “Yourself” refer to the <strong>Users</strong>
            .
          </p>
          <p className={styles.para}>
            This Privacy Policy is an electronic record in the form of an
            electronic contract formed under the information Technology Act,
            2000 and the rules made thereunder and the amended provisions
            pertaining to electronic documents / records in various statutes as
            amended by the information Technology Act, 2000. This Privacy Policy
            does not require any physical, electronic or digital signature.
          </p>{" "}
          <p className={styles.para}>
            This Privacy Policy is a legally binding document between you and
            Surgeup Technologies Private Limited (both terms defined below). The
            terms of this Privacy Policy will be effective upon your acceptance
            of the same (directly or indirectly in electronic form, by clicking
            on the I accept tab or by use of the website or by other means) and
            will govern the relationship between you and First Pay Technologies
            Private Limited for your use of the website “Services”.
          </p>{" "}
          <p className={styles.para}>
            This document is published and shall be construed in accordance with
            the provisions of the Information Technology (reasonable security
            practices and procedures and sensitive personal data of information)
            rules, 2011 under Information Technology Act, 2000; that require
            publishing of the Privacy Policy for collection, use, storage and
            transfer of sensitive personal data or information.
          </p>{" "}
          <p className={styles.para}>
            Please read this Privacy Policy carefully by using the Services, you
            indicate that you understand, agree and consent to this Privacy
            Policy. If you do not agree with the terms of this Privacy Policy,
            please do not use the Services.
          </p>{" "}
          <p className={styles.para}>
            By providing us your Information or by making use of the facilities
            provided by the Service, You hereby consent to the collection,
            storage, processing and transfer of any or all of Your Personal
            Information and Non-Personal Information by us as specified under
            this Privacy Policy. You further agree that such collection, use,
            storage and transfer of Your Information shall not cause any loss or
            wrongful gain to you or any other person.
          </p>
          <h1 className={styles.heading}>What is Upsurge?</h1>
          <p className={styles.para}>
            Upsurge is a financial literacy education platform that teaches
            children powerful life-changing money management skills. From our
            entertaining and captivating digital game where students learn
            comprehensive money concepts to our integrated curriculum for
            teachers to connect student play with classroom learning, Surgeup
            has created a complete program to teach financial literacy.
            Furthermore, we support parents with supplemental material allowing
            them to join their children in the journey to achieving financial
            literacy.
          </p>
          <p className={styles.para}>
            Surgeup teaches financial literacy concepts through captivating
            challenges designed to be played as games. Children access the
            online game where they play a series of challenges and earn rewards
            in the form of coins. Children can spend these coins in the virtual
            store to buy virtual items. These virtual items can be placed within
            the virtual world to create their own unique world.
          </p>
          <h1 className={styles.heading}>1. Account Users</h1>
          <p className={styles.para}>
            Users of the Services include Parent User, Child User and, Educator
            User (see Terms and Conditions).
          </p>
          <h1 className={styles.heading}>
            2. What Information Does Upsurge Collect?
          </h1>
          <p className={styles.para}>
            Upsurge collects the following information:
          </p>
          <p className={styles.subheading}>
            <strong>A. User Provided Information</strong>
          </p>{" "}
          <p className={styles.para}>
            Upsurge and our third party service providers collect information
            that Users provide when using the Services.
          </p>
          <p className={styles.para}>Parent User</p>
          <p className={styles.para}>
            A Parent User must register for an account. Parent Users are
            required to provide information including first and last name, email
            address, password, and country. This information is used for
            identification purposes and allows Parent Users to access the
            Services. Payment information will also be collected from Parent
            Users who purchase a Premium Membership (see Terms and Conditions).
            Upsurge does not directly store credit card information. All credit
            card information is stored by our third party payment processor.{" "}
          </p>
          <p className={styles.para}>Child User</p>
          <p className={styles.para}>
            Upsurge only collects the minimum amount of information to allow for
            a personalized learning experience and to facilitate monitoring from
            parents and educators. A Parent User must sign up his/her child.
            Upsurge will ask for a Parent User to input a child’s name, grade
            level and create a unique username/password combination. The Child
            user will log in with the username/password combination. If the
            Child user loses his/her password, the parent has sole authority to
            change the password.
          </p>
          <p className={styles.para}>Educator User</p>
          <p className={styles.para}>
            Educator Users are required to provide information including first
            and last name, email address, password, grade level, school, and
            country. Educators can access the Services with an email address and
            password.
          </p>
          <p className={styles.subheading}>
            B. Information Collected From Users
          </p>
          <p className={styles.para}>
            Upsurge and our third party service providers may also collect
            certain information automatically while you are using our Services
            in order to help us improve our services and provide a more
            customized learning experience to our Users. This collected
            information includes but is not limited to: location, device,
            session information, browser, cookies, and game play information.
          </p>
          <p className={styles.subheading}>C. Cookies</p>
          <p className={styles.para}>
            To improve the responsiveness of the sites for our users, we may use
            “cookies”, or similar electronic tools to collect information to
            assign each visitor a unique, random number as a User Identification
            (User ID) to understand the user’s individual interests using the
            Identified Computer. Unless you voluntarily identify yourself
            (through registration, for example), we will have no way of knowing
            who you are, even if we assign a cookie to your computer. The only
            personal information a cookie can contain is information you supply
            (an example of this is when you ask for our Personalised Horoscope).
            A cookie cannot read data off your hard drive. Our advertisers may
            also assign their own cookies to your browser (if you click on their
            ads), a process that we do not control.{" "}
          </p>
          <p className={styles.para}>
            Our web servers automatically collect limited information about your
            computer’s connection to the Internet, including your IP address,
            when you visit our site. (Your IP address is a number that lets
            computers attached to the Internet know where to send you data —
            such as the web pages you view.) Your IP address does not identify
            you personally. We use this information to deliver our web pages to
            you upon request, to tailor our site to the interests of our users,
            to measure traffic within our site and let advertisers know the
            geographic locations from where our visitors come.
          </p>
          <p className={styles.para}>
            All required information is service dependent and we may use the
            above said user information to, maintain, protect, and improve its
            services (including advertising services) and for developing new
            services
          </p>
          <p className={styles.para}>
            Such information will not be considered as sensitive if it is freely
            available and accessible in the public domain or is furnished under
            the Right to Information Act, 2005 or any other law for the time
            being in force.
          </p>
          <p className={styles.heading}>3. Links to the Other Sites</p>
          <p className={styles.para}>
            Our policy discloses the privacy practices for our own services
            only. Our site provides links to other websites also that are beyond
            our control. We shall in no way be responsible in way for your use
            of such sites.
          </p>
          <p className={styles.heading}>
            4. How Does Upsurge Keep My Information Secure?
          </p>
          <p className={styles.para}>
            The security of your personal information is of utmost importance to
            us. We use industry best practices and standards to safeguard the
            information collected by the Services. Please be aware that no
            system is 100% secure and we are not responsible for the security of
            information transmitted over networks that are not in our control
            such as internet and wireless networks.
          </p>
          <p className={styles.para}>
            We take appropriate security measures to protect against
            unauthorized access to or unauthorized alteration, disclosure or
            destruction of data. These include internal reviews of our data
            collection, storage and processing practices and security measures,
            including appropriate encryption and physical security measures to
            guard against unauthorized access to systems where we store personal
            data.
          </p>
          <p className={styles.para}>
            All information gathered on our Services are securely stored within
            our controlled database. The database is stored on servers secured
            behind a firewall; access to the servers is password-protected and
            is strictly limited. However, as effective as our security measures
            are, no security system is impenetrable. We cannot guarantee the
            security of our database, nor can we guarantee that information you
            supply will not be intercepted while being transmitted to us over
            the Internet. And, of course, any information you include in a
            posting to the discussion areas is available to anyone with Internet
            access.{" "}
          </p>
          <p className={styles.para}>
            However as the internet is an ever evolving medium. We may change
            our Privacy Policy from time to time to incorporate necessary future
            changes. Of course, our use of any information we gather will always
            be consistent with the policy under which the information was
            collected, regardless of what the new policy may be.
          </p>
          <p className={styles.heading}>
            5. What Does Upsurge Share With Third Parties?
          </p>{" "}
          <p className={styles.para}>
            We share the sensitive personal information to any third party
            without obtaining the prior consent of the user in the following
            limited circumstances:
          </p>
          <p className={styles.para}>
            (a) When it is requested or required by law or by any court or
            governmental agency or authority to disclose, for the purpose of
            verification of identity, or for the prevention, detection,
            investigation including cyber incidents, or for prosecution and
            punishment of offences. These disclosures are made in good faith and
            belief that such disclosure is reasonably necessary for enforcing
            these Terms; for complying with the applicable laws and regulations.{" "}
          </p>
          <p className={styles.para}>
            (b) We propose to share such information within its group companies
            and officers and employees of such group companies for the purpose
            of processing personal information on its behalf. We also ensure
            that these recipients of such information agree to process such
            information based on our instructions and in compliance with this
            Privacy Policy and any other appropriate confidentiality and
            security measures.
          </p>
          <p className={styles.para}>
            Upsurge will never sell your data to third parties. Information
            collected from users will only be disclosed to third parties
            necessary for the operation of the business and Services such as to
            payment processors. We do not disclose the personal information of
            any Child User to third parties for marketing or promotional
            purposes. Upsurge may share non-identifiable information, such as
            data on percentage of Users, with the public for marketing purposes
            but will not contain any specific personal information about
            individual Users.{" "}
          </p>
          <p className={styles.heading}>
            6. How Do I change or Delete My Information?
          </p>
          <p className={styles.para}>
            Users can view, change, or delete their account information by
            updating the information from within the Services or contacting us
            and make a request to delete their personal information from our
            records. Upsurge will make best efforts to do this in a timely
            manner.
          </p>
          <p className={styles.heading}>7. Changes to Our Privacy Policy</p>
          <p className={styles.para}>
            We are committed to keeping your data secure and will follow best
            practices and do our best to keep this Privacy Policy up-to-date.
            Whenever the Privacy Policy is updated, we will notify you by
            posting the revised Privacy Policy through our website, within the
            Services, or via email.
          </p>
        </div>
      )}
    </div>
  );
}
