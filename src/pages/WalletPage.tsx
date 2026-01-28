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
  IonModal,
  IonInput,
} from "@ionic/react";
import {
  addOutline,
  checkmarkOutline,
  eyeOffOutline,
  eyeOutline,
  arrowDownOutline,
} from "ionicons/icons";
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

type RechargeMethod = "gcash" | "maya";
type WithdrawMethod = "gcash" | "maya";

const WalletPage: React.FC = () => {
  const [tab, setTab] = useState<Tab>("all");
  const balance = 100000;

  const [showBalance, setShowBalance] = useState(false);

  // demo tx list (make IDs unique)
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
      type: "withdrawal",
      title: "Withdrawal",
      date: "27 Jan 2026 08:31 AM",
      status: "Pending Withdrawal",
      amount: 100000,
    },
    {
      id: "3",
      type: "payment",
      title: "Payment",
      date: "27 Jan 2026 08:31 AM",
      status: "Completed",
      amount: -1000,
    },
    {
      id: "4",
      type: "recharge",
      title: "Recharge",
      date: "27 Jan 2026 08:31 AM",
      status: "Successful Recharge",
      amount: 100000,
    },
    {
      id: "5",
      type: "withdrawal",
      title: "Withdrawal",
      date: "27 Jan 2026 08:31 AM",
      status: "Pending Withdrawal",
      amount: 100000,
    },
    {
      id: "6",
      type: "payment",
      title: "Payment",
      date: "27 Jan 2026 08:31 AM",
      status: "Completed",
      amount: -1000,
    },
    {
      id: "7",
      type: "recharge",
      title: "Recharge",
      date: "27 Jan 2026 08:31 AM",
      status: "Successful Recharge",
      amount: 100000,
    },
    {
      id: "8",
      type: "withdrawal",
      title: "Withdrawal",
      date: "27 Jan 2026 08:31 AM",
      status: "Pending Withdrawal",
      amount: 100000,
    },
    {
      id: "9",
      type: "payment",
      title: "Payment",
      date: "27 Jan 2026 08:31 AM",
      status: "Completed",
      amount: -1000,
    },
    {
      id: "10",
      type: "recharge",
      title: "Recharge",
      date: "27 Jan 2026 08:31 AM",
      status: "Successful Recharge",
      amount: 100000,
    },
    {
      id: "11",
      type: "withdrawal",
      title: "Withdrawal",
      date: "27 Jan 2026 08:31 AM",
      status: "Pending Withdrawal",
      amount: 100000,
    },
    {
      id: "12",
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

  const [rechargeOpen, setRechargeOpen] = useState(false);
  const [rechargeSuccessOpen, setRechargeSuccessOpen] = useState(false);
  const [rechargeMethod, setRechargeMethod] = useState<RechargeMethod>("gcash");
  const [rechargeAmount, setRechargeAmount] = useState<string>("");

  const resetRechargeForm = () => {
    setRechargeMethod("gcash");
    setRechargeAmount("");
  };

  const closeRecharge = () => {
    setRechargeOpen(false);
    setTimeout(() => resetRechargeForm(), 150);
  };

  const onConfirmRecharge = () => {
    const n = Number(rechargeAmount);
    if (!Number.isFinite(n) || n < 100) return;

    setRechargeOpen(false);
    setTimeout(() => setRechargeSuccessOpen(true), 200);
  };

  const rechargeConfirmDisabled = (() => {
    const n = Number(rechargeAmount);
    return !Number.isFinite(n) || n < 100;
  })();

  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [withdrawSuccessOpen, setWithdrawSuccessOpen] = useState(false);
  const [withdrawMethod, setWithdrawMethod] = useState<WithdrawMethod>("gcash");
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");

  const resetWithdrawForm = () => {
    setWithdrawMethod("gcash");
    setWithdrawAmount("");
  };

  const closeWithdraw = () => {
    setWithdrawOpen(false);
    setTimeout(() => resetWithdrawForm(), 150);
  };

  const onConfirmWithdraw = () => {
    const n = Number(withdrawAmount);
    if (!Number.isFinite(n) || n < 100) return;

    if (n > balance) return;

    setWithdrawOpen(false);
    setTimeout(() => setWithdrawSuccessOpen(true), 200);
  };

  const withdrawConfirmDisabled = (() => {
    const n = Number(withdrawAmount);
    return !Number.isFinite(n) || n < 100 || n > balance;
  })();

  return (
    <IonPage>
      <IonHeader className="wallet-header">
        <IonToolbar className="wallet-toolbar ion-no-border">
          <IonButtons slot="start">
            <IonBackButton text="" defaultHref="/tabs/profilepage" />
          </IonButtons>
          <IonTitle className="wallet-title">Wallet Balance</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="wallet-content">
        <div className="wallet-shell">
          {/* ✅ New balance card design */}
          <div className="balance-card-v2">
            <div className="balance-top">
              <div className="balance-top-left">
                <div className="balance-label-v2">Wallet Balance</div>

                {showBalance ? (
                  <div className="balance-amount-v2">
                    ₱{balance.toLocaleString()}
                  </div>
                ) : (
                  <div className="balance-dots" aria-label="Hidden balance">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <span key={i} className="dot" />
                    ))}
                  </div>
                )}
              </div>

              <button
                className="balance-eye"
                onClick={() => setShowBalance((v) => !v)}
                aria-label={showBalance ? "Hide balance" : "Show balance"}
              >
                <IonIcon icon={showBalance ? eyeOutline : eyeOffOutline} />
              </button>
            </div>

            <div className="balance-actions">
              <button className="action-btn" onClick={() => setRechargeOpen(true)}>
                <IonIcon icon={addOutline} />
                <span>Recharge</span>
              </button>

              <button className="action-btn" onClick={() => setWithdrawOpen(true)}>
                <IonIcon icon={arrowDownOutline} />
                <span>Withdraw</span>
              </button>
            </div>
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

  
        <IonModal
          isOpen={rechargeOpen}
          onDidDismiss={closeRecharge}
          initialBreakpoint={0.42}
          breakpoints={[0, 0.42, 0.7]}
          handleBehavior="cycle"
          className="recharge-modal"
        >
          <div className="recharge-sheet">
            <div className="recharge-topbar">
              <button className="recharge-back" onClick={closeRecharge}>
                ‹
              </button>
              <div className="recharge-title">Add Money</div>
            </div>

            <div className="recharge-methods">
              <button
                className={`method-pill ${rechargeMethod === "gcash" ? "active" : ""}`}
                onClick={() => setRechargeMethod("gcash")}
              >
                <span className="method-text">G-Cash</span>
                {rechargeMethod === "gcash" && (
                  <span className="method-check">
                    <IonIcon icon={checkmarkOutline} />
                  </span>
                )}
              </button>

              <button
                className={`method-pill ${rechargeMethod === "maya" ? "active" : ""}`}
                onClick={() => setRechargeMethod("maya")}
              >
                <span className="method-text">Maya</span>
                {rechargeMethod === "maya" && (
                  <span className="method-check">
                    <IonIcon icon={checkmarkOutline} />
                  </span>
                )}
              </button>
            </div>

            <div className="recharge-field">
              <div className="recharge-label">Cash in Amount</div>
              <div className="recharge-inputWrap">
                <IonInput
                  inputMode="numeric"
                  value={rechargeAmount}
                  placeholder="100 minimum"
                  onIonInput={(e) =>
                    setRechargeAmount(String(e.detail.value ?? ""))
                  }
                  className="recharge-input"
                />
              </div>
            </div>

            <IonButton
              expand="block"
              className="recharge-confirm"
              disabled={rechargeConfirmDisabled}
              onClick={onConfirmRecharge}
            >
              Confirm
            </IonButton>
          </div>
        </IonModal>

        <IonModal
          isOpen={rechargeSuccessOpen}
          onDidDismiss={() => setRechargeSuccessOpen(false)}
          initialBreakpoint={1}
          breakpoints={[0, 1]}
          className="success-modal"
        >
          <div className="recharge-success">
            <div className="success-title">Recharge Success</div>

            <div className="success-badge">
              <div className="success-ring">
                <div className="success-dot">
                  <IonIcon icon={checkmarkOutline} />
                </div>
              </div>
            </div>

            <div className="success-text">
              <div className="success-main">Recharge Successful</div>
              <div className="success-sub">Your money will be applied.</div>
            </div>

            <IonButton
              expand="block"
              className="success-done"
              onClick={() => {
                setRechargeSuccessOpen(false);
                resetRechargeForm();
              }}
            >
              Done
            </IonButton>
          </div>
        </IonModal>

        <IonModal
          isOpen={withdrawOpen}
          onDidDismiss={closeWithdraw}
          initialBreakpoint={0.42}
          breakpoints={[0, 0.42, 0.7]}
          handleBehavior="cycle"
          className="recharge-modal"
        >
          <div className="recharge-sheet">
            <div className="recharge-topbar">
              <button className="recharge-back" onClick={closeWithdraw}>
                ‹
              </button>
              <div className="recharge-title">Withdraw</div>
            </div>

            <div className="recharge-methods">
              <button
                className={`method-pill ${withdrawMethod === "gcash" ? "active" : ""}`}
                onClick={() => setWithdrawMethod("gcash")}
              >
                <span className="method-text">G-Cash</span>
                {withdrawMethod === "gcash" && (
                  <span className="method-check">
                    <IonIcon icon={checkmarkOutline} />
                  </span>
                )}
              </button>

              <button
                className={`method-pill ${withdrawMethod === "maya" ? "active" : ""}`}
                onClick={() => setWithdrawMethod("maya")}
              >
                <span className="method-text">Maya</span>
                {withdrawMethod === "maya" && (
                  <span className="method-check">
                    <IonIcon icon={checkmarkOutline} />
                  </span>
                )}
              </button>
            </div>

            <div className="recharge-field">
              <div className="recharge-label">Withdraw Amount</div>
              <div className="recharge-inputWrap">
                <IonInput
                  inputMode="numeric"
                  value={withdrawAmount}
                  placeholder={`100 minimum (max ₱${balance.toLocaleString()})`}
                  onIonInput={(e) =>
                    setWithdrawAmount(String(e.detail.value ?? ""))
                  }
                  className="recharge-input"
                />
              </div>
            </div>

            <IonButton
              expand="block"
              className="recharge-confirm"
              disabled={withdrawConfirmDisabled}
              onClick={onConfirmWithdraw}
            >
              Confirm
            </IonButton>
          </div>
        </IonModal>

        <IonModal
          isOpen={withdrawSuccessOpen}
          onDidDismiss={() => setWithdrawSuccessOpen(false)}
          initialBreakpoint={1}
          breakpoints={[0, 1]}
          className="success-modal"
        >
          <div className="recharge-success">
            <div className="success-title">Withdrawal Success</div>

            <div className="success-badge">
              <div className="success-ring">
                <div className="success-dot">
                  <IonIcon icon={checkmarkOutline} />
                </div>
              </div>
            </div>

            <div className="success-text">
              <div className="success-main">Withdrawal Successful</div>
              <div className="success-sub">Your request is being processed.</div>
            </div>

            <IonButton
              expand="block"
              className="success-done"
              onClick={() => {
                setWithdrawSuccessOpen(false);
                resetWithdrawForm();
              }}
            >
              Done
            </IonButton>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default WalletPage;
