import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import DashboardApis from "../../actions/apis/DashboardApis";
import RewardDetails from "../../components/WaitlistDashboard/RewardDetails";

export default function VoucherDetails() {
  const router = useRouter();
  const [voucher, setVoucher] = useState();

  const { productId } = router.query;

  useEffect(() => {
    async function fetchVoucherData() {
      let res = await DashboardApis.getallvouchers({});
      if (res && res.data && res.data.success) {
        let ourData = res.data.data.find(
          (item) => item.id === parseInt(productId)
        );
        setVoucher(ourData);
      }
    }
    if (productId) fetchVoucherData();
  }, [productId]);

  return (
    <div>
      {voucher && (
        <div>
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "#333",
            }}
          >
            {voucher.data.name}
          </div>
          <RewardDetails data={voucher.data} />
        </div>
      )}
    </div>
  );
}
