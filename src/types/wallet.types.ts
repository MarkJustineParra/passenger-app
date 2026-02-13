export type WalletTab = "all" | "recharge" | "withdrawal";

export type TransactionStatus =
  | "Successful Recharge"
  | "Pending Recharge"
  | "Successful Withdrawal"
  | "Pending Withdrawal"
  | "Failed Withdrawal"
  | "Completed";

export type Transaction = {
  id: string;
  type: "recharge" | "withdrawal" | "payment";
  title: string;
  date: string;
  status: TransactionStatus;
  amount: number;
};

export type RechargeMethod = "gcash" | "maya";
export type WithdrawMethod = "gcash" | "maya";
