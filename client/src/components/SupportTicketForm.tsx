"use client";
import React, { useState } from "react";

interface SupportTicket {
  name: string;
  email: string;
  description: string;
}

export default function SupportTicketForm() {
  const [ticket, setTicket] = useState<SupportTicket>({
    name: "",
    email: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/ticket", {
        method: "POST",
        body: JSON.stringify(ticket),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      // Here you can handle the response from the server
    } catch (error) {
      console.error("Error:", error);
      // Here you can handle errors
    }
  };

  return (
    <div className="w-1/2">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-2 w-full">
          <div>
            <div className="pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
              Name
            </div>
            <label>
              <input
                className="focus:ring-primary-600 w-full h-10 rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 dark:bg-black"
                type="text"
                name="name"
                value={ticket.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </label>
          </div>
          <div>
            <div className="pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
              E-mail
            </div>
            <label>
              <input
                className="focus:ring-primary-600 w-full h-10 rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 dark:bg-black"
                type="email"
                name="email"
                value={ticket.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
              />
            </label>
          </div>
          <div>
            <div className="pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
              Description
            </div>
            <label>
              <textarea
                className="focus:ring-primary-600 w-full h-64 rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 dark:bg-black"
                name="description"
                value={ticket.description}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="mt-2 w-full rounded-md shadow-sm">
            <button
              className="bg-primary-500 w-full h-10 rounded-md py-2 px-4 font-medium text-white
                hover:bg-primary-700 dark:hover:bg-primary-400
              focus:ring-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
