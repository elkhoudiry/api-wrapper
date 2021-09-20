import { createTableIfNotExistQuery, createTableQuery } from '../sql/create-table';
import { query } from '../sql/database';
import { dropTableIfExistQuery, DropTablePostfix, dropTableQuery } from '../sql/drop-table';

const NAMESPACE = 'repos/tables-repo';

const createNewTable = async (name: string): Promise<any | Error> => {
    const result = await query((client) =>
        createTableQuery(client, name, {
            columns: [
                { name: 'id', type: 'integer', null: false, primary: true, autoGenerate: true },
                { name: 'username', type: 'text', null: false, default: 'new user name' }
            ]
        })
    );

    return !(result instanceof Error) ? result : result;
};

const createNewTableIfNotExist = async (name: string): Promise<any | Error> => {
    const result = await query((client) => createTableIfNotExistQuery(client, name, { columns: [] }));

    return !(result instanceof Error) ? result : result;
};

const dropDatabaseTable = async (name: string, postfix: DropTablePostfix = {}): Promise<any | Error> => {
    const result = await query((client) => dropTableQuery(client, name, postfix));

    return !(result instanceof Error) ? result : result;
};

const dropDatabaseTableIfExist = async (name: string, postfix: DropTablePostfix = {}): Promise<any | Error> => {
    const result = await query((client) => dropTableIfExistQuery(client, name, postfix));

    return !(result instanceof Error) ? result : result;
};

export { createNewTable, createNewTableIfNotExist, dropDatabaseTable, dropDatabaseTableIfExist };
