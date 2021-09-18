import { PoolClient } from 'pg';
import logging from '../utils/logging';
import { getSqlColumns, getSqlValues, Query, SqlObject } from './database';

const NAMESPACE = 'sql/insert';

export type InsertPostfix<T extends SqlObject> = {
    values: T[];
};

const insertQueryBuilder = <T extends SqlObject>(postfix: InsertPostfix<T>): string => {
    if (!postfix.values.length) throw Error('Error inserting empty values');

    return postfix.values.map((value) => `(${getSqlValues(value)})`).join();
};

const insert = <T extends SqlObject>(client: PoolClient, table: string, postfix: InsertPostfix<T>): Query => {
    const values = insertQueryBuilder(postfix);
    const columns = getSqlColumns(postfix.values[0]);
    const query = `INSERT INTO ${table} (${columns}) VALUES ${values} RETURNING *;`;

    logging.info(NAMESPACE, `query: ${query}`);

    return { response: client.query(query) };
};

export { insert };
