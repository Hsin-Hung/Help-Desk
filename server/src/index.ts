import dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";
import cors from "cors";
import {
  createTicket,
  getTickets,
  getTicket,
  updateTicket,
  respondToTicket,
} from "./controllers/ticketsController";
import { connect } from "./db";

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connect();

app.post("/ticket", createTicket);

app.get("/tickets", getTickets);

app.get("/ticket/:id", getTicket);

app.put("/ticket/:id/status", updateTicket);

app.post("/ticket/:id/response", respondToTicket);

const server = app.listen(PORT, async () => {
  console.log(`listning on port ${PORT}`);
});

process.on("SIGTERM", async () => {
  try {
    if (server) {
      await server.close();
    }
    console.log("Graceful shutdown complete");
  } catch (error) {
    console.log(error);
  }
  process.exit(0);
});
