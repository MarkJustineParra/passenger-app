export interface Notification {
  id: number;
  type: "success" | "info" | "warning";
  title: string;
  message: string;
  time: string;
  read: boolean;
}
