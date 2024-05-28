import { Request, Response } from 'express';
import { insertTicket, updateTicket as updateTicketStatus, fetchTickets } from '../services/ticketsServices';

export const createTicket = async (req : Request, res : Response) => {
    try {
        console.log(req.body);
        const email = req.body.email;
        const name = req.body.name;
        const description = req.body.description;

        const data = await insertTicket(email, name, description);
        console.log(data);
        res.json({ status: data.statusText });
      } catch (err : any) {
        console.log(err);
        res.status(500).json({ error: err.message });
      }
}

export const getTickets = async (req : Request, res : Response) => {
    try {
        const data = await fetchTickets();
        if(data.status == 200){
          res.json({ data: data.data }); 
        }else{
          res.status(500).json({ error: data.statusText });
        }
      } catch (err : any) {
        console.log(err);
        res.status(500).json({ error: err.message });
      }
}

export const updateTicket = async (req : Request, res : Response) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid ticket id' });
        return;
      }
      
      const status = req.body.status;
      const data = await updateTicketStatus(id, status);
      console.log(data);
      res.json({ status: data.statusText });
      } catch (err : any) {
        console.log(err);
        res.status(500).json({ error: err.message });
      }

}

export const respondToTicket = async (req : Request, res : Response) => {
    console.log(`Would normally send email here with body: ${req.body.response}`);
    res.json({ status: 'Email sent'});
}

