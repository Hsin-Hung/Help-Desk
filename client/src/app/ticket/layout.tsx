import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function TicketLayout({ children }: Props) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pb-8 pt-6">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Ticket
          </h1>
        </div>
        <div>{children}</div>
      </div>
    </>
  );
}
