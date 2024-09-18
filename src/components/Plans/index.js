import { useContext, useEffect, useState } from "react";
import PaymentsApi from "../../actions/apis/PaymentsApi";
import styles from "../../styles/GeneralComponents/plans.module.scss";
import { useRouter } from "next/router";
import { MainContext } from "../../context/Main";

const METHODS = [
  { name: "PhonePe", id: "phonepe", key: "phonypay" },
  { name: "Stripe", id: "stripe", key: "stripy" },
];

export default function Plans({ scheme = "", handleOutsideUser = () => {} }) {
  const router = useRouter();
  const { userdata } = useContext(MainContext);
  const [plans, setPlans] = useState();

  async function fetchPlans(paymentScheme) {
    const res = await PaymentsApi.getPlans({
      scheme: paymentScheme || process.env.NODE_ENV,
    });
    if (res && res.data && res.data.success) {
      console.log(res.data.data);
      setPlans(res.data.data);
    }
  }

  useEffect(() => {
    fetchPlans(scheme);
  }, [scheme]);

  return (
    <div className={styles.pricingComponent}>
      <div className={styles.section}>
        {plans &&
          plans.length &&
          plans.map((plan, i) => {
            return (
              <div className={styles.item} key={plan.id}>
                <div className={styles.sectionLeft}>
                  <div
                    className={
                      plan.bestValue ? styles.bestValue : styles.bestValueHidden
                    }
                  >
                    Best Value
                  </div>
                  <div className={styles.pricing}>
                    <div className={styles.bottom}>
                      <h3 className={styles.pricingName}>{plan?.name}</h3>
                    </div>
                    <div className={styles.pricingSectionTop}>
                      <p className={styles.slashedPrice}>₹{plan.slashPrice}</p>{" "}
                      <p className={styles.actualPrice}>₹{plan.amount}&nbsp;</p>{" "}
                    </div>
                    <div className={styles.pricingSectionBottom}>
                      <p className={styles.smallfont}>(limited period offer)</p>
                    </div>
                  </div>

                  <div
                    className={styles.button}
                    onClick={() => {
                      if (userdata) {
                        router.push(`/payments/phonepe?plan_id=${plan.id}`);
                      } else {
                        handleOutsideUser();
                      }
                    }}
                  >
                    {`Subscribe to Premium`}
                  </div>
                </div>
                {i < plans.length - 1 && (
                  <div className={styles.verticleLine}></div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
