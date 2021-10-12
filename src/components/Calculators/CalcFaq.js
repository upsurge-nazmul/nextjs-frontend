import React, { useEffect, useState } from "react";
import styles from "../../styles/Calculators/calcFaq.module.scss";
import Faq from "../Help/Faq";
function CalcFaq({ name }) {
  const faqs = {
    homeLoan: [
      {
        question: "Is a house a great investment?",
        answer: `Depends! House changes to home and has an emotional connect with the investor unlike other financial instruments like stocks or mutual funds and therefore the comparison is tough. Looking strictly from an investment perspective, the returns on houses are comparable to other assets. It is safer though. But at the same time, it has less liquidity(liquidity - time taken to convert assets into cash) compared to other investments.`,
      },
      {
        question:
          "What is the time duration of mortgage (home loan) usually for houses?",
        answer: ` Again, it depends on the buyer and the country. In India, the most popular mortgage duration is 10 years, whereas in developed countries like the US has the most popular duration as 30 years*`,
      },
      {
        question: "Should we rent a house or buy one on EMI?",
        answer: `Both have advantages of their own. Renting does not overburden one with EMI payments, house tax, and other legal issues that are a part and parcel of property ownership. Owning a house gives a sense of pride and security. Rent is an expense that is incurred every month without creating any physical asset. Paying EMI, however, has dual benefits; it not only provides for one month of shelter but also increases the proportional ownership in the house`,
      },
    ],
    carLoan: [
      {
        question: "Is a car a good investment?",
        answer:
          "NO! The value of a car goes down steeply over time and therefore does not make for a great investment opportunity. The various costs associated with cars also go up over time. But this analysis is for normal cars. High-end luxurious limited edition cars make for a great investment and have a dedicated market for themselves. ",
      },
      {
        question: "When should I buy my first car? ",
        answer:
          "Although the decision to buy a car stays at the discretion of the buyer, it is important to be cautious. One shouldn't buy a car at an early age if that means EMI eating away a large chunk of your income. Cars, as we know, make for a bad investment. That money is better spent on some investment instruments at the early stages of life.",
      },
      {
        question: "Should we buy a new car or a used one?",
        answer:
          "In our consumer culture, a new car is an undeniable status symbol that lets the world know you’ve arrived (literally). Cosmetics aside, a new car also has some other advantages like reliability and Warranty protection. “Pre-owned vehicles,” to use the marketing jargon for used cars, may lack the mystique of new cars. But they have some advantages like cheaper price, fewer choices, a distrust with the previous owner.",
      },
    ],
    education: [
      {
        question: "Should one take an education loan to study abroad?",
        answer:
          "Taking an education loan to study abroad is not wrong provided the return on investment is considerable. While deciding about the same one should consider the tuition fees, cost of living, earnings from part-time jobs, interest accumulated over the years from education loan, opportunity cost and the extra earning realized from the same and then make the decision.",
      },
      {
        question:
          "What are the risks we should be aware of before getting an education loan?",
        answer:
          "The most obvious risk is that you won't finish the degree program for which you are taking the loan, and you then end up leaving the school without anything to show for except some uncomfortably large debts. Another risk, equally obvious, is that you take the loan, finish the degree program, but then have a degree that's not marketable, that doesn't get you the job you want, and doesn't increase your pay enough to offset the debt you are now having to pay off.",
      },
    ],
    currency: [
      {
        question: "What is the Big Mac index?",
        answer:
          "Big Mac Index indicates how much your money is actually worth in other countries i.e. worth how much stuff can this much money buy.",
      },
      {
        question: "What is Big Mac index based on?",
        answer:
          "As the name suggests, Big Mac index is based on the cost of Big Mac burger in various countries.",
      },
      {
        question: "How reliable is Big Mac Index?",
        answer:
          "Historically Big mac index has served as a great indicator of Purchasing Power parity of various countries in the past. It has been widely accepted by economists as a quick way to judge various countries currency.",
      },
    ],
    retirement: [
      {
        question: "How is Financial independence different than retirement?",
        answer:
          "Financial independence means reaching a stage when the income generated by assets is enough to meet all the expenses. It does not imply that the person has stopped working. On the other hand, retirement means that person has reached the end of his active work life, which usually comes with financial independence as well.",
      },
      {
        question:
          "Does more income means early retirement and financial independence?",
        answer:
          "Not necessarily, income is only one part of the equation of financial independence. Saving and keeping expenses in check is also equally important.",
      },
    ],
    costofraising: [
      {
        question: "Why does cost of raising children include?",
        answer:
          "Apart from the usual monthly expense, cost also includes a big one-time investment in Education and Marriage.",
      },
    ],
    investmentcomparison: [
      {
        question:
          "Why do I always get a higher interest rate from some instruments compared to others?",
        answer:
          "Because it is riskier. The stock market for example provides a higher rate of return but the return are not consistent. Some can make lot of money while others may lose all but on average has higher rate of return. Since the risk is higher, the reward is also higher.",
      },
      {
        question: "Why is gold considered a good investment?",
        answer:
          "More than for it’s return, gold is considered as a good investment for it’s stability and risk protection. Gold unlike major of the other investments, is a safe bet and remains in demand even in a recession and hedges the risk of portfolio. It can also be converted in cash fairly quickly and therefore is highly liquid.",
      },
    ],
    sip: [
      {
        question: "Why should we have a habit of investing?",
        answer:
          "Apart from earning interest on your investment and therefore increasing your net worth, investment also provides a safety net for unforeseen situations. At times, we need money immediately, if we don't have money invested we will have to take loans from loan sharks at a very high-interest rate. Some people get into a debt trap in situations like these and never be able to repay them and have financial freedom.",
      },
    ],
    // carLoan: [
    //   {
    //     question: "",
    //     answer: "",
    //   },
    // ],
  };
  const [currentfaqs, setcurrentfaqs] = useState([]);

  useEffect(() => {
    if (faqs[name]) {
      setcurrentfaqs(faqs[name]);
    }
  }, [name]);
  if (currentfaqs.length === 0) return null;
  else
    return (
      <div className={styles.faqpage}>
        <div className={styles.heading}>Frequently Asked Questions</div>
        {currentfaqs.map((item, index) => {
          return (
            <Faq
              key={"faq" + index}
              question={item.question}
              answer={item.answer}
            />
          );
        })}
      </div>
    );
}

export default CalcFaq;
