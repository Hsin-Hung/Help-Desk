"use client";
import useSWR from "swr";
import TicketDetails from "@/components/TicketDetails";

const fetcher = (url: string) =>
  fetch(url, {
    method: "GET",
  }).then((res) => res.json());

export default function TicketDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const _id = Number(params.id);
  const { data, error, mutate } = useSWR(`/api/ticket/${_id}`, fetcher, {
    revalidateOnFocus: false,
  });

  const ticket = data?.data ?? {};
  return (
    <div className="flex items-center justify-center pt-4">
      {error && <div>Failed to load</div>}
      {!data && <div>Loading...</div>}
      {data && !error && (
        <TicketDetails key={ticket.id} ticket={ticket} mutate={mutate} />
      )}
    </div>
  );
}
