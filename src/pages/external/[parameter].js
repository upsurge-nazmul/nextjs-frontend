// pages/ExternalLanding.js

import { useRouter } from "next/router";
import { useEffect } from "react";

function ExternalLanding() {
  const router = useRouter();
  const { parameter } = router.query;

  useEffect(() => {
    // Handle your logic for deep link parameter here
    console.log("Received parameter:", parameter);
    // You can perform actions based on the received parameter
  }, [parameter]);

  return <div>External Landing Page</div>;
}

export default ExternalLanding;
