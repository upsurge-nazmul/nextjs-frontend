import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import DashboardApis from "../../actions/apis/DashboardApis";
import RewardDetails from "../../components/WaitlistDashboard/RewardDetails";

export default function VoucherDetails() {
  const router = useRouter();
  const [voucher, setVoucher] = useState();

  const { data } = router.query;
  let productId, token;

  if (data) {
    [productId, token] = data;
  }

  useEffect(() => {
    async function fetchVoucherData() {
      let res = await DashboardApis.getallvouchers({}, token);
      if (res && res.data && res.data.success) {
        let ourData = res.data.data.find(
          (item) => item.id === parseInt(productId)
        );
        setVoucher(ourData);
      } else {
        setVoucher(res);
      }
    }
    if (productId) fetchVoucherData();
  }, [productId]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <div>{productId && <div>Product Id: {productId}</div>}</div>
      <div>{token && <div>Token: {token}</div>}</div>
      <div>
        {voucher && (
          <div style={{ width: "500px" }}>
            Voucher: {JSON.stringify(voucher)}
          </div>
        )}
      </div> */}
      {voucher && (
        <div>
          <div
            style={{
              fontSize: "1.5rem",
              textAlign: "center",
              fontWeight: "600",
              color: "#333",
            }}
          >
            {voucher.data.name}
          </div>
          <RewardDetails data={voucher.data} isMobile />
        </div>
      )}
    </div>
  );
}
