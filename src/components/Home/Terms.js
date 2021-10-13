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
            {`Some parts of the Service are billed on a subscription basis
            ("Subscription(s)"). You will be billed in advance on a recurring
            and periodic basis ("Billing Cycle"). Billing cycles are set on a
            monthly or annual basis. At the end of each Billing Cycle, your
            Subscription will automatically renew under the exact same
            conditions unless you cancel it or Surgeup Technologies Private
            Limited cancels it. You may cancel your Subscription renewal either
            through your online account management page or by contacting Surgeup
            Technologies Private Limited customer support team.`}
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
            {`Surgeup Technologies Private Limited may, at its sole discretion,
            offer a Subscription with a free trial for a limited period ("Free
            Trial"), you will not be charged by Surgeup Technologies Private
            Limited until the Free Trial has expired. On the last day of the
            Free Trial period, unless you cancelled your Subscription, you will
            be automatically charged the applicable Subscription fees for the
            type of Subscription you have selected at any time and without
            notice, Surgeup Technologies Private Limited reserves the right to`}
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
            {`Once we have compared your (the subjects') rights to "the public
            interest in the availability of the data", we may delete your
            personal data where you have requested this.`}
          </p>
          <p className={styles.subheading}>5. Data Portability</p>
          <p className={styles.para}>
            {`We allow you to receive the personal data concerning you, which we
            will provide in a 'commonly used and machine readable format' and
            you have the right to transmit that data to another ‘controller’.`}
          </p>
          <p className={styles.subheading}>6. Privacy by Design</p>
          <p className={styles.para}>
            {`We implement appropriate technical and organisational measures, in
            an effective way and protect the rights of data subjects'. We hold
            and process only the data absolutely necessary for the completion of
            our duties (data minimisation), as well as limiting the access to
            personal data to those needing to act out the processing`}
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
            {`The Platform and Services are provided on "as is" and "as available"
            basis without any representation or warranties, express or implied
            except otherwise specified in writing. We do not warrant the quality
            of the Services or the Platform including its uninterrupted, timely,
            secure or error-free provision, continued compatibility on any
            device, or correction of any errors.`}
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
            {`You agree to indemnify, defend and hold harmless us, and our
            subsidiaries, affiliates and agents and their respective officers,
            directors, employees, successors and assigns from and against any
            claim, proceeding, loss, damage, liability, cost, demand or expense
            (including but not limited to attorney's fees) of any kind arising
            out of:`}{" "}
            <br />
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
            This Privacy Policy (“Privacy Policy/Policy”) discloses the privacy
            practices for <strong>Surgeup Technologies Private Limited</strong>{" "}
            (“Upsurge”, “We/we” or “Us/us”) with regard to collection and use of
            the Personal Information (defined hereunder) of the customers,
            vendors, employees and the users (“You/you” or “Your/your”) and use
            of the online platform “<strong>Upsurge</strong>”. This Privacy
            Policy along with Terms of Use describes our practices regarding,
            including your choices in relation to how we collect, store, use,
            share and secure your Personal Information across our Website and
            Mobile application called <strong>“Upsurge”-Made in India.</strong>
            The website and mobile application are referred to as the{" "}
            <strong>“Platform”</strong>
            It also describes your choices regarding use, access and correction
            of your Personal Information and your rights in relation to your
            Personal Information and how to contact us or supervisory
            authorities in the event you have a complaint.
          </p>
          <p className={styles.para}>
            By providing your consent to this Privacy Policy and accepting the
            Terms of Use, you agree to the collection, use and transfer of your
            Personal Information as set out in this Privacy Policy. If you do
            not agree with the terms of this Privacy Policy, please do not
            use/access this Website or application.
          </p>
          <p className={styles.para}>
            We will review this Privacy Policy from time to time to make sure it
            is up to date. If you are just a visitor, then please note that this
            Privacy Policy is subject to change at any time without notice. To
            make sure you are aware of any changes, please review this Policy
            periodically. If you are our registered user, we will notify you
            before we make changes to this Policy and give you the opportunity
            to review the revised Policy before you choose to continue using our
            services.
          </p>
          <p className={styles.para}>
            {`By Personal Information, we mean any information that can either
            itself identify you as an individual ("Personally Identifying
            Information") or that can be connected to you indirectly by linking
            it to Personally Identifying Information. Please note that usage of
            the term Personal Information in this Privacy Policy includes
            sensitive personal data or information, wherever appropriate and/or
            mandated under applicable laws.`}
          </p>{" "}
          <p className={styles.heading}>COLLECTION OF INFORMATION</p>{" "}
          <p className={styles.para}>
            As a visitor, you can browse our website or application to find out
            more about our platform. You are not required to provide us with any
            Personal Information as a visitor. When you visit the Website or
            application, we collect and store certain information to improve
            security, analyse trends and administer the Website and application
            with a view to assist us in improving customer experience. We use
            this information to evaluate traffic patterns on our platform so
            that we can make it more useful to our visitors.
          </p>{" "}
          <p className={styles.para}>
            We collect your Personal Information when you register with us, when
            you express an interest in obtaining information about us or our
            products and services, when you participate in activities on our
            platform or otherwise contact us.
          </p>{" "}
          <p className={styles.para}>
            We will only collect your Personal Information if we have a proper
            reason for doing so, e.g.: to comply with our legal and regulatory
            obligations; for the performance of our contract with you or to take
            steps at your request before entering into a contract; for our
            legitimate interests (where permitted by law) or those of a third
            party; or where you have given consent.
          </p>
          <p className={styles.para}>
            In some cases, we may also have a legal obligation to collect
            Personal Information from you or may otherwise need the Personal
            Information to protect your vital interests or those of another
            person (for example, to prevent payment fraud or confirm your
            identity.){" "}
          </p>
          <p className={styles.para}>
            Our primary goal in collecting your Personal Information is to
            provide you a safe, efficient, smooth, and customized experience.
            This allows us to provide courses, study material, tutorials,
            educational games that most likely meet your needs and to customize
            our Platform to make your experience safer and easier. We also use
            your Personally Identifiable Information together with other
            information to help us better understand our users and to improve
            the content and functionality of our Platform. The information we
            learn from you helps us personalize and continually improve your
            experience at our Platform. We do not voluntarily make this
            information available to third parties, nor do we use it for any
            other purpose, except as set out herein.
          </p>
          <p className={styles.para}>
            When you visit our Platform, as part of a purchase of products and
            services or registering on our platform, we may collect a variety of
            Personal Information that you will voluntarily provide to us via one
            of our contact forms, via a chat or phone session, such as:
          </p>
          <ul>
            <li
              className={styles.subheading}
              style={{ marginLeft: "20px", paddingLeft: "10px" }}
            >
              Contact Information, such as name, email address, display picture,
              mailing address, phone number, IP address, geographic location, or
              phone number.{" "}
            </li>
            <li
              className={styles.subheading}
              style={{ marginLeft: "20px", paddingLeft: "10px" }}
            >
              Billing Information, such as debit card number, credit card number
              and billing address.
            </li>
            <li
              className={styles.subheading}
              style={{ marginLeft: "20px", paddingLeft: "10px" }}
            >
              Unique Identifiers, such as username or password.
            </li>
            <li
              className={styles.subheading}
              style={{ marginLeft: "20px", paddingLeft: "10px" }}
            >
              {`Reviews or ratings, account settings, (including preferences set
              in the " Account " section of our platform); and`}
            </li>
            <li
              className={styles.subheading}
              style={{ marginLeft: "20px", paddingLeft: "10px" }}
            >
              Information provided to us through our service, interaction with
              our customer service, participation in surveys or marketing
              promotions.
            </li>
          </ul>
          <p className={styles.para}>
            We collect information about you and your use of our service, your
            interactions with us as well as information regarding your computer
            or other device used to access our service. This information
            includes your activity on our platform, details of your interactions
            with customer service , such as the date , time and reason for
            contacting us, transcripts of any chat conversations, and if you
            call us , your phone number and call recordings; device IDs or other
            unique identifiers, device and software characteristics (such as
            type and configuration), connection information, statistics on page
            views , referring source (for example, referral URLs), IP address
            (which may tell us your general location), browser and standard web
            server log information, information collected via the use of
            cookies, web beacons and other technologies.
          </p>{" "}
          <p className={styles.para}>
            If you use a feature that requires payment of a fee options like
            NEFT, or Card will appear. In case of payments via credit or debit
            card, we will redirect you to registered payment gateways such as
            razorpay and other such registered gateways. You may store and save
            your payment details like card numbers with the gateway. We do not
            have access to this data. All payment transactions are processed
            through secure payment gateway providers. We do not store any card
            information (other than the last 4 digits of your card) in our
            servers.
          </p>
          <p className={styles.para}>
            When you use one of our paid products, we track the web pages, and
            information that has been accessed by you, and store it on our
            servers. This enables us to track items that you have completed, and
            those that you need to see.
          </p>
          <p className={styles.para}>
            Upsurge can use technologies such as cookies, clear gifs, log files,
            and flash cookies for several purposes, including to help understand
            how you interact with our platform and services, to provide a better
            experience.
          </p>
          <p className={styles.heading}>USAGE AND RETENTON OF INFORMATION </p>
          <p className={styles.para}>
            We use the Personal Information we collect, where it is necessary to
            deliver the services, you have requested, where it is necessary to
            exercise or comply with legal rights or obligations or for normal
            business purposes of the kind set out in this Policy.
          </p>
          <p className={styles.para}>
            We will use your Personal Information to provide, analyze,
            administer, and improve our services, to provide you with a
            personalized experience on our Platform (especially, by offering you
            services that is best suited for you), to contact you about your
            account and our services, to provide you customer service, to
            provide you with personalized marketing and to detect, prevent,
            mitigate and investigate fraudulent or illegal activities.
          </p>
          <p className={styles.para}>
            We further use your Personal Information to determine your general
            geographic location and recommendations, determine your internet
            service provider, and help us quickly and efficiently respond to
            inquiries and requests and enforcing our terms (such as determining
            free trial eligibility) and communicate with you concerning our
            service (for example by email, push notifications, text messaging
            ,and online messaging channels), so that we can send you details
            about new features and content available on the platform, special
            offers, promotional announcements, surveys, and to assist you with
            operational requests such as password reset requests.
          </p>
          <p className={styles.para}>
            Upsurge is a community. We offer several features that allow members
            to connect and communicate in public or semi-public spaces, such as
            Forums and Teams. Please be sensible and judge before posting in
            these community spaces or sharing your Personal Information with
            others on Upsurge. Be aware that any Personal Information you submit
            there can be read, collected, or used by others, or could be used to
            send you unsolicited messages.
          </p>
          <p className={styles.para}>
            Upsurge do not retain your Personal Information for longer than is
            required for the purposes for which the information may be lawfully
            used.
          </p>
          <p className={styles.heading}>
            SHARING AND DISCLOSING PERSONAL INFORMATION{" "}
          </p>
          <p className={styles.para}>
            {`We use other companies, agents, or contractors ("Service Providers")
            to perform services on our behalf or to assist us with the provision
            of services to you. We engage Service Providers to provide
            marketing, advertising, communications, infrastructure, and IT
            services, to personalize and optimize our service, to process credit
            card transactions or other payment methods, to provide customer
            service, to collect debts, to analyze and enhance data (including
            data about users’ interactions with our service), and to process and
            administer consumer surveys. In the course of providing such
            services, these Service Providers may have access to your Personal
            Information or other information. We do not authorize them to use or
            disclose your Personal Information except in connection with
            providing their services.`}
          </p>
          <p className={styles.para}>
            Note to our customers in Europe: We transfer your Personal
            Information from the European Economic Area a to India. By
            submitting your data and/or using our services, you consent to the
            transfer, storing, and processing of your Personal Information in
            India.
          </p>
          <p className={styles.heading}>SECURITY</p>
          <p className={styles.para}>
            We shall try to take all precautions to protect the Personal
            Information both online and offline. We will try to protect your
            information using technical and administrative security measures to
            reduce the risks of loss, misuse, unauthorized access, disclosure,
            and alteration. We have standard SSL certification which basically
            helps us create a secure connection between our server and user to
            render any information or action. Some of the safeguards we use are
            firewalls and data encryption, physical access controls to our data
            centers and information access authorization controls. Only user
            passwords are encrypted and stored because generally users use the
            same password on multiple sites, to prevent any kind of theft,
            piracy, or unauthorized access. If you believe your account has been
            abused or hacked, please contact us by sending us an email at
            karan@upsurgefi.com.
          </p>
          <p className={styles.para}>
            We do not sell, transfer, or rent your Personal Information to third
            parties for their marketing purposes without your explicit consent
            and we only use your information as described in the Privacy Policy.
            We view protection of your privacy as a very important community
            principle. We understand clearly that you and your Personal
            Information is one of our most important assets.{" "}
          </p>
          <p className={styles.para}>
            We store and process your Personal Information on computers located
            in India that are protected by physical as well as technological
            security devices. We use third parties to verify and certify our
            privacy principles. If you object to your Personal Information being
            transferred or used in this way, please do not accept this Privacy
            Policy.
          </p>
          <p className={styles.para}>
            Under no circumstances, we rent, trade, transfer or share your
            Personal Information that we have collected with any other company
            for their marketing purposes without your consent. We reserve the
            right to communicate your Personal Information to any third party
            that makes a legally compliant request for its disclosure.
          </p>
          <p className={styles.heading}>
            KEEPING YOUR PERSONAL INFORMATION SECURE
          </p>
          <p className={styles.para}>
            We have appropriate security measures to prevent your Personal
            Information from being accidentally lost or used or accessed
            unlawfully. Processing your Personal Information will be done only
            in an authorized manner and subject to a duty of confidentiality. We
            also have procedures in place to deal with any suspected data
            security breach. We will notify you about any applicable regulator
            of a suspected data security breach where we are legally required to
            do so.
          </p>
          <p className={styles.para}>
            Notwithstanding anything contained anywhere in this Policy; we
            cannot assure absolute security to your Personal Information and by
            entering or by logging into our Platform, you explicitly agree not
            to sue us for any data breach.
          </p>
          <p className={styles.COOKIES}>
            5. What Does Upsurge Share With Third Parties?
          </p>{" "}
          <p className={styles.para}>
            We transfer cookies, which are small files containing a string of
            character, to your IP address, giving the browser distinct
            identification, to keep track of the user’s preferences.
            Furthermore, these files also help in logging-in faster and they act
            as a mechanism to determine user trends. The data thus retrieved
            from the user’s IP address, enables us to enhance our offers,
            including but not limited to more content in areas of greater
            interest to most users.
          </p>
          <p className={styles.para}>
            {`Our platform uses "Cookies" to identify the areas of our website or
            mobile application that you have visited. A Cookie is a small piece
            of data stored on your computer or mobile device by your web
            browser. We use Cookies to personalize the Content that you see on
            our platform. Most web browsers can be set to disable the use of
            Cookies. However, if you disable Cookies, you may not be able to
            access functionality on our Platform correctly or at all. We never
            place Personally Information in Cookies.`}
          </p>
          <p className={styles.heading}>THIRD PARTIES AND LINKS</p>
          <p className={styles.para}>
            We may pass your details to other companies in our group. We may
            also pass your details to our agents and subcontractors to help us
            with any of our uses of your data set out in our Privacy Policy. For
            example, we may use third parties to assist us with delivering
            services to you, to help us to collect payments from you, to analyse
            data and to provide us with marketing or customer service
            assistance.
          </p>
          <p className={styles.para}>
            We may exchange information with third parties for the purposes of
            fraud protection and credit risk reduction. We may transfer our
            databases containing your Personal Information if we sell our
            business or part of it. Other than as set out in this Privacy
            Policy, we shall NOT sell or disclose your Personal Information to
            third parties without obtaining your prior consent unless it is
            necessary for the purposes set out in this Privacy Policy or unless
            we are required to do so by law. The platform may contain
            advertising of third parties and links to other sites or frames of
            other sites. Please be aware that we are not responsible for the
            privacy practices or content of those third parties or other sites,
            nor for any third party to whom we transfer your data in accordance
            with our Privacy Policy.
          </p>
          <p className={styles.para}>
            Our Platform may contain links to other websites that are not under
            our direct control. These websites may have their own policies
            regarding privacy. We have no control of or responsibility for
            linked websites and provide these links solely for the convenience
            and information of our visitors. You are accessing such linked
            websites shall be at your own risk. These websites are not subject
            to this Privacy Policy. You should check the privacy policies, if
            any, of those individual websites to see how the operators of those
            third-party websites will utilize your personal information. In
            addition, these websites may contain a link to websites of our
            affiliates. The websites of our affiliates are not subject to this
            Privacy Policy, and you should check their individual privacy
            policies to see how the operators of such websites will utilize your
            personal information.
          </p>
          <p className={styles.heading}>CONSULTING</p>
          <p className={styles.para}>
            We use third parties to help us provide services to You including
            the fulfilment of service, processing of payments, monitoring site
            activity, conducting surveys, maintaining our database,
            administering emails, and administering contents, and to provide
            aggregate, comparative information on the performance of our
            platform to us and a select group.{" "}
          </p>
          <p className={styles.heading}>CHOICE </p>
          <p className={styles.para}>
            It is open for you to customize our usage of your personal
            information to communicate with you, to send you marketing
            information, how we provide you with customized and relevant
            advertising, and whether you want to stay signed into your account.
          </p>
          <p className={styles.para}>
            If you do not wish to receive marketing communications from us, you
            can unsubscribe from the link in the email you would receive or
            change your communication preferences or indicate your communication
            preferences. You can also reach us via chat, WhatsApp, call or email
            to block promotional communication to you. Keep in mind, we do not
            sell or rent your personal information to third parties for their
            marketing purposes without your explicit consent.{" "}
          </p>
          <p className={styles.heading}>OWNERSHIP OF RIGHTS</p>
          <p className={styles.para}>
            All rights, including copyright, in this platform are owned by or
            licensed to us. Any use of this Website and mobile application or
            its contents, including copying or storing it or them in whole or
            part, other than for your own personal, non-commercial use is
            prohibited without our permission. You are prohibited from
            modifying, copying, distributing, transmitting, displaying,
            printing, publishing, selling, licensing, creating derivative works
            or using any content available on or through our platform for
            commercial or public purposes. You may not modify, distribute or
            re-post something on this platform for any purpose.
          </p>
          <p className={styles.para}>
            The Site contains copyrighted material, trademarks, and other
            proprietary information, including, but not limited to, text,
            software, photos, video, graphics, music, sound, and the entire
            contents of Upsurge is protected by copyright as a collective work
            under the applicable copyright laws. Upsurge owns a copyright in the
            selection, coordination, arrangement, and enhancement of such
            content, as well as copyright or license to use in the content
            original to it. You may not modify, publish, transmit, participate
            in the transfer or sale, create derivative works, or in any way
            exploit, any of the content, in whole or in part. You may download /
            print / save copyrighted material for your personal use only. Except
            as otherwise expressly stated under copyright law, no copying,
            redistribution, retransmission, publication, or commercial
            exploitation of downloaded material without the express permission
            of Upsurge is permitted. If copying, redistribution, or publication
            of copyrighted material is expressly permitted by Upsurge, then no
            changes in or deletion of author attribution, trademark legend or
            copyright notice shall be made.
          </p>
          <p className={styles.para}>
            You acknowledge that you do not acquire any ownership rights by
            downloading copyrighted material. Trademarks that are located within
            or on our Website or a website otherwise owned or operated in
            conjunction with Upsurge shall not be deemed to be in the public
            domain but rather the exclusive property of Upsurge, unless such
            site is under license from the trademark owner thereof in which case
            such license is for the exclusive benefit and use of Upsurge, unless
            otherwise stated.
          </p>
          <p className={styles.para}>
            {`Upsurge does not have any express burden or responsibility to
            provide you with indications, markings, or anything else that may
            aid you in determining whether the material in question is
            copyrighted or trademarked. You shall be solely liable for any
            damage resulting from any infringement of copyrights, trademarks,
            proprietary rights or any other harm resulting from such a
            submission. By submitting material to any public area of the
            Website, you warrant that the owner of such material has expressly
            granted Upsurge the royalty-free, perpetual, irrevocable,
            non-exclusive right and license to use, reproduce, modify, adapt,
            publish, translate and distribute such material (in whole or in
            part) worldwide and/or to incorporate it in other works in any form,
            media or technology now known or hereafter developed for the full
            term of any copyright that may exist in such material. You also
            permit any other end user to access, view, store or reproduce the
            material for that end user's personal use. You hereby grant Upsurge,
            the right to edit, copy, publish and distribute any material made
            available on the Platform by you. If you come across any abuse or
            violation of these Terms, please report to karan@upsurgefi.com.`}
          </p>
          <p className={styles.heading}>
            YOUR RIGHTS IN RELATION TO PERSONAL INFORMATION COLLECTED BY US
          </p>
          <p className={styles.para}>
            You have the right to withdraw your consent at any time in writing
            by sending an e-mail to us at karan@upsurgefi.com, in accordance
            with the terms of this Privacy Policy. However, please note that
            withdrawal of consent will not be retrospective in nature and shall
            be applicable prospectively.
          </p>
          <p className={styles.para}>
            You may write to us at karan@upsurgefi.com to access, review, modify
            or correct your Personal Information or withdraw your consent to
            provide Personal Information. We are not responsible for the
            authenticity of the information provided by you.
          </p>
          <p className={styles.para}>
            You agree and acknowledge that Your right to access, modify and/or
            withdrawing Your consent to provide Personal Information as
            mentioned above may be denied or limited by us, as may be required
            under any applicable law, law enforcement requests or under any
            judicial proceedings.{" "}
          </p>
          <p className={styles.para}>
            Under Rule 5 (5) of the Rule 5 (5) of the Information Technology
            (Reasonable Security Practices and Procedures and Sensitive Personal
            Data or Information) Rules, 2011 (“<strong>Rules</strong>”) any data
            (personal information and sensitive personal information) collected
            by us from you, shall not be used for any purpose other than what
            was specified at the time of its collection. Under Rule 5(6) of the
            Rules, you have a right to ask us to review, correct and amend the
            information we collect about you at any point in time. Under Rule
            5(7) of the Rules, you also have the right to revoke your consent to
            the collection of your information going forward. However, please
            note that revoking your consent may negatively affect your use of
            the Platform{" "}
          </p>
          <p className={styles.heading}>CONDITIONS OF USE </p>
          <p className={styles.para}>
            Licensee does not warrant that this Website or Mobile application,
            its servers, or email sent by us or on our behalf are virus free. We
            will not be liable for any damages of any kind arising from the use
            of this platform, including, but not limited to compensatory,
            direct, indirect, incidental, punitive, special, or consequential
            damages, loss of data, goodwill, business opportunity, income or
            profit, loss of or damage to property and claims of third parties.{" "}
          </p>
          <p className={styles.heading}>GRIEVANCE OFFICER</p>
          <p className={styles.para}>
            Any discrepancies and grievances with respect to processing of
            Personal Information shall be informed to the designated Grievance
            Officer as mentioned below:
            <br /> Name: Karan Baweja
            <br />
            Designation: Grievance Officer
            <br />
            Grievance Officer Email ID: karan@upsurgefi.com
          </p>
          <p className={styles.heading}>CONSENT TO THE POLICY </p>
          <p className={styles.para}>
            The Terms of Use Agreement is incorporated herein by reference in
            its entirety.
          </p>
          <p className={styles.heading}>GENERAL </p>
          <p className={styles.heading}>Modification: </p>
          <p className={styles.para}>
            We may at any time modify the Terms of Use of our Website without
            any prior notification to you. Should you wish to terminate your
            account due to a modification to the Terms or the Privacy Policy,
            you may do so email us at karan@upsurgefi.com. However, if you
            continue to use the service you shall be deemed to have agreed to
            accept and abide by the modified Terms of this Website.{" "}
          </p>
          <p className={styles.heading}>Privileged/Exclusive Service: </p>
          <p className={styles.para}>
            By having an Upsurge account, you have explicitly given consent for
            us to capture images (followed by analysis), camera/mic permissions
            to make video calls and record the same. Upsurge May Disclose
            Information:
          </p>
          <ul>
            <li
              className={styles.subheading}
              style={{ marginLeft: "20px", paddingLeft: "10px" }}
            >
              as required by law, such as to comply with a subpoena, or similar
              legal process;{" "}
            </li>
            <li
              className={styles.subheading}
              style={{ marginLeft: "20px", paddingLeft: "10px" }}
            >
              to enforce applicable ToU (Terms of Use), including investigation
              of potential violations thereof;
            </li>
            <li
              className={styles.subheading}
              style={{ marginLeft: "20px", paddingLeft: "10px" }}
            >
              when we believe in good faith (doctrine of uberrima fides) that
              the disclosure is necessary to protect our rights, protect your
              safety or the safety of others, investigate fraud, address
              security or technical issues or respond to a government request;
            </li>
            <li
              className={styles.subheading}
              style={{ marginLeft: "20px", paddingLeft: "10px" }}
            >
              with our trusted service providers who work on our behalf and do
              not have an independent use of the information we disclose to them
              and have agreed to and adhered to the rules set forth in this
            </li>
          </ul>
          <p className={styles.heading}>Policy: </p>
          <ul>
            <li
              className={styles.subheading}
              style={{ marginLeft: "20px", paddingLeft: "10px" }}
            >
              to protect against imminent harm to the rights, property or safety
              of the Application/Website or our users or the public as required
              or permitted by law;{" "}
            </li>
            <li
              className={styles.subheading}
              style={{ marginLeft: "20px", paddingLeft: "10px" }}
            >
              with third party service providers in order to personalize the
              Application/Website/Services/products for a better user experience
              and to perform behavioral analysis;{" "}
            </li>
          </ul>
          <p className={styles.heading}>Governing Law and Jurisdiction:</p>
          <p className={styles.para}>
            In the event of any dispute arising between the parties with respect
            to this Agreement, the same shall be referred to the Sole Arbitrator
            appointed by the company and the arbitration shall be in accordance
            with Arbitration and Conciliation Act of 1996. The language of
            arbitration proceedings shall be English. The seat and place of
            arbitration shall be Delhi and the decision of the Arbitrator shall
            be final and binding on both parties herein. This contract shall be
            subject to the exclusive jurisdiction of courts in Delhi, India and
            shall be governed by the Indian laws.
          </p>
        </div>
      )}
    </div>
  );
}
