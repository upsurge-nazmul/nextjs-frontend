import React, { useState } from "react";
import { getToken } from "../firebase";

export default function Notification() {
  const [isTokenFound, setTokenFound] = useState(false);
  console.log("Token found", isTokenFound);
  useEffect(() => {
    let data;
    async function tokenFunc() {
      data = await getToken(setTokenFound);
      if (data) {
        console.log("Token is", data);
      }
      return data;
    }
    tokenFunc();
  }, [setTokenFound]);
  return <></>;
}
