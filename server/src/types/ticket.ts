export enum DBStatusCode {
  Fetch = 200,
  Insert = 201,
  Update = 204,
}

export enum Status {
  New = "new",
  InProgress = "in progress",
  Resolved = "resolved",
}

export interface Ticket {
  id: string;
  name: string;
  email: string;
  description: string;
  status: Status;
}
