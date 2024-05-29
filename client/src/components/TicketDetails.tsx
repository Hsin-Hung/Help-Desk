"use client";
import React, { useState } from "react";
import { Ticket } from "@/data/ticketData";

const TicketDetails = ({ id, name, email, description, status }: Ticket) => {
  const [newStatus, setNewStatus] = useState(status);
  const [responseText, setResponse] = useState("");

  const handleResponseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponse(e.target.value);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/ticket/${id}/response`, {
        method: "POST",
        body: JSON.stringify({ response: responseText }),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = e.target.value;
    try {
      const response = await fetch(`/api/ticket/${id}/status`, {
        method: "PUT",
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setNewStatus(newStatus);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-2/3 rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="p-4">
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl font-bold leading-8 tracking-tight">
              Ticket ID: {id}
            </h2>
            <select
              name="selectedStatus"
              className="bg-white text-black antialiased dark:bg-gray-950 dark:text-gray-100"
              onChange={handleStatusChange}
              value={newStatus}
            >
              <option value="new">New</option>
              <option value="in progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          <div className="flex flex-wrap">
            <h2 className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
              {name}
            </h2>
            <h2 className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
              {email}
            </h2>
          </div>
        </div>
        <div className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400 overflow-auto h-48 p-4">
          {description}
        </div>
        <div>
          <form onSubmit={handleUpdate}>
            <textarea
              name="description"
              value={responseText}
              onChange={handleResponseChange}
              className="focus:ring-primary-600 w-full h-64 rounded-md p-2 focus:border-transparent focus:outline-none focus:ring-2 dark:bg-black"
              required
            />
            <button
              className="bg-primary-500 w-full h-10 rounded-md py-2 px-4 font-medium text-white
                hover:bg-primary-700 dark:hover:bg-primary-400
              focus:ring-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default TicketDetails;
