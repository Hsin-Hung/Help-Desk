import { Ticket } from "@/data/ticketData";
import Link from "next/link";

const Card = ({ id, name, email, description, status }: Ticket) => {
  return (
    <div className="md max-w-[544px] p-4 md:w-1/2">
      <div>
        <div className="p-6">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="flex flex-row justify-between">
              <h2 className="mr-3 text-2xl font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                {id}
              </h2>
            </div>
            <div>
              <h2 className="text-1xl font-bold leading-8 tracking-tight">
                {name}
              </h2>
              <h2 className="text-1xl font-bold leading-8 tracking-tight">
                {email}
              </h2>
              <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">
                {description.length > 100
                  ? `${description.substring(0, 100)}...`
                  : description}
              </p>
            </div>
          </div>
          <div>
            <Link
              href={{
                pathname: `/admin/${id}`,
                query: { id, name, email, description, status },
              }}
              className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            >
              Update
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
