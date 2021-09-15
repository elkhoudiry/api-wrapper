import { Request } from 'express';
import { Client } from 'pg';
import { LocalClient } from '../models/client';
import { query, insertExact, selectAllExact, JsonObject } from '../utils/database';

const NAMESPACE = 'database/clients-repo';

/** check if body has client property */
const isBodyClientExist = (req: Request) => ({
    code: 400,
    valid: (): boolean => req.body.client,
    message: 'property { client } in request body is missing',
    payload: { error_at: req.body.client }
});

const isBodyClientValid = (req: Request) => ({
    code: 400,
    valid: (): boolean => LocalClient.checkType(req.body.client),
    message: `property { client } in request body is invalid, ${LocalClient.structure()}`,
    payload: { error_at: req.body.client }
});

/** query all clients from clients table */
const queryAllClients = async (): Promise<LocalClient[] | Error> => {
    return await query<LocalClient[]>(async (client: Client) => await selectAllExact(client, 'clients'));
};

/** query client by id from clients table */
const queryClient = async (conditions: JsonObject): Promise<LocalClient[] | Error> => {
    return await query<LocalClient[]>(async (client: Client) => await selectAllExact(client, 'clients', conditions));
};

/** insert new client to database */
const insertClient = async (localClient: LocalClient): Promise<LocalClient | Error> => {
    return await query<LocalClient>(async (client: Client) => await insertExact(client, 'clients', localClient));
};

export { queryAllClients, queryClient, insertClient, isBodyClientValid, isBodyClientExist };
