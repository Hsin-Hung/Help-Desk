import { getTickets } from "../api/ticketApi";
import TicketsTable from "@/components/TicketsTable";

export default async function AdminPage() {
  const { data } = await getTickets();

  return (
    <div className="-m-4 flex items-center justify-center pt-4">
      <TicketsTable data={data} />
    </div>
  );
}
