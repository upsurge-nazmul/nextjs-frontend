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
            PLEASE READ THESE TERMS AND CONDITIONS (<strong>TERMS</strong>)
            BEFORE USING THE SERVICES. By registering for an account and/or
            purchasing a Premium Membership, you acknowledge that you have read
            and understood these Terms, and you are in agreement with them. The
            business, any of its business divisions and / or its subsidiaries,
            associate companies or subsidiaries to subsidiaries or such other
            investment companies (in India or abroad) reserve their respective
            rights to revise these Terms and Conditions at any time by updating
            this posting. You should visit this page periodically to re-appraise
            yourself of the Terms and Conditions because they are binding on all
            users of this Services.
          </p>
          <p className={styles.para}>
            <strong>You</strong> will refer to Adult Users (as defined below) of
            the Services and purchasers of a Premium Membership.
          </p>
          <p className={styles.para}>
            <strong>Adult</strong> is a person of legal age who can enter into
            this contract by registering a membership and/or purchasing a
            Premium Membership. You represent and warrant that you are an adult
            and you are responsible for ensuring that any child or student
            authorized by you to use and access the Services does so in
            accordance with these Terms.
          </p>
          <p className={styles.para}>
            <strong>Premium Membership</strong> will refer to a paid membership
            to the Services.
          </p>
          <p className={styles.para}>
            <strong>Services</strong> will refer to the website, apps, all
            content accessible on the website, online games, and including but
            not limited to, teaching resources.
          </p>
          <p className={styles.para}>
            <strong>Registration Information</strong> refers to the User’s
            username, password, and other information used during registration
            to the Site.
          </p>
          <p className={styles.para}>
            <strong>Users</strong> refer to Parent User, Educator User and Child
            User.
          </p>
          <h1 className={styles.heading}>Table of Contents</h1>
          <div className={styles.wrapper}>
            {content.map((c, index) => {
              return (
                <div
                  className={styles.listitem}
                  key={"contentlist" + index}
                  onClick={() => move(c.href)}
                >
                  {index + 1}. <span>{c.name}</span>
                </div>
              );
            })}
          </div>
          <h1 className={styles.heading} id="#actype">
            Account Types
          </h1>
          <p className={styles.para}>
            We currently offer three types of accounts through our services:
            Child Account, Parent (or Legal Guardian) Account, Educator Account.
          </p>
          <p className={styles.subheading}>
            a. <strong>Child Account (Child User)</strong>
          </p>
          <p className={styles.para}>
            A Child User may only be created by the Parent User. A Child User
            will have access to their account using a unique username/password
            combination provided by the Parent User.
          </p>
          <p className={styles.subheading}>
            b. <strong>Parent (or Legal Guardian) Account (Parent User)</strong>
          </p>
          <p className={styles.para}>
            A Parent User is an Adult and may register with an email address,
            Google ID or their Apple ID. A Parent User may create an account for
            his/her child or children.
          </p>
          <p className={styles.subheading}>
            c. <strong>Educator Account (Educator User/Teacher User)</strong>
          </p>
          <p className={styles.para}>
            An Educator account may be registered by an Adult currently employed
            by a school, school district, licensed childcare facility or other
            educational institution/program.
          </p>
          <h1 className={styles.heading} id="reg">
            Registration
          </h1>
          <p className={styles.para}>
            You are required to provide accurate and complete information when
            registering to use the Services. You must not provide false or
            misleading information to create an account. You must not create an
            account for anyone other than yourself and your child/children. If
            you are signing up for a Parent Account or Educator Account, you
            certify that you are 18 years of age or older. You agree that your
            information will be updated to keep it current at all times. Upsurge
            reserves the right to refuse registration at its discretion. You are
            responsible for keeping your username and password confidential and
            strictly prohibited from sharing this information with anyone else.
            You may not transfer your account to a third-party. You may not
            share your Registration Information with any third party.
          </p>
          <h1 className={styles.heading} id="content">
            Use of Content
          </h1>
          <p className={styles.para}>
            All logos, brands, marks headings, labels, names, signatures,
            numerals, shapes or any combinations thereof, appearing in this
            site, except as otherwise noted, are properties either owned or used
            under licence, by the business and/or its associate entities who
            feature on this Website. The use of these properties or any other
            content on this site, except as provided in these terms and
            conditions or in the site content, is strictly prohibited.
          </p>
          <p className={styles.para}>
            You may not sell or modify the content of this Website or reproduce,
            display, publicly perform, distribute, or otherwise use the
            materials in any way for any public or commercial purpose without
            the respective organisation’s or entity’s written permission.
          </p>
          <h1 className={styles.heading} id="#accept">
            Acceptable Website Use
          </h1>
          <p className={styles.subheading}>
            <strong>(A) Security Rules</strong>
          </p>
          <p className={styles.para}>
            Visitors are prohibited from violating or attempting to violate the
            security of the Web site, including, without limitation, (1)
            accessing data not intended for such user or logging into a server
            or account which the user is not authorised to access, (2)
            attempting to probe, scan or test the vulnerability of a system or
            network or to breach security or authentication measures without
            proper authorisation, (3) attempting to interfere with service to
            any user, host or network, including, without limitation, via means
            of submitting a virus or “Trojan horse” to the Website, overloading,
            “flooding”, “mailbombing” or “crashing”, or (4) sending unsolicited
            electronic mail, including promotions and/or advertising of products
            or services. Violations of system or network security may result in
            civil or criminal liability. The business and / or its associate
            entities will have the right to investigate occurrences that they
            suspect as involving such violations and will have the right to
            involve and cooperate with, law enforcement authorities in
            prosecuting users who are involved in such violations.
          </p>
          <p className={styles.subheading}>
            <strong>(B) General Rules</strong>
          </p>
          <p className={styles.para}>
            Visitors may not use the Web Site in order to transmit, distribute,
            store or destroy material (a) that could constitute or encourage
            conduct that would be considered a criminal offence or violate any
            applicable law or regulation, (b) in a manner that will infringe the
            copyright, trademark, trade secret or other intellectual property
            rights of others or violate the privacy or publicity of other
            personal rights of others, or (c) that is libellous, defamatory,
            pornographic, profane, obscene, threatening, abusive or hateful.
          </p>
          <h1 className={styles.heading} id="online">
            Online Learning Game
          </h1>
          <p className={styles.para}>
            The online learning game allows user to play multiple different
            challenges. The user earns virtual coins as they navigate the world
            and play the challenges. The virtual coins cannot be exchanged for
            real money. The virtual coins are only used within the learning
            game.
          </p>
          <h1 className={styles.heading} id="membership">
            Membership and Premium Membership Fees
          </h1>
          <p className={styles.para}>
            <strong>Premium Membership Fee.</strong>
            The basic version of the Services are provided for free. A premium
            version of the Services is available for access with a paid Premium
            Membership. By purchasing a Premium Membership, you agree to
            authorize Upsurge to charge you the associated membership fee – on a
            monthly, six-month, annual basis, or group packages (for Educator) –
            depending on your selected Premium Membership. All fees will be
            subject to applicable taxes. You agree that we may renew your
            Premium Membership automatically for the same Premium Membership
            term at the end of each previous Premium Membership term (monthly,
            six-month, annual). The prices for Premium Memberships and other
            charges may change without notice. The Premium Membership begins
            from the date of purchase to the date of cancellation or expiration
            of the term. Premium Memberships or free memberships cannot be
            transferred or assigned to a third-party. A third-party must not be
            granted access to the Services through your Registration
            Information.
          </p>
          <p className={styles.para}>
            <strong>Premium Membership Cancellation.</strong>
            You may cancel the Premium Membership prior to its renewal date
            through the Parent/Educator Dashboard or by contacting our Customer
            Support Team. In the case of Premium group packages purchased
            through the Educator account, these will expire at the end of the
            term. You will have access to the account until the end of the
            Premium Membership period. Please be aware that we do not provide
            full or partial refunds for prepaid Premium Memberships.
          </p>
          <h1 className={styles.heading} id="service">
            Service Ownership and License
          </h1>
          <p className={styles.para}>
            The Services are owned and controlled by Surgeup Technologies
            Private Limited and protected by international copyright, trademark,
            patent, and other intellectual property rights and laws to the
            fullest extent. You agree not to copy, reproduce, reverse-engineer,
            create derivative works, disassemble, change, modify, or do anything
            to exploit in any other way the Services. The purchase of a
            subscription is a non-transferable license (<strong>License</strong>
            ) to use the Services for the subscription term. The License does
            not grant you any ownership rights.
          </p>
          <h1 className={styles.heading} id="termination">
            Termination
          </h1>
          <p className={styles.para}>
            Upsurge has the right to terminate your account at any time upon
            failure to comply with the terms found here in Terms and Conditions.
            Upsurge reserves the right to terminate access to the Services
            without prior notice. Upsurge shall not be liable to you or any
            third-party in the event of termination.
          </p>
          <h1 className={styles.heading} id="privacy">
            Privacy
          </h1>
          <p className={styles.para}>
            We take your privacy seriously and make best efforts to limit the
            information we collect. Please read our <span>Privacy Policy</span>{" "}
            for more details.
          </p>
          <h1 className={styles.heading} id="warranty">
            Disclaimer of Warranties
          </h1>
          <p className={styles.para}>
            The Services are provided on an “as is”, and “as available” basis
            and without warranty of any kind, express or implied. No warranty,
            representation, endorsement, or promise is made to the following,
            but not limited to:
          </p>
          <p className={styles.subheading}>a. The Services;</p>
          <p className={styles.subheading}>
            b. Functionality, features, or other elements made available through
            the Services;
          </p>
          <p className={styles.subheading}>
            c. Any products or services linked to the Services;
          </p>
          <p className={styles.subheading}>
            d. Whether the Services are available, error-free, free from harmful
            components;
          </p>
          <p className={styles.subheading}>
            e. Specific availability of the Services, and whether any defects
            will be repaired in a certain time period and, but not limited to;
          </p>
          <p className={styles.subheading}>
            f. Whether your use of the Services is lawful in any particular
            jurisdiction.
          </p>
          <h1 className={styles.heading} id="damage">
            Disclaimer of Consequential Damages
          </h1>
          <p className={styles.para}>
            In no event shall Company or any parties, organizations or entities
            associated with the corporate brand name us or otherwise, mentioned
            at this Website be liable for any damages whatsoever (including,
            without limitations, incidental and consequential damages, lost
            profits, or damage to computer hardware or loss of data information
            or business interruption) resulting from the use or inability to use
            the Website and the Website Material, whether based on warranty,
            contract, tort, or any other legal theory, and whether or not, such
            organization or entities were advised of the possibility of such
            damages.
          </p>
          <h1 className={styles.heading} id="liabilities">
            Limitation of Liabilities
          </h1>
          <p className={styles.para}>
            User agrees that neither Surgeup Technologies Private Limited nor
            its group companies, directors, officers or employee shall be liable
            for any direct or/and indirect or/and incidental or/and special
            or/and consequential or/and exemplary damages, resulting from the
            use or/and the inability to use the service or/and for the cost of
            procurement of substitute goods or/and services or resulting from
            any goods or/and data or/and information or/and services purchased
            or/and obtained or/and messages received or/and transactions entered
            into through or/and from the service or/and resulting from
            unauthorized access to or/and alteration of user’s transmissions
            or/and data or/and arising from any other matter relating to the
            service, including but not limited to, damages for loss of profits
            or/and use or/and data or other intangible, even if Company has been
            advised of the possibility of such damages.
          </p>
          <p className={styles.para}>
            User further agrees that Company shall not be liable for any damages
            arising from interruption, suspension or termination of service,
            including but not limited to direct or/and indirect or/and
            incidental or/and special consequential or/and exemplary damages,
            whether such interruption or/and suspension or/and termination was
            justified or not, negligent or intentional, inadvertent or
            advertent. User agrees that Company shall not be responsible or
            liable to user, or anyone, for the statements or conduct of any
            third party of the service. In sum, in no event shall Company’s
            total liability to the User for all damages or/and losses or/and
            causes of action exceed the amount paid by the User to Company, if
            any, or $50, whichever is less, that is related to the cause of
            action.
          </p>
          <h1 className={styles.heading} id="indemnity">
            Indemnity
          </h1>
          <p className={styles.para}>
            The User unilaterally agree to indemnify and hold harmless, without
            objection, Surgeup Technologies Private Limited, its affiliates,
            officers, successors and assigns, distributors, or other persons,
            authorized users, all shareholders, directors, owners, employees,
            and agents from and against all third party claims, actions and/or
            demands and/or liabilities and/or losses and/or damages and/or
            costs, including reasonable attorneys’ fees, through your use of the
            Services, any breach by you of the Terms and Conditions arising out
            of your use of the Services, or your violation of any rights of
            another.
          </p>
          <h1 className={styles.heading} id="thirdparty">
            Third-Party Links
          </h1>
          <p className={styles.para}>
            The Services may provide links to third-party websites or resources.
            We make no representations or warranties of any kind regarding the
            quality, availability, or legality of these external sites. Upsurge
            is not responsible for any third-party website or resources
            contained outside of the Upsurge Services.
          </p>
          <h1 className={styles.heading} id="severability">
            Severability
          </h1>
          <p className={styles.para}>
            If any term or provision of the Terms and Conditions is held to be
            void or unenforceable, that term or provision shall be severed from
            the Terms and Conditions. The balance of the Terms and Conditions
            will survive and will be reasonably construed to carry out the
            intent of the parties as evidenced by the terms of the Terms and
            Conditions.
          </p>
          <h1 className={styles.heading} id="law">
            Governing Law
          </h1>
          <p className={styles.para}>
            The Terms and Conditions shall be governed by the laws of India and
            the jurisdiction of the Courts of India.
          </p>
          <h1 className={styles.heading} id="assignment">
            Assignment
          </h1>
          <p className={styles.para}>
            We reserve the right to assign our rights and obligations under the
            Terms and Conditions, or any additional terms, in whole or in part,
            to any party at any time without prior notice.
          </p>
          <h1 className={styles.heading} id="agreement">
            Entire Agreement
          </h1>
          <p className={styles.para}>
            The Terms set out here constitute the entire understanding and
            agreement between you and Surgeup Technologies Private Limited with
            respect to the subject matter of the Terms and Conditions. There are
            no agreements, restrictions, representations, understandings, and
            warranties other than those expressly outlined in the Terms and
            Condition
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
