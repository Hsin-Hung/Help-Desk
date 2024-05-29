import { Request, Response } from "express";
import { Status } from "../types/ticket";
import {
  insertTicket,
  updateTicket as updateTicketStatus,
  fetchTickets,
  fetchTicket,
} from "../services/ticketsServices";
import { DBStatusCode } from "../types/ticket";

export const createTicket = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const name = req.body.name;
    const description = req.body.description;
    if (!email || !name || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("creating ticket with: ", email, name, description);

    const data = await insertTicket(name, email, description);
    console.log(data);
    if (data.status == DBStatusCode.Insert) {
      res.json({ status: data.status, statusText: data.statusText });
    } else {
      res.status(data.status).json({ error: data.statusText });
    }
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const getTickets = async (req: Request, res: Response) => {
  try {
    console.log("getting tickets");
    const data = await fetchTickets();
    if (data.status == DBStatusCode.Fetch) {
      res.json({
        status: data.status,
        statusText: data.statusText,
        data: data.data,
      });
    } else {
      res.status(data.status).json({ error: data.statusText });
    }
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const getTicket = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ticket id" });
    }
    console.log("getting ticket with id: ", id);
    const data = await fetchTicket(id);
    if (data.status == DBStatusCode.Fetch) {
      res.json({
        status: data.status,
        statusText: data.statusText,
        data: data.data,
      });
    } else {
      res.status(data.status).json({ error: data.statusText });
    }
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const updateTicket = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ticket id" });
    }

    const status = req.body.status;
    if (!status || !Object.values(Status).includes(status as Status)) {
      return res
        .status(400)
        .json({ error: "Missing required field or invalid status" });
    }
    console.log(`updating ticket status with id: ${id} to ${status}`);
    const data = await updateTicketStatus(id, status);
    if (data.status == DBStatusCode.Update) {
      if (data.count == 0) {
        return res.status(404).json({ error: "Ticket not found" });
      }
      res.json({ status: data.status, statusText: data.statusText });
    } else {
      res.status(data.status).json({ error: data.statusText });
    }
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const respondToTicket = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const response = req.body.response;
    if (!response || isNaN(id)) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const data = await fetchTicket(id);
    if (data.status == DBStatusCode.Fetch) {
      const email = data.data.email;
      if (!email) {
        return res
          .status(500)
          .json({ error: "Could not find email for ticket" });
      }
      const mockRes = `Would normally send email here with body: ${response} to ${email} for ticket id: ${id}`;
      console.log(mockRes);
      res.json({ status: 200, statusText: `Email Sent: ${mockRes}` });
    } else {
      res.status(data.status).json({ error: data.statusText });
    }
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
