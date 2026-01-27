// src/pages/TransactionPage.tsx
import { useMemo, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonItem,
  IonInput,
  IonIcon,
  IonList,
  IonLabel,
  IonText,
  IonChip,
} from "@ionic/react";
import { searchOutline, arrowDownOutline, arrowUpOutline } from "ionicons/icons";
import "../styles/TransactionPage.css";

type TxType = "credit" | "debit";

type Transaction = {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  type: TxType;
  date: string; 
};

const TransactionPage: React.FC = () => {
  const [query, setQuery] = useState("");

  const transactions: Transaction[] = [
    {
      id: "1",
      title: "Top up",
      subtitle: "GCash",
      amount: 200,
      type: "credit",
      date: "Jan 27, 2026 • 10:45 AM",
    },
    {
      id: "2",
      title: "Bus Fare",
      subtitle: "Route 1",
      amount: 35,
      type: "debit",
      date: "Jan 26, 2026 • 6:15 PM",
    },
    {
      id: "3",
      title: "Bus Fare",
      subtitle: "Route 2",
      amount: 40,
      type: "debit",
      date: "Jan 26, 2026 • 8:02 AM",
    },
    {
      id: "4",
      title: "Refund",
      subtitle: "Canceled Trip",
      amount: 35,
      type: "credit",
      date: "Jan 25, 2026 • 9:12 PM",
    },
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return transactions;
    return transactions.filter((t) => {
      const blob = `${t.title} ${t.subtitle} ${t.date}`.toLowerCase();
      return blob.includes(q);
    });
  }, [query, transactions]);

  return (
    <IonPage>
      <IonHeader className="tx-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="" defaultHref="/tabs/profilepage" />
          </IonButtons>
          <IonTitle className="tx-title">Transaction History</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen scrollY={false} className="tx-content">
        <div className="tx-search-wrap">
          <IonItem lines="none" className="tx-search">
            <IonIcon icon={searchOutline} slot="start" className="tx-search-icon" />
            <IonInput
              placeholder="Search transactions"
              value={query}
              onIonChange={(e) => setQuery(e.detail.value!)}
            />
          </IonItem>
        </div>

        <IonList inset className="tx-list">
          {filtered.length === 0 ? (
            <div className="tx-empty">
              <IonText color="medium">No transactions found.</IonText>
            </div>
          ) : (
            filtered.map((t) => (
              <IonItem key={t.id} lines="none" className="tx-item">
                <div className={`tx-icon ${t.type}`}>
                  <IonIcon icon={t.type === "credit" ? arrowDownOutline : arrowUpOutline} />
                </div>

                <IonLabel className="tx-label">
                  <h2 className="tx-row">
                    <span className="tx-name">{t.title}</span>
                    <span className={`tx-amount ${t.type}`}>
                      {t.type === "credit" ? "+" : "-"}₱{t.amount.toFixed(2)}
                    </span>
                  </h2>
                  <p className="tx-sub">{t.subtitle}</p>
                  <p className="tx-date">{t.date}</p>
                </IonLabel>

                <IonChip className={`tx-chip ${t.type}`}>
                  {t.type === "credit" ? "IN" : "OUT"}
                </IonChip>
              </IonItem>
            ))
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default TransactionPage;
