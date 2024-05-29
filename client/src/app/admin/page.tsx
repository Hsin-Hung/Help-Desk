import TicketsTable from "@/components/TicketsTable";

export default async function AdminPage() {
  return (
    <div className="-m-4 flex items-center justify-center pt-4">
      <TicketsTable />
    </div>
  );
}
