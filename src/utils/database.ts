import { Client } from 'pg';
import logging from './logging';

const NAMESPACE = 'utils/database';

type Conditions = {
    [key: string]: string | number | boolean | null;
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

const selectExact = (client: Client, table: string, fields: Array<string>, conditions: Conditions = {}): Promise<any[] | Error> => {
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

const selectAllExact = (client: Client, table: string, conditions: Conditions = {}): Promise<any[] | Error> => {
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

const insertExact = (client: Client, table: string, object: Conditions): Promise<number | Error> => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO ${table} ${getKeysStrOfObject(object)} VALUES ${getValuesStrOfObject(object)};`;
        logging.info(NAMESPACE, `query: ${query}`);
        client.query(query, (err, res) => {
            if (err) return reject(err);
            else resolve(res.rowCount);
        });
    });
};

const deleteExact = (client: Client, table: string, conditions: Conditions): Promise<number | Error> => {
    return new Promise((resolve, reject) => {
        const conditionsStr = getObjectStrSeperated(conditions, false);
        const query = `DELETE from ${table} ${conditionsStr ? `WHERE ${conditionsStr}` : ''};`;
        logging.info(NAMESPACE, `query: ${query}`);
        client.query(query, (err, res) => {
            if (err) return reject(err);
            else resolve(res.rowCount);
        });
    });
};

const updateExact = (client: Client, table: string, object: Conditions, conditions: Conditions): Promise<number | Error> => {
    return new Promise((resolve, reject) => {
        const conditionsStr = getObjectStrSeperated(conditions, false);
        const setStr = getObjectStrSeperated(object, true);
        const query = `UPDATE ${table} SET ${setStr} ${conditionsStr ? `WHERE ${conditionsStr}` : ''};`;
        logging.info(NAMESPACE, `query: ${query}`);
        client.query(query, (err, res) => {
            if (err) return reject(err);
            else resolve(res.rowCount);
        });
    });
};

export { selectExact, selectAllExact, insertExact, deleteExact, updateExact };
