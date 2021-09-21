import { Where } from '../options/where';
import { QueryExecuter } from '../databases/common';

import logging from '../../utils/logging';

const NAMESPACE = 'sql/qureies/delete';

export type DeletePostfix = {
    where?: Where;
};

const deleteQueryBuilder = (postfix: DeletePostfix): string => {
    return postfix.where ? postfix.where.toString() : '';
};

const delete_sql_query = (table: string, postfix: DeletePostfix): string => {
    const options = deleteQueryBuilder(postfix);

    return `DELETE FROM ${table} ${options}RETURNING *;`;
};

const delete_sql = async <T>(executer: QueryExecuter<T>, table: string, postfix: DeletePostfix): Promise<T | Error> => {
    try {
        const query = delete_sql_query(table, postfix);
        logging.info(NAMESPACE, `query: ${query}`);

        return await executer.execute(query);
    } catch (error: any) {
        return Error(error);
    }
};

export { delete_sql, delete_sql_query };
