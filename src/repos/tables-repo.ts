import { postgre } from '../sql/databases/postgre';
import { create_table_sql, create_table_sql_no_exist } from '../sql/queries/create-table';
import { DropTablePostfix, drop_table_sql, drop_table_sql_exist } from '../sql/queries/drop-table';

const NAMESPACE = 'repos/tables-repo';

const createNewTable = async (name: string): Promise<any | Error> => {
    const result = await create_table_sql(postgre, name, {
        columns: [
            { name: 'id', type: 'INTEGER', notNull: true, primary: true, unique: true, autoGenerate: true },
            { name: 'username', type: 'TEXT', notNull: true, primary: false, unique: true, autoGenerate: false, default: 'new user name' }
        ]
    });

    return !(result instanceof Error) ? result : result;
};

const createNewTableIfNotExist = async (name: string): Promise<any | Error> => {
    const result = await create_table_sql_no_exist(postgre, name, { columns: [] });

    return !(result instanceof Error) ? result : result;
};

const dropDatabaseTable = async (name: string, postfix: DropTablePostfix = { cascade: false }): Promise<any | Error> => {
    const result = await drop_table_sql(postgre, name, postfix);

    return !(result instanceof Error) ? result : result;
};

const dropDatabaseTableIfExist = async (name: string, postfix: DropTablePostfix = { cascade: false }): Promise<any | Error> => {
    const result = await drop_table_sql_exist(postgre, name, postfix);

    return !(result instanceof Error) ? result : result;
};

export { createNewTable, createNewTableIfNotExist, dropDatabaseTable, dropDatabaseTableIfExist };
