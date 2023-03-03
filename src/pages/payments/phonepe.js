import { useRouter } from "next/dist/client/router";
import PhonepeForm from "../../components/stripe/PhonepeForm";

export default function Phonepe() {
  const router = useRouter();
  const { plan_id } = router.query;

  return <PhonepeForm planId={plan_id} />;
}
