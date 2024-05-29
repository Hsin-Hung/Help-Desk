import { Status } from "../types/ticket";
import { client } from "../db";

export const insertTicket = async (
  name: string,
  email: string,
  description: string,
  status: Status = Status.New
) => {
  return await client()
    .from("tickets")
    .insert({ name, email, description, status });
};

export const updateTicket = async (id: number, status: Status) => {
  return await client()
    .from("tickets")
    .update({ status: status }, { count: "exact" })
    .eq("id", id);
};

export const fetchTickets = async () => {
  return await client().from("tickets").select();
};

export const fetchTicket = async (id: number) => {
  return await client().from("tickets").select().eq("id", id).single();
};
