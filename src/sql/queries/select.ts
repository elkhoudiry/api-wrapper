import { QueryExecuter } from '../databases/common';
import { Where } from '../options/where';
import { OrderBy } from '../options/order';
import { Limit } from '../options/limit';

import logging from '../../utils/logging';

const NAMESPACE = 'sql/queries/select';

export type SelectPostfix = {
    where?: Where;
    orderBy?: OrderBy;
    limit?: Limit;
};

const selectQueryOptions = (postfix?: SelectPostfix) => {
    if (!postfix) return '';

    let options = '';

    if (postfix.where) options += ` ${postfix.where?.toString()}`;
    if (postfix.orderBy) options += ` ${postfix.orderBy.toString()}`;
    if (postfix.limit) options += ` ${postfix.limit.toString()}`;

    return options;
};

const select_sql_query = <T>(table: string, columns: Array<string>, postfix?: SelectPostfix) => {
    const options = selectQueryOptions(postfix);

    return `SELECT ${columns.join()} FROM ${table}${options};`;
};

const select_sql = async <T>(executer: QueryExecuter<T>, table: string, columns: Array<string>, postfix?: SelectPostfix): Promise<T | Error> => {
    try {
        const query = select_sql_query(table, columns, postfix);

        logging.info(NAMESPACE, `query: ${query}`);

        return await executer.execute(query);
    } catch (error: any) {
        return Error(error);
    }
};

export { select_sql, select_sql_query };
