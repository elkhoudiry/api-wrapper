import { Request } from 'express';
import { LocalClient } from '../models/client';
import { postgre } from '../sql/databases/postgre';
import { DeletePostfix, delete_sql } from '../sql/queries/delete';
import { insert_sql } from '../sql/queries/insert';
import { SelectPostfix, select_sql } from '../sql/queries/select';

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
    const result = await select_sql(postgre, 'clients', ['*']);

    return !(result instanceof Error) ? result.rows : result;
};

/** query client where condition from clients table */
const queryClient = async (postfix: SelectPostfix): Promise<LocalClient[] | Error> => {
    const result = await select_sql(postgre, 'clients', ['*'], postfix);

    return !(result instanceof Error) ? result.rows : result;
};

/** insert new client to database */
const insertClient = async (localClient: LocalClient): Promise<LocalClient | Error> => {
    const result = await insert_sql(postgre, 'clients', { values: [localClient] });

    return !(result instanceof Error) ? result.rows[0] : result;
};

/** insert new client to database */
const deleteClient = async (postfix: DeletePostfix): Promise<LocalClient | Error> => {
    const result = await delete_sql(postgre, 'clients', postfix);

    return !(result instanceof Error) ? result.rows[0] : result;
};

export { queryAllClients, queryClient, insertClient, deleteClient, isBodyClientValid, isBodyClientExist };
