import React, { useContext, useEffect, useState } from "react";
import { unicoin_value } from "../../../../config";
import LoginApis from "../../../actions/apis/LoginApis";
import XoxoApis from "../../../actions/apis/XoxoApis";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import RedeemSection from "../../../components/Dashboard/RedeemSection";
import Toast from "../../../components/Toast";
import Reward from "../../../components/WaitlistDashboard/Reward";
import { MainContext } from "../../../context/Main";
import styles from "../../../styles/WaitlistDashboard/rewardspage.module.scss";
export default function Rewards({ userdatafromserver, vouchers }) {
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const { setuserdata } = useContext(MainContext);
  useEffect(() => {
    setuserdata(userdatafromserver);
  }, []);
  const [mode, setmode] = useState("Rewards");
  const rewards = [
    {
      productId: 228,
      name: "Cafe Coffee Day",
      description:
        "<p>Get the taste of handpicked coffee anytime anywhere with Cafe Coffee Day outlets and webstores. Made from the finest beans, Cafe Coffee Day would make your coffee experience more enjoyable. Use CCD gift vouchers to avail amazing discounts and offers.</p>",
      termsAndConditionsInstructions:
        "<div><div>1. The holder of the Gift Card (voucher) number is deemed to be the beneficiary.</div><div>2. This Gift Card (voucher) can be used only for Cafe Coffee Day online ordering. Please note that this Gift Card (voucher) will not be accepted for payments at the outlets.</div><div>3. You can use this Gift Card (voucher) by visiting www.cafecoffeeday.com and choosing the order online option.</div><div>4. Multiple Gift Card (voucher) can be used against one bill.</div><div>5. The Gift Card (voucher) can be used only once. No refund or credit note will be issued against an unused or partially used Gift Card (voucher).</div><div>6. Gift Card (voucher) cannot be revalidated once expired.</div><div>7. Any dispute should be referred to the issuing company and the decision of the issuing company shall be final.</div><div>8. The Gift Card (voucher) has been issued subject to terms of the company.</div><div>9. If a Gift Card (voucher) gets blocked on account of any technical issue and is not consumed, would be reusable after 72 Hrs.</div><div>10. This Gift Card (voucher) cannot be clubbed with any other on-going promotion or offer.</div><div>11. Gift Card (voucher) validity cannot be extended once expired.</div><div>&nbsp;</div></div><p>&nbsp;</p>",
      expiryAndValidity: "<p>6 Months</p>",
      redemptionInstructions:
        '<div><strong>IMPORTANT INSTRUCTIONS&nbsp;</strong></div><div>1. Gift Vouchers CAN only be used online at <a href="https://shop.cafecoffeeday.com/">https://shop.cafecoffeeday.com/</a></div><div>2. Multiple Gift Vouchers CAN be used in one bill.</div><div>3. Gift Vouchers CANNOT be used directly at CCD Outlets.</div><div><strong>HOW TO REDEEM YOUR GIFT CARD (VOUCHER)?</strong></div><div>Cafe Coffee Day Vouchers/Gift cards can be redeemed to purchase a wide variety of products in the following manner:&nbsp;</div><div>1. Visit: <a href="https://shop.cafecoffeeday.com/">https://shop.cafecoffeeday.com</a> / Select the product.</div><div>2. Add the selected product into the cart.</div><div>3. Click on proceed to checkout to go to the payment page.</div><div>4. Enter your Gift Voucher in Enter Your Coupon Code tab and click on apply. Pay the remaining amount by card/any payment mode available if required.</div><div><strong>HOW TO BUY CAFE COFFEE DAY GIFT CARD (VOUCHER)?</strong></div><div>Cafe Coffee Day Gift Card (Voucher) is available on the <a href="https://stores.xoxoday.com/nreach/">Xoxoday Store website</a>/Mobile application.</div><div>1. Visit <a href="https://stores.xoxoday.com/plumdemosales/vouchers/description/cafe-coffee-day/228">Xoxoday Store website/CafeCoffeeDay</a>: View and select Cafe Coffee Day.</div><div>2. Select your preferred denomination and checkout: You can choose the denomination/s of your preference from those available.</div><div>3. Pay via Debit/ Credit/ Net Banking or Xoxoday Voucher/Points: Enter your preferred mode of payment and purchase the Gift Voucher/s.</div><div><strong>HOW TO SAVE MONEY WITH CAFE COFFEE DAY GIFT CARD&nbsp;</strong><strong>(VOUCHER)</strong><strong>?</strong></div><div>Cafe Coffee Day menu is a lip-smacking one with anything that you pick bound to make you want more. Cafe Coffee Day Gift Card&nbsp;(Voucher) enable you to savour your favourite brew with/without a sumptuous platter, and save handsomely while doing so, at the same time.&nbsp;</div><div><strong>CAFE COFFEE DAY GIFT CARD&nbsp;</strong><strong>(VOUCHER)&nbsp;</strong><strong>FOR OCCASIONS</strong></div><div>A lot happens over coffee, consequently it has come to be regarded as more than a brew - a concoction that brings and holds people together. Be it any occasion - New Year, Diwali, Christmas, Father\'s Day, Mother\'s Day, Valentine\'s Day, Holi, Christmas, Birthdays and Anniversaries - you can get together with your friends, family members by gifting them Cafe Coffee Day Gift Card (Voucher).</div><div><strong>CAFE COFFEE DAY GIFT CARD&nbsp;</strong><strong>(VOUCHER)&nbsp;</strong><strong>FOR CORPORATE GIFTING</strong></div><div>Looking for a corporate gift can occasionally become a tedious affair. You can gift your employees, partners, associates Gift Vouchers from Cafe Coffee Day, and they shall be celebrated like anything because the other name of coffee is celebration. Your work associates will remember your thoughtfulness, and you can expect to see a reciprocation in kind.</div><div><strong>HOW TO GET CAFE COFFEE DAY GIFT CARD&nbsp;</strong><strong>(VOUCHER)&nbsp;</strong><strong>FOR FREE?</strong></div><div>There are multiple ways to get a Cafe Coffee Day Gift Voucher for free. You may use loyalty points from your HDFC Solitaire Credit Card, IndusInd Credit Card, BPCL Petro Card or RBL Credit Card to buy Cafe Coffee Day Gift Card (Voucher) at no cost.</div><div><strong>FREQUENTLY ASKED QUESTIONS</strong></div><div><strong>How can I return/cancel Cafe Coffee Day Gift Card (Voucher) which I have redeemed?</strong></div><div>Regret that it is not possible. Gift Voucher once redeemed/bought cannot be cancelled or returned.</div><div><strong>Where can I use my Cafe Coffee Day Gift Card (Voucher)?</strong></div><div>You can use your Cafe Coffee Day Gift Card (Voucher) on the <a href="http://shop.cafecoffeeday.com/">site</a>.</div><div><strong>Can I buy a Cafe Coffee Day Gift Card (Voucher) using my XOXO VOUCHER/POINTS?</strong></div><div>Yes, you can buy a Cafe Coffee Day Gift Card (Voucher) using XOXO VOUCHER/POINTS.</div><div><strong>How can I know the status of my Cafe Coffee Day Gift Card (Voucher)?</strong></div><div>Yes of course! Enter your voucher code in the Voucher Detail section. You will know the status of your Cafe Coffee Day Gift Card (Voucher) or visit <a href="https://plum-support.xoxoday.com/support/home">https://plum-support.xoxoday.com/support/home</a></div><div>&nbsp;</div>',
      categories: "Restaurants Foods and Drinks",
      lastUpdateDate: "2020-08-11 15:39:58",
      imageUrl:
        "https://res.cloudinary.com/dyyjph6kx/image/upload/gift_vouchers/phpcteS1T_fby62e.jpg",
      currencyCode: "INR",
      currencyName: "rupees",
      countryName: "India",
      countryCode: "IN",
      countries: [
        {
          code: "IN",
          name: "India",
        },
      ],
      exchangeRateRule: 1,
      valueType: "fixed_denomination",
      maxValue: 0,
      minValue: 0,
      valueDenominations: "50,100,250,500,1000",
      tatInDays: 0,
      usageType: "",
      deliveryType: "realtime",
      isCommon: "0",
      fee: 0,
      discount: 0,
      exchangeRate: null,
    },
    {
      productId: 230,
      name: "Pizza Hut",
      description:
        "<p>Pizza Hut Gift Voucher is the best gifting option since this is sure to bring a smile on the face of even the sullenest people. When it comes to celebration time, a good food option takes priority; and as everybody knows anytime is Pizza time! So, what does this tell you? When you are in the mood to celebrate, Pizza Hut is your obvious destination. Ever since the first restaurant started in 1996 in Bangalore, there has been a constant demand for more among the customers, especially the young people. Get lip smacking taste of hot and sizzling pizza from Pizza Hut. From pizza to sides, desserts, drinks and more, Pizza Hut gives you too many reasons to not indulge in the drooling slices. Use Pizza Hut Gift Cards (vouchers) to treat yourself with cheese-filled love every now and then!</p>",
      termsAndConditionsInstructions:
        '<div>1. Gift Cards (Vouchers)&nbsp;will be accepted across all outlets mentioned, but Yum Restaurants / it\'s authorized franchisees at its sole discretion may add or remove an outlet from the list without giving any prior notice.</div><div>2. This is a Yum! Restaurants Instant Gift Card (Voucher)&nbsp;and would be accepted at listed outlets. (For outlet list, please click <a href="https://www.gyftr.com/pizzahut">here</a>). For home delivery orders, quote your voucher code at the time of placing your order.</div><div>3. Multiple Instant Gift Cards (Vouchers)&nbsp;can be used against one bill.</div><div>4. One Gift Card (Voucher)&nbsp;CANNOT be used multiple times.</div><div>5. Multiple Gift Cards (Vouchers)<span style="color: rgb(0, 0, 0); font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif; font-size: 13px; white-space: pre-wrap;">&nbsp;</span>CAN be used in one bill.</div><div>6. Multiple Gift Cards (Vouchers)&nbsp;CAN be used in one bill.</div><div>7. One Gift Card (Voucher) CANNOT be used multiple times.</div><div>8. Gift Cards (Vouchers)&nbsp;ACCEPTED at all Listed Outlets.</div><div>9. Gift Cards (Vouchers) CANNOT be used online.</div><div>&nbsp;</div>',
      expiryAndValidity: "<p>3 Months</p>",
      redemptionInstructions:
        '<div><strong>IMPORTANT INSTRUCTIONS</strong></div><div>1. Multiple Gift Cards (Vouchers)&nbsp;CAN be used in one bill.</div><div>2. One Gift Card (Voucher)&nbsp;CANNOT be used multiple times.</div><div>3. Gift Cards (Vouchers)&nbsp;ACCEPTED at all Listed Outlets.</div><div>4. Gift Cards (Vouchers)&nbsp;CANNOT be used online.</div><div><strong>HOW TO REDEEM YOUR&nbsp;GIFT CARD (VOUCHER)?</strong></div><div>1. Use an outlet locator to locate the nearest Pizza Hut store around you that accepts this voucher.</div><div>2. Choose your preferred food option.</div><div>3. At the billing counter, show your voucher to redeem it.</div><div><strong>HOW TO BUY A PIZZA HUT&nbsp;</strong><strong>GIFT&nbsp;</strong><strong>CARD&nbsp;</strong><strong>(VOUCHER)</strong><strong>?</strong></div><div>Pizza Hut&nbsp;<span style="font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif; font-size: 13px; white-space: pre-wrap;">Gift Cards (vouchers)</span>&nbsp;are available on the <a href="https://stores.xoxoday.com/nreach/">Xoxoday Store website</a>/Mobile application. You can purchase these Gift Cards (Vouchers)&nbsp;by using Net Banking, Credit and Debit Cards.</div><div>1. Visit <a href="https://stores.xoxoday.com/plumdemosales/vouchers/description/pizza-hut/230">Xoxoday Store website/PizzaHut</a>: View and select from the available Gift Cards (Vouchers)<span style="font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif; font-size: 13px; white-space: pre-wrap;">&nbsp;</span>of Pizza Hut.</div><div>2. Select your preferred denominations and checkout: You can choose the denomination/s of your preference from those available.</div><div>3. Pay via Debit/ Credit/ Net Banking or Xoxoday Voucher/Points: Enter your preferred mode of payment and purchase the Gift Voucher/s.</div><div><strong>PIZZA HUT&nbsp;</strong><strong>GIFT&nbsp;</strong><strong>CARD&nbsp;</strong><strong>(VOUCHER)</strong><strong>&nbsp;FOR OCCASIONS</strong></div><div>With exciting deals running on their signature Pizza, Pizza Hut makes enjoying their pizza even more enjoyable no matter what the occasion is. From choco lava cakes, to a variety of garlic breads, to soft drinks, this Pizza outlet has taken care of its side menu with great interest as well. Such a diverse menu makes Pizza Hut Gift Cards (Vouchers) the best gift one could ask for. Rather than giving them a generic cliched gift, give them the chance to choose their favourite Pizza with the help of Gift Cards (Vouchers). Go for Pizza Hut Gift Cards (Vouchers) for Diwali, Mother\'s Day, Father\'s Day, Children\'s Day, Valentine\'s Day, Raksha Bandhan, your anniversary or someone\'s birthday. Bring a smile on your loved one\'s face with a thoughtful gifting option for every occasion.</div><div><strong>PIZZA HUT&nbsp;</strong><strong>GIFT CARD (VOUCHER)&nbsp;</strong><strong>FOR CORPORATE GIFTING</strong></div><div>Cannot make your mind about the right corporate Diwali gift? How about Pizza Hut Gift Cards (Vouchers) for your employees, clients and partners? With Pizza Hut Gift Cards (Vouchers), you leave the choice up to them to pick their preferred Pizza. You also give them the option of using the Gift Cards (Vouchers) to buy something for their loved ones. Or for themselves. Use Pizza Hut Gift Cards (Vouchers) to give your co-workers unconventional gifts this year. A gift should be loved by the recipient after all. And we can guarantee that Pizza Hut Gift Cards (Vouchers) would absolutely be loved in your organisation!</div><div><strong>HOW TO GET A PIZZA HUT&nbsp;</strong><strong>GIFT&nbsp;</strong><strong>CARD&nbsp;</strong><strong>(VOUCHERS)</strong><strong>&nbsp;FOR FREE?&nbsp;</strong></div><div>There are multiple ways to get a Pizza Hut Gift Cards (Vouchers)&nbsp;for free. You may use loyalty points from your HDFC Solitaire Credit Card, IndusInd Credit Card, BPCL Petro Card or RBL Credit Card to buy a Pizza Hut Gift Cards (Vouchers) at no cost.&nbsp;&nbsp;</div><div><strong>FREQUENTLY ASKED QUESTIONS</strong></div><div><strong>How can I return/cancel Pizza Hut&nbsp;</strong><strong>Gift Cards (Vouchers)</strong><strong>&nbsp;which I have redeemed?</strong></div><div>Regret that it is not possible. Gift Cards (Vouchers) once redeemed/bought cannot be cancelled or returned.</div><div><strong>Where can I use my Pizza Hut&nbsp;</strong><strong>Gift Cards (Vouchers)</strong><strong>?</strong></div><div>You can use your Pizza Hut Gift Cards (Vouchers)&nbsp;on the site itself.</div><div><strong>Can I buy Pizza Hut&nbsp;</strong><strong>Gift Cards (Vouchers)</strong><strong>&nbsp;Using my XOXO VOUCHER/POINTS?</strong></div><div>Yes, you can buy Pizza Hut Gift Cards (Vouchers)<span style="font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif; font-size: 13px; white-space: pre-wrap;">&nbsp;</span>using XOXO VOUCHER/POINTS.</div><div><strong>How can I know the status of my Pizza Hut&nbsp;Gift Cards (Vouchers)?</strong></div><div>Yes of course! Enter your Gift Cards (Vouchers)<span style="font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif; font-size: 13px; white-space: pre-wrap;">&nbsp;</span>code in the Voucher Detail section. You will know the status of your Pizza Hut Gift Cards (Vouchers). Alternately, you may also call at +91 80-61915050 or visit <a href="https://plum-support.xoxoday.com/support/home">https://plum-support.xoxoday.com/support/home</a></div><div>&nbsp;</div>',
      categories: "Restaurants Foods and Drinks",
      lastUpdateDate: "2020-07-27 15:10:12",
      imageUrl:
        "https://res.cloudinary.com/dyyjph6kx/image/upload/gift_vouchers/phpoC29TF_yh48s7.jpg",
      currencyCode: "INR",
      currencyName: "rupees",
      countryName: "India",
      countryCode: "IN",
      countries: [
        {
          code: "IN",
          name: "India",
        },
      ],
      exchangeRateRule: 1,
      valueType: "fixed_denomination",
      maxValue: 0,
      minValue: 0,
      valueDenominations: "100,250,500,1000",
      tatInDays: 0,
      usageType: "",
      deliveryType: "realtime",
      isCommon: "0",
      fee: 0,
      discount: 0,
      exchangeRate: null,
    },
    {
      productId: 15365,
      name: "Amazon Pay eGift Cards",
      description:
        "<p>Amazon shopping is not just about buying, it's also about gifting from 1000+ categories such as Mobiles, Watches, Electronics, Household needs, Watches, Apparels, Lifestyle, Shoes and many others from your favourite top brands. Amazon e-Gift Card is a perfect gifting option for all occasions for all ages.</p>",
      termsAndConditionsInstructions:
        '<p>Amazon Gift Cards ("GCs") are issued by the Qwikcilver Solutions Private limited ("Qwikcilver"). Credit and Debit Cards issued outside India cannot be used to purchase Amazon.in Gift Cards.<br />To add your GC to your Amazon Pay balance, visit www.amazon.in/addgiftcard<br />Beneficiary can apply the 14 digit code (under scratch card) on amazon.in/addgiftcard and add the gift card balance in his/her Amazon.in account. This balance gets automatically applied at the time of next purchase. There is no cap on number of gift cards that can be added to an account.<br />Amazon Pay balance is a sum of all balances associated with the GCs in your Amazon.in account.<br />Amazon Pay balance are redeemable across all products on Amazon.in except apps, certain global store products and other Amazon.in gift cards.<br />Amazon Pay balance must be used only towards the purchase of eligible products on amazon.in<br />The GCs, including any unused Amazon Pay balance, expire one year from the date of issuance of the GC<br />GCs cannot be transferred for value or redeemed for the cash.<br />Qwikcilver, Amazon Seller Services Private Limited (Amazon) or their affiliates are not responsible if a GC is lost, stolen, destroyed or used without permission.<br />For Complete terms and conditions, see www.amazon.in/giftcardtnc<br />Amazon.in logo/trademark is an IP of Amazon or its affiliates and the Qwikcilver trademark/logo is an IP of Qwikcilver.<br />To redeem your GC, visit www.amazon.in/addgiftcard<br />E-Gift Cards are normally delivered instantly. But sometimes due to system issues, the delivery can be delayed up-to 24 - 48 hours.<br />For detailed T&Cs of this E-Gift Card please refer www.woohoo.in/termsandconditions<br />Certain merchants may provide you services only on the pre-condition that you allow us to hold balances in your Amazon Pay balance: Gift Card till the service completion by the merchant. However, your prior consent would be taken before holding such balances. In such cases, you agree and authorize us to: (i) hold your balance until service completion; and (ii) fail the transaction if your balance in the Amazon Pay Gift Card is less than the actual amount charged by the merchant at the end of the services.<br />You may request for revalidation of any expired Gift Cards. Upon receipt of such request, the Gift Card may be revalidated after due verification and subject to applicable terms and conditions.<br />No returns and no refunds on gift cards, e-gift cards and gift vouchers shipped by woohoo.in. Please check the refund policy at http://www.woohoo.in/faq for further details.</p>',
      expiryAndValidity: "<p>12 Months</p>",
      redemptionInstructions:
        '<div><strong>IMPORTANT INSTRUCTIONS&nbsp;</strong></div><div>1. Gift Cards (Vouchers)&nbsp;CAN only be used online at <a href="https://amzn.to/2DgoVd2">https://amzn.to/2DgoVd2</a></div><div>2. Gift Cards (Vouchers)&nbsp;CAN be used on almost all the products.</div><div>3. Multiple Gift Cards (Vouchers)&nbsp;CAN be used in one bill.</div><div>4. One Gift Cards (Vouchers)&nbsp;CAN be linked with only one account.</div><div><strong>HOW TO REDEEM AMAZON&nbsp;</strong><strong>GIFT CARDS (VOUCHERS)</strong><strong>?</strong></div><div>Amazon Gift Cards (Vouchers)&nbsp;can be redeemed and converted into Amazon Pay balance. These Gift Gift Cards (Vouchers)<span style="color: rgb(0, 0, 0); font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif; font-size: 13px; white-space: pre-wrap;">&nbsp;</span>can be redeemed to purchase a wide variety of products on the largest E-Commerce store in the world.</div><div>1. Visit Amazon.in: Can be accessed through mobile app and <a href="http://amazon.in">website</a></div><div>2. Select Amazon Pay from the navbar: Amazon Pay is the E-wallet, usable over the amazon store.</div><div>3. Choose Add Gift Cards (Vouchers): This will open a Bar you have to enter the Gift Cards (Vouchers)&nbsp;Number</div><div>4. Enter Gift Cards (Vouchers)&nbsp;number: The Gift Cards (Vouchers)&nbsp;number is a 16-digit Alpha-Numeric code.</div><div>5. Wallet amount added successfully: The amount would get reflected in You\'re Amazon Pay wallet balance instantly.</div><div><strong>HOW TO BUY AMAZON PAY&nbsp;</strong><strong>GIFT CARDS (VOUCHERS)</strong><strong>?</strong></div><div>Amazon Pay Gift Cards (Vouchers) Gift Cards are available on the <a href="https://stores.xoxoday.com/nreach/">Xoxoday Store website</a>/Mobile application. You can purchase these Gift Cards (Vouchers)<span style="color: rgb(0, 0, 0); font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif; font-size: 13px; white-space: pre-wrap;">&nbsp;</span>by using Net Banking, Credit and Debit Cards.</div><div>1. Visit <a href="https://stores.xoxoday.com/nreach/vouchers/description/amazon-pay-egift-cards/15365">Xoxoday Store website/ AmazonPayeGiftCards</a>: View and select from the available vouchers of&nbsp; Amazon Pay Gift Cards (Vouchers).</div><div>2. Select your preferred denominations and checkout: You can choose the denomination/s of your preference from those available</div><div>3. Pay via Debit/ Credit/ Net Banking or Xoxoday Voucher/Points: Enter your preferred mode of payment and purchase the Gift Voucher/s.</div><div><strong>HOW TO SAVE MONEY WITH AN AMAZON&nbsp;</strong><strong>GIFT CARDS (VOUCHERS)</strong><strong>?</strong></div><div>Shopping on amazon.in or using Amazon\'s app means guaranteed savings. The brand has eliminated the need of bargaining. Because it is impossible to find the same product at a cheaper price, online or offline. A crew-neck t-shirt to an AC, you are bound to find everything - And that too, at the best price. Why else would millions of customers hold their breaths for Amazon\'s Great Indian Festival?</div><div><strong>AMAZON&nbsp;</strong><strong>GIFT CARDS (VOUCHERS)</strong><strong>&nbsp;FOR OCCASIONS</strong></div><div>The brand\'s ideals mean complacency is never an option. Every time you visit amazon.in, there will be new categories added. People find it difficult to choose gifts, especially during the festive season. Rather than gifting your loved one\'s dry fruits or sweets, choose Amazon Gift Cards. And give them the chance to choose their own gifts. With Amazon Gift Cards, the probability of them dumping your gifts will become naught. So, go for Amazon Gift Cards for Diwali, Mother\'s Day, Father\'s Day, Children\'s Day, Valentine\'s Day, Raksha Bandhan, your anniversary or someone\'s birthday. Your loved ones will consider you thoughtful.</div><div><strong>AMAZON&nbsp;</strong><strong>GIFT CARDS (VOUCHERS)&nbsp;</strong><strong>FOR CORPORATE GIFTING</strong></div><div>Cannot make your mind about the right corporate gift? How about Amazon Gift Cards for your employees, clients and partners? With Amazon Gift Cards, you leave the choice up to them. They can pick the best-in-class Bose headphones or select the Canon lens they were after. You give them the option of using the gift to buy something for their loved ones or for themselves. Use Amazon Gift Cards, and you will remove the possibility of your gift ending in the bin. Your clients won\'t get a more thoughtful gift and they will tell you the same.</div><div><strong>HOW TO GET AMAZON&nbsp;GIFT CARDS (VOUCHERS)&nbsp;FOR FREE</strong></div><div>There are multiple ways to get an Amazon Gift Cards (Vouchers)&nbsp;for free. You may use loyalty points from your HDFC Solitaire Credit Card, IndusInd Credit Card, BPCL Petro Card or RBL Credit Card to buy an Amazon Gift Cards (Vouchers) at no cost.&nbsp;&nbsp;</div><div><strong>FREQUENTLY ASKED QUESTIONS</strong></div><div><strong>How can I return/cancel Amazon Pay&nbsp;</strong><strong>Gift Cards (Vouchers)</strong><strong>&nbsp;which I have redeemed?</strong></div><div>Regret that it is not possible. Gift Cards (Vouchers) once redeemed/bought cannot be cancelled or returned.</div><div><strong>Where can I use my Amazon Pay&nbsp;</strong><strong>Gift Cards (Vouchers)</strong><strong>?</strong></div><div>You can use your Amazon Pay Gift Cards (Vouchers)&nbsp;in the site itself.</div><div><strong>Can I buy Amazon Pay eGift Cards&nbsp;</strong><strong>Gift Cards (Vouchers)&nbsp;</strong><strong>Using my XOXO VOUCHER/POINTS?</strong></div><div>Yes, you can buy Amazon Pay Gift Cards (Vouchers)&nbsp;using XOXO VOUCHER/POINTS.</div><div><strong>How can I know the status of my Amazon Pay&nbsp;Gift Cards (Vouchers)?</strong></div><div>Yes of course! Enter your Gift Cards (Vouchers)<span style="color: rgb(0, 0, 0); font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif; font-size: 13px; white-space: pre-wrap;">&nbsp;</span>code in the voucher detail section. You will know the status of your&nbsp; Amazon Pay Gift Cards (Vouchers)&nbsp;or visit <a href="https://plum-support.xoxoday.com/support/home">https://plum-support.xoxoday.com/support/home</a></div><div>&nbsp;</div><div>&nbsp;</div>',
      categories: "Ecommerce",
      lastUpdateDate: "2021-10-26 19:25:34",
      imageUrl:
        "https://res.cloudinary.com/dyyjph6kx/image/upload/gift_vouchers/phpp3Z5N1_mmx2ym.jpg",
      currencyCode: "INR",
      currencyName: "rupees",
      countryName: "India",
      countryCode: "IN",
      countries: [
        {
          code: "IN",
          name: "India",
        },
      ],
      exchangeRateRule: 1,
      valueType: "fixed_denomination",
      maxValue: 0,
      minValue: 0,
      valueDenominations: "100,25,250",
      tatInDays: 0,
      usageType: "both",
      deliveryType: "realtime",
      isCommon: "0",
      fee: 0,
      discount: 0,
      exchangeRate: null,
    },
    {
      productId: 21598,
      name: "Tanishq",
      description:
        "<p>Ask any woman and you will get the same answer women love to shop for jewellery. What greater joy than to be able to shop at Tanishq, with the Tanishq gift voucher tucked safely into their purse You can give this incredible joy to the women in your life by buying a Tanishq gift voucher today. Tanishq is a dream-come-true jewellery retail store, brought to us by Titan and Co. Whether one plans a jewellery purchase for oneself or to gift someone, Tanishq is a name that comes instantly to mind. The Indian jewellery market was largely fragmented when Tanishq made its entry. Today, Tanishq is one of the premier trusted jewellery brands in India, offering the highest quality, conflict-free diamonds set in pure gold or platinum. Tanishq has won many awards for its incredible designs, and has become a globally recognized brand. What's great about Tanishq is that there's something for everyone, no matter what one's budget is.</p>",
      termsAndConditionsInstructions:
        '<div>1. This Gift Card (Voucher)<span style="color: rgb(0, 0, 0); font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif; font-size: 13px; white-space: pre-wrap;">&nbsp;</span>is valid only for the purchase of Tanishq Products from authorized Tanishq showrooms.</div><div>2. This Gift Card (Voucher)<span style="color: rgb(0, 0, 0); font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif; font-size: 13px; white-space: pre-wrap;">&nbsp;</span>is only entitled to a credit to the extent of the face value of the Gift Card (Voucher).</div><div>3. If the value of the purchase is less than the value of the Gift Cards (Vouchers), the balance is non-refundable.</div><div>4. This Gift Card (Voucher)<span style="color: rgb(0, 0, 0); font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif; font-size: 13px; white-space: pre-wrap;">&nbsp;</span>is valid only the month and year mentioned on the Gift Cards (Vouchers).</div><div>5. No replacement or compensation is permissible for lost or mutilated or defaced Gift Cards (Vouchers).</div><div>6. Gift Cards (Vouchers) can be combined with other ongoing offers at Tanishq stores.</div><div>7. Customers are required to bring along Photo ID proof (with address) for redeeming the Gift Cards (Vouchers). Below mentioned ID proofs will be Valid -&nbsp;</div><div>&nbsp; a. Aadhar Card</div><div>&nbsp; b. Voter ID Card</div><div>&nbsp; c. Driving License</div><div>&nbsp; d. Passport</div><div>8. Multiple Gift Cards (Vouchers)&nbsp;CAN be used in one bill.</div><div>9. Gift Cards (Vouchers) CAN be clubbed with any ongoing sales.</div><div>10. Gift Cards (Vouchers) CANNOT be used online.</div><div>11. Gift Cards (Vouchers)&nbsp;are not applicable to the GOLD COIN.</div><div>12. Gift Cards (Vouchers)&nbsp;validity cannot be extended once expired.</div><div>13.&nbsp;Tanishq voucher codes get activated 24-48 hours post their purchase.</div>',
      expiryAndValidity: "<p>6 Months.</p>",
      redemptionInstructions:
        "<div><strong>IMPORTANT INSTRUCTIONS</strong></div><div>1. Multiple Gift Cards (Vouchers)&nbsp;CAN be used in one bill.</div><div>2. Gift Cards (Vouchers)&nbsp;CAN be clubbed with on-going promotions/offers.</div><div>3. Gift Cards (Vouchers) are ACCEPTED at only listed Tanishq Outlets.</div><div>4. Gift Cards (Vouchers)&nbsp;CANNOT be used online.</div><div><strong>HOW TO REDEEM YOUR&nbsp;</strong><strong>GIFT CARD (VOUCHER)</strong><strong>?</strong></div><div>1. Check the outlet locator for a Tanishq outlet near you that accepts this Gift Card (Voucher).</div><div>2. Order your preferred products.</div><div>3. Show your voucher at the time of billing to redeem.</div><div><strong>HOW TO BUY A TANISHQ&nbsp;</strong><strong>GIFT CARD (VOUCHER)</strong><strong>?</strong></div><div>Tanishq Gift Cards (Vouchers)&nbsp;&nbsp;are available on the <a href=\"https://stores.xoxoday.com/nreach/\">Xoxoday Store website</a>/Mobile application. You can purchase these Gift Cards (Vouchers)&nbsp;by using Net Banking, Credit and Debit Cards.</div><div>1. Visit <a href=\"https://stores.xoxoday.com/plumdemosales/vouchers/description/tanishq/21598\">Xoxoday Store website/Tanishq</a>: View and select from the available Gift Cards (Vouchers)&nbsp;of Tanishq.</div><div>2. Select your preferred denominations and checkout: You can choose the denomination/s of your preference from those available.</div><div>3. Pay via Debit/ Credit/ Net Banking or Xoxoday Voucher/Points: Enter your preferred mode of payment and purchase the Gift Cards (Vouchers).</div><div><strong>HOW TO SAVE MONEY WITH A TANISHQ&nbsp;</strong><strong>GIFT CARD (VOUCHER)</strong><strong>?</strong></div><div>Looking for ornaments for that special occasion? Google 'Tanishq near me' and walk into the nearest Tanishq store. You will find shelves full of the latest designs of necklaces, rings and bracelets. Gold, silver, platinum or diamond, Tanishq offers every precious stone in a multitude of options and their products are inspired by every part of India and the world. Plus, whenever you buy a Tanishq product, you can consider it an investment. Because you are getting pure products, at just prices.</div><div><strong>TANISHQ&nbsp;</strong><strong>GIFT CARD (VOUCHER)</strong><strong>&nbsp;FOR OCCASIONS</strong></div><div>Is there any gift as appealing as a piece of jewellery? Probably not. The next time you decide to gift someone an ornament, think of Tanishq gift cards. People find it difficult to choose gifts, especially during the festive season. Rather than gifting your loved one's dry fruits, choose Tanishq gift cards (vouchers) and give them the chance to choose their own gifts. With Tanishq gift cards, the probability of them dumping your gifts will become naught. So, go for Tanishq gift cards (vouchers) for Diwali, Mother's Day, Father's Day, Children's Day, Valentine's Day, Raksha Bandhan, your anniversary or someone's birthday. Your loved ones will consider you thoughtful.and you will be getting better gifts on your birthday.</div><div><strong>TANISHQ&nbsp;</strong><strong>GIFT CARD (VOUCHER)&nbsp;</strong><strong>FOR CORPORATE GIFTING</strong></div><div>Want to give your clients, partners and employees corporate Diwali presents that they will remember? How about Tanishq gift cards (vouchers) for them? They can get their wife a diamond bracelet for her birthday. Or use it to spoil themselves with a pair of gold earrings. Use Tanishq gift cards (vouchers), and you will remove the possibility of your gift ending in the bin. Your clients won't get a more thoughtful gift this Diwali. And they will tell you the same.</div><div><strong>HOW TO GET A&nbsp;GIFT CARD (VOUCHER)&nbsp;FOR FREE?</strong></div><div>There are multiple ways to get a Tanishq Gift Cards (Vouchers)&nbsp;for free. You may use loyalty points from your HDFC Solitaire Credit Card, IndusInd Credit Card, BPCL Petro Card or RBL Credit Card to buy a Tanishq Gift Cards (Vouchers)&nbsp;&nbsp;at no cost.&nbsp; &nbsp;</div><div><strong>FREQUENTLY ASKED QUESTIONS</strong></div><div><strong>How can I return/cancel Tanishq&nbsp;</strong><strong>Gift Cards (Vouchers)</strong><strong>&nbsp;which I have redeemed?</strong></div><div>Regret that it is not possible. Gift Cards (Vouchers)&nbsp;once redeemed/bought cannot be cancelled or returned.</div><div><strong>Where can I use my Tanishq&nbsp;</strong><strong>Gift Cards (Vouchers)</strong><strong>?</strong></div><div>You can use your Tanishq Gift Cards (Vouchers)&nbsp;&nbsp;in listed outlets itself.</div><div><strong>Can I buy Tanishq&nbsp;</strong><strong>Gift Cards (Vouchers)</strong><strong>&nbsp;Using my XOXO VOUCHER/POINTS?</strong></div><div>Yes, you can buy Tanishq Gift Cards (Vouchers)&nbsp;&nbsp;using XOXO VOUCHER/POINTS.</div><div><strong>How can I know the status of my Tanishq&nbsp;Gift Cards (Vouchers)?</strong></div><div>Yes of course! Enter your Gift Cards (Vouchers)&nbsp;code in the Voucher Detail section. You will know the status of your Tanishq&nbsp;<span style=\"color: rgb(0, 0, 0); font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif; font-size: 13px; white-space: pre-wrap;\">Gift Cards (vouchers)</span>&nbsp;. Alternately, you may also call at +91 80-61915050 or visit <a href=\"https://plum-support.xoxoday.com/support/home\">https://plum-support.xoxoday.com/support/home</a></div><div>&nbsp;</div>",
      categories: "Jewelry &amp; Lifestyle",
      lastUpdateDate: "2020-07-27 14:44:09",
      imageUrl:
        "https://res.cloudinary.com/dyyjph6kx/image/upload/gift_vouchers/phpvsSjXb_pclxhi.jpg",
      currencyCode: "INR",
      currencyName: "rupees",
      countryName: "India",
      countryCode: "IN",
      countries: [
        {
          code: "IN",
          name: "India",
        },
      ],
      exchangeRateRule: 1,
      valueType: "fixed_denomination",
      maxValue: 0,
      minValue: 0,
      valueDenominations: "500,1000,2000,5000",
      tatInDays: 0,
      usageType: "",
      deliveryType: "realtime",
      isCommon: "0",
      fee: 0,
      discount: 0,
      exchangeRate: null,
    },
    {
      productId: 23254,
      name: "Pantaloons",
      description:
        "<p>We live in a country that likes to celebrate its occasions by gifting. If Diwali isn't fast approaching then your anniversary surely is. We are forever bound by the challenge of how to top up last year present? This is where Pantaloons Gift cards make an entry&nbsp; gifting should be a joy for the receiver as much as for the shopper. You can gift them to your loved ones and be assured that they'll love treating themselves to their favourite things! Our gift cards are the perfect gift to give. Mission surprise and delight, completed.</p>",
      termsAndConditionsInstructions:
        '<ul><li>Gift Vouchers CANNOT be used Online.</li><li>This is a Pantaloons Insta Gift Voucher (GV) / Gift Card (GC) and would be accepted at listed outlets on all products except on Jewellery and on shop-in-shops. (For Outlet List, please visit www.gyftr.com/pantaloons )</li><li>The person who has the Pantaloons GV / GC Code is deemed to be the beneficiary.</li><li>Do inform the cashier that you plan to use the GV / GC for making payments before billing.</li><li>Only the listed Pantaloons outlets at its sole discretion accept the GV / GC. Pantaloons may add or remove an outlet without giving any prior notice.</li><li>More than one GV / GC can be used in one bill.</li><li>This is a ONE time use GV / GC.</li><li>No Credit note / Refund for the unused amount of the GV / GC will be given.</li><li>Pantaloons GV / GC CANNOT be revalidated once expired.</li><li>Pantaloons GV / GC can be used during sale.</li><li>Pantaloons GV / GC cannot be redeemed on specific block out dates. Pantaloons may add or delete any date on its sole discretion.</li><li>Any dispute related to the GV / GC should be referred to the issuing company and the decision of the issuing company shall be final.</li><li>All disputes regarding this card and purchase made here under shall be made with the Mumbai City Jurisdiction only.</li><li>Pantaloons makes full efforts to accept Insta Gift Vouchers (GV) / Gift Card (GC), but on account of any technical / administrative reasons an outlet may refuse to accept the same.</li><li>If an Insta Gift Voucher (GV) /Gift Card (GC) gets blocked on account of technical issue, it would get enabled in 72 hours.</li><li>Please contact Shop manager for any acceptance issue and if issue is still not resolved, you can write in to <strong><a href="http://help@gyftr.com">help@gyftr.com</a></strong> or call 0 851000 4444 for immediate help.</li><li>Redemption Process for the Insta GV / GC</li><li>Gift vouchers validity can not be extended once expired.</li></ul>',
      expiryAndValidity: "<p>6 Months</p>",
      redemptionInstructions:
        '<ul><li>This is a Pantaloons Insta Gift Voucher (GV) / Gift Card (GC) and would be accepted at listed outlets on all products except on Jewellery and on shop-in-shops. (For Outlet List, please visit <strong><a href="http://www.gyftr.com/pantaloons">www.gyftr.com/pantaloons</a></strong> )</li><li>Gift Vouchers CAN be used to buy discounted products.</li><li>Multiple Gift Vouchers CAN be used in one bill.</li><li>Gift Vouchers are ACCEPTED at all Listed Outlets.</li><li>Gift Vouchers CANNOT be used Online.</li></ul>',
      categories: "Apparel_Fashion &amp; Accessories",
      lastUpdateDate: "2020-08-11 10:56:20",
      imageUrl:
        "https://res.cloudinary.com/dyyjph6kx/image/upload/gift_vouchers/phpTJCL48_pidhkg.png",
      currencyCode: "INR",
      currencyName: "rupees",
      countryName: "India",
      countryCode: "IN",
      countries: [
        {
          code: "IN",
          name: "India",
        },
      ],
      exchangeRateRule: 1,
      valueType: "fixed_denomination",
      maxValue: 0,
      minValue: 0,
      valueDenominations: "250,500,1000,2000",
      tatInDays: 0,
      usageType: "",
      deliveryType: "realtime",
      isCommon: "0",
      fee: 0,
      discount: 0,
      exchangeRate: null,
    },
    {
      productId: 24346,
      name: "MakeMyTrip",
      description: "MakeMyTrip.com, India",
      termsAndConditionsInstructions:
        'The E-Gift Card is valid for purchases made from Makemytrip only and is valid for a period of 12 Months from the date of Purchase.<br/><br/>For Flights, Hotels & Holidays:<ul><li>Can be redeemed online at www.makemytrip.com or on MakeMyTrip Android & IOS app. Please follow the steps listed below:</li><ul><li>Select your Flight/ Hotel and fill required details till you reach the payment page.</li><li>On Website, click on "More options" and Select "E-Gift Card" as your Payment Mode. On Android and IOS app, choose E-Gift Card as the payment option</li><li>Enter your E-Gift Card/ Card No. (16 Digit) and 6 Digit Pin No.</li><li>Click on "Make Payment" and Pay the Balance amount (if any) using other Payment Modes Listed.</li><li>Flights & Hotels are not redeemable offline.</li></ul><li>For redeeming Holidays offline through our Holiday Experts :</li><ul><li>Please call on the understated number to redeem the card.</li><li>Domestic Holiday packages: 9599595601</li><li>International Holiday packages: 9599595618</li><li>Alternatively you can also write on gifts@makemytrip.com</li><li>You can also visit the MakeMyTrip Branches to redeem.</li></ul></ul><br/><br/>This E-Gift Card is not valid on Bus, Rail and Car bookings.<br/><br/>E-Gift Cards are valid on bookings made through MMT Mobile App.<br/><br/>In case of transaction failures after E-Gift Card is applied, amount would be automatically refunded to the same cards within 24 hours.<br/><br/>This E-Gift Card/voucher cannot be clubbed with any other ongoing offer discount/cash back/promotion run by Makemytrip.com on app or website.<br/><br/>This E-Gift Card is valid for partial redemption. Balance would remain in the E-Gift Card till the validity period and can be reused for multiple transactions.<br/><br/>Multiple E-Gift Cards (up to 3) can be combined and used on 1 transaction.<br/><br/>Products and services are subject to availability.<br/><br/>The E-Gift Card cannot be cancelled or exchanged for cash.<br/><br/>The E-Gift Card validity cannot be extended under any circumstances.<br/><br/>E-Gift Card code/Physical copy or both to be provided at the time of booking along with an ID proof for the offline redemption.<br/><br/>MakeMyTrip is not responsible if the E-Gift Card is lost, stolen or used without permission.<br/><br/>In case of cancellation of bookings made using the E-Gift Card within the validity period, the amount will be reversed to the same card as used at the time of booking.<br/><br/>Users are required to save the E-Gift Card number and PIN to utilize this refunded amount as we will not be able to reset the PIN or reissue a new E-Gift Card number.<br/><br/>In case of cancellations where the E-Gift Card validity has expired, no refund will be processed for the amount paid by the E-Gift Card.<br/><br/>MakeMyTrip is the final authority on the interpretation of these rules<br/><br/>MakeMyTrip reserves the right to deny accepting any E-Gift Card if it suspects that there is duplicity of cards.<br/><br/>In no event the liability of MakeMyTrip for any claims shall exceed the value of the card.<br/><br/>In the event of any dispute, parties agree to exclusive jurisdiction of courts of New Delhi.<br/><br/>This is for individual use only, Travel agents found using the card would lead to cancellation of booking and no refund would be made.',
      expiryAndValidity: "<p>12 Months</p>",
      redemptionInstructions:
        '<div><div><strong>IMPORTANT INSTRUCTIONS</strong></div><div>1. Gift Cards (Vouchers)&nbsp;CAN only be used online at&nbsp;<a href="https://www.makemytrip.com/">www.makemytrip.com</a></div><div>2. Gift Cards (Vouchers)&nbsp;CANNOT be clubbed with on-going offers.</div><div>3. A maximum of 3 Gift Card (Vouchers)&nbsp;CAN be used in one bill.</div><div><strong>HOW TO REDEEM YOUR&nbsp;<span style="font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif; font-size: 13px; white-space: pre-wrap;">GIFT CARD (VOUCHER)</span></strong><strong>?</strong></div><div>1. Log on to&nbsp;<a href="https://www.makemytrip.com/">www.makemytrip.com</a></div><div>2. Select your preferred flight/hotel/holiday package.</div><div><div>3. Fill in the required details till you reach the Payment page.&nbsp;&nbsp;</div><div>4. Click on \'Other Options\' and select \'Gift Cards (Vouchers)\' as your payment mode.</div><div>5. Enter your voucher code (16-digit) and pin number (4-digit). Click on \'Make Payment\'.</div><div><strong>HOW TO BUY A MAKEMYTRIP&nbsp;</strong><strong><span style="font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif; font-size: 13px; white-space: pre-wrap;">GIFT CARD (VOUCHER)</span></strong><strong>?</strong></div></div><div>MakeMyTrip Gift Cards (Vouchers) are available on the&nbsp;<a href="https://stores.xoxoday.com/nreach/">Xoxoday Store website</a>/Mobile application. You can purchase these Gift Cards (Vouchers)&nbsp;by using Net Banking, Credit and Debit Cards.</div><div>1. Visit&nbsp;<a href="https://stores.xoxoday.com/nreach/vouchers/description/makemytrip/24346">Xoxoday Store website/MakeMyTrip</a>: View and select from the available vouchers of MakeMyTrip.</div><div>2. Select your preferred denominations & checkout: You can choose the denomination/s of your preference from those available.</div><div>3. Pay via Debit/ Credit/ Net Banking or Xoxoday Voucher/Points: Enter your preferred mode of payment and purchase the Gift Cards (Vouchers).</div><div><strong>HOW TO SAVE MONEY WITH A MAKEMYTRIP&nbsp;</strong><strong><span style="font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif; font-size: 13px; white-space: pre-wrap;">GIFT CARD (VOUCHER)</span></strong><strong>?</strong></div><div>Looking for the cheapest flight ticket for Mumbai to London? Log on to MakeMyTrip\'s website and find the best prices from every available air-carrier. You can book rooms for your bachelor\'s trip in Goa. Or buy a package for your honeymoon in Bali. MakeMyTrip makes sure customers can plan vacations that are easy on their wallets. Go ahead and compare prices across other websites.</div><div><strong>MAKEMYTRIP&nbsp;</strong><strong><span style="font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif; font-size: 13px; white-space: pre-wrap;">GIFT CARD (VOUCHER)</span></strong><strong>&nbsp;FOR OCCASIONS</strong></div><div>Travelling is the latest trend of the 21st Century. Irrespective of the ethnicity or age, people want to see new places. This makes MakeMyTrip Gift Card (Voucher)&nbsp;the best present one can receive. People find it difficult to choose gifts, especially during the festive season. Rather than gifting your loved one\'s dry fruits, choose MakeMyTrip gift cards (vouchers). And give them the chance to choose their own gifts. With MakeMyTrip gift cards, the probability of them dumping your gifts will become naught. So, go for MakeMyTrip gift cards (vouchers) for Diwali, Mothers Day, Fathers Day, Childrens Day, Valentines Day, Raksha Bandhan, your anniversary or birthday. Your loved ones will consider you thoughtful. And you will be getting better gifts on your birthday.</div><div><strong>MAKEMYTRIP&nbsp;</strong><strong><span style="font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif; font-size: 13px; white-space: pre-wrap;">GIFT CARD (VOUCHER)</span></strong><strong><strong>&nbsp;</strong>FOR CORPORATE GIFTING</strong></div><div>Want to give your clients, partners and employees corporate Diwali presents that they will remember? How about MakeMyTrip gift cards (vouchers) for them? They can use them to make hotel reservations for their upcoming business trip to New York. Or redeem them during their next family vacation. Use MakeMyTrip gift cards (vouchers), and you will remove the possibility of your gift ending in the bin. Your clients won\'t get a more thoughtful gift this Diwali. And they will tell you the same.</div><div><strong>HOW TO GET MAKEMYTRIP&nbsp;</strong><strong><span style="font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif; font-size: 13px; white-space: pre-wrap;">GIFT CARD (VOUCHERS)</span></strong><strong><strong>&nbsp;</strong>FOR FREE?</strong></div><div>There are multiple ways to get a MakeMyTrip Gift Cards (Vouchers)&nbsp;for free. You may use loyalty points from your HDFC Solitaire Credit Card, IndusInd Credit Card, BPCL Petro Card or RBL Credit Card to buy a MakeMyTrip gift card at no cost.&nbsp;&nbsp;</div><div><strong>FREQUENTLY ASKED QUESTIONS</strong></div><div><strong>How can I return/cancel the MakeMyTrip&nbsp;Gift Cards (Vouchers)&nbsp;which I have redeemed?</strong></div><div>Regret that it is not possible. Gift Cards (Vouchers)&nbsp;once redeemed/bought cannot be cancelled or returned.</div><div><strong>Where can I use my MakeMyTrip&nbsp;</strong><strong>Gift Cards (Vouchers)</strong><strong>?</strong></div><div>You can use your MakeMyTrip Gift Cards (Vouchers)&nbsp;on the <a href="http://www.makemytrip.com">site</a> itself.</div><div><strong>Can I buy a MakeMyTrip&nbsp;</strong><strong>Gift Card (Voucher)&nbsp;</strong><strong>Using my XOXO VOUCHER/POINTS?</strong></div><div>Yes, you can buy a MakeMyTrip Gift Card (Voucher)&nbsp;using XOXO VOUCHER/POINTS.</div><div><strong>How can I know the status of my MakeMyTrip&nbsp;</strong><strong>Gift Cards (Vouchers)</strong><strong>?</strong></div><div>Yes of course! Enter your Gift Cards (Vouchers)<span style="font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif; font-size: 13px; white-space: pre-wrap;">&nbsp;</span>code in the Voucher Detail section. You will know the status of your MakeMyTrip Gift Card. Alternately, you may also call at +91 80-61915050 or visit&nbsp;<a href="https://plum-support.xoxoday.com/support/home">https://plum-support.xoxoday.com/support/home</a></div></div><p>&nbsp;</p>',
      categories: "Travel and Tourism",
      lastUpdateDate: "2020-08-10 23:01:03",
      imageUrl:
        "https://res.cloudinary.com/dyyjph6kx/image/upload/gift_vouchers/phpOg9zEW_ybzdle.jpg",
      currencyCode: "INR",
      currencyName: "rupees",
      countryName: "India",
      countryCode: "IN",
      countries: [
        {
          code: "IN",
          name: "India",
        },
      ],
      exchangeRateRule: 1,
      valueType: "open_value",
      maxValue: 100000,
      minValue: 500,
      valueDenominations:
        "500,750,1000,2000,2500,4000,5000,10000,20000,25000,30000,40000,50000",
      tatInDays: 0,
      usageType: "",
      deliveryType: "realtime",
      isCommon: "0",
      fee: 0,
      discount: 0,
      exchangeRate: null,
    },
    {
      productId: 24652,
      name: "Marks and Spencer E-Gift Voucher",
      description: "<p>One of the UK",
      termsAndConditionsInstructions:
        "<p>Gift cards and e-gift cards can be redeemed at M&S stores in the United Kingdom, Eire and the Channel Islands (including Outlets but excluding BP stores) and online (subject to website terms and conditions). They may be exchanged for goods of a higher price than the face value of the card on payment of the difference.</p><p>Gift cards and e-gift cards cannot be exchanged for cash or used to pay for M&S Bank services, products or outstanding card balances, made to measure shirts, Lunch to Go, personalised cards or M&S Energy or to buy another gift card or e-gift card.</p><p>Gift cards and e-gift cards can be activated with a minimum value of ",
      expiryAndValidity: "<p>18 months&nbsp;</p>",
      redemptionInstructions:
        '<div><strong>IMPORTANT INSTRUCTIONS</strong></div><div>1. The voucher cannot be refunded.</div><div>2. Gift Cards (Vouchers) cannot be used to purchase gift cards.</div><div>3. Gift Cards (Vouchers) cannot be exchanged for cash.</div><div><strong>HOW TO REDEEM YOUR&nbsp;</strong><strong>GIFT CARD (VOUCHERS)</strong><strong>?</strong></div><div>1. Visit any M&S outlet near you and inquire if they accept Gift Cards (Vouchers)&nbsp;<a href="https://www.marksandspencer.com/">https://www.marksandspencer.com/</a></div><div>2. Choose your preferred denomination.</div><div>3. Show the voucher during billing to redeem the Gift Cards (Vouchers).</div><div><strong>HOW TO BUY A M&S&nbsp;</strong><strong>GIFT CARD (VOUCHERS)</strong><strong>?</strong></div><div>M&S Gift Cards (Vouchers) are available on the <a href="https://stores.xoxoday.com/nreach/">Xoxoday Store website</a>/Mobile application.&nbsp;</div><div>1. Visit the <a href="https://stores.xoxoday.com/marketplace/vouchers/description/marks-and-spencer-e-gift-voucher/24652">Xoxoday Store website/MarksandSpencersUK</a>: View and select from the Gift Cards (Vouchers) available.</div><div>2. Select your preferred denomination & checkout: You can choose the denomination/s of your preference from those available.</div><div>3. Pay via Debit/ Credit/ Net Banking or Xoxoday Voucher/Points: Enter your preferred mode of payment and purchase the Gift Cards (Vouchers).</div><div><strong>M&S&nbsp;</strong><strong>GIFT CARD (VOUCHERS)</strong><strong>&nbsp;FOR OCCASIONS</strong></div><div>With exciting deals running on various clothes for men and women, M&S makes enjoying daily life even more enjoyable no matter what the occasion is. Plan your perfect outfits and looks of your choice. M&S has it all. Such a diverse range of options makes M&S gift vouchers the best gift one could ask for. Rather than giving them a generic cliched gift, give them the chance to choose their favourite form of clothing with the help of gift cards. Go for M&S gift cards for Valentines Day, Diwali, Mothers Day, Fathers Day, Childrens Day, Raksha Bandhan, your anniversary or someones birthday. Bring a smile on your loved ones faces with a thoughtful gifting option for every occasion.</div><div><strong>M&S&nbsp;GIFT CARD (VOUCHERS)&nbsp;FOR CORPORATE GIFTING</strong></div><div>Cannot make your mind about the right corporate gift How about M&S gift cards for your employees, clients and partners With M&S gift cards, you leave the choice up to them to pick their preferred products. You also give them the option of using the gift cards to buy something for their loved ones. Or for themselves. Use M&S gift cards to give your co-workers and unconventional gifts this year. A gift should be loved by the recipient after all. And we can guarantee that M&S gift cards would absolutely be loved in your organisation!</div><div><strong>FREQUENTLY ASKED QUESTIONS</strong></div><div><strong>How Can I return/Cancel M&S&nbsp;</strong><strong>Gift Cards (Vouchers)</strong><strong>which I have redeemed?</strong></div><div>Regret that it is not possible. Gift Cards (Vouchers) once redeemed/bought cannot be cancelled or returned.</div><div><strong>Where can I use my M&S&nbsp;</strong><strong>Gift Cards (Vouchers)</strong><strong>?</strong></div><div>You can use your M&S Gift Cards (Vouchers) in the outlets itself.</div><div><strong>Can I buy a M&S&nbsp;</strong><strong>Gift Cards (Vouchers)</strong><strong>&nbsp;Using my XOXO VOUCHER/POINTS?</strong></div><div>Yes, you can buy a M&S Gift Cards (Vouchers) using XOXO VOUCHER/POINTS.</div><div><strong>How can I know the status of my M&S&nbsp;Gift Cards (Vouchers)?</strong></div><div>Yes of course! Enter your Gift Cards (Vouchers) code in the Voucher Detail section. You will know the status of your M&S Gift Cards (Vouchers). Alternately, you may also call at +91 80-61915050 or visit <a href="https://plum-support.xoxoday.com/support/home">https://plum-support.xoxoday.com/support/home</a></div><div>&nbsp;</div>',
      categories:
        "Apparel_Fashion &amp; Accessories,Grocery and Retail,Work From Home",
      lastUpdateDate: "2020-08-27 11:53:20",
      imageUrl:
        "https://res.cloudinary.com/dyyjph6kx/image/upload/gift_vouchers/phpxk8Bil_px8vy9.jpg",
      currencyCode: "GBP",
      currencyName: "Pound",
      countryName: "UK",
      countryCode: "GB",
      countries: [
        {
          code: "GB",
          name: "UK",
        },
      ],
      exchangeRateRule: 0.01060626,
      valueType: "fixed_denomination",
      maxValue: 0,
      minValue: 0,
      valueDenominations: "100,200",
      tatInDays: 0,
      usageType: "",
      deliveryType: "realtime",
      isCommon: "0",
      fee: 0,
      discount: 0,
      exchangeRate: null,
    },
    {
      productId: 24656,
      name: "New Look eGift Voucher",
      description:
        '<p>Easy to use and offering every wardrobe essential, let them choose what they really want with the New Look gift card. With hundreds of new styles landing in store and online every week, you can always count on New Look for the latest trends. Shop womens, mens, teens, Curves (sizes 18-32), Tall, Petite, Maternity and Beauty in store or online at <strong><a href="http://newlook.com">newlook.com</a></strong>.</p>',
      termsAndConditionsInstructions:
        '<ul><li>Validity cannot be extended once expired.</li><li>No returns and no refunds on gift cards.</li><li>For more information and entire details about terms & conditions visit the website <strong><a href="https://www.newlook.com/uk">https://www.newlook.com/uk</a></strong> or you can also email to <strong><a href="http://cs@xoxoday.com">cs@xoxoday.com</a></strong></li></ul>',
      expiryAndValidity: "<p>4 Months</p>",
      redemptionInstructions:
        '<ul><li>Online purchases:&nbsp; Visit newlook.com, select your goods and proceed to checkout as normal. Follow the redemption instructions at the checkout for gift cards, inputting the relevant eGift Code number when requested. If you have any queries please call 0845 643 9044.&nbsp;&nbsp;</li><li>In-store purchases:&nbsp; Print this page and present it to the cashier at the time of purchase.&nbsp; Please make sure that the printout contains the full e-Gift Code number and PIN.&nbsp; Find the New Look store nearest you at <strong><a href="http://www.newlook.com/storeLocator/store_landing.jsp">http://www.newlook.com/storeLocator/store_landing.jsp&nbsp;</a></strong></li><li>To check your gift card balance online, please call 0500 454 094.</li></ul>',
      categories: "Apparel_Fashion &amp; Accessories",
      lastUpdateDate: "2020-08-27 12:06:29",
      imageUrl:
        "https://res.cloudinary.com/dyyjph6kx/image/upload/gift_vouchers/phpQTrLxQ_qscooi.jpg",
      currencyCode: "GBP",
      currencyName: "Pound",
      countryName: "UK",
      countryCode: "GB",
      countries: [
        {
          code: "GB",
          name: "UK",
        },
      ],
      exchangeRateRule: 0.01060626,
      valueType: "open_value",
      maxValue: 1000,
      minValue: 1,
      valueDenominations: "100,200",
      tatInDays: 0,
      usageType: "",
      deliveryType: "realtime",
      isCommon: "0",
      fee: 0,
      discount: 0,
      exchangeRate: null,
    },
    {
      productId: 24658,
      name: "PizzaExpress eGift Voucher",
      description:
        "<p>PizzaExpress is something of a pizza institution, famous for mouth-watering pizza, beautifully designed restaurants and friendly service ",
      termsAndConditionsInstructions:
        "<p>E-Gift vouchers may be redeemed for goods in any PizzaExpress in the UK and Northern Ireland, where such store accepts payment in GBP sterling. E-Gift vouchers will only be redeemed where customers produce a valid Voucher either displayed on a mobile phone or clearly printed from an email at the point of sale. PizzaExpress reserve the right to reject illegible or incomplete E-Gift vouchers.</p><p>A Voucher can be used as full or part payment for PizzaExpress goods. No change will be given on E-Gift vouchers. If a Voucher is utilized for part payment, a separate Voucher will be issued to you to the value of any remaining balance which can be spent on future purchases.</p><p>The remaining balance of a Voucher and expiry date of a Voucher can be checked at any time by calling PizzaExpress Customer Services on 0845 130 2715. E-Gift vouchers cannot be redeemed for cash or paper gift vouchers and are not for resale.</p><p>E-Gift vouchers will expire 18 months from the date of their issue, and any remaining balance will be forfeit following expiry of any Voucher.</p><p>PizzaExpress is not responsible for any lost, stolen, undeliverable or delayed E-Gift vouchers or any network failures. If you are the purchaser, please double check the delivery mobile phone number or email address that you enter ",
      expiryAndValidity: "<p>2 Years</p>",
      redemptionInstructions:
        '<div><strong>IMPORTANT INSTRUCTIONS</strong></div><div>1. Gift Cards (Vouchers) cannot be used online.</div><div>2. Multiple Gift Cards (Vouchers) can be used in one bill.</div><div>3. Gift Cards (Vouchers) cannot be used for Meal Combos.</div><div>4. Gift Cards (Vouchers) are accepted at all Listed Outlets:&nbsp;<a href="https://www.pizzaexpress.com/">https://www.pizzaexpress.com/</a></div><div><strong>HOW TO REDEEM YOUR&nbsp;</strong><strong>GIFT CARDS (VOUCHERS)</strong><strong>?</strong></div><div>1. Check for a PizzaExpress outlet near you that accepts this Gift Cards (Vouchers)&nbsp;<a href="https://www.pizzaexpress.com/">https://www.pizzaexpress.com/</a></div><div>2. Order your preferred products.</div><div>3. Show your Gift Cards (Vouchers) at the time of billing to redeem.</div><div><strong>HOW TO BUY A PIZZAEXPRESS&nbsp;</strong><strong>GIFT CARDS (VOUCHERS)</strong><strong>?</strong></div><div>PizzaExpress Gift Cards (Vouchers) are available on the <a href="https://stores.xoxoday.com/nreach/">Xoxoday Store website</a>/Mobile application. You can purchase these Gift Cards (Vouchers) by using Net Banking, Credit and Debit Cards.</div><div>1. Visit <a href="https://stores.xoxoday.com/marketplace/vouchers/description/pizzaexpress-egift-voucher/24658">Xoxoday Store website/PizzaExpress</a>: View and select from the available vouchers of PizzaExpress.</div><div>2. Select your preferred denominations & checkout: You can choose the denomination/s of your preference from those available.</div><div>3. Pay via Debit/ Credit/ Net Banking or Xoxoday Voucher/Points: Enter your preferred mode of payment and purchase the Gift Cards (Vouchers).</div><div><strong>HOW TO SAVE MONEY WITH AN PIZZAEXPRESS&nbsp;</strong><strong>GIFT CARDS (VOUCHERS)</strong><strong>?</strong></div><div>Do not want to stay in and order food online Choose a PizzaExpress cafe. Appreciate the ambience and you will not even realise the passage of time. And once the food arrives, nothing will distract you. You can order a dish of your choice. When the bill arrives, you will be more than happy to leave a hefty tip.</div><div><strong>PIZZAEXPRESS&nbsp;</strong><strong>GIFT CARDS (VOUCHERS)</strong><strong>&nbsp;FOR OCCASIONS</strong></div><div>Dont you think people get bored of receiving clothes, shoes, or accessories But does anyone turn down a chance to sit back and enjoy an amazing restaurant Not many would say no to free food. So, next time you get stuck while selecting a gift, choose PizzaExpress gift cards. People find it difficult to choose gifts, especially during the festive season. Rather than gifting your loved ones dry fruits, choose PizzaExpress gift vouchers. And give them the chance to choose their own gifts. With PizzaExpress gift cards, the probability of them dumping your gifts will become naught. So, go for PizzaExpress gift cards for Mothers Day, Fathers Day, Childrens Day, Valentines Day, your anniversary or someones birthday. Your loved ones will consider you thoughtful. And you will be getting better gifts on your birthday.</div><div><strong>PIZZAEXPRESS&nbsp;GIFT CARDS (VOUCHERS)&nbsp;FOR CORPORATE GIFTING</strong></div><div>Tired of gifting office stationery, clothes or footwear as corporate Diwali presents How about PizzaExpress Gift Cards (Vouchers) for your clients, partners, and employees With PizzaExpress gift cards, you leave the choice up to them. You give them the option of using the gift to take themselves and their loved ones out. Use PizzaExpress Gift Cards (Vouchers), and you will remove the possibility of your gift ending in the bin. Your clients will not get a more thoughtful gift this holiday season. And they will tell you the same.</div><div><strong>FREQUENTLY ASKED QUESTIONS</strong></div><div><strong>How Can I return/cancel the PizzaExpress&nbsp;</strong><strong>Gift Cards (Vouchers)</strong><strong>&nbsp;which I have redeemed?</strong></div><div>Regret that it is not possible. Gift Cards (Vouchers) once redeemed/bought cannot be cancelled or returned.</div><div><strong>Where can I use my PizzaExpress&nbsp;</strong><strong>Gift Cards (Vouchers)</strong><strong>?</strong></div><div>You can use your PizzaExpress Gift Cards (Vouchers) in the outlets itself.</div><div><strong>Can I buy a PizzaExpress&nbsp;</strong><strong>Gift Cards (Vouchers)</strong><strong>&nbsp;Using my XOXO VOUCHER/POINTS?</strong></div><div>Yes, you can buy a PizzaExpress Gift Cards (Vouchers) using XOXO VOUCHER/POINTS.</div><div><strong>How can I know the status of my PizzaExpress&nbsp;Gift Cards (Vouchers)?</strong></div><div>Yes of course! Enter your Gift Cards (Vouchers) code in the Voucher Detail section. You will know the status of your PizzaExpress Gift Cards (Vouchers). Alternately, you may also call at +91 80-61915050 or visit <a href="https://plum-support.xoxoday.com/support/home">https://plum-support.xoxoday.com/support/home</a></div>',
      categories: "Restaurants Foods and Drinks",
      lastUpdateDate: "2020-08-10 22:29:37",
      imageUrl:
        "https://res.cloudinary.com/dyyjph6kx/image/upload/gift_vouchers/phpZk4C0X_ovy8yf.jpg",
      currencyCode: "GBP",
      currencyName: "Pound",
      countryName: "UK",
      countryCode: "GB",
      countries: [
        {
          code: "GB",
          name: "UK",
        },
      ],
      exchangeRateRule: 0.01060626,
      valueType: "open_value",
      maxValue: 250,
      minValue: 5,
      valueDenominations: "50",
      tatInDays: 0,
      usageType: "",
      deliveryType: "realtime",
      isCommon: "0",
      fee: 0,
      discount: 0,
      exchangeRate: null,
    },
  ];
  return (
    <div className={styles.leaderboard}>
      <DashboardLeftPanel type="waitlist" />
      <Toast data={toastdata} />

      <div className={styles.contentWrapper}>
        <DashboardHeader
          mode={mode}
          setmode={setmode}
          settoastdata={settoastdata}
        />
        <div className={styles.mainContent}>
          <RedeemSection
            unicoins={Number(userdatafromserver.num_unicoins) || 0}
            balance={Number(userdatafromserver.num_balance)}
            settoastdata={settoastdata}
          />
          <div className={styles.wrapper}>
            {rewards.map((item) => {
              return (
                <Reward
                  data={item}
                  key={item.productId}
                  email={userdatafromserver.email}
                  phone={userdatafromserver.phone}
                  balance={Number(userdatafromserver.num_balance)}
                  unicoin={Number(userdatafromserver.num_unicoins)}
                />
              );
            })}
          </div>
        </div>
      </div>
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
      msg = response.data.msg;
      return { props: { isLogged: false, msg: msg || "Error" } };
    } else {
      // let res = await XoxoApis.getvouchers();
      return {
        props: {
          isLogged: true,
          userdatafromserver: response.data.data,
          // vouchers: res.data.data.getVouchers.data || [],
          msg: "",
        },
      };
    }
  } else {
    return { props: { isLogged: false, msg: "cannot get token" } };
  }
}
