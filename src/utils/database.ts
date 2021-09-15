import { Response } from 'express';
import { Pool, Client } from 'pg';
import logging from './logging';

const NAMESPACE = 'utils/database';

export interface JsonObject {
    [key: string]: string | number | boolean | [] | {} | null;
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const query = async <T>(actions: Function): Promise<T | Error> => {
    const client = await pool.connect();
    const result = await actions(client);
    await client.release();
    return result;
};

const getSelectFieldsStr = (fields: string[]) => {
    return fields.reduce((prev, current, index) => (index !== fields.length ? (prev += `, ${current}`) : (prev += `${current}`)));
};

const getObjectStrSeperated = (conditions: {}, comma: boolean) => {
    const keys = Object.keys(conditions);
    const values = Object.values(conditions);

    let conditionsStr = '';

    for (let i = 0; i < keys.length; i++) {
        const element = keys[i];
        conditionsStr += `${element} = ${getValidStringValue(values[i])}`;
        i !== keys.length - 1 ? (conditionsStr += `${comma ? ' , ' : ' and '}`) : '';
    }

    return conditionsStr;
};

const getValidStringValue = (value: any) => (typeof value === 'string' ? `\'${value}\'` : value.toString());

const getKeysStrOfObject = (obj: {}) => {
    const keys = Object.keys(obj);

    const keysStr = keys.reduce((prev, current, index) => (index !== keys.length ? (prev += `, ${current}`) : (prev += `${current}`)));

    return `(${keysStr})`;
};

const getValuesStrOfObject = (obj: {}) => {
    const values = Object.values(obj);

    let valuesStr = '';
    for (let i = 0; i < values.length; i++) {
        const element = values[i] as any;
        valuesStr += getValidStringValue(element);
        i !== values.length - 1 ? (valuesStr += ', ') : '';
    }

    return `(${valuesStr})`;
};

const selectExact = (client: Client, table: string, fields: Array<string>, conditions: JsonObject = {}): Promise<any[] | Error> => {
    return new Promise((resolve, reject) => {
        const conditionsStr = getObjectStrSeperated(conditions, false);
        const query = `SELECT ${getSelectFieldsStr(fields)} from ${table} ${conditionsStr ? `WHERE ${conditionsStr}` : ''};`;
        logging.info(NAMESPACE, `query: ${query}`);
        client.query(query, (err, res) => {
            if (err) return reject(err);
            else resolve(res.rows);
        });
    });
};

const selectAllExact = (client: Client, table: string, conditions: JsonObject = {}): Promise<any[] | Error> => {
    return new Promise((resolve, reject) => {
        const conditionsStr = getObjectStrSeperated(conditions, false);
        const query = `SELECT * from ${table} ${conditionsStr ? `WHERE ${conditionsStr}` : ''};`;
        logging.info(NAMESPACE, `query: ${query}`);
        client.query(query, (err, res) => {
            if (err) return reject(err);
            else resolve(res.rows);
        });
    });
};

const insertExact = (client: Client, table: string, object: JsonObject): Promise<any | Error> => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO ${table} ${getKeysStrOfObject(object)} VALUES ${getValuesStrOfObject(object)} RETURNING * ;`;
        logging.info(NAMESPACE, `query: ${query}`);
        client.query(query, (err, res) => {
            if (err) return reject(err);
            else resolve(res.rows[0]);
        });
    });
};

const deleteExact = (client: Client, table: string, conditions: JsonObject): Promise<any[] | Error> => {
    return new Promise((resolve, reject) => {
        const conditionsStr = getObjectStrSeperated(conditions, false);
        const query = `DELETE from ${table} ${conditionsStr ? `WHERE ${conditionsStr}` : ''}  RETURNING * ;`;
        logging.info(NAMESPACE, `query: ${query}`);
        client.query(query, (err, res) => {
            if (err) return reject(err);
            else resolve(res.rows);
        });
    });
};

const updateExact = (client: Client, table: string, object: JsonObject, conditions: JsonObject): Promise<any[] | Error> => {
    return new Promise((resolve, reject) => {
        const conditionsStr = getObjectStrSeperated(conditions, false);
        const setStr = getObjectStrSeperated(object, true);
        const query = `UPDATE ${table} SET ${setStr} ${conditionsStr ? `WHERE ${conditionsStr}` : ''}  RETURNING * ;`;
        logging.info(NAMESPACE, `query: ${query}`);
        client.query(query, (err, res) => {
            if (err) return reject(err);
            else resolve(res.rows);
        });
    });
};

const response = <T>(res: Response, result: T | Error): Response => {
    if (result instanceof Error) return res.status(500).json({ message: 'Internal Server Error!' });
    else return res.status(200).json({ result: result });
};

export { query, response, selectExact, selectAllExact, insertExact, deleteExact, updateExact };
