import React, { useRef } from "react";
import Invoice from "../../../components/Invoice";
import { useReactToPrint } from "react-to-print";
import LoginApis from "../../../actions/apis/LoginApis";
import PaymentsApi from "../../../actions/apis/PaymentsApi";

export default function InvoicePage({ userdatafromserver, invoice_data }) {
  const currentRef = useRef();
  const handlesave = useReactToPrint({
    content: () => currentRef.current,
  });
  const styleobj = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
  };
  return (
    <div ref={currentRef}>
      {invoice_data ? (
        invoice_data === "NO ACCESS" ? (
          <p style={styleobj}>Your do not have access to this invoice.</p>
        ) : invoice_data === "NOT FOUND" ? (
          <p style={styleobj}>Invoice does not exist</p>
        ) : (
          <Invoice handlesave={handlesave} data={invoice_data} />
        )
      ) : (
        <p style={styleobj}>{"Unable to connet to server"}</p>
      )}
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
      return {
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    } else {
      let invoice_data = await PaymentsApi.getinvoice(
        { invoice_id: params.id },
        token
      );
      let invoice = "";
      if (invoice_data && invoice_data.data) {
        if (invoice_data.data.success) {
          invoice = invoice_data.data.data;
        } else {
          if (invoice_data.data.data === "NO ACCESS") {
            invoice = "NO ACCESS";
          }
          invoice = "NOT FOUND";
        }
      } else {
        invoice = null;
      }
      return {
        props: {
          userdatafromserver: response.data.data,
          invoice_data: invoice,
        },
      };
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/?err=01&next=/dashboard/invoice/" + params.id,
      },
    };
  }
}
