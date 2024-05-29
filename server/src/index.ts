import dotenv from 'dotenv';
import express from 'express';
import { createTicket, getTickets, getTicket, updateTicket, respondToTicket } from './controllers/ticketsController';
import { connect } from './db';

dotenv.config()

const app = express();

app.use(express.json())

const PORT = process.env.PORT || 8080

connect();

app.post('/ticket', createTicket);

app.get('/tickets', getTickets);

app.get('/ticket/:id', getTicket);

app.put('/ticket/:id/status', updateTicket);

app.post('/ticket/:id/respond', respondToTicket);

app.listen(PORT, async () => {
  console.log(`listning on port ${PORT}`)
})

//exporting app
module.exports = app