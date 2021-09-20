import { Pool, QueryResult } from 'pg';
import logging from '../../utils/logging';
import { CreateTablePostfix, create_table, SqlColumn } from '../queries/create-table';
import { drop_table, drop_table_exist } from '../queries/drop-table';

const NAMESPACE = 'sql/databases/common';

export interface SqlObject {
    [key: string]: string | number | boolean | null;
}

export interface QueryExecuter<T> {
    execute: (query: string) => Promise<T | Error>;
}

export interface Query<T> {
    response: Promise<T | Error>;
}

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

const getValidSqlValue = (value: any): string => {
    return typeof value === 'string' ? `\'${value}\'` : value.toString();
};

const getSqlColumnValue = (key: string, value: any, delimeter: string): string => {
    return `${key}${delimeter}${value}`;
};

const getSqlColumns = (obj: SqlObject): string => {
    return Object.keys(obj).join();
};

const getSqlValues = (obj: SqlObject): string => {
    return Object.values(obj).map(getValidSqlValue).join();
};

const getSqlColumnsValues = (obj: SqlObject, delimeter1: string, delimeter2: string): string => {
    const keys = Object.keys(obj);
    const values = Object.values(obj).map(getValidSqlValue);

    if (!keys.length) return '';

    keys[0] = getSqlColumnValue(keys[0], values[0], delimeter1);

    const check = (prev: string, current: any, index: number): string => {
        return (prev += `${delimeter2}${getSqlColumnValue(current, values[index], delimeter1)}`);
    };

    return keys.reduce(check);
};

export { createDummyTable, getValidSqlValue, getSqlColumns, getSqlValues, getSqlColumnsValues };
