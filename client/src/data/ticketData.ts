export enum Status {
  New = "new",
  InProgress = "in progress",
  Resolved = "resolved",
}

export interface Ticket {
  id: number;
  name: string;
  email: string;
  description: string;
  status: string;
}
