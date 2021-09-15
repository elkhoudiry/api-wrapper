import { Client } from 'pg';
import { LocalClient } from '../models/client';
import { selectAllExact } from '../utils/database';

const NAMESPACE = 'database/clients-repo';

const getClient = () =>
    new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: false
    });

/** query all clients from clients table */
const queryAllClients = async (): Promise<LocalClient[] | Error> => {
    const client = getClient();
    await client.connect();

    const result = await selectAllExact(client, 'clients');

    await client.end();
    return result;
};

/** query client by id from clients table */
const queryClientById = async (id: number): Promise<LocalClient[] | Error> => {
    const client = getClient();
    await client.connect();

    const result = await selectAllExact(client, 'clients', { id });

    await client.end();
    return result;
};

export { queryAllClients, queryClientById };
