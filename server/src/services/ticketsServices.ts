import { Ticket, Status } from '../types/ticket';
import { client } from '../db';

export const insertTicket = async (name: string, email: string, description: string, status: Status = Status.New) => {
    return await client()
        .from('tickets')
        .insert({name, email, description, status});
}

export const updateTicket = async (id: number, status: Status) => {
    console.log(id, status);
    return await client()
        .from('tickets')
        .update({status : status})
        .eq('id', id)
}

export const fetchTickets = async () => {
    return await client()
        .from('tickets')
        .select();
}