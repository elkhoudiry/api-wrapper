import { Client } from 'pg';
import { LocalClient } from '../models/client';
import { query, insertExact, selectAllExact, JsonObject } from '../utils/database';

const NAMESPACE = 'database/clients-repo';

/** query all clients from clients table */
const queryAllClients = async (): Promise<LocalClient[] | Error> => {
    return await query<LocalClient[]>(async (client: Client) => await selectAllExact(client, 'clients'));
};

/** query client by id from clients table */
const queryClient = async (conditions: JsonObject): Promise<LocalClient[] | Error> => {
    return await query<LocalClient[]>(async (client: Client) => await selectAllExact(client, 'clients', conditions));
};

/** insert new client to database */
const insertNewClient = async (localClient: LocalClient): Promise<LocalClient | Error> => {
    return await query<LocalClient>(async (client: Client) => await insertExact(client, 'clients', localClient));
};

export { queryAllClients, queryClient, insertNewClient };
