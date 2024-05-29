"use client";
import React, { useState } from "react";
import { Ticket } from "@/data/ticketData";
import { ModalState } from "@/data/modal";
import Modal from "./Modal";

const TicketDetails = ({ id, name, email, description, status }: Ticket) => {
  const [newStatus, setNewStatus] = useState(status);
  const [responseText, setResponse] = useState("");
  const [modal, setModal] = useState<ModalState>({
    open: false,
    message: "",
    isSuccess: false,
  });

  const handleResponseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponse(e.target.value);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/ticket/${id}/response`, {
        method: "POST",
        body: JSON.stringify({ response: responseText, email: email }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (!data.ok) {
        throw new Error(data.error);
      }
      console.log(data);
      setModal({
        open: true,
        message: "Ticket response successfully sent!",
        isSuccess: true,
      });
      setResponse("");
    } catch (error) {
      console.error("Error:", error);
      setModal({
        open: true,
        message: "An error occurred while sending ticket response.",
        isSuccess: false,
      });
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
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      if (!data.ok) {
        throw new Error(data.error);
      }

      console.log(data);
      setNewStatus(newStatus);
      setModal({
        open: true,
        message: "Status successfully updated!",
        isSuccess: true,
      });
    } catch (error) {
      console.error("Error:", error);
      setModal({
        open: true,
        message: "An error occurred while updating ticket status.",
        isSuccess: false,
      });
    }
  };

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2 rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700">
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
        </div>
      </div>
      <div className="col-span-1">
        <form onSubmit={handleUpdate}>
          <textarea
            name="description"
            value={responseText}
            onChange={handleResponseChange}
            className="focus:ring-primary-600 w-full h-64 rounded-md p-2 focus:border-transparent focus:outline-none focus:ring-2 dark:bg-black"
            placeholder="Enter your response here..."
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
      <div className="col-span-3 col-start-2">
        <Modal modal={modal} setModal={setModal} />
      </div>
    </div>
  );
};

export default TicketDetails;
