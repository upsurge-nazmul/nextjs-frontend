import React from "react";
import { getIndianTime } from "../helpers/timehelpers";
import styles from "../styles/GeneralComponents/confirmInvoice.module.scss";

const ConfirmInvoice = React.forwardRef(({ data }, ref) => {
  return (
    <div ref={ref} className={styles.invoiceBox}>
      <table cellSpacing="0" cellPadding="0">
        <tbody>
          <tr className="top">
            <td colSpan="8">
              <table>
                <tbody>
                  <tr>
                    <td className="bb">
                      <p className="images">
                        <img
                          className="logo"
                          src="/logo.webp"
                          style={{
                            maxHeight: "120px",
                            width: "auto",
                            maxWidth: "100%",
                          }}
                          alt=""
                        />
                      </p>
                    </td>
                    <td className="bb">
                      <p className="innum">
                        <strong>ORIGINAL FOR RECIPIENT</strong>
                      </p>
                      <h1>TAX INVOICE</h1>
                      <p className="innum">
                        <strong>Invoice #:</strong> {data.invoice_id}
                        <br />
                        <strong>Invoice date:</strong>{" "}
                        {getIndianTime(Number(data.timestamp))}
                        <br />
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td width={{ width: "50%" }}>
                      <p className="infoleft">
                        <strong>Supplier details:</strong>
                      </p>
                      <p className="innumleft">
                        Surgeup Technologies Private Limited
                        <br />
                        B-5/30, Safdarjung Enclave
                        <br />
                        New Delhi DL 110029 India
                        <br />
                        GSTIN: 06AAFFU9763M1ZE
                        <br />
                        PAN no. AAFFU9763M
                      </p>
                    </td>

                    <td width={{ width: "50%" }}>
                      <p className="inforight">
                        <strong>Recipient details:</strong>
                      </p>
                      <p className="innumright">
                        {data.recipient_name}
                        <br />
                        {data.recipient_email}
                        <br />
                        {data.recipient_address}
                        <br />
                        <br />
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          <tr className="heading">
            <td style={{ maxWidth: "180px" }}>Description</td>
            <td style={{ textAlign: "right" }}>HSN Code</td>
            <td style={{ textAlign: "right" }}>Quantity</td>
            <td style={{ textAlign: "right" }}>Taxable Value</td>
            <td style={{ textAlign: "right" }}>CGST ({data.h_cgst}%)</td>
            <td style={{ textAlign: "right" }}>SGST/UGST ({data.h_sgst}%)</td>
            <td style={{ textAlign: "right" }}>IGST ({data.h_igst}%)</td>
            <td style={{ textAlign: "right" }}>Total Amount</td>
          </tr>
          <tr className="item">
            <td style={{ maxWidth: "180px" }}>{data.description}</td>
            <td style={{ textAlign: "right" }}>{data.hsn}</td>
            <td style={{ textAlign: "right" }}>{data.quantity}</td>
            <td style={{ textAlign: "right" }}>{data.taxable_value}</td>
            <td style={{ textAlign: "right" }}>{data.cgst}</td>
            <td style={{ textAlign: "right" }}>{data.sgst}</td>
            <td style={{ textAlign: "right" }}>{data.igst}</td>
            <td style={{ textAlign: "right" }}>₹{data.amount}</td>
          </tr>

          <tr className="heading">
            <td style={{ maxWidth: "180px" }}>Total</td>
            <td style={{ textAlign: "right" }}></td>
            <td style={{ textAlign: "right" }}>{data.quantity}</td>
            <td style={{ textAlign: "right" }}>{data.taxable_value}</td>
            <td style={{ textAlign: "right" }}>{data.cgst}</td>
            <td style={{ textAlign: "right" }}>{data.sgst}</td>
            <td style={{ textAlign: "right" }}>{data.igst}</td>
            <td style={{ textAlign: "right" }}>₹{data.amount}</td>
          </tr>

          <tr>
            <td colSpan="8" className="sig-container" align="right">
              <p style={{ textAlign: "left" }}>
                <em>
                  This is a system generated invoice and does not require a
                  signature or a digital signature
                </em>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

export default ConfirmInvoice;
