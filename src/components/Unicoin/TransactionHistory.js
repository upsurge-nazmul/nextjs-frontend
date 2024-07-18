import { useState, useEffect } from "react";
import Modal from "../Modal";
import TransactionCard from "./TransactionCard";
import styles from "../../styles/unicoins/transactionHistory.module.scss";
import Selection from "../Selection";
import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";
import SwapVertIcon from "@mui/icons-material/SwapVert";

const SOURCES = [
  { id: 1, key: "all", value: "All Sources" },
  { id: 2, key: "kq", value: "Quests" },
  { id: 3, key: "chores", value: "Chores" },
  { id: 4, key: "games", value: "Games" },
  { id: 5, key: "reward", value: "Reward" },
];

const TRANSACTION_TYPE = [
  { id: 1, key: "both", value: "Both", icon: <SwapVertIcon /> },
  { id: 2, key: "credit", value: "Received", icon: <SouthIcon /> },
  { id: 3, key: "debit", value: "Paid", icon: <NorthIcon /> },
];

const DATA = [
  {
    id: 1,
    transaction_id: "OUYTR87564",
    source_id: "kq",
    transaction_type: "credit",
    transaction_amount: 500,
    date: "02/03/2021",
  },
  {
    id: 2,
    transaction_id: "JHTRE45329",
    source_id: "games",
    transaction_type: "credit",
    transaction_amount: 1200,
    date: "02/03/2021",
  },
  {
    id: 3,
    transaction_id: "MNHYG65487",
    source_id: "chores",
    transaction_type: "debit",
    transaction_amount: 2100,
    date: "02/03/2021",
  },
  {
    id: 4,
    transaction_id: "MBGFR453WE",
    source_id: "games",
    transaction_type: "debit",
    transaction_amount: 700,
    date: "02/03/2021",
  },
  {
    id: 5,
    transaction_id: "AGT6YHJNBV",
    source_id: "kq",
    transaction_type: "debit",
    transaction_amount: 900,
    date: "02/03/2021",
  },
  {
    id: 6,
    transaction_id: "LO9873EDFC",
    source_id: "chores",
    transaction_type: "credit",
    transaction_amount: 200,
    date: "02/03/2021",
  },
  {
    id: 7,
    transaction_id: "NBVGF678UH",
    source_id: "kq",
    transaction_type: "credit",
    transaction_amount: 300,
    date: "02/03/2021",
  },
  {
    id: 8,
    transaction_id: "VFDE876YGH",
    source_id: "chores",
    transaction_type: "credit",
    transaction_amount: 1300,
    date: "02/03/2021",
  },
  {
    id: 9,
    transaction_id: "MNHYU765RF",
    source_id: "games",
    transaction_type: "credit",
    transaction_amount: 1100,
    date: "02/03/2021",
  },
  {
    id: 10,
    transaction_id: "ABJH456TFG",
    source_id: "kq",
    transaction_type: "debit",
    transaction_amount: 100,
    date: "02/03/2021",
  },
];

export default function TransactionHistory({ open, setOpen, data }) {
  const [displayData, setDisplayData] = useState(data);
  const [selectedSource, setSelectedSource] = useState(SOURCES[0].key);
  const [selectedType, setSelectedType] = useState(TRANSACTION_TYPE[0].key);

  useEffect(async () => {
    if (displayData) {
      if (selectedSource === SOURCES[0].key) {
        if (selectedType === TRANSACTION_TYPE[0].key) {
          setDisplayData(data);
        } else {
          setDisplayData(data.filter((item) => item.status === selectedType));
        }
      } else {
        setDisplayData(() =>
          data.filter((item) => {
            if (item.source === selectedSource) {
              if (selectedType === TRANSACTION_TYPE[0].key) {
                return item;
              } else {
                return item.status === selectedType;
              }
            }
          })
        );
      }
    }
  }, [selectedSource, selectedType]);

  return (
    <Modal
      title={"Transaction History"}
      actions={{
        cancelText: "Cancel",
        isCancel: true,
        handleCancel: () => setOpen(false),
        proceedText: "Proceed",
        isProceed: false,
        handleProceed: () => {},
        proceedButtonType: "normal",
      }}
      onOutsideClick={() => setOpen(false)}
    >
      <div className={styles.transactions}>
        <div className={styles.optionsArea}>
          <div className={styles.typesArea}>
            {TRANSACTION_TYPE.map((type) => (
              <span
                className={
                  type.key === selectedType ? styles.selectedType : styles.type
                }
                onClick={() => setSelectedType(type.key)}
                key={type.id}
              >
                {type.icon}
              </span>
            ))}
          </div>
          <div className={styles.sourcesSelection}>
            <Selection
              value={selectedSource}
              setvalue={setSelectedSource}
              options={SOURCES}
              placeholder="Source"
              keyAccessor={"key"}
              valueAccessor={"value"}
            />
          </div>
        </div>
        <div className={styles.historyArea}>
          {displayData.map((item) => (
            <TransactionCard data={item} key={item.id} />
          ))}
        </div>
      </div>
    </Modal>
  );
}
