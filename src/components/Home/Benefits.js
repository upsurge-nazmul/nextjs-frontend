import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/Home/benefits.module.scss";

const data = [
  {
    title: "Kickstart your child’s financial education journey",
    description:
      "Financial literacy is a life-skill and the earlier your children start, the easier it will be for them to achieve their financial goals. Through our games, courses and live classes, all designed by experts, children will understand money, saving, investing and entrepreneurship like never before!",
    img: "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/benefit1+(1).png",
  },
  {
    title: "Learning by doing",
    description:
      "We believe that learning is most effective when it’s through play! Our games, activities and quizzes will instill healthy money habits that will last a lifetime.",
    img: "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/benefit2+(1).png",
  },
  {
    title: "Developing entrepreneurial mindsets.",
    description:
      "Equip your children with the necessary skills and knowledge to understand and evaluate the fundamentals of business and starting-up, and (hopefully) be the next unicorn founder.",
    img: "https://imgcdn.upsurge.in/images/benefit3.png",
  },
  {
    title: "Earn real rewards",
    description:
      "As adults, when we do any job well, we get rewarded. Then why should it be any different for children? Students get rewarded with Unicoins for jobs well done, which can be redeemed for books, games, vouchers and educational courses from your favorite brands.",
    img: "https://imgcdn.upsurge.in/images/Maskz-Group.png",
  },
  {
    title: "Develop 21st century skills & knowledge",
    description: `While jobs & roles change, the skills needed to succeed remain the same. Our offerings help children gain confidence & excel by developing their critical & analytical thinking and problem-solving skills.`,
    img: "https://imgcdn.upsurge.in/images/benefit4.png",
  },
];

function Benefits() {
  return (
    <div>
      <h1>Benefits</h1>
    </div>
  );
}

export default Benefits;
