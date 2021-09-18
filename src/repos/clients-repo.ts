import { Request } from 'express';
import { LocalClient } from '../models/client';
import { select } from '../sql/select';
import { Where } from '../sql/where';
import { query } from '../sql/database';
import { insert } from '../sql/insert';

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
    const result = await query((client) => select(client, 'clients', ['*']));

    return !(result instanceof Error) ? result.rows : result;
};

/** query client where condition from clients table */
const queryClient = async (where: Where): Promise<LocalClient[] | Error> => {
    const result = await query((client) => select(client, 'clients', ['*'], { where }));

    return !(result instanceof Error) ? result.rows : result;
};

/** insert new client to database */
const insertClient = async (localClient: LocalClient): Promise<LocalClient | Error> => {
    const result = await query((client) => insert(client, 'clients', { values: [localClient] }));

    return !(result instanceof Error) ? result.rows[0] : result;
};

export { queryAllClients, queryClient, insertClient, isBodyClientValid, isBodyClientExist };
