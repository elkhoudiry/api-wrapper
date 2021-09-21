import { getValidSqlValue, QueryExecuter } from '../databases/common';

import logging from '../../utils/logging';

const NAMESPACE = 'sql/queries/create-table';

export type SqlColumn = {
    name: string;
    type: 'TEXT' | 'INTEGER' | 'FLOAT' | 'BOOLEAN';
    notNull: boolean;
    primary: boolean;
    unique: boolean;
    autoGenerate: boolean;
    default?: any;
};

export type CreateTablePostfix = {
    columns: SqlColumn[];
};

const joinColumn = (column: SqlColumn): string => {
    let columnStr = '';

    columnStr += `${column.name} `;
    columnStr += `${column.type} `;
    !column.notNull ? columnStr : (columnStr += `NOT NULL `);
    !column.primary ? columnStr : (columnStr += `PRIMARY KEY `);
    !column.unique ? columnStr : (columnStr += `UNIQUE `);
    !column.autoGenerate ? columnStr : (columnStr += `GENERATED ALWAYS AS IDENTITY `);
    !column.default ? columnStr : (columnStr += `DEFAULT ${getValidSqlValue(column.default)}`);

    return columnStr.trim();
};

const createTableQueryBuilder = (postfix: CreateTablePostfix): string => {
    return postfix.columns.map(joinColumn).join();
};

const create_table_query = (table: string, postfix: CreateTablePostfix): string => {
    const options = createTableQueryBuilder(postfix);

    return `CREATE TABLE ${table} (${options});`;
};

const create_table_no_exist = <T>(executer: QueryExecuter<T>, table: string, postfix: CreateTablePostfix): Promise<T | Error> => {
    return create_table(executer, `IF NOT EXISTS ${table}`, postfix);
};

const create_table = async <T>(executer: QueryExecuter<T>, table: string, postfix: CreateTablePostfix): Promise<T | Error> => {
    try {
        const query = create_table_query(table, postfix);

        logging.info(NAMESPACE, `query: ${query}`);

        return await executer.execute(query);
    } catch (error: any) {
        return Error(error);
    }
};

export { create_table, create_table_query, create_table_no_exist };
