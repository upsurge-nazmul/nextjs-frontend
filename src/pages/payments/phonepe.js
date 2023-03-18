import { useRouter } from "next/dist/client/router";
import { useContext, useEffect } from "react";
import PhonepeForm from "../../components/stripe/PhonepeForm";
import { MainContext } from "../../context/Main";

export default function PhonepePage() {
  const router = useRouter();
  const { userdata } = useContext(MainContext);
  const { plan_id } = router.query;

  useEffect(() => {
    console.log({ plan_id, userdata });
  }, [userdata, plan_id]);

  return <>{plan_id && <PhonepeForm planId={plan_id} userdata={userdata} />}</>;
}
