import logging from '../../utils/logging';
import { getSqlColumns, getSqlValues, QueryExecuter, SqlObject } from '../databases/common';

const NAMESPACE = 'sql/queries/insert';

export type InsertPostfix<T extends SqlObject> = {
    values: T[];
};

const insertQueryBuilder = <T extends SqlObject>(postfix: InsertPostfix<T>): string => {
    if (!postfix.values.length) throw Error('Error inserting empty values');

    return postfix.values.map((value) => `(${getSqlValues(value)})`).join();
};

const insert_sql_query = <T extends SqlObject>(table: string, postfix: InsertPostfix<T>): string => {
    const values = insertQueryBuilder(postfix);
    const columns = getSqlColumns(postfix.values[0]);

    return `INSERT INTO ${table} (${columns}) VALUES ${values} RETURNING *;`;
};

const insert_sql = async <T extends SqlObject, V>(executer: QueryExecuter<V>, table: string, postfix: InsertPostfix<T>): Promise<V | Error> => {
    try {
        const query = insert_sql_query(table, postfix);

        logging.info(NAMESPACE, `query: ${query}`);

        return await executer.execute(query);
    } catch (error: any) {
        return Error(error);
    }
};

export { insert_sql, insert_sql_query };
