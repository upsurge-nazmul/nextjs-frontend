import React from "react";
import { getIndianTime } from "../helpers/timehelpers";
import styles from "../styles/GeneralComponents/confirmInvoice.module.scss";

const ConfirmInvoice = React.forwardRef(({ data, userData }, ref) => {
  return (
    <div ref={ref} className={styles.invoiceBox}>
      <div className={styles.infoSection}>
        <div className={styles.supplierDetails}>
          <div className={styles.detailsTop}>
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
          </div>
          <div className={styles.detailsBottom}>
            <p>
              <strong>Supplier details:</strong>
            </p>
            <p>
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
          </div>
        </div>
        <div className={styles.recipientDetails}>
          <div className={styles.detailsTop}>
            <p style={{ paddingBottom: "0.5rem" }}>
              <strong>ORIGINAL FOR RECIPIENT</strong>
            </p>
            <h1 style={{ color: "#b7b7b7" }}>TAX INVOICE</h1>
            <p>
              <strong>Invoice #:</strong> {data.invoice_id}
              <br />
              <strong>Invoice date:</strong>{" "}
              {getIndianTime(Number(data.timestamp))}
              <br />
            </p>
          </div>
          <div className={styles.detailsBottom}>
            <p>
              <strong>Recipient details:</strong>
            </p>
            <p>
              {userData.first_name} {userData.last_name}
              <br />
              {userData.email}
              <br />
              {userData.phone}
              <br />
            </p>
          </div>
        </div>
      </div>
      <div className={styles.paymentSection}>
        <div className={styles.heading}>
          <div>Plan Name</div>
          <div>HSN Code</div>
          <div>Duration</div>
          <div>Taxable Value</div>
          <div>CGST ({data.h_cgst}%)</div>
          <div>SGST/UGST ({data.h_sgst}%)</div>
          <div>IGST ({data.h_igst}%)</div>
          <div>Amount</div>
        </div>
        <div className={styles.item}>
          <div>{data.name || "N/A"}</div>
          <div>{data.hsn || "N/A"}</div>
          <div>{data.subscription || "N/A"}</div>
          <div>₹{data.taxable_value || "N/A"}</div>
          <div>₹{data.cgst || "N/A"}</div>
          <div>₹{data.sgst || "N/A"}</div>
          <div>₹{data.igst || "N/A"}</div>
          <div>₹{data.amount || "N/A"}</div>
        </div>
      </div>
      <div className={styles.noteSection}>
        <p style={{ textAlign: "left" }}>
          <em>
            This is a system generated invoice and does not require a signature
            or a digital signature
          </em>
        </p>
      </div>
    </div>
  );
});

ConfirmInvoice.displayName = "ConfirmInvoice";
export default ConfirmInvoice;
