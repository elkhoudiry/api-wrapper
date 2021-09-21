import { CreateTablePostfix, create_table, SqlColumn } from '../queries/create-table';
import { drop_table_exist } from '../queries/drop-table';
import { QueryExecuter, SqlObject } from './common';

// create general test table
const createDummyTable = async <T>(executer: QueryExecuter<T>, run: () => void) => {
    const id_column: SqlColumn = { name: 'id', type: 'INTEGER', notNull: true, primary: true, unique: false, autoGenerate: true };
    const name_column: SqlColumn = { name: 'name', type: 'TEXT', notNull: true, primary: false, unique: false, autoGenerate: false };
    const email_column: SqlColumn = { name: 'email', type: 'TEXT', notNull: true, primary: false, unique: true, autoGenerate: false };

    const tablePostfix: CreateTablePostfix = { columns: [id_column, name_column, email_column] };

    await create_table(executer, 'dummy_table', tablePostfix);

    await run();

    await drop_table_exist(executer, 'dummy_table', { cascade: false });
};

const createTenDummyInserts = (): SqlObject[] => {
    return [
        {
            name: 'name 1',
            email: 'email1@test'
        },
        {
            name: 'name 2',
            email: 'email2@test'
        },
        {
            name: 'name 3',
            email: 'email3@test'
        },
        {
            name: 'name 4',
            email: 'email4@test'
        },
        {
            name: 'name 5',
            email: 'email5@test'
        },
        {
            name: 'name 6',
            email: 'email6@test'
        },
        {
            name: 'name 7',
            email: 'email7@test'
        },
        {
            name: 'name 8',
            email: 'email8@test'
        },
        {
            name: 'name 9',
            email: 'email9@test'
        },
        {
            name: 'name 10',
            email: 'email10@test'
        }
    ];
};

export { createDummyTable, createTenDummyInserts };
