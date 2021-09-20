import { Pool, QueryResult } from 'pg';
import logging from '../../utils/logging';

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

export { getValidSqlValue, getSqlColumns, getSqlValues, getSqlColumnsValues };
