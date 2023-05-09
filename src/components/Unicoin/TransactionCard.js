import styles from "../../styles/unicoins/transactionCard.module.scss";
import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";
import UniCoinSvg from "../SVGcomponents/UniCoinSvg";

const SOURCES = [
  { id: 1, key: "all", value: "All Sources" },
  { id: 2, key: "kq", value: "Knowledge Quests" },
  { id: 3, key: "chores", value: "Chores" },
  { id: 4, key: "games", value: "Games" },
  { id: 5, key: "reward", value: "Reward" },
];

const TRANSACTION_TYPE = [
  { id: 1, key: "both", value: "Both" },
  { id: 2, key: "credit", value: "Received" },
  { id: 3, key: "debit", value: "Paid" },
];

export default function TransactionCard({ data }) {
  return (
    <div
      className={styles.card}
      style={{
        borderColor:
          data.transaction_type === "credit"
            ? "#17d1bc"
            : data.transaction_type === "debit"
            ? "#ff6263"
            : "#333",
      }}
    >
      <div
        className={styles.icon}
        style={{
          backgroundColor:
            data.transaction_type === "credit"
              ? "#17d1bc"
              : data.transaction_type === "debit"
              ? "#ff6263"
              : "#333",
        }}
      >
        {data.transaction_type === "credit" ? (
          <SouthIcon />
        ) : data.transaction_type === "debit" ? (
          <NorthIcon />
        ) : (
          ""
        )}
      </div>
      <div className={styles.cardContent}>
        <div className={styles.titleArea}>
          <div className={styles.title}>
            {SOURCES.find((source) => source.key === data.source_id).value}
          </div>
          <div className={styles.transactionId}>{data.transaction_id}</div>
        </div>
        <div className={styles.dateArea}>
          <div
            className={styles.type}
            style={{
              color:
                data.transaction_type === "credit"
                  ? "#17d1bc"
                  : data.transaction_type === "debit"
                  ? "#ff6263"
                  : "#333",
            }}
          >
            {
              TRANSACTION_TYPE.find(
                (trnc) => trnc.key === data.transaction_type
              ).value
            }
          </div>
          <div className={styles.date}>{data.date}</div>
        </div>
        <div
          className={styles.amount}
          style={{
            color:
              data.transaction_type === "credit"
                ? "#17d1bc"
                : data.transaction_type === "debit"
                ? "#ff6263"
                : "#333",
          }}
        >
          <UniCoinSvg
            className={styles.coinIcon}
            clr={
              data.transaction_type === "credit"
                ? "#17d1bc"
                : data.transaction_type === "debit"
                ? "#ff6263"
                : "#333"
            }
          />
          {data.transaction_amount}
        </div>
      </div>
    </div>
  );
}
