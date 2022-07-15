import styles from "../styles/stories.module.scss";

export function getParentDashboardStory(userdata) {
  return [
    {
      intro: true,
      content: (
        <div className={styles.introdiv}>
          <p className={styles.heading}>
            Welcome to your dashboard,{userdata?.first_name}
          </p>
          <p className={styles.text}>
            {`This is the place you'll be using for everything on upsurge.`}
          </p>
          <Jasper className={styles.jasper} />
        </div>
      ),
    },
    {
      ref: "#stamina",
      position: "bottom",
      text: "Welcome to upsurge!",
      content: `You can start doing 5 activities every month to earn. This is your Energy Meter and will tell you how many tasks you can do this month. Here in Surge City, 1 month is equal to 24 hours in your world. So your energy refreshes every 24 hours, and increases as you gain experience.`,
    },
    {
      intro: true,
      content: (
        <div className={styles.introdiv}>
          <p className={styles.heading}>
            Managing money at a young age will make you a financially smart
            adult.
          </p>
          <p className={styles.text}>
            {`To earn your pocket money, you have to complete some chores that your parents give you every month. Remember, you have to stay up to date with your grades on your homework & quizzes to continue enjoying your working privileges.`}
          </p>
          <p className={styles.text}>
            {`Let’s start you off with your first pocket money. As you can see it’s in cash, with you at the moment. Why don’t we deposit some of it in the bank? `}
          </p>
          <Jasper className={styles.jasper} />
        </div>
      ),
    },
    {
      ref: "#bank",
      position: "bottom",
      text: "Welcome to upsurge!",
      content: `First, we will need a bank account.`,
      disableBtns: true,
      isolate: true,
    },
    {
      ref: "#create-acc-btn",
      position: "bottom",
      text: "Welcome to upsurge!",
      content: `Click here to create a bank account.`,
      superimpose: true,
      disableBtns: true,
      disableBg: true,
      isolate: true,
    },
    {
      ref: "#deposit-btn",
      position: "top",
      content: `Let’s deposit ₹1,000 in the bank to start with. Remember, it’s good to keep money in the bank, so keep depositing your cash in hand into the bank often. `,
      disableBtns: true,
      superimpose: true,
      disableBg: true,
      delay: true,
    },
    { blank: true },
    {
      intro: true,
      superimpose: true,
      content: (
        <div className={styles.introdiv}>
          <p className={styles.heading}>Why is a bank account good?</p>
          <p className={styles.text}>
            {`1. Your money is safe - don’t have to worry about your wallet or purse getting lost or stolen!`}
          </p>
          <p className={styles.text}>
            {`2. Your bank account gives you 3% interest on your balance, so every month you will earn 3% on the balance as interest.`}
          </p>
          <p className={styles.text}>
            {
              "3. You get cool debit cards and UPI accounts to make cashless transactions."
            }
          </p>
          <Jasper className={styles.jasper} />
        </div>
      ),
    },
    {
      ref: "#debit-card-btn",
      position: "top",
      content: `Next, let’s get your debit card set up!`,
      disableBtns: true,
      superimpose: true,
      disableBg: true,
    },
    {
      blank: true,
    },
    {
      ref: "#debit-card-pin-btn",
      position: "bottom",
      content: `Create a pin for your debit card.`,
      disableBtns: true,
      superimpose: true,
      disableBg: true,
    },
    {
      ref: "#debit-card-main",
      position: "bottom",
      superimpose: true,
      disableBg: true,
      delay: true,
      content:
        "This is your debit card, when you use this, the money comes out straight from your account.",
      nextFunction: () => {
        console.log("function called");
        setshowcard(false);
      },
    },
    {
      delay: true,
      intro: true,
      superimpose: true,
      content: (
        <div className={styles.introdiv}>
          <p className={styles.heading}>Ok, let’s setup the UPI next.</p>
          <p className={styles.text}>
            {`UPI is India’s universal payments interface. Which means you can use your ID to instantly transfer money to any other UPI ID from your bank account.`}
          </p>
          <p className={styles.text}>
            {`Why don’t you go on and select a UPI ID next`}
          </p>
          <Jasper className={styles.jasper} />
        </div>
      ),
    },
    {
      ref: "#upi-btn",
      position: "top-left",
      disableBtns: true,
      superimpose: true,
      disableBg: true,
      delay: true,
      content: "Click here to setup UPI.",
    },
    {
      ref: "#upi-btn-confirm",
      position: "bottom",
      superimpose: true,
      disableBtns: true,
      disableBg: true,
      delay: true,
      content: "Click here to finish UPI settup",
      nextFunction: () => {
        setshowupi(false);
      },
    },
    {
      nextFunction: () => {
        setcurrenttab("dashboard");
      },
      delay: true,
      intro: true,
      superimpose: true,
      content: (
        <div className={styles.introdiv}>
          <p className={styles.heading}>
            {"Great, now you’re all set with your bank account!"}
          </p>
          <p className={styles.text}>
            {`We want you to have a balanced time at Surge City, and you must have some fun as well. Head over to Surge City Mall to shop or go out with your friends.`}
          </p>
          <Jasper className={styles.jasper} />
        </div>
      ),
    },
    {
      ref: "#morale",
      position: "bottom",
      text: "Welcome to upsurge!",
      content: `This is your morale meter, you must keep this above 75% to ensure you’re leading a balanced and positive life. Each activity will tell you how much morale it will add or reduce. The Mall is a great place to have some fun, grab a bite or watch a movie with your friends.`,
    },
    {
      nextFunction: () => {
        setcurrenttab("dashboard");
      },
      delay: true,
      intro: true,
      superimpose: true,
      content: (
        <div className={styles.introdiv}>
          <p className={styles.heading}>
            {
              "Also, don’t forget to grab a bite every time you play - you need your fuel! "
            }
          </p>
          <p className={styles.text}>
            {`Clothes also must be replaced every 6-9 months, as you don’t want to be wearing worn-out clothes!`}
          </p>
          <p className={styles.text}>
            {`At the end of every month, there will also be some random event, that we will help you prepare for. These could be positive or negative!`}
          </p>
          <Jasper className={styles.jasper} />
        </div>
      ),
    },
    {
      ref: "#task-btn",
      position: "top",
      text: "Welcome to upsurge!",
      content: `Here, are some activities by doing which you'll get rewards.`,
    },
    {
      ref: "#jobs-btn",
      position: "top",
      text: "Welcome to upsurge!",
      content: `Ok, now let’s explore what jobs there are in the market these days. As you grow, these jobs will change & you might also need to complete courses or certifications for certain jobs. Some courses will increase your earnings from these jobs too!.`,
    },
    {
      ref: "#investment-btn",
      position: "top-left",
      text: "Welcome to upsurge!",
      content: `You can invest some of your money at the Investment Hub.`,
    },
    {
      nextFunction: () => {
        setshowtour(false);
      },
      intro: true,
      last: true,
      superimpose: true,
      content: (
        <div className={styles.introdiv}>
          <p className={styles.heading}>{"All right, we’re done."}</p>
          <p className={styles.text}>
            {`As you grow & gain more experience with money, you will be able to invest across other asset classes as well!`}
          </p>
          <Jasper className={styles.jasper} />
        </div>
      ),
    },
  ];
}
