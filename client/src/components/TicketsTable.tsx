"use client";
import { Ticket } from "@/data/ticketData";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url, {
    method: "GET",
  }).then((res) => res.json());

const TicketsTable = () => {
  const columns = ["ID", "Name", "E-mail", "Description", "Status"];
  const { data, error, mutate } = useSWR(`/api/tickets`, fetcher, {
    revalidateOnFocus: false,
  });
  const tickets = data?.data ?? [];

  console.log(tickets);
  return (
    <table className="table-fixed border-collapse border border-slate-500 grow">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column} className="border border-slate-600">
              {column}
            </th>
          ))}
          <th className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 border border-slate-600">
            <button onClick={() => mutate()}>Refresh</button>
          </th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((t: Ticket) => (
          <tr key={t.id}>
            <td className="border border-slate-700 p-2">{t.id}</td>
            <td className="border border-slate-700 p-2">{t.name}</td>
            <td className="border border-slate-700 p-2">{t.email}</td>
            <td className="border border-slate-700 p-2">
              {t.description.length > 20
                ? `${t.description.substring(0, 100)}...`
                : t.description}
            </td>
            <td className="border border-slate-700 p-2">{t.status}</td>
            <td className="border border-slate-700 p-2">
              {" "}
              <Link
                href={`/admin/${t.id}`}
                className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              >
                Update
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TicketsTable;
