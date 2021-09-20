import { PoolClient } from 'pg';
import logging from '../utils/logging';
import { getValidSqlValue, Query } from './database';

const NAMESPACE = 'sql/create-table';

export type SqlColumn = {
    name: string;
    type: 'text' | 'integer' | 'boolean';
    null?: boolean;
    primary?: boolean;
    autoGenerate?: boolean;
    default?: any;
};

export type CreateTablePostfix = {
    columns: SqlColumn[];
};

const joinColumn = (column: SqlColumn): string => {
    let columnStr = '';

    columnStr += `${column.name} `;
    columnStr += `${column.type} `;
    !column.null ? columnStr : (columnStr += `NOT NULL `);
    !column.primary ? columnStr : (columnStr += `PRIMARY KEY `);
    !column.autoGenerate ? columnStr : (columnStr += `GENERATED ALWAYS AS IDENTITY `);
    !column.default ? columnStr : (columnStr += `DEFAULT ${getValidSqlValue(column.default)}`);

    return columnStr.trim();
};

const createTableQueryBuilder = (postfix: CreateTablePostfix): string => {
    return postfix.columns.map(joinColumn).join();
};

const createTableIfNotExistQuery = (client: PoolClient, table: string, postfix: CreateTablePostfix): Query => {
    return createTableQuery(client, `IF NOT EXISTS ${table}`, postfix);
};

const createTableQuery = (client: PoolClient, table: string, postfix: CreateTablePostfix): Query => {
    const options = createTableQueryBuilder(postfix);
    const query = `CREATE TABLE ${table} (${options}) ;`;

    logging.info(NAMESPACE, `query: ${query}`);

    return { response: client.query(query) };
};

export { createTableQuery, createTableIfNotExistQuery };
