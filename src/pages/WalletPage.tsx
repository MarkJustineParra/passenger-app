import { useMemo, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonIcon,
  IonButton,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import "../styles/WalletPage.css";

type Tab = "all" | "recharge" | "withdrawal";

type Status =
  | "Successful Recharge"
  | "Pending Recharge"
  | "Successful Withdrawal"
  | "Pending Withdrawal"
  | "Failed Withdrawal"
  | "Completed";

type Tx = {
  id: string;
  type: "recharge" | "withdrawal" | "payment";
  title: string;
  date: string;
  status: Status;
  amount: number;
};

const WalletPage: React.FC = () => {
  const [tab, setTab] = useState<Tab>("all");

  const balance = 100000;

  const transactions: Tx[] = [
    {
      id: "1",
      type: "recharge",
      title: "Recharge",
      date: "27 Jan 2026 08:31 AM",
      status: "Successful Recharge",
      amount: 100000,
    },
    {
      id: "2",
      type: "recharge",
      title: "Recharge",
      date: "27 Jan 2026 08:31 AM",
      status: "Successful Recharge",
      amount: 100000,
    },
    {
      id: "3",
      type: "withdrawal",
      title: "Withdrawal",
      date: "27 Jan 2026 08:31 AM",
      status: "Pending Withdrawal",
      amount: 100000,
    },
    {
      id: "4",
      type: "withdrawal",
      title: "Withdrawal",
      date: "27 Jan 2026 08:31 AM",
      status: "Successful Withdrawal",
      amount: 100000,
    },
    {
      id: "5",
      type: "withdrawal",
      title: "Withdrawal",
      date: "27 Jan 2026 08:31 AM",
      status: "Failed Withdrawal",
      amount: 100000,
    },
    {
      id: "6",
      type: "recharge",
      title: "Recharge",
      date: "27 Jan 2026 08:31 AM",
      status: "Pending Recharge",
      amount: 100000,
    },
    {
      id: "7",
      type: "payment",
      title: "Payment",
      date: "27 Jan 2026 08:31 AM",
      status: "Completed",
      amount: -1000,
    },
  ];

  const filtered = useMemo(() => {
    if (tab === "all") return transactions;
    return transactions.filter((t) => t.type === tab);
  }, [tab, transactions]);

  const formatMoney = (n: number) =>
    `₱${Math.abs(n).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  const statusClass = (s: Status) => {
    if (s.includes("Successful") || s === "Completed") return "tx-status ok";
    if (s.includes("Pending")) return "tx-status pending";
    return "tx-status failed";
  };

  return (
    <IonPage>
      <IonHeader className="wallet-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="" defaultHref="/tabs/profilepage" />
          </IonButtons>

          <IonTitle slot="start" className="wallet-title">
            Wallet Balance
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="wallet-content">
        <div className="wallet-shell">
          <div className="balance-card">
            <div className="balance-left">
              <div className="balance-label">Wallet Balance</div>
              <div className="balance-amount">₱{balance.toLocaleString()}</div>
            </div>

            <IonButton className="recharge-btn">
              <IonIcon icon={addOutline} slot="start" />
              Recharge
            </IonButton>
          </div>

          <div className="th-title">Transaction History</div>

          <div className="pill-row">
            <button
              className={`pill ${tab === "all" ? "active" : ""}`}
              onClick={() => setTab("all")}
            >
              All
            </button>
            <button
              className={`pill ${tab === "recharge" ? "active" : ""}`}
              onClick={() => setTab("recharge")}
            >
              Recharge
            </button>
            <button
              className={`pill ${tab === "withdrawal" ? "active" : ""}`}
              onClick={() => setTab("withdrawal")}
            >
              Withdrawal
            </button>
          </div>

          <div className="tx-list">
            {filtered.map((t) => {
              const sign = t.amount >= 0 ? "+" : "-";
              const amountClass = t.amount >= 0 ? "tx-amount" : "tx-amount neg";

              return (
                <div className="tx-row" key={t.id}>
                  <div className="tx-left">
                    <div className="tx-title">{t.title}</div>
                    <div className="tx-date">{t.date}</div>
                  </div>

                  <div className="tx-right">
                    <div className={amountClass}>
                      {sign}
                      {formatMoney(t.amount)}
                    </div>
                    <div className={statusClass(t.status)}>{t.status}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default WalletPage;
