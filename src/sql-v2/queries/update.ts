import { Where } from '../options/where';
import { getSqlColumnsValues, QueryExecuter, SqlObject } from '../databases/common';

import logging from '../../utils/logging';

const NAMESPACE = 'sql/qureies/update';

export type UpdatePostfix = {
    where?: Where;
};

const updateQueryBuilder = (postfix: UpdatePostfix): string => {
    return postfix.where ? postfix.where.toString() : '';
};

const update_sql_query = (table: string, newValues: SqlObject, postfix: UpdatePostfix): string => {
    const options = updateQueryBuilder(postfix);
    const updateValues = getSqlColumnsValues(newValues, '=', ',');

    return `UPDATE ${table} SET ${updateValues} ${options}RETURNING *;`;
};

const update_sql = async <T>(executer: QueryExecuter<T>, table: string, newValues: SqlObject, postfix: UpdatePostfix): Promise<T | Error> => {
    try {
        const query = update_sql_query(table, newValues, postfix);
        logging.info(NAMESPACE, `query: ${query}`);

        return await executer.execute(query);
    } catch (error: any) {
        return Error(error);
    }
};

export { update_sql, update_sql_query };
