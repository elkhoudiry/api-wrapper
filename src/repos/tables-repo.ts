import { createTableIfNotExistQuery, createTableQuery } from '../sql/create-table';
import { query } from '../sql/database';

const NAMESPACE = 'repos/tables-repo';

const createNewTable = async (name: string): Promise<any[] | Error> => {
    const result = await query((client) =>
        createTableQuery(client, name, {
            columns: [
                { name: 'id', type: 'integer', null: false, primary: true, autoGenerate: true },
                { name: 'username', type: 'text', null: false, default: 'new user name' }
            ]
        })
    );

    return !(result instanceof Error) ? result.rows : result;
};

const createNewTableIfNotExist = async (name: string): Promise<any[] | Error> => {
    const result = await query((client) => createTableIfNotExistQuery(client, name, { columns: [] }));

    return !(result instanceof Error) ? result.rows : result;
};

export { createNewTable, createNewTableIfNotExist };
